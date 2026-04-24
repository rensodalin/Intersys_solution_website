import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellCredentials } from "@/components/Product/AccessControl/Honeywell/data";

export const Route = createFileRoute("/products_/access-control_/honeywell_/credentials")({
    head: () => ({
        meta: [
            { title: "Honeywell Credentials — Intersys Solutions" },
            {
                name: "description",
                content: "Explore Honeywell's advanced credentials: cards, fobs, and mobile IDs for secure entry.",
            },
        ],
    }),
    component: HoneywellCredentialsPage,
});

function HoneywellCredentialsPage() {
    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero
                title="Access Credentials"
                subtitle="Secure identification solutions. From high-frequency smart cards to specialized modules for management."
                backLink="/products/access-control/honeywell"
                backText="Back to Honeywell Systems"
            />

            <section className="pb-24 -mt-12 relative z-20">
                <Container>
                    <HoneywellGrid products={honeywellCredentials} />
                </Container>
            </section>

            {/* Credentials Security Section */}
            <section className="py-24 bg-gray-50 border-y border-gray-100">
                <Container>
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm mb-8">
                            <div className="w-2 h-2 rounded-full bg-[#9B0F06] animate-pulse" />
                            <span className="text-[#1A3263] font-bold uppercase tracking-widest text-[9px]">Elite Encryption Standards</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-[#1A3263] mb-8 tracking-tight">
                            Identity <span className="text-[#9B0F06]">Secured</span>
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Honeywell credentials utilize state-of-the-art encryption protocols to prevent cloning, relay attacks, and unauthorized data interception.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "OSDP v2", desc: "Open Supervised Device Protocol for bi-directional security between reader and panel." },
                            { title: "AES-128", desc: "Advanced Encryption Standard with 128-bit key length for civilian and government use." },
                            { title: "Mifare DESFire", desc: "High-frequency smart card technology with hardware-accelerated crypto-engines." },
                            { title: "Mobile IDs", desc: "NFC and Bluetooth Low Energy (BLE) support for secure, contactless smartphone entry." }
                        ].map((stat, i) => (
                            <div key={stat.title} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                                <div className="text-[10px] font-black text-[#9B0F06] mb-4 opacity-30">0{i + 1} / SAFETY</div>
                                <h4 className="text-lg font-bold text-[#1A3263] mb-4">{stat.title}</h4>
                                <div className="h-[2px] w-8 bg-[#9B0F06] mb-6" />
                                <p className="text-gray-500 text-xs leading-relaxed">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
