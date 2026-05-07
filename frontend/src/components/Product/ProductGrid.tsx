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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative h-32 overflow-hidden">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-7 h-7 bg-gray-50 text-[#9B0F06] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#1A3263] group-hover:text-white transition-all duration-300">
                                        <cat.icon className="w-3.5 h-3.5" />
                                    </div>

                                    <h3 className="text-base font-bold text-[#1A3263] group-hover:text-[#9B0F06] transition-colors leading-tight">
                                        {cat.title}
                                    </h3>
                                </div>

                                <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-grow">
                                    {cat.desc}
                                </p>


                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}