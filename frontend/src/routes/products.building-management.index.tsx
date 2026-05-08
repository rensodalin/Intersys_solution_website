import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { BuildingManagementHero } from "@/components/Product/BuildingManagement/BuildingManagementHero";
import { BuildingManagementGrid } from "@/components/Product/BuildingManagement/BuildingManagementGrid";
import { bmsProducts } from "@/components/Product/BuildingManagement/data";

export const Route = createFileRoute("/products/building-management/")({
    head: () => ({
        meta: [
            { title: "Building Management Systems — Intersys" },
            {
                name: "description",
                content: "Explore our range of building management systems, including field devices, lighting control, networking, and software solutions.",
            },
        ],
    }),
    component: BuildingManagementPage,
});

function BuildingManagementPage() {
    const [currentSort, setCurrentSort] = useState<SortOption>("popular");

    const sortedProducts = useMemo(() => {
        const products = [...bmsProducts];
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
            <BuildingManagementHero />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <ProductSort 
                        currentSort={currentSort} 
                        onSortChange={setCurrentSort} 
                        totalProducts={bmsProducts.length} 
                    />
                    <BuildingManagementGrid products={sortedProducts} />
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
