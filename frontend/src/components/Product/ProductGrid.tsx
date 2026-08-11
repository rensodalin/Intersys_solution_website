import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { ProductCategory } from "./types";

interface ProductGridProps {
    categories: ProductCategory[];
}

export function ProductGrid({ categories }: ProductGridProps) {
    return (
        <section className="py-8">
            <Container>
                {categories.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 text-sm">No categories available.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 pb-20">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <Link
                                    to={cat.link || "#"}
                                    className="group flex flex-col h-full bg-white border border-gray-200/90 rounded-md overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-300"
                                >
                                    <div className="px-4 pt-4">
                                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-50/80 rounded flex items-center justify-center p-2">
                                            {cat.image ? (
                                                <img
                                                    src={cat.image}
                                                    alt={cat.title}
                                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="text-gray-300 text-xs">No image</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-sm md:text-base font-bold text-[#1A3263] leading-snug mb-1.5 group-hover:text-[#C3110C] transition-colors">
                                            {cat.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed flex-grow line-clamp-2">
                                            {cat.desc}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
