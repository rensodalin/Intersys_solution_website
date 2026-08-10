import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import imageproduct from "@/assets/imageproduct.png";

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
    categoryTag = "STORE CATALOG",
}: ProductHeroProps) {
    return (
        <section className="w-full bg-white pt-24 md:pt-28 pb-6">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative w-full overflow-hidden rounded-sm border border-gray-200 shadow-sm bg-white min-h-[220px] md:min-h-[280px]">
                    {/* Background image fills the hero */}
                    <img
                        src={imageproduct}
                        alt="Catalog Banner"
                        className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-[1]" />

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-10 max-w-2xl p-8 md:p-12 flex flex-col justify-center"
                    >
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 mb-4 flex-wrap">
                            {breadcrumbs.map((item, index) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <Link
                                        to={item.href}
                                        className={cn(
                                            "text-xs transition-colors",
                                            index === breadcrumbs.length - 1
                                                ? "text-gray-800 font-semibold pointer-events-none"
                                                : "text-gray-500 hover:text-[#C3110C]"
                                        )}
                                    >
                                        {item.name}
                                    </Link>

                                    {index < breadcrumbs.length - 1 && (
                                        <span className="text-gray-400 text-xs">/</span>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Main Title */}
                        <h1 className="text-2xl md:text-4xl font-bold font-display tracking-tight text-gray-900 mb-3">
                            {title}
                        </h1>

                        {/* Subtitle Description */}
                        {subtitle && (
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-normal max-w-xl">
                                {subtitle}
                            </p>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

