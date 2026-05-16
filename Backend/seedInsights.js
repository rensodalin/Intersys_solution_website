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

    // Heritage style sections
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
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    feature1Title: "Thermal Inertia Mapping",
    feature1Desc: "Using neural networks to map thermal retention in heritage stone.",
    feature2Title: "Dynamic Load Balancing",
    feature2Desc: "Redistributing mechanical loads based on real-time occupancy data."
  },
  {
    title: "Smart Hospital Infrastructure",
    slug: "smart-hospital-infrastructure",
    desc: "Designing intelligent healthcare environments that merge operational resilience with patient-centered technology.",
    category: "Healthcare",
    date: "June 02, 2024",
    image: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1400&auto=format&fit=crop"
    ],
    client: "Royal Medical Center",
    location: "Phnom Penh, Cambodia",
    scope: ["Critical Care Automation", "Energy Routing", "System Integration"],

    // SECTION 1
    section1Title: "Critical Care Automation",
    section1Image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1400&auto=format&fit=crop",
    section1Desc:
      "Integrating adaptive monitoring systems that respond instantly to patient flow and emergency demands.",

    section1SubTitle: "AI Energy Routing",
    section1SubDesc:
      "Smart load balancing across surgical suites and intensive care units minimizes downtime and ensures uninterrupted care.",

    section1SubImage:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",

    // ARTICLE CONTENT
    articleTitle1: "Building Resilient Medical Ecosystems",
    articleContent1:
      "Modern healthcare facilities require infrastructure capable of adapting in real time. Intelligent HVAC systems, automated emergency power routing, and predictive maintenance tools work together to reduce operational risk while improving patient comfort and staff efficiency.",

    articleBannerImage:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=1400&auto=format&fit=crop",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",

    articleTitle2: "Integrated Intelligence for Healthcare",
    articleContent2:
      "By connecting environmental sensors, occupancy analytics, and building automation systems into a unified platform, hospitals gain the ability to optimize response times, maintain critical environmental conditions, and improve long-term operational sustainability.",

    // GALLERY
    galleryImages: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1400&auto=format&fit=crop"
    ],
    technicalTitle: "Healthcare Systems Integration",
    feature1Title: "Critical Care Automation",
    feature1Desc: "Adaptive monitoring systems responding instantly to patient flow.",
    feature2Title: "AI Energy Routing",
    feature2Desc: "Minimizing downtime in surgical suites through smart load balancing."
  },
  {
    title: "Eco-Conscious Urban Development",
    slug: "eco-conscious-urban-development",
    desc: "Redefining the urban landscape through sustainable energy grids and bio-integrated architectural systems.",
    category: "Sustainability",
    date: "July 12, 2024",
    image: [
      "https://images.unsplash.com/photo-1778483154281-70a8fa019871?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    client: "Green Urban Initiative",
    location: "Sihanoukville, Cambodia",
    scope: ["Green Grid Analytics", "Bio-Integrated Regulation", "Energy Optimization"],

    // SECTION 1
    section1Title: "Green Grid Integration",
    section1Image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1400&auto=format&fit=crop",
    section1Desc:
      "Implementing decentralized energy networks that prioritize renewable sources while maintaining peak efficiency.",

    section1SubTitle: "Bio-Adaptive Systems",
    section1SubDesc:
      "Buildings that breathe: integrating natural ventilation and thermal regulation inspired by biological ecosystems.",

    section1SubImage:
      "https://images.unsplash.com/photo-1623239260654-329189722b4b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    // ARTICLE CONTENT
    articleTitle1: "The Future of Carbon-Neutral Cities",
    articleContent1:
      "Transitioning to carbon neutrality requires more than just clean energy; it demands an intelligent orchestration of every building's lifecycle. By leveraging AI-driven resource management, modern developments can reduce their footprint while enhancing the quality of life for urban dwellers.",

    articleBannerImage:
      "https://images.unsplash.com/photo-1776514222634-036fe01052a6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",

    articleTitle2: "Data-Driven Sustainability",
    articleContent2:
      "Real-time analytics allow for the precise optimization of water usage, waste management, and lighting systems. This systemic approach ensures that sustainability is not just a feature, but the core foundation of the modern metropolis.",

    // GALLERY
    galleryImages: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1778510093549-d20b562fad34?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1400&auto=format&fit=crop"
    ],
    technicalTitle: "Sustainable Grid Deployment",
    feature1Title: "Green Grid Analytics",
    feature1Desc: "Optimizing renewable energy distribution across urban blocks.",
    feature2Title: "Bio-Integrated Regulation",
    feature2Desc: "Natural ventilation systems controlled by environmental sensors."
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
