import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface BuildingManagementHeroProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export function BuildingManagementHero({
    title = "Building Management Systems",
    subtitle = "Integrated automation solutions to optimize operational efficiency, energy consumption, and occupant comfort in modern facilities.",
    breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Building Management", href: "/products/building-management" },
    ],
}: BuildingManagementHeroProps) {
    return (
        <section className="relative w-full overflow-hidden bg-white pt-20">
            {/* Banner Image */}
            <div className="w-full relative h-[180px] md:h-[220px] overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    src="https://static.wixstatic.com/media/3d5958_00ba4f93ed8e4bd3a242f3fe922b73f3~mv2.png/v1/fill/w_1901,h_300,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/3d5958_00ba4f93ed8e44bd3a242f3fe922b73f3~mv2.png"
                    alt="Building Management Systems Banner"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-white/20" />
            </div>

            {/* Breadcrumbs & Text Section (Under Image) */}
            <div className="bg-[#F8F9FA] py-10 px-8 border-b border-gray-200/50">
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
                                    <div key={item.name} className="flex items-center gap-2">
                                        <Link
                                            to={item.href}
                                            className={cn(
                                                "text-[11px] transition-colors",
                                                index === breadcrumbs.length - 1
                                                    ? "text-gray-700 pointer-events-none"
                                                    : "text-gray-400 hover:text-[#C3110C]"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                        {index < breadcrumbs.length - 1 && (
                                            <span className="text-gray-300 text-[10px]">/</span>
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
            </div>
        </section>
    );
}
