import mongoose from "mongoose";
import dotenv from "dotenv";
import Insight from "./model/insight.js";

dotenv.config();

const insights = [
  {
    title: "Retrofitting Heritage Buildings",
    slug: "retrofitting-heritage",
    desc: "Preserving the soul of architectural history while injecting the intelligence of the future.",
    category: "Heritage",
    date: "May 15, 2024",
    image: ["https://images.unsplash.com/photo-1673724319943-3a05bf8956e4?q=80&w=1332&auto=format&fit=crop"],
    client: "Heritage Cambodia",
    location: "Siem Reap, Cambodia",
    scope: ["Neural Mapping", "Thermal Inertia", "Load Balancing"],
    section1Title: "Structural Preservation",
    section1Desc: "Deploying neural networks to map the thermal inertia of heritage stone and brickwork.",
    section1SubTitle: "Load Balancers",
    section1SubDesc: "Dynamic redistribution of power and mechanical loads based on real-time occupancy data.",
    section1SubImage: "https://images.unsplash.com/photo-1778483154281-70a8fa019871?q=80&w=687&auto=format&fit=crop",
    articleTitle1: "Autonomous Efficiency",
    articleContent1: "Data-driven climate control systems leverage neural networks to map the thermal inertia of a building...",
    articleBannerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    articleTitle2: "Integrating Structural Intelligence",
    articleContent2: "When the HVAC system communicates directly with the building's structural sensors, the result is a symbiotic environment.",
    galleryImages: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581093803931-46e730e7622e?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200"
    ],
    technicalTitle: "Neural Infrastructure Mapping",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "Smart Hospital Infrastructure",
    slug: "smart-hospital-infrastructure",
    desc: "Designing intelligent healthcare environments that merge operational resilience with patient-centered technology.",
    category: "Healthcare",
    date: "June 02, 2024",
    image: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1400&auto=format&fit=crop"],
    client: "Royal Medical Center",
    location: "Phnom Penh, Cambodia",
    scope: ["Critical Care Automation", "Energy Routing", "System Integration"],
    section1Title: "Critical Care Automation",
    section1Image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1400&auto=format&fit=crop",
    section1Desc: "Integrating adaptive monitoring systems that respond instantly to patient flow and emergency demands.",
    section1SubTitle: "AI Energy Routing",
    section1SubDesc: "Smart load balancing across surgical suites and intensive care units minimizes downtime.",
    section1SubImage: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
    articleTitle1: "Building Resilient Medical Ecosystems",
    articleContent1: "Modern healthcare facilities require infrastructure capable of adapting in real time...",
    articleBannerImage: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=1400&auto=format&fit=crop",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    articleTitle2: "Integrated Intelligence for Healthcare",
    articleContent2: "By connecting environmental sensors, occupancy analytics, and building automation systems...",
    galleryImages: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1400&auto=format&fit=crop"
    ],
    technicalTitle: "Healthcare Systems Integration"
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
