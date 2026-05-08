import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellControlPanelKits } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { Cpu, Zap, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/products/access-control/honeywell/control-panel-kits")({
    head: () => ({
        meta: [
            { title: "Honeywell Control Panel Kits — Intersys Solutions" },
            {
                name: "description",
                content: "High-intelligence control panels and controller kits for mission-critical facility security.",
            },
        ],
    }),
    component: HoneywellControlPanelKitsPage,
});

function HoneywellControlPanelKitsPage() {
    const [currentSort, setCurrentSort] = useState<SortOption>("popular");

    const sortedProducts = useMemo(() => {
        const products = [...honeywellControlPanelKits];
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
                title="Control Panel Kits"
                subtitle="Complete deployment packages. Integrated solutions featuring controllers, enclosures, and power units."
                breadcrumbs={[
                    { name: "Home", href: "/" },
                    { name: "Products", href: "/products" },
                    { name: "Access Control", href: "/products/access-control" },
                    { name: "Honeywell", href: "/products/access-control/honeywell" },
                    { name: "Control Panel Kits", href: "/products/access-control/honeywell/control-panel-kits" },
                ]}
            />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <ProductSort 
                        currentSort={currentSort} 
                        onSortChange={setCurrentSort} 
                        totalProducts={honeywellControlPanelKits.length} 
                    />
                    <HoneywellGrid products={sortedProducts} />
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}