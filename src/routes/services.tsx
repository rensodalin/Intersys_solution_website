import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/site/Container";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Intersys Solutions" },
      {
        name: "description",
        content:
          "Full-stack engineering services: BMS, fire safety, HVAC, security, lighting and IoT integration.",
      },
      { property: "og:title", content: "Engineering Services — Intersys" },
      {
        property: "og:description",
        content:
          "Full-stack engineering services for smart buildings and industrial infrastructure.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <section className="pt-40 pb-20 bg-navy-deep text-white relative overflow-hidden dark">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <Container className="relative">
          <div className="max-w-4xl">
            <div className="text-xs uppercase tracking-[0.2em] text-brand-red font-semibold">
              What We Do
            </div>
            <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold leading-[1.02]">
              Six disciplines. <span className="text-brand-red">One</span> integrated stack.
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
              From single-system upgrades to multi-site deployments, we deliver engineering services
              that meet the highest standards of safety and reliability.
            </p>
          </div>
        </Container>
      </section>
      <ServicesGrid />
      <CtaBand />
    </>
  );
}

