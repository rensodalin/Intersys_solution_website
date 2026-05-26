import mongoose from "mongoose";
import dotenv from "dotenv";
import Insight from "./model/insight.js";

dotenv.config();

const insights = [
  {
    title: "Herrington International School",
    slug: "herrington-international-school",
    desc: "Preserving the soul of architectural history while injecting the intelligence of the future.",
    category: "Education",
    date: "May 15, 2024",
    image: ["https://scontent.fpnh11-2.fna.fbcdn.net/v/t39.30808-6/518020119_122178815888549695_5897795005240926512_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHfRrkil6c3dRfEc7Vb5oRVqNNcSG-cwTCo01xIb5zBMMUWRYSjJT-NqVe55_-cbA7G-KArOtpd9niekJcOYTGH&_nc_ohc=Xm_EK6Vkz2cQ7kNvwHYXq3l&_nc_oc=Adpy4fWT5GHbfCJH-wIwzOWL5O63IC-5RbVOQzz25CEGvYeAb70i_kg46z_K9Bord9Q&_nc_zt=23&_nc_ht=scontent.fpnh11-2.fna&_nc_gid=BXKUCoCCzvgnYppt7niYcg&_nc_ss=7b2a8&oh=00_Af6CDrFo0LQW8qCR_ETvlJwv9HXTadzGAAGEqa_6xUmJFQ&oe=6A1B45D3"],
    client: "Heritage Cambodia",
    location: "Siem Reap, Cambodia",
    scope: ["Building Mangement System", "Fire Alarm System"],
    section1Title: "Smart Building Technology",
    section1Desc: "Deploying neural networks to map the thermal inertia of heritage stone and brickwork.",
    section1SubTitle: "Intelligent Classroom Environment",
    section1Image: "https://intersys-solutions.com/website_asset/herington_bms.jpg",
    section1SubDesc: "Dynamic redistribution of power and mechanical loads based on real-time occupancy data.",
    section1SubImage: "https://intersys-solutions.com/website_asset/herington1_bms.jpg ",
    articleTitle1: "Fire Alarm System",
    articleContent1: "Testing fire alarm system . ",
    articleBannerImage: "https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-6/545342748_1325179616283868_6944832809084786074_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGKC3oyOuSzVjhRTKu4wjx8dIWnJdIzhUt0hacl0jOFSw6bXcBDrBUIGGJXnnMNecdVk4kX-AQDWUyCRHE4hv1A&_nc_ohc=9fyaayOQ190Q7kNvwHSmudW&_nc_oc=Adoq4uAoya45KHW3MsEKLuLEhDMAPLIYQaxXJhu97btQ2A-d4qXvhkOg08ZEhXbrfhQ&_nc_zt=23&_nc_ht=scontent.fpnh11-1.fna&_nc_gid=DO2zNP5YrDkZV2KEqMG5ig&_nc_ss=7b2a8&oh=00_Af5WJVqR5xKE63WCTRGf5SnNff5Q7VJ2NxAYmS_RFshx7g&oe=6A1B36A8",
    articleTitle2: "Integrating Structural Intelligence",
    articleContent2: "When the HVAC system communicates directly with the building's structural sensors, the result is a symbiotic environment.",
    galleryImages: [
      "https://intersys-solutions.com/website_asset/herington4_bms.jpg",
      "https://intersys-solutions.com/website_asset/herington1_fire.jpg",
      "https://intersys-solutions.com/website_asset/herington2_bms.jpg",
      "https://intersys-solutions.com/website_asset/herington6_bms.jpg"
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
