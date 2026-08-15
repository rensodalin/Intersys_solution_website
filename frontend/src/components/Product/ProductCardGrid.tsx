import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ProductShowMore } from "./ProductShowMore";

export interface ProductCardItem {
    id: string;
    title: string;
    image: string;
    description: string;
}

interface ProductCardGridProps {
    products: ProductCardItem[];
    linkPrefix?: string;
}

const PAGE_SIZE = 20;

export function ProductCardGrid({ products }: ProductCardGridProps) {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const visibleProducts = products.slice(0, visibleCount);

    return (
        <>
            <div className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3 gap-x-4 md:gap-x-7 gap-y-6 md:gap-y-10">
                {visibleProducts.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
                    >
                        <Link
                            to={`/products/detail/${product.id}`}
                            search={{ from: window.location.pathname }}
                            className="block group"
                        >
                            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-[#F6F6F6] flex items-center justify-center p-3 md:p-7 mb-3 group-hover:bg-[#F0F0F0] transition-colors duration-500 rounded-lg">
                                {product.image ? (
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-16 h-16 text-gray-300" />
                                )}

                                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 ease-out pointer-events-none">
                                    <div className="bg-[#1A3263] text-white px-6 py-2 rounded-full text-sm font-medium shadow-[0_8px_20px_rgba(26,50,99,0.2)]">
                                        View product
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col px-1">
                                <h3 className="text-xs md:text-base font-medium text-gray-900 group-hover:text-gray-500 transition-colors mb-1 truncate">
                                    {product.title}
                                </h3>
                                <p className="text-gray-500 text-xs md:text-[15px] leading-relaxed line-clamp-2">
                                    {product.description}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
            <ProductShowMore
                total={products.length}
                visible={visibleCount}
                onShowMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
            />
        </>
    );
}
