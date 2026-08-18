import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./model/event.js";

dotenv.config();

const pastCompanyEvents = [
  {
    title: "Intersys Annual Building Tech & Security Expo 2025",
    tagline: "Showcasing Next-Gen AI Access Control, BMS & Fire Safety Systems",
    description:
      "A look back at our landmark engineering showcase in Phnom Penh. We hosted over 500 industry leaders, architects, and building owners to demonstrate integrated Honeywell & SALTO security infrastructure.",
    category: "Past Event Showcase",
    date: "November 18 - 20, 2025",
    time: "Completed",
    location: "Phnom Penh International Convention Center",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    registrationUrl: "/portfolio",
    highlights: [
      "Over 500+ Attendees & Building Developers",
      "Live Integration Demos of Honeywell Pro-Watch & Salto Wireless Locks",
      "Keynote Speeches by Senior Systems Engineers",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
    ],
    isActive: true,
    isFeatured: true,
    order: 1,
  },
  {
    title: "Intersys Engineers Summit & Innovation Showcase 2024",
    tagline: "Celebrating 10 Years of Smart Engineering in Cambodia",
    description:
      "Our team gathered with regional partners to unveil automated building management solutions and celebrate a decade of engineering excellence.",
    category: "Company Milestone",
    date: "December 14, 2024",
    time: "Completed",
    location: "Intersys Solutions HQ, Phnom Penh",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    registrationUrl: "/about/company-profile",
    highlights: [
      "Unveiled Next-Gen Building Control Room Prototypes",
      "Partner Recognition Awards with Honeywell Security",
      "Technological Roadmap Presentation for 2025+",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
    ],
    isActive: true,
    isFeatured: false,
    order: 2,
  },
];

async function seed() {
  try {
    const mongoUri = process.env.URI || "mongodb://localhost:27017/intersys";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for Events seeding...");

    // Remove existing events to replace with past company events showcase
    await Event.deleteMany({});
    console.log("Cleared old events...");

    for (const evtData of pastCompanyEvents) {
      await Event.create(evtData);
      console.log(`✅ Created past company event with photo gallery: ${evtData.title}`);
    }

    console.log("🎉 Events seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Events seeding error:", err);
    process.exit(1);
  }
}

seed();
