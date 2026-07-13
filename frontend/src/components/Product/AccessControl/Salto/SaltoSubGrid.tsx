import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { SaltoSubProduct } from "./data";
import { ArrowRight } from "lucide-react";

interface SaltoSubGridProps {
    products: SaltoSubProduct[];
}

export function SaltoSubGrid({ products }: SaltoSubGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
            {products.map((product, i) => (
                <Link
                    key={product.id}
                    to="/products/detail/$productId"
                    params={{ productId: product.id }}
                    search={{ from: window.location.pathname }}
                    className="group block"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                    >
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-[#F6F6F6] flex items-center justify-center p-8 md:p-10 mb-3 group-hover:bg-[#F0F0F0] transition-colors duration-500 rounded-lg">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700"
                            />

                            {/* Hover "View product" Pill */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 ease-out">
                                <div className="bg-[#1A3263] text-white px-5 py-1.5 rounded-full text-[13px] font-medium shadow-[0_8px_20px_rgba(26,50,99,0.2)]">
                                    View product
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col px-1 text-left">
                            <h3 className="text-[13px] md:text-sm font-medium text-gray-900 group-hover:text-[#9B0F06] transition-colors mb-1 leading-tight">
                                {product.title}
                            </h3>
                            <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed line-clamp-2 md:line-clamp-1">
                                {product.description}
                            </p>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
