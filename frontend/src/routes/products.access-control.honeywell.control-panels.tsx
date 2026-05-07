import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellControlPanels } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { Cpu, Network, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/products/access-control/honeywell/control-panels")({
    head: () => ({
        meta: [
            { title: "Honeywell Intelligent Control Panels — Intersys Solutions" },
            {
                name: "description",
                content: "Enterprise-grade intelligent controllers and logic modules for global Pro-Watch and WIN-PAK deployments.",
            },
        ],
    }),
    component: HoneywellControlPanelsPage,
});

function HoneywellControlPanelsPage() {
    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero
                title="Control Panels"
                subtitle="The logic center of your facility. Intelligent IP-based controllers designed for mission-critical security decisions."
                breadcrumbs={[
                    { name: "Home", href: "/" },
                    { name: "Products", href: "/products" },
                    { name: "Access Control", href: "/products/access-control" },
                    { name: "Honeywell", href: "/products/access-control/honeywell" },
                    { name: "Control Panels", href: "/products/access-control/honeywell/control-panels" },
                ]}
            />

            {/* Product Grid */}
            <section className="py-14 md:py-16 relative z-20 px-8">
                <Container>
                    <HoneywellGrid products={honeywellControlPanels} />
                </Container>
            </section>


            <CtaBand />
        </div>
    );
}
