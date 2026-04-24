import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellMainProducts } from "@/components/Product/AccessControl/Honeywell/data";

export const Route = createFileRoute("/products_/access-control_/honeywell")({
    head: () => ({
        meta: [
            { title: "Honeywell Access Control Systems — Intersys" },
            {
                name: "description",
                content: "Explore Honeywell's professional access control lineup. Technical expertise and system integration.",
            },
        ],
    }),
    component: HoneywellProductsPage,
});

function HoneywellProductsPage() {
    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero />

            {/* Product Grid */}
            <section className="pb-24 -mt-12 relative z-20">
                <Container>
                    <HoneywellGrid products={honeywellMainProducts} />
                </Container>
            </section>

            {/* Technical Core Section */}
            <section className="py-24 bg-white overflow-hidden">
                <Container>
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        <div className="w-full md:w-1/2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[2px] w-8 bg-[#9B0F06]" />
                                <span className="text-[#9B0F06] font-bold uppercase tracking-widest text-[10px]">The Foundation</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-[#1A3263] mb-10 tracking-tighter leading-tight">
                                Secure by <span className="text-[#9B0F06]">Structure</span>
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-12">
                                Intersys integrates the full spectrum of Honeywell access control—synchronizing hardware logic with enterprise software to create an unbreakable chain of security.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                                {[
                                    { title: "Unified Control", desc: "Single-pane management of global facilities." },
                                    { title: "Edge Security", desc: "Encrypted communication from reader to controller." },
                                    { title: "Open Platform", desc: "Seamless API integration for 3rd-party systems." },
                                    { title: "Scalable Logic", desc: "From a single door to thousands of global nodes." }
                                ].map((item) => (
                                    <div key={item.title}>
                                        <h4 className="text-base font-bold text-[#1A3263] mb-2">{item.title}</h4>
                                        <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 relative">
                            <div className="absolute -inset-10 bg-[#1A3263]/5 rounded-full blur-[100px]" />
                            <img
                                src="https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PW-6000-Monitor-IC-v1-primaryimage"
                                alt="Honeywell Architecture"
                                className="relative rounded-3xl shadow-2xl opacity-90 grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Authorized Support Section */}
            <section className="py-24 bg-[#1A3263] relative text-white">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <Container className="relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl md:text-5xl font-bold mb-8">Authorized Honeywell <span className="text-[#9B0F06]">ESD Partner</span></h3>
                        <p className="text-white/60 text-lg leading-relaxed mb-12">
                            As an authorized Engineering Service Distributor (ESD), Intersys Solutions doesn't just sell products—we architect end-to-end security ecosystems. From commissioning to long-term software support, our certified engineers ensure your system operates at peak reliability.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8">
                            <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center gap-2 min-w-[200px]">
                                <span className="text-2xl font-black text-[#9B0F06]">10+</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Years Expertise</span>
                            </div>
                            <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center gap-2 min-w-[200px]">
                                <span className="text-2xl font-black text-[#9B0F06]">500+</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Devices Certified</span>
                            </div>
                            <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center gap-2 min-w-[200px]">
                                <span className="text-2xl font-black text-[#9B0F06]">24/7</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Technical Service</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
