import { createFileRoute } from "@tanstack/react-router";
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
    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero
                title="System Upgrades & SSA"
                subtitle="Future-proof your security infrastructure. SSA plans and official upgrade kits for enterprise-grade longevity."
                breadcrumbs={[
                    { name: "Home", href: "/" },
                    { name: "Products", href: "/products" },
                    { name: "Access Control", href: "/products/access-control" },
                    { name: "Honeywell", href: "/products/access-control/honeywell" },
                    { name: "System Upgrades", href: "/products/access-control/honeywell/upgrades" },
                ]}
            />

            {/* Product Grid */}
            <section className="py-24 relative z-20">
                <Container>
                    <HoneywellGrid products={honeywellUpgrades} />
                </Container>
            </section>


            <CtaBand />
        </div>
    );
}
