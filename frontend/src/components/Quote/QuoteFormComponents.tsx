import React from "react";
import {
    UseFormRegister,
    Control,
    useFieldArray,
    FieldErrors
} from "react-hook-form";
import { motion } from "framer-motion";
import {
    Plus,
    Trash2,
    User,
    Building2,
    Smartphone,
    Mail,
    MapPin,
    FileText,
    BadgeCheck,
    Package
} from "lucide-react";
import { QuoteFormValues, productSections, companyTypes } from "./schema";

/* ─────────────────────────────────────────────
   INPUT FIELD
──────────────────────────────────────────── */
const jobTitles = [
    "Engineer",
    "Project Manager",
    "Architect",
    "Technician",
    "Director",
    "Procurement",
    "Consultant",
    "Other",
];

export const InputField = React.forwardRef(
    ({ label, error, ...props }: any, ref) => (
        <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">
                {label}
            </label>

            <input
                ref={ref}
                {...props}
                className={`w-full px-4 py-3 rounded-sm border ${error ? "border-[#D62828] bg-red-50" : "border-gray-200"
                    } bg-[#F8F9FA] text-[13px] text-[#0A0F1A] focus:outline-none focus:border-[#162E93] transition-colors`}
            />

            {error && <p className="text-[11px] font-bold text-[#D62828]">{error}</p>}
        </div>
    )
);

InputField.displayName = "InputField";

/* ─────────────────────────────────────────────
   INTEREST SECTION
──────────────────────────────────────────── */
interface SectionProps {
    register: UseFormRegister<QuoteFormValues>;
    errors: FieldErrors<QuoteFormValues>;
    control?: Control<QuoteFormValues>;
    watch?: any;
    setValue?: any;
}

