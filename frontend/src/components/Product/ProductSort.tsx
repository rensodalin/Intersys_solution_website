import React from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type SortOption = "popular" | "newest" | "name-asc" | "name-desc";

interface ProductSortProps {
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
    totalProducts: number;
}

export function ProductSort({ currentSort, onSortChange, totalProducts }: ProductSortProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const options = [
        { value: "popular", label: "Popular Products" },
        { value: "newest", label: "Newest Arrivals" },
        { value: "name-asc", label: "Name: A to Z" },
        { value: "name-desc", label: "Name: Z to A" },
    ];

    const currentLabel = options.find(o => o.value === currentSort)?.label || "Sort By";

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="font-semibold text-gray-900">{totalProducts}</span>
                <span>products found</span>
            </div>

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2.5 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-[#1A3263] transition-all duration-300 shadow-sm"
                >
                    <SlidersHorizontal size={14} className="text-gray-400" />
                    <span>Sort by: <span className="text-[#1A3263] font-bold">{currentLabel}</span></span>
                    <ChevronDown 
                        size={14} 
                        className={cn("text-gray-400 transition-transform duration-300", isOpen ? "rotate-180" : "")} 
                    />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setIsOpen(false)} 
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
                            >
                                <div className="py-2">
                                    {options.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                onSortChange(option.value as SortOption);
                                                setIsOpen(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-4 py-2.5 text-[13px] transition-colors",
                                                currentSort === option.value 
                                                    ? "bg-[#1A3263]/5 text-[#1A3263] font-bold" 
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-[#1A3263]"
                                            )}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
