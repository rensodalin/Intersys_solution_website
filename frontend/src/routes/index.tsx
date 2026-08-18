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
import { EventPopup } from "@/components/Common/EventPopup";
import { PosterCarousel } from "@/components/Homepage/PosterCarousel";
import heroImg from "@/assets/roomcontrol/pic.webp";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [showPopup, setShowPopup] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the initial popups in this browser session
    const hasSeen = sessionStorage.getItem("hasSeenInitialPopups");
    if (hasSeen) {
      return;
    }

    // Preload promotion image
    const preload = new Image();
    preload.src = heroImg;

    // Automatically trigger Promotion Overlay 1 second after first landing on website
    const timer = setTimeout(() => {
      setShowPopup(true);
      sessionStorage.setItem("hasSeenInitialPopups", "true");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePromotion = () => {
    // Hide Promotion Overlay
    setShowPopup(false);

    // AUTOMATICALLY open Event Popup after closing Promotion Overlay
    setTimeout(() => {
      setShowEventPopup(true);
    }, 250);
  };

  const handleCloseEvent = () => {
    setShowEventPopup(false);
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

      {/* 1. Promotion Overlay - Opens automatically on site load */}
      <PromotionOverlay isOpen={showPopup} onClose={handleClosePromotion} />

      {/* 2. Company Event Rectangular Popup - AUTOMATICALLY pops up from bottom edge to center when Promotion Overlay is closed */}
      <EventPopup isOpen={showEventPopup} onClose={handleCloseEvent} />
    </>
  );
}
