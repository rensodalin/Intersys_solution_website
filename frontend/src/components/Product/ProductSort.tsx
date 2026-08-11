import React from "react";
import { ChevronDown, Filter, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type SortOption = "popular" | "newest" | "name-asc" | "name-desc";

interface ProductSortProps {
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
    isFilterOpen?: boolean;
    onToggleFilter?: () => void;
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
    totalProducts: number;
}

export function ProductSort({
    searchQuery = "",
    onSearchChange,
    isFilterOpen = true,
    onToggleFilter,
    currentSort,
    onSortChange,
    totalProducts,
}: ProductSortProps) {
    const [isSortOpen, setIsSortOpen] = React.useState(false);

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: "newest", label: "Newest" },
        { value: "popular", label: "Most Popular" },
        { value: "name-asc", label: "Name (A → Z)" },
        { value: "name-desc", label: "Name (Z → A)" },
    ];

    const currentLabel = sortOptions.find(o => o.value === currentSort)?.label || "Newest";

    return (
        <div className="bg-white border border-gray-200 rounded-sm p-3 md:p-4 mb-6 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sticky top-20 z-30">
            {/* Search Input Box */}
            <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder="Search product name..."
                    className="w-full bg-[#F5F5F5] border border-transparent focus:border-gray-300 focus:bg-white rounded-sm pl-10 pr-8 py-2 text-sm text-gray-800 placeholder-gray-400 transition-all outline-none"
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange?.("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Controls Right Side (Hide Filters + Sort dropdowns) */}
            <div className="flex items-center gap-2.5 flex-wrap justify-between md:justify-end">
                {/* Hide / Show Filters Button */}
                {onToggleFilter && (
                    <button
                        onClick={onToggleFilter}
                        className={cn(
                            "flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer",
                            isFilterOpen
                                ? "bg-[#C3110C] border-[#C3110C] text-white hover:bg-[#1A3263] hover:border-[#1A3263]"
                                : "bg-gray-900 border-gray-900 text-white hover:bg-black"
                        )}
                    >
                        <Filter size={14} />
                        <span>{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
                    </button>
                )}

                {/* SORT BY label */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                        SORT BY:
                    </span>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 px-3.5 py-2 bg-[#1A3263] border border-[#1A3263] rounded-lg text-xs font-medium text-white hover:bg-[#162E93] hover:border-[#162E93] transition-all"
                        >
                            <span>{currentLabel}</span>
                            <ChevronDown
                                size={14}
                                className={cn("text-white/80 transition-transform duration-200", isSortOpen ? "rotate-180" : "")}
                            />
                        </button>

                        <AnimatePresence>
                            {isSortOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsSortOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 6 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden py-1"
                                    >
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    onSortChange(option.value);
                                                    setIsSortOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full text-left px-4 py-2 text-xs transition-colors",
                                                    currentSort === option.value
                                                        ? "bg-gray-100 text-gray-900 font-bold"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                )}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

