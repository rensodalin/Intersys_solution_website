import React from "react";
import { useInquiry } from "@/context/InquiryContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Clock, Shield, ChevronRight, Trash2, Plus, Minus } from "lucide-react";
import { quoteSchema, QuoteFormValues } from "./schema";
import {
    InterestedSection,
    UserSection,
    CompanySection,
    jobTitles,
} from "./QuoteFormComponents";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import environment from "@/enviroment/enviroment";
import type { TaxonomySubCategory } from "@/utils/taxonomyApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import engineerImg from "@/assets/enginner.png";
import team1 from "@/assets/team/picture on QR cord/Frame 3.webp";
import team2 from "@/assets/team/picture on QR cord/Frame 4.webp";
import team3 from "@/assets/team/picture on QR cord/Frame 5.webp";

const people = [
    { img: team1, name: "Design Engineer", role: "System Planning" },
    { img: team2, name: "Project Manager", role: "Execution" },
    { img: team3, name: "Support Engineer", role: "24/7 Support" },
];

const stats = [
    { value: "24h", label: "Avg. Response" },
    { value: "98%", label: "Satisfaction" },
    { value: "100+", label: "Projects" },
];

function findSubcategoryInTree(items: TaxonomySubCategory[], target: string): string | undefined {
    for (const item of items) {
        if (item.name.toLowerCase() === target.toLowerCase()) return item.name;
        const child = findSubcategoryInTree(item.children || [], target);
        if (child) return child;
    }
    return undefined;
}

const formSections = [
    { id: 1, label: "Your Interests" },
    { id: 2, label: "Personal Info" },
    { id: 3, label: "Company Details" },
];

