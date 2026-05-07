import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellCredentials } from "@/components/Product/AccessControl/Honeywell/data";

export const Route = createFileRoute("/products/access-control/honeywell/credentials")({
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
                breadcrumbs={[
                    { name: "Home", href: "/" },
                    { name: "Products", href: "/products" },
                    { name: "Access Control", href: "/products/access-control" },
                    { name: "Honeywell", href: "/products/access-control/honeywell" },
                    { name: "Credentials", href: "/products/access-control/honeywell/credentials" },
                ]}
            />

            <section className="py-24 relative z-20">
                <Container>
                    <HoneywellGrid products={honeywellCredentials} />
                </Container>
            </section>


            <CtaBand />
        </div>
    );
}
