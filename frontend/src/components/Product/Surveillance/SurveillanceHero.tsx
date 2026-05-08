import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { cn } from "@/lib/utils";

export function SurveillanceHero({
    title = "Surveillance Systems (CCTV)",
    subtitle = "High-definition IP and analog surveillance systems for real-time monitoring and video recording. Our CCTV solutions are ideal for commercial, residential, and public infrastructure security.",
    breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Surveillance (CCTV)", href: "/products/surveillance" },
    ],
}) {
    return (
        <section className="relative w-full overflow-hidden bg-white">

            {/* IMAGE FIRST */}
            <div className="w-full relative h-[220px] md:h-[320px] overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    src="https://static.wixstatic.com/media/nsplsh_1a3d0cb1b61e44e2bdf9501883640ac3~mv2.jpg/v1/fill/w_1901,h_276,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_1a3d0cb1b61e44e2bdf9501883640ac3~mv2.jpg"
                    alt="Surveillance Systems Banner"
                    className="w-full h-full object-cover object-[0%_45%]"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-white/20" />
            </div>

            {/* TEXT BELOW IMAGE */}
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
                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed max-w-2xl">
                                {subtitle}
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </div>
        </section>
    );
}