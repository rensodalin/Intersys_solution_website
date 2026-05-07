import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion"; 
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ProductHero } from "@/components/Product/ProductHero";

export const Route = createFileRoute("/products/access-control/")({
    head: () => ({
        meta: [
            { title: "Access Control Systems — Intersys Solutions" },
            {
                name: "description",
                content:
                    "Scalable access control solutions: keycard systems, biometric authentication, and visitor management tools.",
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
        features: [
            "Enterprise-level scalability",
            "Unified security platform",
            "Advanced encryption standards",
        ],
    },
    {
        name: "SALTO",
        logo: "https://www.conlan.eu/wp-content/uploads/2020/09/SALTO-logo.jpg",
        desc: "SALTO delivers flexible, keyless access control with wireless, cloud-based, or mobile-first options ideal for hotels, offices, co-working spaces, and education facilities.",
        features: [
            "Keyless & Wireless mobile-first",
            "Cloud-based management",
            "Smart building integration",
        ],
    },
];

function AccessControlPage() {
    return (
        <div className="bg-white">
            <ProductHero
                title="Access Control"
                subtitle="Secure and manage who enters your facilities with our scalable access control solutions including keycard systems, biometric authentication, and visitor management."
                breadcrumbs={[
                    { name: "Home", href: "/" },
                    { name: "Products", href: "/products" },
                    { name: "Access Control", href: "/products/access-control" },
                ]}
            />

            {/* BRANDS */}
            <section className="py-20 bg-gray-50">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263] mb-4">
                            Working With the Best Brands
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg">
                            We partner with global technology leaders to deliver reliable and
                            future-proof security infrastructure.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {brands.map((brand, i) => (
                            <motion.div
                                key={brand.name}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    to={
                                        brand.name === "Honeywell"
                                            ? "/products/access-control/honeywell"
                                            : "/products/access-control/salto"
                                    }
                                    className="group relative bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100 flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-[#1A3263]/20 transition-all duration-500 h-full overflow-hidden"
                                >
                                    {/* Hover background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                                    {/* Logo */}
                                    <div className="h-14 mb-8 flex items-center justify-start opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                        <img
                                            src={brand.logo}
                                            alt={brand.name}
                                            className="h-full object-contain mix-blend-multiply"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#1A3263] mb-4 tracking-tight group-hover:text-[#FC3B1F] transition-colors duration-300">
                                        {brand.name} Integration
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-grow pr-4">
                                        {brand.desc}
                                    </p>

                                    {/* Features */}
                                    <div className="grid grid-cols-1 gap-3 mb-10">
                                        {brand.features.map((feat) => (
                                            <div
                                                key={feat}
                                                className="flex items-center gap-3 text-[14px] text-gray-700 font-medium group-hover:text-[#1A3263] transition-colors duration-300"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-[#FC3B1F]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FC3B1F] group-hover:text-white transition-colors duration-300">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FC3B1F] group-hover:text-white transition-colors duration-300" />
                                                </div>
                                                {feat}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Button */}
                                    <div className="mt-auto flex items-center text-[#1A3263] font-bold text-sm tracking-wide uppercase group-hover:text-[#FC3B1F] transition-colors duration-300">
                                        Explore Solutions 
                                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
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