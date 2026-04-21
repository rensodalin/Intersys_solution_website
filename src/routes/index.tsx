import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { MetricsStrip } from "@/components/site/MetricsStrip";
import { AnniversaryBanner } from "@/components/site/AnniversaryBanner";
import { Certificates } from "@/components/site/Certificates";
import { IntegratedTech } from "@/components/site/IntegratedTech";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { FeaturedProjects } from "@/components/site/FeaturedProjects";
import { JourneySection } from "@/components/site/JourneySection";
import { Ecosystem } from "@/components/site/Ecosystem";
import { Clients } from "@/components/site/Clients";
import { Testimonial } from "@/components/site/Testimonial";
import { Insights } from "@/components/site/Insights";
import { PosterCarousel } from "@/components/site/PosterCarousel";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      {/* <AnniversaryBanner /> */}
      <IntegratedTech />
      <ServicesGrid compact />
      <FeaturedProjects />
      <JourneySection />
      <Ecosystem />
      <Clients />
      <Insights />
      <PosterCarousel />
      <Certificates />
      <CtaBand />
    </>
  );
}
