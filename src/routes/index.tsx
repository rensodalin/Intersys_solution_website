import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Homepage/Hero";
import { MetricsStrip } from "@/components/Homepage/MetricsStrip";
import { Certificates } from "@/components/Homepage/Certificates";
import { ServicesGrid } from "@/components/Homepage/ServicesGrid";
import { FeaturedProjects } from "@/components/Homepage/FeaturedProjects";
import { JourneySection } from "@/components/Homepage/JourneySection";
import { Ecosystem } from "@/components/Homepage/Ecosystem";
import { Clients } from "@/components/Homepage/Clients";
import { Insights } from "@/components/Homepage/Insights";
import { PromotionOverlay } from "@/components/Common/PromotionOverlay";


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
      <ServicesGrid />

      <Clients />

      <Insights />



      <PromotionOverlay
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}

