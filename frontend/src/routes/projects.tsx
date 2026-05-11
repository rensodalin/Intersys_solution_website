import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/Common/CtaBand";

// Components
import { ProjectHero } from "@/components/Project/ProjectHero";
import { ProjectFilters } from "@/components/Project/ProjectFilters";
import { ProjectGrid } from "@/components/Project/ProjectGrid";
import { Project } from "@/components/Project/types";

// Data
import pNovotelPP from "@/assets/project/Novo.png";
import pWingTower from "@/assets/project/WingTower.png";
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

const projects: Project[] = [
    {
        title: "Phnom Penh International Airport",
        desc: "Large-scale BMS integration for Cambodia's primary aviation gateway, ensuring optimal climate and energy control.",
        image: pAirport,
        category: "Institutional",
        client: "Comin Khmer",
        location: "Phnom Penh, Cambodia",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Power Meter"]
    },
    {
        title: "Novotel Phnom Penh",
        desc: "High-end hospitality BMS solution designed for maximum guest comfort and operational efficiency.",
        image: pNovotelPP,
        category: "Hospitality",
        client: "Ecam Solution",
        location: "Street 51 Corner Street 294, Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Wing Tower",
        desc: "Centralized smart building automation for one of Phnom Penh's most iconic corporate landmarks.",
        image: pWingTower,
        category: "Commercial",
        client: "DBD Engineering Plc.",
        location: "Preah Monivong Blvd. & Kampuchea Krom Blvd., Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Laurelton Diamond Cambodia",
        desc: "Precision industrial BMS integration for specialized diamond manufacturing and processing facility.",
        image: pLaurelton,
        category: "Industrial",
        client: "IRE Technology",
        location: "PPSE, National Road 4, Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Power Meter"]
    },
    {
        title: "Novotel Holiday Palace",
        desc: "Comprehensive building management system for coastal hospitality and luxury resort operations.",
        image: pNovotelHoliday,
        category: "Hospitality",
        client: "Lotus Grean Team",
        location: "2 Thnou St, Preah Sihanouk",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "PPM Pharma Product Manufacture",
        desc: "Controlled environment management system for high-standard pharmaceutical manufacturing.",
        image: pAirport,
        category: "Industrial",
        client: "Lotus Grean Team",
        location: "Russian Federation Blvd (110), Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Power Meter"]
    },
    {
        title: "Hongkong Land",
        desc: "Premium commercial real estate HVAC and lighting integration for Grade-A office standards.",
        image: pHongkongLand,
        category: "Commercial",
        client: "CE&P Corporation Ltd",
        location: "Preah Moha Ksatreiyani Kossamak Ave (106), Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System"]
    },
    {
        title: "ABA Headquarters",
        desc: "Reliable BMS infrastructure for national banking headquarters, focusing on HVAC and electrical uptime.",
        image: pAirport,
        category: "Banking",
        client: "Krorvan I/O.",
        location: "Preah Sihanouk Blvd (274), Phnom Penh",
        scope: ["HVAC System", "Electrical System", "Lighting System"]
    },
    {
        title: "E‐Sun Tower",
        desc: "Intelligent office tower management featuring full HVAC, lift, and power metering integration.",
        image: pESunTower,
        category: "Office",
        client: "Lotus Green Team",
        location: "Preah Monivong Blvd, Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Sky Villa",
        desc: "Ultra-luxury residential BMS providing seamless control over common areas and building services.",
        image: pSkyVilla,
        category: "Residential",
        client: "TERRASYS S SOLUTION LTD",
        location: "Sangkat Veal Vong, Khan 7 Makara, Phnom Penh",
        scope: ["Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Data Center at Hatha Bank",
        desc: "Critical cooling and environmental control for secure data center operations.",
        image: pHathaBank,
        category: "Banking",
        client: "Lotus Grean Team",
        location: "No.606, Street 271, Phnom Penh",
        scope: ["Control Chiller For Data Center"]
    },
    {
        title: "Zuellig Pharma",
        desc: "Logistics and pharmaceutical distribution center environmental monitoring and control.",
        image: pAirport,
        category: "Industrial",
        client: "Lotus Grean Team",
        location: "Kandal Stueng, Siem Reap, Kandal Province",
        scope: ["HVAC System", "Electrical System", "Power Meter"]
    },
    {
        title: "Kerry Express (Warehouse)",
        desc: "Industrial warehouse BMS integration focusing on efficient lighting and power management.",
        image: pAirport,
        category: "Logistics",
        client: "Krorvan I/O.",
        location: "National Road #2, Khan Dangkor, Phnom Penh",
        scope: ["HVAC System", "Electrical System", "Power Meter"]
    },
    {
        title: "The Gateway",
        desc: "Smart utility metering and building management for modern mixed-use development.",
        image: pGateway,
        category: "Commercial",
        client: "TERRASYSS SOLUTION LTD",
        location: "Sangkat Veal Vong, Khan 7 Makara, Phnom Penh",
        scope: ["Water Meter", "Power Meter"]
    },
    {
        title: "Chip Mong 598 Mall",
        desc: "Retail center power management featuring integrated tenant billing and utility tracking.",
        image: pChipMongMall,
        category: "Commercial",
        client: "DBD Engineering",
        location: "Street 598, Sangkat Chrang Chamres 1, Khan Russey Keo",
        scope: ["Power Meter", "Tenant Billing"]
    },
    {
        title: "CENTRAL Hospital",
        desc: "Precision AHU control for sterile clean room environments and hospital operations.",
        image: pAirport,
        category: "Healthcare",
        client: "Krorvan I/O.",
        location: "82A, Street 154, Phnom Penh",
        scope: ["Control AHU System For Clean Room"]
    },
    {
        title: "Royal Phnom Penh Hospital",
        desc: "Critical HVAC and Chiller system automation for international hospital standards.",
        image: pAirport,
        category: "Healthcare",
        client: "V2S M.E.P SOLUTIONS CO., LTD",
        location: "888 Russian Federation Blvd (110), Phnom Penh",
        scope: ["Control AHU and Chiller System For Clean Room"]
    },
    {
        title: "Olympia Medical HUB",
        desc: "Integrated medical center AHU control for modern healthcare facilities.",
        image: pAirport,
        category: "Healthcare",
        client: "Krorvan I/O.",
        location: "Olympia City, Building C5, Street 161, Phnom Penh",
        scope: ["Control AHU System For Medical Center"]
    },
];

function ProjectsPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "full">("full");

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


        </div>
    );
}