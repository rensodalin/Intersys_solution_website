import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellDoorHardware } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { Lock, DoorOpen, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/products/access-control/honeywell/door-hardware")({
    head: () => ({
        meta: [
            { title: "Honeywell Door Hardware & Locking — Intersys Solutions" },
            {
                name: "description",
                content: "High-security electronic locking devices, wireless locksets, and exit hardware for integrated access control.",
            },
        ],
    }),
    component: HoneywellDoorHardwarePage,
});

function HoneywellDoorHardwarePage() {
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
        const products = [...honeywellDoorHardware];
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
            <HoneywellHero
                title="Door Hardware"
                subtitle="Reliable physical security. Professional locking devices and egress solutions."
                breadcrumbs={[
                    { name: "Home", href: "/" },
                    { name: "Products", href: "/products" },
                    { name: "Access Control", href: "/products/access-control" },
                    { name: "Honeywell", href: "/products/access-control/honeywell" },
                    { name: "Door Hardware", href: "/products/access-control/honeywell/door-hardware" },
                ]}
            />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <ProductSort
                        currentSort={currentSort}
                        onSortChange={setCurrentSort}
                        totalProducts={honeywellDoorHardware.length}
                    />
                    <HoneywellGrid products={sortedProducts} />
                </Container>
            </section>



        </div>
    );
}
