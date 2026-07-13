import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

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

export function ProductCardGrid({ products }: ProductCardGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
            {products.map((product, i) => (
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
                        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-[#F6F6F6] flex items-center justify-center p-5 md:p-6 mb-3 group-hover:bg-[#F0F0F0] transition-colors duration-500 rounded-lg">
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
                                <div className="bg-[#1A3263] text-white px-5 py-1.5 rounded-full text-[13px] font-medium shadow-[0_8px_20px_rgba(26,50,99,0.2)]">
                                    View product
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col px-1">
                            <h3 className="text-[13px] md:text-sm font-medium text-gray-900 group-hover:text-gray-500 transition-colors mb-1">
                                {product.title}
                            </h3>
                            <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed line-clamp-2 md:line-clamp-1">
                                {product.description}
                            </p>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
