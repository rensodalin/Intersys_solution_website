import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellControlPanelKits } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { Cpu, Zap, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/products_/access-control_/honeywell_/control-panel-kits")({
    head: () => ({
        meta: [
            { title: "Honeywell Control Panel Kits — Intersys Solutions" },
            {
                name: "description",
                content: "High-intelligence control panels and controller kits for mission-critical facility security.",
            },
        ],
    }),
    component: HoneywellControlPanelKitsPage,
});

function HoneywellControlPanelKitsPage() {
    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero
                title="Control Panel Kits"
                subtitle="The brain of your security system. High-intelligence controllers designed for enterprise-scale integration."
                backLink="/products/access-control/honeywell"
                backText="Back to Honeywell Systems"
            />

            {/* Product Grid */}
            <section className="pb-24 -mt-12 relative z-20">
                <Container>
                    <HoneywellGrid products={honeywellControlPanelKits} />
                </Container>
            </section>

            {/* Controller Specs Section */}
            <section className="py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1A3263]/5 -skew-x-12 translate-x-1/2" />
                <Container className="relative z-10">
                    <div className="max-w-3xl mb-16">
                        <div className="text-[#9B0F06] font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Hardened Logic</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1A3263] mb-6 tracking-tight">Processing <span className="text-[#9B0F06]">Intelligence</span></h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Our controller kits provide the foundation for robust security, featuring high-speed 32-bit processors and extensive memory for offline decision making.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Cpu,
                                title: "Distributed Intelligence",
                                desc: "Nodes work independently. If the main server goes down, panels continue to grant access based on local database rules."
                            },
                            {
                                icon: Zap,
                                title: "Real-time Processing",
                                desc: "Sub-second response times for credential validation, ensuring zero friction at high-traffic entry points."
                            },
                            {
                                icon: ShieldAlert,
                                title: "Tamper Protection",
                                desc: "Equipped with specialized sensors to detect physical enclosure tampering or unauthorized hardware overrides."
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

            {/* Kit Inventory Section */}
            <section className="py-24 bg-[#1A3263] text-white">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="w-full lg:w-1/2">
                            <h3 className="text-4xl font-bold mb-8 tracking-tighter">Everything For <span className="text-[#9B0F06]">Rapid Startup</span></h3>
                            <p className="text-white/60 mb-12 text-lg">
                                The PRO4000 series bundles everything required to secure a 4-door environment into a single SKU, reducing complex inventory management and site planning.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { label: "Main Controllers", value: "2x 32-bit Logic Boards" },
                                    { label: "Enclosure", value: "NEMA 1 Rated Steel Housing" },
                                    { label: "Power Source", value: "12VDC 5Amp Regulated P/S" },
                                    { label: "Terminals", value: "Full Screw-terminal Block Set" }
                                ].map((item) => (
                                    <div key={item.label} className="flex justify-between items-center py-4 border-b border-white/10">
                                        <span className="text-sm font-medium text-white/40 uppercase tracking-widest">{item.label}</span>
                                        <span className="text-sm font-bold text-[#9B0F06]">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative">
                            <img
                                src="https://honeywell.scene7.com/is/image/Honeywell65/hbt-security-PRO4000KD4-KIT"
                                alt="PRO4000 Internal View"
                                className="rounded-3xl shadow-2xl relative z-10"
                            />
                            <div className="absolute -inset-10 bg-[#9B0F06]/20 blur-[120px] -z-10" />
                        </div>
                    </div>
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
