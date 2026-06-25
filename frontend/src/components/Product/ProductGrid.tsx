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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-30">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    to={cat.link || "#"}
                                    className="group flex flex-col h-full bg-white border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300"
                                >
                                    <div className="px-5 pt-5">
                                        <div className="relative aspect-[16/9] overflow-hidden bg-gray-50 flex items-center justify-center">
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

                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-base font-bold text-[#1A3263] leading-tight mb-2">
                                            {cat.title}
                                        </h3>
                                        <p className="text-gray-500 text-[13px] leading-relaxed flex-grow">
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
