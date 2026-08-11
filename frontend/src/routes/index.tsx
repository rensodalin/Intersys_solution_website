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
import { PosterCarousel } from "@/components/Homepage/PosterCarousel";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the promotion in this session
    const hasSeenPromotion = sessionStorage.getItem("hasSeenPromotion");

    if (!hasSeenPromotion) {
      // Show the promotion popup 1.5 seconds after the site opens
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem("hasSeenPromotion", "true");
  };

  return (
    <>
      <Hero />
      <MetricsStrip />
      <Ecosystem />
      <PosterCarousel />

      <JourneySection />
      <FeaturedProjects />

      <ServicesGrid />

      <Clients />

      <Certificates />

      <Partnership />

      <WhyChooseIntersys />

      <Insights />

      <PromotionOverlay isOpen={showPopup} onClose={handleClose} />
    </>
  );
}
