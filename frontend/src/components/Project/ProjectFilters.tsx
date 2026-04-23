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

export function ProjectFilters({ activeTab, setActiveTab, viewMode, setViewMode }: ProjectFiltersProps) {
    return (
        <section className="pb-12">
            <Container>
                <div className="flex flex-col items-center gap-10">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative py-2 ${activeTab === cat ? "text-[#9B0F06]" : "text-white/30 hover:text-white"
                                    }`}
                            >
                                {cat}
                                {activeTab === cat && (
                                    <motion.div layoutId="projTab" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#9B0F06]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === "grid" ? "bg-[#9B0F06] text-white" : "text-white/40 hover:text-white"
                                }`}
                        >
                            <LayoutGrid size={14} /> Grid View
                        </button>
                        <button
                            onClick={() => setViewMode("full")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === "full" ? "bg-[#9B0F06] text-white" : "text-white/40 hover:text-white"
                                }`}
                        >
                            <Maximize2 size={14} /> Full Size
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
