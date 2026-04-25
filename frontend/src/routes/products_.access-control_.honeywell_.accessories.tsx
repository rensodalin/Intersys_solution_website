import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellAccessories } from "@/components/Product/AccessControl/Honeywell/data";

export const Route = createFileRoute("/products_/access-control_/honeywell_/accessories")({
  head: () => ({
    meta: [
      { title: "Honeywell Accessories — Intersys Solutions" },
      {
        name: "description",
        content: "Detailed Honeywell access control accessories: Programmers, Converters, Power Supplies, and more.",
      },
    ],
  }),
  component: HoneywellAccessoriesPage,
});

function HoneywellAccessoriesPage() {
  return (
    <div className="bg-white min-h-screen">
      <HoneywellHero
        title="Honeywell Accessories"
        subtitle="Industrial-grade peripherals and support components designed for seamless system integration."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "Access Control", href: "/products/access-control" },
          { name: "Honeywell", href: "/products/access-control/honeywell" },
          { name: "Accessories", href: "/products/access-control/honeywell/accessories" },
        ]}
      />

      <section className="py-24 relative z-20">
        <Container>
          <HoneywellGrid products={honeywellAccessories} />
        </Container>
      </section>



      <CtaBand />
    </div>
  );
}
