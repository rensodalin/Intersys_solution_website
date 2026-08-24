import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

import heroImg from "@/assets/imageproduct.png";

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface ProductHeroProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    categoryTag?: string;
}

export function ProductHero({
    title = "All Products",
    subtitle = "Discover our curated selection of high-quality essentials.",
    breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
    ],
}: ProductHeroProps) {
    return (
        <div className="w-full mt-0 mb-3 md:mb-6">
            {/* Mobile Standalone Breadcrumbs - Visible ONLY on Phone (< md) */}
            <nav className="flex md:hidden items-center gap-1.5 py-2 px-1 flex-wrap border-b border-gray-200/60 mb-2">
                {breadcrumbs.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                        <Link
                            to={item.href}
                            className={cn(
                                "text-xs font-semibold transition-colors leading-none",
                                index === breadcrumbs.length - 1
                                    ? "text-[#C3110C] font-bold pointer-events-none"
                                    : "text-gray-600 hover:text-[#C3110C]"
                            )}
                        >
                            {item.name}
                        </Link>

                        {index < breadcrumbs.length - 1 && (
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        )}
                    </div>
                ))}
            </nav>

            {/* Product Hero Banner */}
            <div className="flex relative w-full overflow-hidden bg-white rounded-md shadow-sm border border-gray-200/80 min-h-[160px] sm:min-h-[200px] md:min-h-[240px] items-center">
                {/* Background Image - imageproduct.png from assets */}
                <img
                    src={heroImg}
                    alt="Engineering Hero Banner"
                    className="absolute inset-0 w-full h-full object-cover object-right sm:object-center brightness-100 contrast-105"
                />

                {/* Soft Gradient Overlay - Clean White Scale Area on Left */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white via-60% sm:via-white/90 sm:via-78% to-transparent z-[1]" />

                {/* Left Subtle Red Line Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C3110C] z-10" />

                {/* Hero Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-2xl px-5 sm:px-8 md:px-12 py-5 sm:py-7 md:py-9 flex flex-col justify-center"
                >
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3 flex-wrap">
                        {breadcrumbs.map((item, index) => (
                            <div key={item.name} className="flex items-center gap-1 sm:gap-1.5">
                                <Link
                                    to={item.href}
                                    className={cn(
                                        "text-[11px] sm:text-xs font-semibold transition-colors leading-none",
                                        index === breadcrumbs.length - 1
                                            ? "text-[#C3110C] font-bold pointer-events-none"
                                            : "text-gray-600 hover:text-[#C3110C]"
                                    )}
                                >
                                    {item.name}
                                </Link>

                                {index < breadcrumbs.length - 1 && (
                                    <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Main Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-1 sm:mb-2 leading-snug">
                        {title}
                    </h1>

                    {/* Subtitle Description */}
                    {subtitle && (
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium max-w-lg">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    );
}



