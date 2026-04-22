import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { MetricsStrip } from "@/components/site/MetricsStrip";
import { Certificates } from "@/components/site/Certificates";
import { IntegratedTech } from "@/components/site/IntegratedTech";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { FeaturedProjects } from "@/components/site/FeaturedProjects";
import { JourneySection } from "@/components/site/JourneySection";
import { Ecosystem } from "@/components/site/Ecosystem";
import { Clients } from "@/components/site/Clients";
import { Insights } from "@/components/site/Insights";
import { PromotionOverlay } from "@/components/site/PromotionOverlay";


export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show the promotion popup 2 seconds after the site opens
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Hero />
      <MetricsStrip />
      <Ecosystem />
      <JourneySection />
      <FeaturedProjects />
      <Certificates />

      <Clients />

      <Insights />
      <ServicesGrid compact />

      {/* <AnniversaryBanner /> */}



      {/* 
      <PosterCarousel /> */}
      <IntegratedTech />


      <PromotionOverlay
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}
