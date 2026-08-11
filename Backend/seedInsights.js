import mongoose from "mongoose";
import dotenv from "dotenv";
import Insight from "./model/insight.js";

dotenv.config();

const insights = [
  {
    title: "Haram Makkah — Intelligent Water Leak Detection",
    slug: "haram-makkah-water-leak-detection",
    desc: "Implementation of a comprehensive TTK liquid leak detection infrastructure protecting critical technical zones, MATAF areas, and Zamzam water pipelines.",
    category: "Religious & Historic Infrastructure",
    date: "Jan 10, 2025",
    image: [
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop"
    ],
    client: "Presidency of the Two Holy Mosques",
    location: "Makkah, Kingdom of Saudi Arabia",
    scope: [
      "Shamiyah Expansion Buildings",
      "MATAF Central Area",
      "Zamzam Water Pipelines",
      "TTK FG-NET & Sense Cable Monitoring"
    ],
    section1Title: "About The Project",
    section1Desc: `
      <p class="mb-3"><strong>Masjid al-Haram</strong>, also known as the Sacred Mosque or the Great Mosque of Mecca, is the holiest site in Islam and, as of 2025, the largest mosque in the world, with a capacity to accommodate more than two million worshippers. The mosque’s current structure covers an area of over 400,000 square meters.</p>
      <p class="mb-3">This project involves the implementation of an intelligent water leak detection system to protect critical technical and service areas within:</p>
      <ul class="list-disc pl-5 space-y-1.5 mb-3 font-medium text-slate-700">
        <li>The <strong>Shamiyah Expansion Buildings</strong> (large auxiliary buildings supporting mosque operations),</li>
        <li>The <strong>MATAF area</strong> (the open central space around the Kaaba where pilgrims perform the Tawaf ritual),</li>
        <li>Associated technical and service facilities.</li>
      </ul>
      <p class="mb-3">The primary objectives are early leak detection, operational reliability, and risk prevention in an environment that operates continuously and cannot tolerate service disruption.</p>
      <p>As a manufacturer and solution provider of water leak detection systems, TTK is actively involved in the system design, installation, and phased commissioning of a comprehensive monitoring infrastructure across the site.</p>
    `,
    section1Image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1400&auto=format&fit=crop",
    section1SubTitle: "TTK’s Engineering Solution",
    section1SubDesc: `
      <p class="font-bold text-[#0A0F1A] mb-2">Protected Areas:</p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-xs sm:text-sm text-slate-700">
        <li>Technical rooms (peripheral protection)</li>
        <li>Wet risers (lowest riser levels)</li>
        <li>Sump pits</li>
        <li>Service trenches carrying: <strong>Chilled water</strong>, <strong>Zamzam water</strong> (holy water drawn from the historic Zamzam Well), <strong>Firefighting pipelines</strong>, <strong>Storm water drainage</strong></li>
      </ul>
      <p class="font-bold text-[#0A0F1A] mb-2">Equipment Installed / Under Installation:</p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-xs sm:text-sm text-slate-700">
        <li><strong>FG-NET</strong> digital control panels</li>
        <li><strong>FG-BBOX</strong> satellite devices connected to FG-NET panels</li>
        <li><strong>FG-DTCS</strong> locating controllers</li>
        <li><strong>FG-ECS / FG-EC</strong> addressable water and conductive liquid sense cables</li>
      </ul>
      <p class="text-xs sm:text-sm text-slate-600"><strong>System Configuration:</strong> Distributed control panels across multiple zones with approximately <strong>10,000 meters of sense cable</strong> providing continuous coverage throughout the Haram Makkah facilities.</p>
    `,
    section1SubImage: "https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=1200&auto=format&fit=crop",
    articleTitle1: "Protected Areas & Equipment Deployment",
    articleContent1: `
      <p>Installation activities are carried out in a phased manner, aligned with site access constraints and the overall construction and expansion schedule.</p>
      <p>Continuous monitoring cables are laid directly beneath pipelines in on-site service trenches for immediate alarm triggering upon moisture detection.</p>
    `,
    articleBannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
    articleTitle2: "Conclusion",
    articleContent2: `
      <p class="mb-3">The Haram Makkah project represents one of the largest ongoing installations of TTK water leak detection systems. Through this project, critical technical rooms, wet shafts, extensive trench networks, service buildings, and under-raised floor areas are being systematically protected.</p>
      <p class="mb-3">Particular attention is being given to <strong>Zamzam water pipelines and trenches</strong>, where early leak detection is essential to preserve the sanctity of the holy water and prevent any potential loss. The system has been designed to provide continuous monitoring, clear alarm indication, and accurate leak location identification, supporting faster response and effective maintenance.</p>
      <p>Once fully completed, this installation will demonstrate the scalability and reliability of TTK solutions in highly sensitive, mission-critical environments, while reflecting a careful and coordinated execution approach aligned with the unique requirements of the Haram Makkah site.</p>
    `,
    galleryImages: [
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=1400&auto=format&fit=crop"
    ],
    technicalTitle: "Continuous Sensing Infrastructure",
    pdfUrl: "/documents/project-references-bms.pdf"
  },
  {
    title: "Herrington International School",
    slug: "herrington-international-school",
    desc: "Preserving the soul of architectural history while injecting the intelligence of the future.",
    category: "Education",
    date: "May 15, 2024",
    image: ["https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1400&auto=format&fit=crop"],
    client: "Heritage Cambodia",
    location: "Siem Reap, Cambodia",
    scope: ["Building Management System", "Fire Alarm System"],
    section1Title: "About The Project",
    section1Desc: "<p>Deploying neural networks to map the thermal inertia of heritage stone and brickwork while providing centralized facility automation.</p>",
    section1Image: "https://intersys-solutions.com/website_asset/herington_bms.jpg",
    section1SubTitle: "TTK's Engineering Solution",
    section1SubDesc: "<p>Dynamic redistribution of power and mechanical loads based on real-time occupancy data and environmental telemetry.</p>",
    section1SubImage: "https://intersys-solutions.com/website_asset/herington1_bms.jpg",
    articleTitle1: "Fire & Life Safety Integration",
    articleContent1: "<p>Testing and commissioning automated early smoke detection and rapid response protocols across historic campus buildings.</p>",
    articleBannerImage: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1400&auto=format&fit=crop",
    articleTitle2: "Conclusion",
    articleContent2: "<p>When the HVAC system communicates directly with the building's structural sensors, the result is a unified, intelligent, and energy-efficient environment.</p>",
    galleryImages: [
      "https://intersys-solutions.com/website_asset/herington4_bms.jpg",
      "https://intersys-solutions.com/website_asset/herington1_fire.jpg",
      "https://intersys-solutions.com/website_asset/herington2_bms.jpg",
      "https://intersys-solutions.com/website_asset/herington6_bms.jpg"
    ],
    technicalTitle: "Neural Infrastructure Mapping",
    pdfUrl: "/documents/project-references-bms.pdf"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB...");
    await Insight.deleteMany({});
    await Insight.insertMany(insights);
    console.log("Seeded insights successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
