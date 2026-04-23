import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { Project } from "./types";

interface ProjectGridProps {
    projects: Project[];
    viewMode: "grid" | "full";
}

export function ProjectGrid({ projects, viewMode }: ProjectGridProps) {
    return (
        <section className="pb-32 px-4">
            <Container>
                <motion.div
                    layout
                    className={`grid transition-all duration-700 ease-in-out ${viewMode === "grid"
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                            : "grid-cols-1 gap-12 max-w-4xl mx-auto"
                        }`}
                >
                    <AnimatePresence mode="popLayout">
                        {projects.map((p, i) => (
                            <motion.div
                                key={`${p.title}-${viewMode}`}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, delay: viewMode === "grid" ? i * 0.05 : 0 }}
                                className={`group relative overflow-hidden rounded-2xl bg-white/5 cursor-default ${viewMode === "grid" ? "aspect-square" : "aspect-video"
                                    }`}
                            >
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />

                                {/* Subtle Gradient Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-gradient-to-t from-black via-black/40 to-transparent">
                                    <div className="mb-2">
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#9B0F06]">
                                            {p.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#9B0F06] transition-colors leading-tight">
                                        {p.title}
                                    </h3>

                                    {viewMode === "full" && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.6 }}
                                            className="mt-4 text-sm max-w-md"
                                        >
                                            {p.desc}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Hover Overlay (Only in Grid Mode) */}
                                {viewMode === "grid" && (
                                    <div className="absolute inset-0 bg-[#050505]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center">
                                        <p className="text-[12px] font-medium leading-relaxed text-white/90">
                                            {p.desc}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </Container>
        </section>
    );
}
