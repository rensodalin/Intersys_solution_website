import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";

import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface HoneywellHeroProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    // Legacy props kept to avoid breaking existing routes - will be ignored in favor of breadcrumbs
    backLink?: string;
    backText?: string;
}

export function HoneywellHero({
    title = "Honeywell Systems",
    subtitle = "Industrial-grade security architecture designed for mission-critical infrastructure.",
    breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Access Control", href: "/products/access-control" },
        { name: "Honeywell", href: "/products/access-control/honeywell" },
    ],
}: HoneywellHeroProps) {
    return (
        <section className="relative pt-28 pb-16">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://www.full-protection.com/wp-content/uploads/2018/10/honeywell-electronic-security-products.jpg"
                    className="w-full h-full object-cover opacity-25"
                    alt="Honeywell Infrastructure"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/90 to-navy-deep" />
            </div>

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center"
                >
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 mb-10 text-[10px] font-bold uppercase tracking-[0.25em]">
                        {breadcrumbs.map((item, index) => (
                            <div key={item.name} className="flex items-center gap-1.5">
                                <Link
                                    to={item.href}
                                    className={cn(
                                        "transition-colors",
                                        index === breadcrumbs.length - 1
                                            ? "text-[#9B0F06]"
                                            : "text-white/40 hover:text-white"
                                    )}
                                >
                                    {item.name}
                                </Link>
                                {index < breadcrumbs.length - 1 && (
                                    <span className="text-white/20">/</span>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Accent line */}
                    <div className="h-[1px] w-16 bg-[#9B0F06] mb-6" />

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                        {title.split(" ")[0]}{" "}
                        <span className="text-[#9B0F06]">
                            {title.split(" ").slice(1).join(" ")}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed">
                        {subtitle}
                    </p>
                </motion.div>
            </Container>
        </section>
    );
}
