import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
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
    const [currentSort, setCurrentSort] = useState<SortOption>("popular");

    const sortedProducts = useMemo(() => {
        const products = [...honeywellCredentials];
        switch (currentSort) {
            case "newest":
                return products.reverse();
            case "popular":
                return products.sort((a, b) => b.title.length - a.title.length);
            case "name-asc":
                return products.sort((a, b) => a.title.localeCompare(b.title));
            case "name-desc":
                return products.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return products;
        }
    }, [currentSort]);

    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero
                title="Credentials & Programmers"
                subtitle="Secure identification. From proximity cards to sophisticated biometric encryption programmers."
                breadcrumbs={[
                    { name: "Home", href: "/" },
                    { name: "Products", href: "/products" },
                    { name: "Access Control", href: "/products/access-control" },
                    { name: "Honeywell", href: "/products/access-control/honeywell" },
                    { name: "Credentials", href: "/products/access-control/honeywell/credentials" },
                ]}
            />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <ProductSort 
                        currentSort={currentSort} 
                        onSortChange={setCurrentSort} 
                        totalProducts={honeywellCredentials.length} 
                    />
                    <HoneywellGrid products={sortedProducts} />
                </Container>
            </section>


            <CtaBand />
        </div>
    );
}
