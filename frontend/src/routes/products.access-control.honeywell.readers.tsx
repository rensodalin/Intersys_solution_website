import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellReaders } from "@/components/Product/AccessControl/Honeywell/data";

export const Route = createFileRoute("/products/access-control/honeywell/readers")({
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
                title="Readers & Keypads"
                subtitle="High-performance identification. From biometric fingerprint units to multi-protocol card readers."
                breadcrumbs={[
                    { name: "Home", href: "/" },
                    { name: "Products", href: "/products" },
                    { name: "Access Control", href: "/products/access-control" },
                    { name: "Honeywell", href: "/products/access-control/honeywell" },
                    { name: "Readers & Keypads", href: "/products/access-control/honeywell/readers" },
                ]}
            />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <HoneywellGrid products={honeywellReaders} />
                </Container>
            </section>



            <CtaBand />
        </div>
    );
}
