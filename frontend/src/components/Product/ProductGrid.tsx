import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { ProductCategory } from "./types";

interface ProductGridProps {
    categories: ProductCategory[];
}

export function ProductGrid({ categories }: ProductGridProps) {
    return (
        <section className="py-16">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-gray-50 text-[#9B0F06] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#1A3263] group-hover:text-white transition-all duration-300">
                                        <cat.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1A3263] group-hover:text-[#9B0F06] transition-colors leading-tight">
                                        {cat.title}
                                    </h3>
                                </div>

                                <p className="text-gray-500 text-[13px] leading-relaxed mb-8 flex-grow">
                                    {cat.desc}
                                </p>

                                <Link
                                    to={cat.link}
                                    className="inline-flex items-center justify-center w-full py-3 bg-gray-50 text-[#1A3263] font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-[#1A3263] hover:text-white transition-all shadow-sm"
                                >
                                    {cat.buttonText}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
