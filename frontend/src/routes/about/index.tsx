import { createFileRoute } from "@tanstack/react-router";
import { WhyChooseUs } from "@/components/AboutUs/WhyChooseUs";
import { AboutHero } from "@/components/AboutUs/AboutHero";
import { AboutMission } from "@/components/AboutUs/AboutMission";
import { AboutEvolution } from "@/components/AboutUs/AboutEvolution";
import { AboutLeadership } from "@/components/AboutUs/AboutLeadership";
import { AboutTeam } from "@/components/AboutUs/AboutTeam";

import { AboutExpertise } from "@/components/AboutUs/AboutExpertise";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Us — Intersys Solutions" },
      {
        name: "description",
        content:
          "Engineering the future of infrastructure. Learn about our mission, vision, and the team behind Cambodia's premier technology integrator.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-white overflow-x-hidden text-sm">
      <AboutHero />
      <AboutMission />
      <AboutEvolution />
      <AboutExpertise />
      <WhyChooseUs />
      <AboutLeadership />
      <AboutTeam />

    </div>
  );
}
