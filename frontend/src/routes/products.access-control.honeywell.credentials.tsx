import environment from "@/enviroment/enviroment";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { fetchProducts } from "@/utils/productApi";

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
    const [currentSort, setCurrentSort] = useState<SortOption>("name-asc");
    const [popularity, setPopularity] = useState<Record<string, number>>({});
    const [apiProducts, setApiProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = environment;

    useEffect(() => {
        fetchProducts("Access Control", "Honeywell", "Credentials")
            .then(data => setApiProducts(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetch(`${baseUrl}/api/products/popularity/list`, { credentials: "include" })
            .then(r => r.json())
            .then(d => { if (d.success) setPopularity(d.data); })
            .catch(() => {});
    }, []);

    const mapped = useMemo(() =>
        apiProducts.map(p => ({
            title: p.title,
            desc: p.description,
            image: p.mainImage,
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
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <div className="text-center py-20 text-gray-400 text-sm">Loading products...</div>
                </Container>
            </section>
        </div>
    );

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
                        totalProducts={mapped.length}
                    />
                    <HoneywellGrid products={sortedProducts} />
                </Container>
            </section>


        </div>
    );
}