export function InterestedSection({ register, control, watch, errors }: SectionProps) {
    const watchedCategories = watch ? watch("solutionCategories") || [] : [];
    const watchedSections = watch ? watch("sections") || [] : [];
    const { fields, append, remove } = useFieldArray({
        control: control!,
        name: "products",
    });

    const categories = [
        "Building Management Systems (BMS)",
        "Access Control Systems",
        "Surveillance (CCTV) Systems",
        "Fire Alarm & Safety Systems",
        "Audio Visual (AV) Solutions",
        "Integrated Building Systems"
    ];

    return (
        <section className="space-y-8">

            {/* HEADER */}
            <div className="border-l-4 border-[#162E93] pl-4 mb-8">
                <h2 className="text-lg font-bold text-[#1A3263]">
                    Your Requirements
                </h2>
                <p className="text-xs text-gray-500 mt-1 font-light">
                    Select product categories, sections, or specific items you need
                </p>
            </div>

            {/* CATEGORIES */}
            <div className="grid md:grid-cols-2 gap-8">

                <div className="space-y-4">
                    <h3 className="text-[14px] font-bold text-[#1A3263] border-b border-gray-100 pb-2">
                        Product categories
                    </h3>

                    {categories.map((text) => (
                        <label
                            key={text}
                            className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-sm border border-gray-200 hover:border-[#162E93] transition-colors cursor-pointer"
                        >
                            <span className="text-[#0A0F1A] text-[13px] font-medium">
                                {text}
                            </span>
                            <input
                                type="checkbox"
                                value={text}
                                {...register("solutionCategories")}
                                checked={Array.isArray(watchedCategories) && watchedCategories.includes(text)}
                                className="w-4 h-4 text-[#162E93] rounded-sm border-gray-300 focus:ring-[#162E93]"
                            />
                        </label>
                    ))}
                </div>

                {/* SECTIONS */}
                <div className="space-y-4">
                    <h3 className="text-[14px] font-bold text-[#1A3263] border-b border-gray-100 pb-2">
                        Product sections
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        {productSections.map((section) => (
                            <label
                                key={section}
                                className="flex items-center gap-3 text-[12px] font-medium text-gray-600 hover:text-[#162E93] transition-colors cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    value={section}
                                    {...register("sections")}
                                    checked={Array.isArray(watchedSections) && watchedSections.includes(section)}
                                    className="w-3.5 h-3.5 text-[#162E93] rounded-sm border-gray-300 focus:ring-[#162E93]"
                                />
                                {section}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* PRODUCTS TABLE */}
            <div className="space-y-4 pt-6">

                <div className="border-l-4 border-[#162E93] pl-4 mb-4">
                    <h3 className="text-md font-bold text-[#1A3263]">
                        Product request details
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 font-light">
                        Add items you would like pricing or quotation for
                    </p>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-[#F8F9FA] text-[12px] font-bold text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-left">Qty</th>
                                <th className="p-4 text-left">Product</th>
                                <th className="p-4 text-left">Description</th>
                                <th className="p-4 text-left">Application</th>
                                <th className="p-4" />
                            </tr>
                        </thead>

                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="border-b border-gray-100 last:border-0 hover:bg-[#FBFBFC] transition-colors">
                                    <td className="p-3">
                                        <input
                                            {...register(`products.${index}.qty`)}
                                            className={`w-full p-2 border rounded-sm text-[13px] focus:outline-none ${errors.products?.[index]?.qty ? "border-[#D62828] bg-red-50" : "border-gray-200 bg-white focus:border-[#162E93]"}`}
                                        />
                                    </td>
                                    <td className="p-3">
                                        <input
                                            {...register(`products.${index}.productNo`)}
                                            className={`w-full p-2 border rounded-sm text-[13px] focus:outline-none ${errors.products?.[index]?.productNo ? "border-[#D62828] bg-red-50" : "border-gray-200 bg-white focus:border-[#162E93]"}`}
                                        />
                                    </td>
                                    <td className="p-3">
                                        <input
                                            {...register(`products.${index}.description`)}
                                            className={`w-full p-2 border rounded-sm text-[13px] focus:outline-none ${errors.products?.[index]?.description ? "border-[#D62828] bg-red-50" : "border-gray-200 bg-white focus:border-[#162E93]"}`}
                                        />
                                    </td>
                                    <td className="p-3">
                                        <input
                                            {...register(`products.${index}.application`)}
                                            className={`w-full p-2 border rounded-sm text-[13px] focus:outline-none ${errors.products?.[index]?.application ? "border-[#D62828] bg-red-50" : "border-gray-200 bg-white focus:border-[#162E93]"}`}
                                        />
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-gray-300 hover:text-[#D62828] transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        append({
                            qty: "",
                            productNo: "",
                            description: "",
                            application: "",
                        })
                    }
                    className="text-sm font-medium text-red-600 flex items-center gap-2"
                >
                    <Plus size={16} /> Add item
                </button>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   USER SECTION
──────────────────────────────────────────── */
export function UserSection({ register, errors }: SectionProps) {
    return (
        <section className="space-y-6 pt-6 border-t">

            <div className="border-l-4 border-[#162E93] pl-4 mb-8">
                <h2 className="text-lg font-bold text-[#1A3263]">
                    Contact Information
                </h2>
                <p className="text-xs text-gray-500 mt-1 font-light">
                    So our team can get back to you quickly
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Full Name" {...register("name")} error={errors.name?.message} />
                <InputField label="Company Name" {...register("company")} error={errors.company?.message} />

                <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-gray-700">
                        Job Title
                    </label>
                    <select
                        {...register("title")}
                        className={`w-full px-4 py-3 rounded-sm border appearance-none text-[13px] focus:outline-none transition-colors ${errors.title ? "border-[#D62828] bg-red-50 text-red-900" : "border-gray-200 bg-[#F8F9FA] text-[#0A0F1A] focus:border-[#162E93]"}`}
                    >
                        <option value="">Select your role</option>
                        {jobTitles.map((job) => (
                            <option key={job} value={job}>
                                {job}
                            </option>
                        ))}
                    </select>
                    {errors.title && <p className="text-[11px] font-bold text-[#D62828]">{errors.title.message as string}</p>}
                </div>

                <InputField label="Phone Number" {...register("phone")} error={errors.phone?.message} />
                <InputField label="Email Address" {...register("email")} error={errors.email?.message} />
                <InputField label="Location" {...register("address")} error={errors.address?.message} />

                <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-gray-700">
                        Preferred Contact Method
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {["Email", "Phone", "Either"].map((method) => (
                            <label
                                key={method}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-gray-200 bg-[#F8F9FA] text-[13px] font-medium text-gray-700 hover:border-[#162E93] transition-colors cursor-pointer has-checked:bg-[#162E93] has-checked:text-white has-checked:border-[#162E93]"
                            >
                                <input
                                    type="radio"
                                    value={method}
                                    {...register("contactMethod")}
                                    className="accent-[#162E93]"
                                />
                                {method}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   COMPANY SECTION
──────────────────────────────────────────── */
export function CompanySection({ register, errors }: SectionProps) {
    return (
        <section className="space-y-6 pt-6 border-t">

            <div className="border-l-4 border-[#162E93] pl-4 mb-8">
                <h2 className="text-lg font-bold text-[#1A3263]">
                    Company Information
                </h2>
                <p className="text-xs text-gray-500 mt-1 font-light">
                    Helps us recommend the most suitable solution
                </p>
            </div>

            <div className="space-y-6">

                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-4 text-[13px] font-medium text-gray-700">
                        {companyTypes.map((type) => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-[#162E93] transition-colors">
                                <input type="radio" value={type} {...register("companyType")} className="text-[#162E93] focus:ring-[#162E93]" />
                                {type}
                            </label>
                        ))}
                    </div>
                    {errors.companyType && <p className="text-[11px] font-bold text-[#D62828]">{errors.companyType.message as string}</p>}
                </div>

                <InputField
                    label="Current System / Platform"
                    {...register("bmsSystem")}
                    error={errors.bmsSystem?.message as string}
                />

                <textarea
                    {...register("otherBms")}
                    placeholder="Tell us anything else relevant to your project..."
                    className="w-full px-4 py-3 rounded-sm border border-gray-200 bg-[#F8F9FA] text-[13px] text-[#0A0F1A] focus:outline-none focus:border-[#162E93] transition-colors min-h-[120px]"
                />
            </div>
        </section>
    );
}