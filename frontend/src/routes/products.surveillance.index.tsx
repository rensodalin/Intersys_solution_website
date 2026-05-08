import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { SurveillanceHero } from "@/components/Product/Surveillance/SurveillanceHero";
import { SurveillanceGrid } from "@/components/Product/Surveillance/SurveillanceGrid";
import { surveillanceProducts } from "@/components/Product/Surveillance/data";

export const Route = createFileRoute("/products/surveillance/")({
    head: () => ({
        meta: [
            { title: "Surveillance Systems (CCTV) — Intersys" },
            {
                name: "description",
                content: "High-definition IP and analog surveillance systems for real-time monitoring and video recording. Our CCTV solutions are ideal for commercial, residential, and public infrastructure security.",
            },
        ],
    }),
    component: SurveillanceProductsPage,
});

function SurveillanceProductsPage() {
    return (
        <div className="bg-white min-h-screen">
            <SurveillanceHero />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <SurveillanceGrid products={surveillanceProducts} />
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
