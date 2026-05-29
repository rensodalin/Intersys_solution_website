import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
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
    const [currentSort, setCurrentSort] = useState<SortOption>("name-asc");
    const [popularity, setPopularity] = useState<Record<string, number>>({});

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

    useEffect(() => {
        fetch(`${baseUrl}/api/products/popularity/list`, { credentials: "include" })
            .then(r => r.json())
            .then(d => { if (d.success) setPopularity(d.data); })
            .catch(() => {});
    }, []);

    const sortedProducts = useMemo(() => {
        const products = [...surveillanceProducts];
        switch (currentSort) {
            case "newest":
                return products.reverse();
            case "popular":
                return products
                    .filter(p => (popularity[p.title] || 0) > 0)
                    .sort((a, b) => (popularity[b.title] || 0) - (popularity[a.title] || 0));
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
            <SurveillanceHero />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <ProductSort 
                        currentSort={currentSort} 
                        onSortChange={setCurrentSort} 
                        totalProducts={surveillanceProducts.length} 
                    />
                    <SurveillanceGrid products={sortedProducts} />
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
