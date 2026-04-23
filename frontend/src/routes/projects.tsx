import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/Common/CtaBand";

// Components
import { ProjectHero } from "@/components/Project/ProjectHero";
import { ProjectFilters } from "@/components/Project/ProjectFilters";
import { ProjectGrid } from "@/components/Project/ProjectGrid";

// Data
import pNovotelPP from "@/assets/project/Novo.png";
import pWingTower from "@/assets/project/WingTower.png";
import pGovKampongSpeu from "@/assets/project/image.png";
import pSkyVilla from "@/assets/project/sky_villa.png";
import pLaurelton from "@/assets/project/Laurelton Diamond Cambodia.png";
import pHathaBank from "@/assets/project/Hatta_bank.png";
import pNovotelHoliday from "@/assets/project/Novotel Holiday Palace.png";
import pGateway from "@/assets/project/the_Gateway.png";
import pHongkongLand from "@/assets/project/Hongkongland.png";
import pChipMongMall from "@/assets/project/Chipmong_598_mall.png";
import pESunTower from "@/assets/project/esuntower.png";
import pAirport from "@/assets/project/Phnom_penh_international_aireport.png";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Our Projects — Intersys Solutions" },
      {
        name: "description",
        content: "Explore our complete portfolio of elite engineering and smart building system installations.",
      },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  { title: "Novotel Phnom Penh", desc: "Full BMS integration.", image: pNovotelPP, category: "Hospitality" },
  { title: "Wing Tower", desc: "Smart building automation.", image: pWingTower, category: "Commercial" },
  { title: "Gov Kampong Speu", desc: "Security & fire systems.", image: pGovKampongSpeu, category: "Institutional" },
  { title: "Sky Villa", desc: "Luxury residential BMS.", image: pSkyVilla, category: "Residential" },
  { title: "Laurelton Diamond", desc: "Industrial automation.", image: pLaurelton, category: "Industrial" },
  { title: "Hatha Bank", desc: "Data center cooling control.", image: pHathaBank, category: "Banking" },
  { title: "Holiday Palace", desc: "Hospitality system integration.", image: pNovotelHoliday, category: "Hospitality" },
  { title: "The Gateway", desc: "Metering systems.", image: pGateway, category: "Commercial" },
  { title: "Hongkong Land", desc: "Lighting & HVAC BMS.", image: pHongkongLand, category: "Commercial" },
  { title: "Chip Mong Mall", desc: "Security systems.", image: pChipMongMall, category: "Commercial" },
  { title: "E-Sun Tower", desc: "Full automation.", image: pESunTower, category: "Office" },
  { title: "PP Intl Airport", desc: "Large-scale BMS.", image: pAirport, category: "Institutional" },
];

function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "full">("grid");

  const filteredProjects = useMemo(() => {
    return activeTab === "All" ? projects : projects.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <ProjectHero />

      <ProjectFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <ProjectGrid
        projects={filteredProjects}
        viewMode={viewMode}
      />

      <CtaBand />
    </div>
  );
}