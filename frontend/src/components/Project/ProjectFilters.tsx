import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { LayoutGrid, Maximize2 } from "lucide-react";
import { categories as defaultCategories } from "./types";

interface ProjectFiltersProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    viewMode: "grid" | "full";
    setViewMode: (mode: "grid" | "full") => void;
    categories?: string[];
}

export function ProjectFilters({
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    categories = defaultCategories,
}: ProjectFiltersProps) {
    return (
        <section className="pb-10 md:pb-14">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">

                    {/* CATEGORY FILTERS */}
                    <div className="flex flex-wrap justify-center gap-1">
                        {categories.map((cat) => {
                            const active = activeTab === cat;

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`
                                        relative px-3 md:px-5 py-1.5 md:py-2 text-[12px] md:text-[14px] font-medium transition-all duration-300
                                        ${active
                                            ? "text-[#D62828]"
                                            : "text-gray-400 hover:text-white"
                                        }
                                    `}
                                >
                                    {cat}

                                    {/* indicator dot */}
                                    {active && (
                                        <motion.div
                                            layoutId="projTabDot"
                                            className="absolute left-1/2 -bottom-1 w-1 h-1 bg-[#D62828] rounded-full -translate-x-1/2"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center bg-white/5 border border-white/10 p-1 rounded-sm">

                        <button
                            onClick={() => setViewMode("grid")}
                            className={`
                                flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-sm text-xs md:text-sm font-medium transition-all
                                ${viewMode === "grid"
                                    ? "bg-[#D62828] text-white shadow-lg shadow-[#D62828]/20"
                                    : "text-gray-500 hover:text-white"
                                }
                            `}
                        >
                            <LayoutGrid size={14} />
                            Grid
                        </button>

                        <button
                            onClick={() => setViewMode("full")}
                            className={`
                                flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-sm text-xs md:text-sm font-medium transition-all
                                ${viewMode === "full"
                                    ? "bg-[#D62828] text-white shadow-lg shadow-[#D62828]/20"
                                    : "text-gray-500 hover:text-white"
                                }
                            `}
                        >
                            <Maximize2 size={14} />
                            Full
                        </button>

                    </div>

                </div>
            </Container>
        </section>
    );
}