export function QuoteForm() {
    const navigate = useNavigate();
    const { items, removeItem, updateQty, clearInquiry } = useInquiry();
    const { taxonomy } = useTaxonomy();

    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<QuoteFormValues>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            solutionCategories: [],
            products: [{ qty: "", productNo: "", description: "", application: "", productId: "", product: "" }],
            contactMethod: "Either",
            newsletter: "No",
            sections: [],
        },
    });

    const user = useSelector((state: RootState) => state.auth.user);
    const [submitStatus, setSubmitStatus] = React.useState<"success" | "error" | null>(null);

    const liveCategories = React.useMemo(() => {
        if (taxonomy.length === 0) return [
            "Building Management Systems (BMS)",
            "Access Control Systems",
            "Surveillance (CCTV) Systems",
            "Fire Alarm & Safety Systems",
            "Audio Visual (AV) Solutions",
            "Integrated Building Systems"
        ];
        return taxonomy.map(t => t.category);
    }, [taxonomy]);

    const liveSections = React.useMemo(() => {
        if (taxonomy.length === 0) return [
            "Controllers & Control Panels",
            "Software & Platforms",
            "Field Devices & Sensors",
            "Cameras & Surveillance Devices",
            "Fire Detection Devices",
            "Access Control Devices",
            "Audio Visual Equipment",
            "Networking & Communication Devices",
            "Power Supplies & Accessories"
        ];
        const set = new Set<string>();
        taxonomy.forEach(cat => {
            cat.subCategories?.forEach(sub => {
                if (sub.name) set.add(sub.name);
                if (sub.children?.length) {
                    const collect = (children: typeof sub.children) => {
                        children.forEach(c => {
                            if (c.name) set.add(c.name);
                            if (c.children?.length) collect(c.children);
                        });
                    };
                    collect(sub.children);
                }
            });
        });
        return Array.from(set);
    }, [taxonomy]);

    // Detect sections from inquiry items using current taxonomy/liveSections
    const detectSections = React.useCallback((): string[] => {
        const detected: string[] = [];
        if (items.length === 0) return detected;

        items.forEach(item => {
            let subcategory = item.subcategory;

            if (!subcategory) {
                const catTax = taxonomy.find(t =>
                    t.category === item.category ||
                    item.category?.toLowerCase().includes(t.category.toLowerCase())
                );
                if (catTax?.subCategories) {
                    subcategory = catTax.subCategories.find(s =>
                        item.title?.toLowerCase().includes(s.name.toLowerCase())
                    )?.name;
                }
            }

            if (subcategory) {
                const subParts = subcategory.split('/').map(x => x.trim()).filter(Boolean);
                const lastPart = subParts[subParts.length - 1];
                if (lastPart) {
                    const lastPartLower = lastPart.toLowerCase();
                    const matchedSection = liveSections.find(s => {
                        const sLower = s.toLowerCase();
                        return (
                            sLower === lastPartLower ||
                            sLower.includes(lastPartLower) ||
                            lastPartLower.includes(sLower)
                        );
                    });
                    if (matchedSection && !detected.includes(matchedSection)) {
                        detected.push(matchedSection);
                    }
                }
            }

            // Fallback: search taxonomy tree directly
            if (subcategory && taxonomy.length > 0) {
                const subParts = subcategory.split('/').map(x => x.trim()).filter(Boolean);
                const lastPart = subParts[subParts.length - 1];
                if (lastPart && !detected.some(s => s.toLowerCase() === lastPart.toLowerCase())) {
                    for (const cat of taxonomy) {
                        const found = findSubcategoryInTree(cat.subCategories || [], lastPart);
                        if (found && !detected.includes(found)) { detected.push(found); break; }
                    }
                }
            }

            if (!subcategory && item.brand) {
                const brandName = item.brand;
                const brandSection = liveSections.find(s => s.toLowerCase().includes(brandName.toLowerCase()));
                if (brandSection && !detected.includes(brandSection)) detected.push(brandSection);
            }
        });

        return detected;
    }, [items, taxonomy, liveSections]);

    // Populate form from inquiry items
    React.useLayoutEffect(() => {
        if (items.length === 0) return;

        // Categories
        const cats: string[] = [];
        items.forEach(item => {
            if (item.category) {
                const exact = liveCategories.find(c => c === item.category);
                if (exact) { if (!cats.includes(exact)) cats.push(exact); }
                else {
                    const p = liveCategories.find(c => c.toLowerCase().includes(item.category.toLowerCase()));
                    if (p && !cats.includes(p)) cats.push(p);
                }
            }
        });
        setValue("solutionCategories", cats, { shouldDirty: true });

        // Sections
        const secs = detectSections();
        if (secs.length > 0) {
            setValue("sections", secs, { shouldDirty: true });
        }

        // Products
        setValue("products", items.map(i => ({
            qty: i.qty.toString(),
            productNo: i.partCode,
            description: i.title,
            application: i.specification,
            productId: i.id,
            product: i._id || "",
        })), { shouldDirty: true });
    }, [items, liveCategories, detectSections, setValue]);

    // Auto-fill user info from registered account
    React.useLayoutEffect(() => {
        if (!user) return;
        if (user.name) setValue("name", user.name, { shouldDirty: false });
        if (user.email) setValue("email", user.email, { shouldDirty: false });
        if (user.phone) setValue("phone", user.phone, { shouldDirty: false });
        if (user.role) {
            const matched = jobTitles.find(j => j.toLowerCase() === user.role?.toLowerCase());
            setValue("title", matched || user.role, { shouldDirty: false });
        }
    }, [user, setValue]);

    // When taxonomy finally loads asynchronously, re-sync sections
    React.useEffect(() => {
        if (items.length === 0 || taxonomy.length === 0) return;
        const secs = detectSections();
        if (secs.length > 0) {
            const current = getValues("sections") || [];
            const merged = [...new Set([...current, ...secs])];
            if (merged.length !== current.length || merged.some((s, i) => s !== current[i])) {
                setValue("sections", merged, { shouldDirty: true });
            }
        }
    }, [taxonomy, detectSections, setValue, getValues, items.length]);

    const onSubmit = async (data: QuoteFormValues) => {
        setSubmitStatus(null);
        try {
            const baseUrl = environment;
            const response = await fetch(`${baseUrl}/api/quotes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Failed to submit request");
            }

            setSubmitStatus("success");
            clearInquiry();
            reset();

            // clear success message after a few seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch {
            setSubmitStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F8FA]">

            {/* ── HERO ── */}
            <div className="relative bg-[#0A0F1A] overflow-hidden pt-20">
                <div className="absolute inset-0">
                    <img
                        src="https://www.intersys-solutions.com/website_asset/request.jpg"
                        className="w-full h-full object-cover opacity-40 grayscale"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A]/80 via-[#0A0F1A]/60 to-[#0A0F1A]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-35 pb-32 md:pb-48 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 md:mb-6 font-display">
                            Request a<br />
                            <span className="text-red-600">Custom Quote</span>
                        </h1>
                        <p className="text-gray-300 text-sm md:text-lg leading-relaxed max-w-xl">
                            Tell us your requirements and our engineering team will design a
                            tailored solution with accurate costing and technical expertise.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── BODY: STICKY SIDEBAR + FORM ── */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-16 md:-mt-32 relative z-20 pb-16 md:pb-24">
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* ── STICKY SIDEBAR ── */}
                    <div className="lg:sticky lg:top-8 w-full lg:w-96 shrink-0 flex flex-col gap-4">

                        {/* Selected Products List */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 md:p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-md font-bold text-[#1A3263]">Selected Products</h3>
                                <span className="bg-[#D62828] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {items.length}
                                </span>
                            </div>

                            <div className="space-y-5 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.length > 0 ? (
                                    items.map((item: any) => (
                                        <div key={item.partCode} className="flex gap-3 group items-center py-2">
                                            <Link
                                                to={`/products/detail/${item.id}`}
                                                className="w-12 h-12 md:w-14 md:h-14 bg-[#F8F9FA] rounded-sm flex items-center justify-center p-2 shrink-0 border border-gray-200 hover:border-[#162E93] transition-all cursor-pointer"
                                            >
                                                <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                                            </Link>
                                            <div className="flex-1 min-w-0">
                                                <Link to={`/products/detail/${item.id}`} className="hover:underline">
                                                    <p className="text-xs md:text-sm font-bold text-gray-800 truncate leading-tight">{item.title}</p>
                                                </Link>
                                                <p className="text-[11px] md:text-[12px] text-gray-400 truncate mt-0.5">{item.partCode}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQty(item.partCode, Math.max(1, item.qty - 1))}
                                                        className="p-0.5 text-gray-400 hover:text-[#D62828] transition-colors cursor-pointer"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-[11px] md:text-[12px] text-[#D62828] font-bold min-w-[16px] text-center tabular-nums">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQty(item.partCode, item.qty + 1)}
                                                        className="p-0.5 text-gray-400 hover:text-[#D62828] transition-colors cursor-pointer"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.partCode)}
                                                className="p-2 text-gray-300 hover:text-[#D62828] hover:bg-red-50 rounded-lg transition-all shrink-0"
                                                title="Remove product"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-400 text-center py-4">No products selected yet.</p>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-50">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (items.length === 0) {
                                            navigate({ to: "/products" });
                                            return;
                                        }
                                        const lastItem = items[items.length - 1];
                                        navigate({
                                            to: `/products/detail/${lastItem.id}`,
                                            search: { from: lastItem.returnPath || "/products" }
                                        });
                                    }}
                                    className="w-full py-3 bg-[#F8F9FA] hover:bg-gray-100 text-gray-700 text-[13px] font-bold rounded-sm transition-colors border border-gray-200 flex items-center justify-center gap-2"
                                >
                                    <Plus size={14} className="text-[#D62828]" />
                                    Add more product
                                </button>
                            </div>
                        </motion.div>


                    </div>

                    {/* ── FORM CARD ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex-1 bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden"
                    >
                        {/* form header */}
                        <div className="border-b border-gray-100 px-6 md:px-12 py-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-sm md:text-base font-bold text-[#1A3263]">Quote Request Form</h2>
                                <p className="text-[11px] md:text-xs text-gray-400 mt-0.5">All fields marked are required</p>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                {formSections.map((s, i) => (
                                    <React.Fragment key={s.id}>
                                        <span className="text-[12px] font-bold text-gray-600 bg-[#F8F9FA] border border-gray-200 px-3 py-1 rounded-sm">
                                            {s.label}
                                        </span>
                                        {i < formSections.length - 1 && (
                                            <ChevronRight className="w-3 h-3 text-gray-300" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-12 space-y-10 md:space-y-14">
                            <UserSection register={register} errors={errors} />
                            <InterestedSection
                                register={register}
                                control={control}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                categories={liveCategories}
                                sections={liveSections}
                            />
                            <CompanySection register={register} errors={errors} setValue={setValue} watch={watch} />

                            {/* submit */}
                            <div className="border-t border-gray-100 pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
                                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 text-[11px] md:text-xs text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <Shield className="w-3.5 h-3.5 text-gray-300" />
                                        Secure & Confidential
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-gray-300" />
                                        Response in 1–2 business days
                                    </span>
                                </div>
                                <div className="flex flex-col items-center md:items-end w-full md:w-auto">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 rounded-sm bg-[#162E93] text-white text-[13px] md:text-[14px] font-bold hover:bg-[#0E1E61] transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-full md:w-auto justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Submit Quote Request</span>
                                                <Send size={15} />
                                            </>
                                        )}
                                    </button>

                                    {submitStatus === "success" && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-[#10b981] text-sm font-bold mt-3"
                                        >
                                            Quote request submitted successfully!
                                        </motion.p>
                                    )}

                                    {submitStatus === "error" && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-[#D62828] text-sm font-bold mt-3"
                                        >
                                            Failed to submit request. Please try again.
                                        </motion.p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>

            {/* Stats Overlay (Now under the form) */}

        </div>
    );
}