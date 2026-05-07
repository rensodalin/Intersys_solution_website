import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Homepage/Hero";
import { MetricsStrip } from "@/components/Homepage/MetricsStrip";
import { Certificates } from "@/components/Homepage/Certificates";
import { ServicesGrid } from "@/components/Homepage/ServicesGrid";
import { FeaturedProjects } from "@/components/Homepage/FeaturedProjects";
import { JourneySection } from "@/components/Homepage/JourneySection";
import { Ecosystem } from "@/components/Homepage/Ecosystem";
import { WhyChooseIntersys } from "@/components/Homepage/WhyChooseIntersys";
import { Clients } from "@/components/Homepage/Clients";
import { Partnership } from "@/components/Homepage/Partnership";
import { Insights } from "@/components/Homepage/Insights";
import { PromotionOverlay } from "@/components/Common/PromotionOverlay";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the promotion
    const hasSeenPromotion = localStorage.getItem("hasSeenPromotion");

    if (!hasSeenPromotion) {
      // Show the promotion popup 2 seconds after the site opens
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("hasSeenPromotion", "true");
  };

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

      <WhyChooseIntersys />
      <Partnership />

      <Insights />

      <PromotionOverlay isOpen={showPopup} onClose={handleClose} />
    </>
  );
}
