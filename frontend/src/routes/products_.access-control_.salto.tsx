import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { SaltoHero } from "@/components/Product/AccessControl/Salto/SaltoHero";
import { SaltoGrid } from "@/components/Product/AccessControl/Salto/SaltoGrid";
import { saltoProducts } from "@/components/Product/AccessControl/Salto/data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/products_/access-control_/salto")({
    head: () => ({
        meta: [
            { title: "SALTO Access Control Systems — Intersys" },
            {
                name: "description",
                content: "Explore SALTO's smart access solutions. Keyless, wireless, and cloud-based electronic locking systems.",
            },
        ],
    }),
    component: SaltoProductsPage,
});

function SaltoProductsPage() {
    return (
        <div className="bg-white min-h-screen">
            <SaltoHero />

            {/* Product Grid */}
            <section className="py-24 relative z-20">
                <Container>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[2px] w-8 bg-[#9B0F06]" />
                                <span className="text-[#9B0F06] font-bold uppercase tracking-widest text-[10px]">Product Catalog</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#1A3263] tracking-tighter">
                                Advanced Locking <span className="text-[#9B0F06]">Solutions</span>
                            </h2>
                        </div>

                        <Link
                            to="/products/access-control"
                            className="inline-flex items-center gap-2 text-[#1A3263] font-bold text-xs uppercase tracking-widest hover:text-[#9B0F06] transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Brands
                        </Link>
                    </div>

                    <SaltoGrid products={saltoProducts} />
                </Container>
            </section>

            {/* Support Section */}
            <section className="py-24 bg-gray-50 border-y border-gray-100">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[2px] w-8 bg-[#9B0F06]" />
                                <span className="text-[#9B0F06] font-bold uppercase tracking-widest text-[10px]">Integration Excellence</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-[#1A3263] mb-6 leading-tight">
                                Smarter Access, <span className="text-[#9B0F06]">Simplified</span>
                            </h3>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                SALTO's wire-free technology allows for easy installation on any door, transforming any entrance into a fully integrated smart access point without the need for extensive wiring.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "SVN (Salto Virtual Network) technology",
                                    "Mobile-first access with JustIN Mobile",
                                    "Seamless cloud management with Salto KS",
                                    "Wide range of hardware finishes and styles"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-[#1A3263] font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#9B0F06]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-[#9B0F06]/5 rounded-3xl -rotate-2" />
                            <img
                                src="https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-face-list-ok.png?itok=GqKA63Jt"
                                alt="Salto Technology"
                                className="relative rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
