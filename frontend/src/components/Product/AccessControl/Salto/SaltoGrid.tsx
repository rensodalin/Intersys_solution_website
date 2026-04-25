import { motion } from "framer-motion";
import { SaltoProduct } from "./data";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface SaltoGridProps {
    products: SaltoProduct[];
}

export function SaltoGrid({ products }: SaltoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                >
                    <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-[#1A3263]/0 group-hover:bg-[#1A3263]/5 transition-colors duration-500" />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">

                        <h3 className="text-xl font-bold text-[#1A3263] mb-3 group-hover:text-[#9B0F06] transition-colors">{product.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                            {product.description}
                        </p>

                        <Link
                            to={`/products/access-control/salto/${product.id}`}
                            className="inline-flex items-center text-[#1A3263] font-bold text-xs uppercase tracking-widest group/btn hover:text-[#9B0F06] transition-colors"
                        >
                            View More <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
