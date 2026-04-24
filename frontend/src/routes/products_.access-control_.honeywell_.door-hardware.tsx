import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellDoorHardware } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { Lock, DoorOpen, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/products_/access-control_/honeywell_/door-hardware")({
    head: () => ({
        meta: [
            { title: "Honeywell Door Hardware & Locking — Intersys Solutions" },
            {
                name: "description",
                content: "High-security electronic locking devices, wireless locksets, and exit hardware for integrated access control.",
            },
        ],
    }),
    component: HoneywellDoorHardwarePage,
});

function HoneywellDoorHardwarePage() {
    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero
                title="Door Hardware"
                subtitle="The physical interface of security. High-durability locking systems and egress devices for life safety compliance."
                backLink="/products/access-control/honeywell"
                backText="Back to Honeywell Systems"
            />

            {/* Product Grid */}
            <section className="pb-24 -mt-12 relative z-20">
                <Container>
                    <HoneywellGrid products={honeywellDoorHardware} />
                </Container>
            </section>

            {/* Industrial Grade Section */}
            <section className="py-24 bg-navy-deep text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#9B0F06]/5 skew-x-12 translate-x-1/4" />
                <Container className="relative z-10">
                    <div className="max-w-3xl mb-16">
                        <div className="text-[#9B0F06] font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Hardened Entry</div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Mechanical <span className="text-[#9B0F06]">Excellence</span></h2>
                        <p className="text-white/60 text-lg leading-relaxed">
                            Honeywell partnering with industry leaders like ASSA ABLOY provides wireless and integrated locking solutions that blend seamless convenience with industrial-grade force resistance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Lock,
                                title: "Electronic Strikes",
                                desc: "High-tensile strength strikes designed for seamless integration with Pro-Watch controllers, supporting fail-safe and fail-secure modes."
                            },
                            {
                                icon: DoorOpen,
                                title: "Wireless Locksets",
                                desc: "Eliminate expensive cabling with IP-based wireless locksets (Aperio) that report real-time status back to the central server."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Life Safety Compliance",
                                desc: "All egress hardware is UL listed and code-compliant, ensuring safe emergency exit paths while maintaining perimeter integrity."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-[#9B0F06]/50 transition-all duration-500"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-[#9B0F06]">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                                <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
