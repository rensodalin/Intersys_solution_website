import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellUpgrades } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { LifeBuoy, ShieldCheck, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/products_/access-control_/honeywell_/upgrades")({
    head: () => ({
        meta: [
            { title: "Honeywell System Agreements & Upgrades — Intersys Solutions" },
            {
                name: "description",
                content: "Secure your investment with Honeywell Software Support Agreements (SSA) and critical system upgrades.",
            },
        ],
    }),
    component: HoneywellUpgradesPage,
});

function HoneywellUpgradesPage() {
    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero
                title="System Agreements"
                subtitle="Future-proof your security infrastructure. SSA plans and official upgrade kits for enterprise-grade longevity."
                backLink="/products/access-control/honeywell"
                backText="Back to Honeywell Systems"
            />

            {/* Product Grid */}
            <section className="pb-24 -mt-12 relative z-20">
                <Container>
                    <HoneywellGrid products={honeywellUpgrades} />
                </Container>
            </section>

            {/* Support Framework Section */}
            <section className="py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1A3263]/5 -skew-x-12 translate-x-1/2" />
                <Container className="relative z-10">
                    <div className="max-w-3xl mb-16">
                        <div className="text-[#9B0F06] font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Investment Protection</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1A3263] mb-6 tracking-tight">Software <span className="text-[#9B0F06]">Security Assurance</span></h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Honeywell's Software Support Agreements (SSA) ensure that your Pro-Watch and WIN-PAK systems are always running the latest security patches and feature updates.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: LifeBuoy,
                                title: "Expert Assistance",
                                desc: "Direct priority access to Honeywell's Global Technical Assistance Center (GTAC) for rapid resolution of mission-critical issues."
                            },
                            {
                                icon: RefreshCw,
                                title: "Version Persistence",
                                desc: "Automatic eligibility for major and minor software version releases, keeping your architecture current without one-off purchase costs."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Verified Health",
                                desc: "Remote system diagnostics and health checks included in premium SSA contracts to preemptively identify infrastructure bottlenecks."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 text-[#9B0F06] group-hover:bg-[#9B0F06] group-hover:text-white transition-colors duration-500">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-xl font-bold text-[#1A3263] mb-4">{feature.title}</h4>
                                <div className="w-8 h-[2px] bg-[#9B0F06] mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
