import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellMainProducts } from "@/components/Product/AccessControl/Honeywell/data";

export const Route = createFileRoute("/products/access-control/honeywell/")({
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
            <section className="pb-14 md:pb-16 -mt-12 relative z-20 px-8">
                <Container>
                    <HoneywellGrid products={honeywellMainProducts} />
                </Container>
            </section>




            <CtaBand />
        </div>
    );
}
