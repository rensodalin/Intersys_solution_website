import environment from "@/enviroment/enviroment";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellMainProducts } from "@/components/Product/AccessControl/Honeywell/data";

const baseUrl = environment;

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
    const [currentSort, setCurrentSort] = useState<SortOption>("popular");
    const [popularity, setPopularity] = useState<Record<string, number>>({});

    useEffect(() => {
        fetch(`${baseUrl}/api/products/popularity/list`, { credentials: "include" })
            .then(r => r.json())
            .then(d => { if (d.success) setPopularity(d.data); })
            .catch(() => {});
    }, []);

    const sortedProducts = useMemo(() => {
        const products = [...honeywellMainProducts];
        switch (currentSort) {
            case "newest":
                return products.reverse();
            case "popular":
                return products.sort((a, b) => (popularity[b.title] || 0) - (popularity[a.title] || 0));
            case "name-asc":
                return products.sort((a, b) => a.title.localeCompare(b.title));
            case "name-desc":
                return products.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return products;
        }
    }, [currentSort, popularity]);

    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero />

            {/* Product Grid */}
            <section className="pb-14 md:pb-16 pt-10 md:pt-14 relative z-20 px-8">
                <Container>
                    <ProductSort
                        currentSort={currentSort}
                        onSortChange={setCurrentSort}
                        totalProducts={honeywellMainProducts.length}
                    />
                    <HoneywellGrid products={sortedProducts} />
                </Container>
            </section>


        </div>
    );
}
