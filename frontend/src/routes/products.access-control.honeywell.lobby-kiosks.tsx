import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellKiosks } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { Monitor, MousePointer2, UserCheck } from "lucide-react";

export const Route = createFileRoute("/products/access-control/honeywell/lobby-kiosks")({
  head: () => ({
    meta: [
      { title: "Honeywell Lobby Kiosks & Touch Screens — Intersys Solutions" },
      {
        name: "description",
        content: "Professional lobby management hardware and touch-screen call stations for secure visitor processing.",
      },
    ],
  }),
  component: HoneywellLobbyKiosksPage,
});

function HoneywellLobbyKiosksPage() {
  return (
    <div className="bg-white min-h-screen">
      <HoneywellHero
        title="Lobby Kiosks"
        subtitle="First impressions matter. Specialized touch-screen hardware designed for streamlined visitor management and facility communication."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "Access Control", href: "/products/access-control" },
          { name: "Honeywell", href: "/products/access-control/honeywell" },
          { name: "Lobby Kiosks", href: "/products/access-control/honeywell/lobby-kiosks" },
        ]}
      />

      {/* Product Grid */}
      <section className="py-24 relative z-20">
        <Container>
          <HoneywellGrid products={honeywellKiosks} />
        </Container>
      </section>



      <CtaBand />
    </div>
  );
}
