import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { ArrowLeft } from "lucide-react";

interface HoneywellHeroProps {
    title?: string;
    subtitle?: string;
    backLink?: string;
    backText?: string;
}

export function HoneywellHero({
    title = "Honeywell Systems",
    subtitle = "Industrial-grade security architecture designed for mission-critical infrastructure.",
    backLink = "/products/access-control",
    backText = "Back to Access Control",
}: HoneywellHeroProps) {
    return (
        <section className="relative pt-28 pb-16 ">

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

                    {/* Back Link */}
                    <Link
                        to={backLink}
                        className="group inline-flex items-center gap-2 text-white/50 hover:text-[#9B0F06] transition text-[10px] font-semibold uppercase tracking-[0.25em] mb-10"
                    >
                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                        {backText}
                    </Link>

                    {/* Accent line */}
                    <div className="h-[1px] w-16 bg-[#9B0F06] mb-6" />

                    {/* Title (smaller + cleaner) */}
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                        {title.split(" ")[0]}{" "}
                        <span className="text-[#9B0F06]">
                            {title.split(" ")[1] || "Systems"}
                        </span>
                    </h1>

                    {/* Subtitle (smaller + softer) */}
                    <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed">
                        {subtitle}
                    </p>

                </motion.div>
            </Container>
        </section>
    );
}