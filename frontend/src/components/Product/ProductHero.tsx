import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

import heroImg2 from "@/assets/engineering_hero2.png";

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
        <div className="w-full mt-2 sm:mt-4 md:mt-6 mb-6">
            <div className="relative w-full overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 min-h-[180px] sm:min-h-[220px] md:min-h-[260px] flex items-center">
                {/* Background Static Image */}
                <img
                    src={heroImg2}
                    alt="Engineering Hero Banner"
                    className="absolute inset-0 w-full h-full object-cover object-[20%_center] md:object-[30%_center] brightness-95 contrast-105"
                />

                {/* Gradient Overlay for Readability (Stronger on Mobile) */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 sm:via-white/55 via-40% to-transparent z-[1]" />

                {/* Hero Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 w-full max-w-2xl px-5 py-6 sm:p-8 md:p-10 md:pl-12 flex flex-col justify-center"
                >
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
                        {breadcrumbs.map((item, index) => (
                            <div key={item.name} className="flex items-center gap-1.5 sm:gap-2">
                                <Link
                                    to={item.href}
                                    className={cn(
                                        "text-[11px] sm:text-xs transition-colors drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]",
                                        index === breadcrumbs.length - 1
                                            ? "text-[#C3110C] font-bold pointer-events-none"
                                            : "text-gray-700 hover:text-[#C3110C] font-semibold"
                                    )}
                                >
                                    {item.name}
                                </Link>

                                {index < breadcrumbs.length - 1 && (
                                    <span className="text-gray-400 text-[10px] sm:text-xs font-bold">/</span>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Main Title */}
                    <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold font-display tracking-tight text-gray-900 mb-1.5 sm:mb-2.5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] leading-snug">
                        {title}
                    </h1>

                    {/* Subtitle Description */}
                    {subtitle && (
                        <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 leading-relaxed font-semibold max-w-xl drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    );
}


