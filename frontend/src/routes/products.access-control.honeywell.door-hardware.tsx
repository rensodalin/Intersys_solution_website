import { createFileRoute } from "@tanstack/react-router";
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
    return (
        <div className="bg-white min-h-screen">
            <HoneywellHero
                title="Door Hardware"
                subtitle="The physical interface of security. High-durability locking systems and egress devices for life safety compliance."
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
                    <HoneywellGrid products={honeywellDoorHardware} />
                </Container>
            </section>


            <CtaBand />
        </div>
    );
}
