import { createFileRoute } from "@tanstack/react-router";
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
    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero
                title="Control Panel Kits"
                subtitle="The brain of your security system. High-intelligence controllers designed for enterprise-scale integration."
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
                    <HoneywellGrid products={honeywellControlPanelKits} />
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}