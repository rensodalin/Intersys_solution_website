import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface ProductHeroProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
}

/**
 * Universal ProductHeader for a clean, minimalist category UI.
 * Replaces the previous dark navy 'ProductHero'.
 */
export function ProductHero({
    title = "Our Products",
    subtitle = "Elevate your facility with our comprehensive range of safety, security, and building management technologies.",
    breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
    ],
}: ProductHeroProps) {
    return (
        <section className="bg-[#F8F9FA] pt-32 pb-16 border-b border-gray-200/50">
            <Container>
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Page Title */}
                        <h1 className="text-2xl md:text-3xl font-black text-[#1A3263] mb-4 tracking-tight">
                            {title}
                        </h1>

                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 mb-8 flex-wrap">
                            {breadcrumbs.map((item, index) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <Link
                                        to={item.href}
                                        className={cn(
                                            "text-[13px] font-medium transition-colors",
                                            index === breadcrumbs.length - 1
                                                ? "text-gray-900 cursor-default"
                                                : "text-gray-400 hover:text-[#C3110C]"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                    {index < breadcrumbs.length - 1 && (
                                        <span className="text-gray-300 text-xs">/</span>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Description */}
                        {subtitle && (
                            <p className="text-gray-500 text-base md:text-md max-w-2xl leading-relaxed font-normal">
                                {subtitle}
                            </p>
                        )}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
