import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { SaltoHero } from "@/components/Product/AccessControl/Salto/SaltoHero";
import { SaltoGrid } from "@/components/Product/AccessControl/Salto/SaltoGrid";
import { saltoProducts } from "@/components/Product/AccessControl/Salto/data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/products/access-control/salto/")({
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
    const [currentSort, setCurrentSort] = useState<SortOption>("popular");

    const sortedProducts = useMemo(() => {
        const products = [...saltoProducts];
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
            <SaltoHero />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <ProductSort
                        currentSort={currentSort}
                        onSortChange={setCurrentSort}
                        totalProducts={saltoProducts.length}
                    />
                    <SaltoGrid products={sortedProducts} />
                </Container>
            </section>



        </div>
    );
}
