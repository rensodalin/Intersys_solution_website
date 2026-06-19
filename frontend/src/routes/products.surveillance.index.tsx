import environment from "@/enviroment/enviroment";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { SurveillanceHero } from "@/components/Product/Surveillance/SurveillanceHero";
import { SurveillanceGrid } from "@/components/Product/Surveillance/SurveillanceGrid";
import { fetchProducts } from "@/utils/productApi";

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
    const [apiProducts, setApiProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = environment;

    useEffect(() => {
        fetchProducts("Surveillance (CCTV)")
            .then(data => setApiProducts(data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetch(`${baseUrl}/api/products/popularity/list`, { credentials: "include" })
            .then(r => r.json())
            .then(d => { if (d.success) setPopularity(d.data); })
            .catch(() => { });
    }, []);

    const mapped = useMemo(() =>
        apiProducts.map(p => ({
            id: p.productId,
            title: p.title,
            image: p.mainImage,
            description: p.description,
        })), [apiProducts]);

    const sortedProducts = useMemo(() => {
        const products = [...mapped];
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
    }, [currentSort, popularity, mapped]);

    if (loading) return (
        <div className="bg-white min-h-screen">
            <SurveillanceHero />
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <div className="text-center py-20 text-gray-400 text-sm">Loading products...</div>
                </Container>
            </section>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            <SurveillanceHero />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <ProductSort
                        currentSort={currentSort}
                        onSortChange={setCurrentSort}
                        totalProducts={mapped.length}
                    />
                    <SurveillanceGrid products={sortedProducts} />
                </Container>
            </section>


        </div>
    );
}
