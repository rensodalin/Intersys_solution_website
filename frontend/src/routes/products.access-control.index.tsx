import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
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
            "Keyless & wireless mobile-first",
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

            {/* Brands Section */}
            <section className="py-14 bg-gray-50">
                <Container>
                    {/* Heading */}
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#1A3263] mb-3 tracking-tight">
                            Working with trusted brands
                        </h2>

                        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                            We partner with global technology leaders to deliver reliable and
                            future-ready security infrastructure.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                    className="group relative bg-white rounded-xl p-6 lg:p-7 border border-gray-100 flex flex-col hover:shadow-xl hover:border-[#1A3263]/10 transition-all duration-300 h-full overflow-hidden"
                                >
                                    {/* Hover background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                                    {/* Logo */}
                                    <div className="h-12 mb-6 flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
                                        <img
                                            src={brand.logo}
                                            alt={brand.name}
                                            className="h-full object-contain mix-blend-multiply"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl font-semibold text-[#1A3263] mb-3 tracking-tight group-hover:text-[#FC3B1F] transition-colors">
                                        {brand.name} integration
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                                        {brand.desc}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2.5 mb-8">
                                        {brand.features.map((feat) => (
                                            <div
                                                key={feat}
                                                className="flex items-center gap-3 text-sm text-gray-700"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-[#FC3B1F]/10 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FC3B1F]" />
                                                </div>

                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-auto flex items-center text-[#1A3263] font-medium text-sm group-hover:text-[#FC3B1F] transition-colors">
                                        Explore solutions

                                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
}