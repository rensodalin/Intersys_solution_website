import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { ArrowUpRight } from "lucide-react";
import { Project } from "./types";

interface ProjectGridProps {
    projects: Project[];
    viewMode: "grid" | "full";
}

export function ProjectGrid({ projects, viewMode }: ProjectGridProps) {
    return (
        <section className="pb-32">
            <Container>

                {/* ───────────────── GRID MODE ───────────────── */}
                {viewMode === "grid" && (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {projects.map((p, i) => {
                                const CardContent = (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{
                                            duration: 0.45,
                                            delay: i * 0.06,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        className="group relative overflow-hidden rounded-none aspect-[4/5] cursor-default"
                                    >
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
                                        />

                                        {/* gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />



                                        {/* content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5">
                                            <span className="inline-block text-[10px] font-bold text-white mb-2 bg-[#D62828] px-2 py-0.5 rounded-[2px] shadow-sm">
                                                {p.category}
                                            </span>

                                            <h3 className="text-white text-sm font-semibold leading-snug">
                                                {p.title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                );

                                return <div key={p._id || `${p.title}-grid`} className="block">{CardContent}</div>;
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* ───────────────── FULL MODE ───────────────── */}
                {viewMode === "full" && (
                    <div className="space-y-28">

                        {projects.map((p, i) => {
                            const isReversed = i % 2 !== 0;

                            const FullContent = (
                                <motion.div
                                    initial={{ opacity: 0, y: 48 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{
                                        duration: 0.65,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                    className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center group cursor-default"
                                >

                                    {/* IMAGE */}
                                    <div className={isReversed ? "md:order-2" : ""}>
                                        <div className="relative overflow-hidden rounded-none">
                                            <span className="absolute top-5 left-5 z-10 text-xs font-bold text-white/60 tabular-nums">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>

                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                className="w-full h-[460px] object-cover transition-transform duration-700 ease-out"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div
                                        className={`flex flex-col ${isReversed ? "md:order-1 md:text-right" : ""
                                            }`}
                                    >
                                        {/* category */}
                                        <span
                                            className={`inline-flex items-center gap-2 text-[12px] font-bold text-[#D62828] mb-4 ${isReversed ? "md:self-end" : ""
                                                }`}
                                        >
                                            <span className="w-8 h-[1px] bg-[#D62828]" />
                                            {p.category}
                                        </span>

                                        {/* title */}
                                        <h2 className="text-2xl md:text-4xl leading-tight font-bold text-white mb-5">
                                            {p.title}
                                        </h2>

                                        {/* accent line */}
                                        <div
                                            className={`w-10 h-0.5 bg-[#D62828] mb-5 ${isReversed ? "md:self-end" : ""
                                                }`}
                                        />

                                        {/* client & location */}
                                        <div className={`flex flex-col gap-1 mb-6 text-[13px] ${isReversed ? "md:items-end" : ""}`}>
                                            {p.client && (
                                                <p className="text-white/80">
                                                    <span className="text-gray-500 font-medium">Client:</span> {p.client}
                                                </p>
                                            )}
                                            {p.location && (
                                                <p className="text-white/80">
                                                    <span className="text-gray-500 font-medium">Location:</span> {p.location}
                                                </p>
                                            )}
                                        </div>

                                        {/* DESCRIPTION */}
                                        <p className="text-gray-400 leading-relaxed text-[15px] max-w-md mb-8">
                                            {p.desc}
                                        </p>

                                        {/* SCOPE / HIGHLIGHTS */}
                                        {p.scope && p.scope.length > 0 && (
                                            <div className={`flex flex-col gap-2 ${isReversed ? "md:items-end" : ""}`}>
                                                <p className="text-[12px] font-medium text-gray-500 mb-2">Technical scope</p>
                                                <div className={`flex flex-wrap gap-2 ${isReversed ? "md:justify-end" : ""}`}>
                                                    {p.scope.map((item) => (
                                                        <span key={item} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[12px] text-gray-400">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </motion.div>
                            );

                            return <div key={p._id || `${p.title}-full`} className="block">{FullContent}</div>;
                        })}

                    </div>
                )}

            </Container>
        </section>
    );
}