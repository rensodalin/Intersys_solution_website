import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellSoftware } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/products_/access-control_/honeywell_/software")({
  head: () => ({
    meta: [
      { title: "Honeywell Security Software — Intersys Solutions" },
      {
        name: "description",
        content: "Enterprise management software including Pro-Watch, WIN-PAK, and visitor management systems.",
      },
    ],
  }),
  component: HoneywellSoftwarePage,
});

function HoneywellSoftwarePage() {
  return (
    <div className="bg-white min-h-screen">
      <HoneywellHero
        title="Security Software"
        subtitle="Unify your security ecosystem. From enterprise-grade Pro-Watch management to scalable WIN-PAK solutions."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "Access Control", href: "/products/access-control" },
          { name: "Honeywell", href: "/products/access-control/honeywell" },
          { name: "Software", href: "/products/access-control/honeywell/software" },
        ]}
      />

      {/* Product Grid */}
      <section className="py-24 relative z-20">
        <Container>
          <HoneywellGrid products={honeywellSoftware} />
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}
