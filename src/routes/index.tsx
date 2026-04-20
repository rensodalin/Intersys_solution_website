import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { MetricsStrip } from "@/components/site/MetricsStrip";
import { IntegratedTech } from "@/components/site/IntegratedTech";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { FeaturedProjects } from "@/components/site/FeaturedProjects";
import { Ecosystem } from "@/components/site/Ecosystem";
import { Testimonial } from "@/components/site/Testimonial";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <IntegratedTech />
      <ServicesGrid compact />
      <FeaturedProjects />
      <Ecosystem />
      <Testimonial />
      <CtaBand />
    </>
  );
}
