import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export interface HoneywellProduct {
    title: string;
    desc: string;
    image: string;
}

interface HoneywellGridProps {
    products: HoneywellProduct[];
}

export function HoneywellGrid({ products }: HoneywellGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => {
                const cardLink = product.title === "Accessories"
                    ? "/products/access-control/honeywell/accessories"
                    : product.title === "Credentials"
                        ? "/products/access-control/honeywell/credentials"
                        : "/contact";

                return (
                    <motion.div
                        key={product.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                        className="group relative"
                    >
                        <Link
                            to={cardLink}
                            className="block bg-white border border-gray-100 p-1.5 rounded-3xl hover:border-[#9B0F06]/20 transition-all duration-500 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-xl group"
                        >
                            <div className="relative aspect-square overflow-hidden rounded-[1.4rem] bg-gray-50 flex items-center justify-center p-6">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain relative z-10 transition-all duration-500"
                                />
                                <div className="absolute top-4 right-4 w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-400">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-3 w-[1.5px] bg-[#9B0F06] scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                                    <h3 className="text-sm font-bold text-[#162E93] group-hover:text-[#9B0F06] transition-colors leading-tight">
                                        {product.title}
                                    </h3>
                                </div>

                                <p className="text-gray-500 text-[11px] leading-relaxed mb-6 h-8 line-clamp-2">
                                    {product.desc}
                                </p>

                                <div className="flex items-center justify-between group/btn w-full py-3 px-4 bg-gray-50 rounded-xl text-[#1A3263] font-bold text-[8px] uppercase tracking-[0.2em] group-hover:bg-[#1A3263] group-hover:text-white transition-all duration-300">
                                    <span>{product.title === "Accessories" || product.title === "Credentials" ? "Explore Range" : "Inquire Product"}</span>
                                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}
