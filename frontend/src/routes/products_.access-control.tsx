import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ProductHero } from "@/components/Product/ProductHero";

export const Route = createFileRoute("/products_/access-control")({
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
                                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-500"
                            >
                                {/* Logo */}
                                <div className="h-12 mb-6 flex items-center">
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="h-full object-contain"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold text-[#1A3263] mb-3">
                                    {brand.name} Integration
                                </h3>

                                {/* Description */}
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                                    {brand.desc}
                                </p>

                                {/* Features */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                    {brand.features.map((feat) => (
                                        <div
                                            key={feat}
                                            className="flex items-center gap-2 text-sm text-[#1A3263] font-medium"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-[#9B0F06]" />
                                            {feat}
                                        </div>
                                    ))}
                                </div>

                                {/* Button */}
                                <Link
                                    to={
                                        brand.name === "Honeywell"
                                            ? "/products/access-control/honeywell"
                                            : "/products/access-control/salto"
                                    }
                                    className="inline-flex items-center justify-center py-3 px-6 bg-[#1A3263] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#9B0F06] transition-all self-start"
                                >
                                    View More <ArrowRight className="ml-2 w-4 h-4" />
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