import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Clock, Shield, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { quoteSchema, QuoteFormValues } from "./schema";
import {
    InterestedSection,
    UserSection,
    CompanySection,
} from "./QuoteFormComponents";

import engineerImg from "@/assets/enginner.png";
import team1 from "@/assets/team/team1.png";
import team2 from "@/assets/team/team2.png";
import team3 from "@/assets/team/team3.png";

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

const formSections = [
    { id: 1, label: "Your Interests" },
    { id: 2, label: "Personal Info" },
    { id: 3, label: "Company Details" },
];

export function QuoteForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<QuoteFormValues>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            solutionCategories: [],
            products: [{ qty: "", productNo: "", description: "", application: "" }],
            contactMethod: "Either",
            newsletter: "No",
            sections: [],
        },
    });

    const onSubmit = async (data: QuoteFormValues) => {
        try {
            console.log("Form Data:", data);
            await new Promise((resolve) => setTimeout(resolve, 1200));
            toast.success("Quote request submitted successfully!");
            reset();
        } catch {
            toast.error("Failed to submit request. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F8FA]">

            {/* ── HERO ── */}
            <div className="relative bg-[#0A0F1A] overflow-hidden pt-20">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D62828]/10 blur-[140px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-35 pb-36 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl text-center lg:text-left"
                    >

                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                            Request a<br />
                            <span className="text-[#D62828]">Custom Quote</span>
                        </h1>
                        <p className="text-gray-400 text-base leading-relaxed">
                            Tell us your requirements and our engineering team will design a
                            tailored solution with accurate costing and technical expertise.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── BODY: STICKY SIDEBAR + FORM ── */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-20 relative z-20 pb-24">
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* ── STICKY SIDEBAR ── */}
                    <div className="lg:sticky lg:top-8 w-full lg:w-80 shrink-0 flex flex-col gap-4">

                        {/* engineer image card */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#0A0F1A] rounded-xl overflow-hidden relative h-64 lg:h-72 border border-white/5 shadow-xl"
                        >
                            <div className="absolute inset-0 bg-[#D62828]/10 blur-2xl" />
                            <img
                                src={engineerImg}
                                alt="Engineer"
                                className="w-full h-full object-cover object-top mix-blend-luminosity opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A]/90 via-transparent to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5">
                                <p className="text-xs text-[#DA4848] font-medium mb-1">
                                    Our Team
                                </p>
                                <p className="text-white text-sm font-medium leading-snug">Engineering experts ready to build your solution</p>
                            </div>
                        </motion.div>

                        {/* people cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-md p-5 space-y-4"
                        >
                            {/* header */}
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-medium text-gray-500">
                                    Meet the team
                                </p>
                                <span className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse" />
                            </div>

                            {/* people list */}
                            <div className="space-y-2.5">
                                {people.map((p, i) => (
                                    <motion.div
                                        key={p.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.08 }}
                                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50/80 transition-all group"
                                    >
                                        {/* avatar */}
                                        <div className="relative">
                                            <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-white shadow-sm">
                                                <img
                                                    src={p.img}
                                                    alt={p.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* online dot */}
                                            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                                        </div>

                                        {/* info */}
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-[#0A0F1A] truncate group-hover:text-[#D62828] transition-colors">
                                                {p.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {p.role}
                                            </p>
                                        </div>

                                        {/* subtle arrow indicator */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-all text-gray-300 group-hover:text-[#D62828]">
                                            →
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* stats card */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-[#D62828] rounded-xl p-5 shadow-lg shadow-[#D62828]/20"
                        >
                            <p className="text-[11px] font-semibold text-white/60 uppercase tracking-widest mb-4">
                                Why choose us
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                {stats.map((s) => (
                                    <div key={s.label} className="text-center">
                                        <p className="text-xl font-bold text-white">{s.value}</p>
                                        <p className="text-[10px] text-white/60 mt-0.5 leading-tight">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>

                    {/* ── FORM CARD ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex-1 bg-white rounded-3xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden"
                    >
                        {/* form header */}
                        <div className="border-b border-gray-100 px-8 md:px-12 py-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-base font-bold text-[#0A0F1A]">Quote Request Form</h2>
                                <p className="text-xs text-gray-400 mt-0.5">All fields marked are required</p>
                            </div>
                            <div className="hidden md:flex items-center gap-1">
                                {formSections.map((s, i) => (
                                    <React.Fragment key={s.id}>
                                        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
                                            {s.label}
                                        </span>
                                        {i < formSections.length - 1 && (
                                            <ChevronRight className="w-3 h-3 text-gray-300" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-14">
                            <InterestedSection register={register} control={control} errors={errors} />
                            <UserSection register={register} errors={errors} />
                            <CompanySection register={register} errors={errors} />

                            {/* submit */}
                            <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-5 text-xs text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <Shield className="w-3.5 h-3.5 text-gray-300" />
                                        Secure & Confidential
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-gray-300" />
                                        Response in 1–2 business days
                                    </span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-[#D62828] text-white text-sm font-semibold shadow-lg shadow-[#D62828]/25 hover:shadow-[#D62828]/40 hover:bg-[#b82020] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Submit Quote Request</span>
                                            <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>

        </div>
    );
}