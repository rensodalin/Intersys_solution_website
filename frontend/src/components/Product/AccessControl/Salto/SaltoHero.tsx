import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface SaltoHeroProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
}

/**
 * Clean UI Header for Salto product pages.
 */
export function SaltoHero({
    title = "Salto Systems",
    subtitle = "Revolutionary keyless locking solutions. Experience the future of electronic access control.",
    breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Access Control", href: "/products/access-control" },
        { name: "Salto", href: "/products/access-control/salto" },
    ],
}: SaltoHeroProps) {
    return (
        <section className="bg-[#F8F9FA] pt-28 md:pt-32 pb-10 px-8 border-b border-gray-200/50">
            <Container>
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 mb-4 flex-wrap">
                            {breadcrumbs.map((item, index) => (
                                <div
                                    key={item.name}
                                    className="flex items-center gap-2"
                                >
                                    <Link
                                        to={item.href}
                                        className={cn(
                                            "text-[11px] transition-colors",
                                            index === breadcrumbs.length - 1
                                                ? "text-gray-700"
                                                : "text-gray-400 hover:text-[#C3110C]"
                                        )}
                                    >
                                        {item.name}
                                    </Link>

                                    {index < breadcrumbs.length - 1 && (
                                        <span className="text-gray-300 text-[10px]">
                                            /
                                        </span>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Title */}
                        <h1 className="text-xl md:text-2xl font-bold text-[#1A3263] tracking-tight mb-3">
                            {title}
                        </h1>

                        {/* Subtitle */}
                        {subtitle && (
                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed max-w-2xl">
                                {subtitle}
                            </p>
                        )}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}