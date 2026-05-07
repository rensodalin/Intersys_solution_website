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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
                                className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-[#1A3263]/20 transition-all duration-500 hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A3263]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow relative bg-white">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-[#F8F9FA] text-[#FC3B1F] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1A3263] group-hover:text-white transition-all duration-500 shadow-sm">
                                            <cat.icon className="w-5 h-5" />
                                        </div>

                                        <h3 className="text-[17px] font-bold text-[#1A3263] group-hover:text-[#FC3B1F] transition-colors leading-tight">
                                            {cat.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-500 text-[14px] leading-relaxed flex-grow">
                                        {cat.desc}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}