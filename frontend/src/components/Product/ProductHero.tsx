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
        <section className="w-full bg-white pt-24 md:pt-28 pb-4">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative w-full overflow-hidden bg-white min-h-[280px] md:min-h-[340px] rounded-lg shadow-sm">
                    {/* Background Static Image */}
                    <img
                        src={heroImg2}
                        alt="Engineering Hero Banner"
                        className="absolute inset-0 w-full h-full object-cover object-left md:object-[30%_center] brightness-95 contrast-105"
                    />

                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/35 via-30% to-transparent z-[1]" />

                    {/* Hero Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-10 max-w-2xl p-6 md:p-10 pl-8 md:pl-14 flex flex-col justify-center"
                    >
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 mb-4 flex-wrap">
                            {breadcrumbs.map((item, index) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <Link
                                        to={item.href}
                                        className={cn(
                                            "text-xs transition-colors drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]",
                                            index === breadcrumbs.length - 1
                                                ? "text-[#C3110C] font-bold pointer-events-none"
                                                : "text-gray-800 hover:text-[#C3110C] font-semibold"
                                        )}
                                    >
                                        {item.name}
                                    </Link>

                                    {index < breadcrumbs.length - 1 && (
                                        <span className="text-gray-500 text-xs font-bold">/</span>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Main Title */}
                        <h1 className="text-xl md:text-3xl font-extrabold font-display tracking-tight text-gray-950 mb-3 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                            {title}
                        </h1>

                        {/* Subtitle Description */}
                        {subtitle && (
                            <p className="text-xs md:text-sm text-gray-800 leading-relaxed font-semibold max-w-xl drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                                {subtitle}
                            </p>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
