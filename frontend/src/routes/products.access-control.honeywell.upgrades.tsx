import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellUpgrades } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { LifeBuoy, ShieldCheck, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/products/access-control/honeywell/upgrades")({
    head: () => ({
        meta: [
            { title: "Honeywell System Agreements & Upgrades — Intersys Solutions" },
            {
                name: "description",
                content: "Secure your investment with Honeywell Software Support Agreements (SSA) and critical system upgrades.",
            },
        ],
    }),
    component: HoneywellUpgradesPage,
});

function HoneywellUpgradesPage() {
    const [currentSort, setCurrentSort] = useState<SortOption>("popular");

    const sortedProducts = useMemo(() => {
        const products = [...honeywellUpgrades];
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
                title="System Upgrades"
                subtitle="Future-proof your facility. Professional expansion kits and software support agreements."
                breadcrumbs={[
                    { name: "Home", href: "/" },
                    { name: "Products", href: "/products" },
                    { name: "Access Control", href: "/products/access-control" },
                    { name: "Honeywell", href: "/products/access-control/honeywell" },
                    { name: "Upgrades", href: "/products/access-control/honeywell/upgrades" },
                ]}
            />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <ProductSort 
                        currentSort={currentSort} 
                        onSortChange={setCurrentSort} 
                        totalProducts={honeywellUpgrades.length} 
                    />
                    <HoneywellGrid products={sortedProducts} />
                </Container>
            </section>


            <CtaBand />
        </div>
    );
}
