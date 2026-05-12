import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { LayoutGrid, Maximize2 } from "lucide-react";
import { categories } from "./types";

interface ProjectFiltersProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    viewMode: "grid" | "full";
    setViewMode: (mode: "grid" | "full") => void;
}

export function ProjectFilters({
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
}: ProjectFiltersProps) {
    return (
        <section className="pb-14">
            <Container>
                <div className="flex flex-col items-center gap-8">

                    {/* CATEGORY FILTERS */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => {
                            const active = activeTab === cat;

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${active
                                            ? "text-[#D62828] bg-[#D62828]/10"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                        }
                  `}
                                >
                                    {cat}

                                    {/* underline animation */}
                                    {active && (
                                        <motion.div
                                            layoutId="projTab"
                                            className="absolute left-3 right-3 -bottom-[2px] h-[2px] bg-[#D62828] rounded-full"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* VIEW TOGGLE */}
                    <div className="flex items-center bg-gray-100 p-1 rounded-xl">

                        <button
                            onClick={() => setViewMode("grid")}
                            className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${viewMode === "grid"
                                    ? "bg-white text-[#D62828] shadow-sm"
                                    : "text-gray-500 hover:text-gray-900"
                                }
              `}
                        >
                            <LayoutGrid size={16} />
                            Grid
                        </button>

                        <button
                            onClick={() => setViewMode("full")}
                            className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${viewMode === "full"
                                    ? "bg-white text-[#D62828] shadow-sm"
                                    : "text-gray-500 hover:text-gray-900"
                                }
              `}
                        >
                            <Maximize2 size={16} />
                            Full
                        </button>

                    </div>

                </div>
            </Container>
        </section>
    );
}