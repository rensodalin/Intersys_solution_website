import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { SaltoHero } from "@/components/Product/AccessControl/Salto/SaltoHero";
import { SaltoGrid } from "@/components/Product/AccessControl/Salto/SaltoGrid";
import { saltoProducts } from "@/components/Product/AccessControl/Salto/data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/products_/access-control_/salto")({
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
    return (
        <div className="bg-white min-h-screen">
            <SaltoHero />

            {/* Product Grid */}
            <section className="py-24 relative z-20">
                <Container>

                    <SaltoGrid products={saltoProducts} />
                </Container>
            </section>


            <CtaBand />
        </div>
    );
}
