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
    ({ label, icon: Icon, error, ...props }: any, ref) => (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600 ml-1">
                {label}
            </label>

            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                )}

                <input
                    ref={ref}
                    {...props}
                    className={`w-full ${Icon ? "pl-11" : "px-4"} p-3.5 rounded-lg border ${error ? "border-red-400 ring-2 ring-red-100" : "border-gray-200"
                        } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition`}
                />
            </div>

            {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
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
}

export function InterestedSection({ register, control }: SectionProps) {
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
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                    <Package size={20} />
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Your requirements
                    </h2>
                    <p className="text-sm text-gray-500">
                        Select product categories, sections, or specific items you need
                    </p>
                </div>
            </div>

            {/* CATEGORIES */}
            <div className="grid md:grid-cols-2 gap-8">

                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-400 tracking-wider">
                        Product categories
                    </h3>

                    {categories.map((text) => (
                        <label
                            key={text}
                            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-red-100 hover:bg-red-50/20 transition cursor-pointer"
                        >
                            <span className="text-gray-700 text-xs font-medium">
                                {text}
                            </span>
                            <input
                                type="checkbox"
                                value={text}
                                {...register("solutionCategories")}
                                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                            />
                        </label>
                    ))}
                </div>

                {/* SECTIONS */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-400 tracking-wider">
                        Product sections
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        {productSections.map((section) => (
                            <label
                                key={section}
                                className="flex items-center gap-2 text-xs text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    value={section}
                                    {...register("sections")}
                                    className="w-3.5 h-3.5 text-red-600 rounded border-gray-300 focus:ring-red-500"
                                />
                                {section}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* PRODUCTS TABLE */}
            <div className="space-y-4 pt-6">

                <div>
                    <h3 className="text-md font-semibold text-gray-700">
                        Product request details
                    </h3>
                    <p className="text-sm text-gray-400">
                        Add items you would like pricing or quotation for
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                        <thead className="text-xs text-gray-400">
                            <tr>
                                <th className="p-3 text-left">Qty</th>
                                <th className="p-3 text-left">Product</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-left">Application</th>
                                <th />
                            </tr>
                        </thead>

                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="border-t">

                                    <td className="p-2">
                                        <input
                                            {...register(`products.${index}.qty`)}
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            {...register(`products.${index}.productNo`)}
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            {...register(`products.${index}.description`)}
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            {...register(`products.${index}.application`)}
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </td>

                                    <td className="p-2">
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-gray-400 hover:text-red-500"
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

            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Contact Information
                </h2>
                <p className="text-sm text-gray-500">
                    So our team can get back to you quickly
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Full Name" {...register("name")} icon={User} error={errors.name?.message} />
                <InputField label="Company Name" {...register("company")} icon={Building2} error={errors.company?.message} />

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-600 ml-1">
                        Job Title
                    </label>

                    <div className="relative">
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                        <select
                            {...register("title")}
                            className="w-full pl-11 p-3.5 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition"
                        >
                            <option value="">Select your role</option>
                            {jobTitles.map((job) => (
                                <option key={job} value={job}>
                                    {job}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <InputField label="Phone Number" {...register("phone")} icon={Smartphone} />
                <InputField label="Email Address" {...register("email")} icon={Mail} />
                <InputField label="Location" {...register("address")} icon={MapPin} />
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   COMPANY SECTION
──────────────────────────────────────────── */
export function CompanySection({ register }: SectionProps) {
    return (
        <section className="space-y-6 pt-6 border-t">

            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Company Information
                </h2>
                <p className="text-sm text-gray-500">
                    Helps us recommend the most suitable solution
                </p>
            </div>

            <div className="space-y-5">

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {companyTypes.map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input type="radio" value={type} {...register("companyType")} />
                            {type}
                        </label>
                    ))}
                </div>

                <InputField
                    label="Current System / Platform"
                    {...register("bmsSystem")}
                    icon={BadgeCheck}
                />

                <textarea
                    {...register("otherBms")}
                    placeholder="Tell us anything else relevant to your project..."
                    className="w-full p-4 border rounded-lg min-h-[100px] text-sm"
                />
            </div>
        </section>
    );
}