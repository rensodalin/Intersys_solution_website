import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/products_/access-control")({
    head: () => ({
        meta: [
            { title: "Access Control Systems — Intersys Solutions" },
            {
                name: "description",
                content: "Scalable access control solutions: keycard systems, biometric authentication, and visitor management tools.",
            },
        ],
    }),
    component: AccessControlPage,
});

const brands = [
    {
        name: "Honeywell",
        logo: "https://mma.prnewswire.com/media/430032/Honeywell_Logo.jpg?p=twitter",
        desc: "Intersys imports and deploys Honeywell’s advanced access control systems, designed to meet the needs of small facilities up to large-scale, multi-site enterprises.",
        features: ["Enterprise-level scalability", "Unified security platform", "Advanced encryption standards"]
    },
    {
        name: "SALTO",
        logo: "https://www.conlan.eu/wp-content/uploads/2020/09/SALTO-logo.jpg",
        desc: "SALTO delivers flexible, keyless access control with wireless, cloud-based, or mobile-first options ideal for hotels, offices, co-working spaces, and education facilities.",
        features: ["Keyless & Wireless mobile-first", "Cloud-based management", "Smart building integration"]
    }
];

function AccessControlPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-48  pb-32 overflow-hidden  text-white">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1748027869634-fc2e545cfb0c?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Access Control"
                        className="w-full h-full object-cover opacity-120"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A3263] via-[#1A3263]/70 to-transparent" />
                </div>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[2px] w-8 bg-[#9B0F06]" />
                            <span className="text-[#9B0F06] font-bold uppercase tracking-widest text-[10px]">Security Solutions</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            Access <span className="text-[#9B0F06]">Control</span>
                        </h1>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed">
                            Secure and manage who enters your facilities with our scalable access control solutions.
                            We offer keycard systems, biometric authentication, and visitor management tools to protect your assets and people.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Brand Partners Section */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1A3263] mb-3">Working With the Best Brands</h2>
                        <p className="text-gray-500 text-sm">We partner with global technology leaders to deliver reliable and future-proof security infrastructure.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {brands.map((brand, i) => (
                            <motion.div
                                key={brand.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-500"
                            >
                                <div className="h-10 mb-6 flex items-center">
                                    <img src={brand.logo} alt={brand.name} className="h-full object-contain" />
                                </div>

                                <h3 className="text-lg font-bold text-[#1A3263] mb-3">{brand.name} Integration</h3>
                                <p className="text-gray-500 text-[13px] leading-relaxed mb-6 flex-grow">
                                    {brand.desc}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                    {brand.features.map(feat => (
                                        <div key={feat} className="flex items-center gap-2 text-[12px] text-[#1A3263] font-medium">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#9B0F06]" />
                                            {feat}
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to={brand.name === "Honeywell" ? "/products/access-control/honeywell" : "/contact"}
                                    className="inline-flex items-center justify-center py-3 px-6 bg-[#1A3263] text-white font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-[#9B0F06] transition-all self-start"
                                >
                                    View More <ArrowRight className="ml-2 w-3 h-3" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
