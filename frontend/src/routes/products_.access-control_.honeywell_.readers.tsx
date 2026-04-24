import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellReaders } from "@/components/Product/AccessControl/Honeywell/data";

export const Route = createFileRoute("/products_/access-control_/honeywell_/readers")({
    head: () => ({
        meta: [
            { title: "Honeywell Readers & Keypads — Intersys Solutions" },
            {
                name: "description",
                content: "Explore Honeywell's advanced readers and keypads: Biometric, Card, and Keypad solutions.",
            },
        ],
    }),
    component: HoneywellReadersPage,
});

function HoneywellReadersPage() {
    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero
                title="Honeywell Systems"
                subtitle="Industrial-grade security architecture designed for mission-critical infrastructure."
                breadcrumbs={[
                    { name: "Home", href: "/" },
                    { name: "Products", href: "/products" },
                    { name: "Access Control", href: "/products/access-control" },
                    { name: "Honeywell", href: "/products/access-control/honeywell" },
                    { name: "Reader & Keypad", href: "/products/access-control/honeywell/readers" },
                ]}
            />

            {/* Product Grid */}
            <section className="pb-20 -mt-12 relative z-20">
                <Container>
                    <HoneywellGrid products={honeywellReaders} />
                </Container>
            </section>

            {/* Identification Technology Highlights */}
            <section className="py-24 bg-gray-50 border-y border-gray-100">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <div className="text-[#9B0F06] font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Core Technology</div>
                            <h3 className="text-2xl font-bold text-[#1A3263] mb-6 tracking-tight">Multi-Protocol Support</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Our readers support 125kHz, 13.56MHz, and mobile credentials (NFC/BLE) in a single unit, providing a future-proof path for facility migration.
                            </p>
                        </div>
                        <div>
                            <div className="text-[#9B0F06] font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Security Standards</div>
                            <h3 className="text-2xl font-bold text-[#1A3263] mb-6 tracking-tight">Biometric Precision</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Advanced lived-finger detection and retinal mapping algorithms ensure that only authorized personnel can bypass high-security perimeter zones.
                            </p>
                        </div>
                        <div>
                            <div className="text-[#9B0F06] font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Design & Durability</div>
                            <h3 className="text-2xl font-bold text-[#1A3263] mb-6 tracking-tight">Industrial Build</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Constructed from UV-resistant polycarbonate and reinforced alloys, our hardware is IP65-rated for extreme weather conditions and high-traffic use.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
