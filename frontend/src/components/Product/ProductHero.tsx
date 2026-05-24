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

export function ProductHero({
    title = "Our Products",
    subtitle = "Elevate your facility with our comprehensive range of safety, security, and building management technologies.",
    breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
    ],
}: ProductHeroProps) {
    return (
        <section className="bg-[#F8F9FA] pt-28 md:pt-32 pb-8 border-b border-gray-200">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="max-w-xl pl-3"
                >
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 mb-3 flex-wrap">
                        {breadcrumbs.map((item, index) => (
                            <div
                                key={item.name}
                                className="flex items-center gap-1.5"
                            >
                                <Link
                                    to={item.href}
                                    className={cn(
                                        "text-[11px] font-medium transition-colors",
                                        index === breadcrumbs.length - 1
                                            ? "text-gray-900 pointer-events-none"
                                            : "text-gray-500 hover:text-[#C3110C]"
                                    )}
                                >
                                    {item.name}
                                </Link>

                                {index < breadcrumbs.length - 1 && (
                                    <span className="text-gray-300 text-[11px]">
                                        /
                                    </span>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1A3263] leading-tight mb-2">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </Container>
        </section>
    );
}