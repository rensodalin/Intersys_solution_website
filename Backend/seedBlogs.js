import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./model/blog.js";

dotenv.config();

export const initialBlogs = [
  {
    title: "What Is an Integrated Building Management System?",
    slug: "what-is-an-integrated-building-management-system",
    subtitle: "Discover how modern Integrated Building Management Systems (IBMS) synchronize HVAC, lighting, security, and power monitoring into a unified intelligent command center.",
    category: "Technology",
    readTime: "2 min read",
    date: "August 22, 2026",
    commentsCount: 4,
    featured: true,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    summary: "An Integrated Building Management System (IBMS) connects, automates, and monitors all vital mechanical, electrical, and electromechanical facilities within modern architecture.",
    author: {
      name: "Eng. David Montgomery",
      role: "Author",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    quote: '"True building intelligence is achieved when operational technology (OT) seamlessly communicates with enterprise information systems."',
    section1Title: "What Is an Integrated Building Management System?",
    section1Content1: "An Integrated Building Management System (IBMS) is a master supervisory platform that connects, automates, and monitors all vital mechanical, electrical, and electromechanical facilities within modern commercial and institutional architecture.",
    section1Content2: "Unlike legacy isolated controllers, an IBMS acts as the central nervous system of a facility, unifying disparate industrial protocols such as BACnet, Modbus, and LonWorks into an actionable single-pane-of-glass interface.",
    sideImage1: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
    sideImage1Caption: "High-density operations center running real-time IBMS analytics.",
    sideImage2: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
    sideImage2Caption: "Direct digital controllers communicating via high-speed BACnet IP backbone.",
    section2Title: "Key Systems Connected to BMS",
    section2Intro: "A comprehensive IBMS coordinates multiple specialized subsystems across the entire building envelope:",
    subsystems: [
      { name: "HVAC Automation", desc: "Variable Air Volume (VAV) controllers, chillers, cooling towers, and air handling units (AHUs)." },
      { name: "Intelligent Lighting", desc: "Daylight harvesting sensors, automated occupancy dimming, and emergency egress lighting." },
      { name: "Power & Sub-Metering", desc: "Real-time kilowatt-hour demand tracking, power quality telemetry, and backup generator sync." },
      { name: "Physical Access & CCTV", desc: "Integrated badge readers, biometrics, turnstiles, and fire safety overrides." },
    ],
    protocolTable: [
      { subsystem: "HVAC Chillers & Boilers", protocol: "BACnet / IP", impact: "25% - 35% reduction" },
      { subsystem: "Smart LED Arrays", protocol: "DALI-2 / KNX", impact: "40% - 60% reduction" },
      { subsystem: "Metering & Switchgear", protocol: "Modbus RTU/TCP", impact: "Peak-demand mitigation" },
    ],
    section3Title: "Improve Energy Efficiency",
    section3Intro: "BMS helps buildings use energy more efficiently by monitoring and continuously optimizing dynamic building systems.",
    methodologies: [
      { number: "1.", title: "Monitor energy consumption", desc: "Identify real-time baseline fluctuations and load spikes across individual floor zones." },
      { number: "2.", title: "Optimize HVAC operation", desc: "Dynamic chilled water reset routines based on ambient enthalpy and occupancy density." },
      { number: "3.", title: "Control lighting schedules", desc: "Astro-clock scheduling combined with PIR multi-sensors." },
      { number: "4.", title: "Identify abnormal energy usage", desc: "Automated fault detection and diagnostics (AFDD) alert engineering teams to malfunctioning dampers or stuck valves before energy waste escalates." },
    ],
    section3Image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    section3ImageCaption: "Energy consumption dashboard tracking tenant sub-meter trends.",
    section4Title: "Why Integrated BMS Matters",
    section4Content1: "An Integrated BMS provides far more than centralized control. It creates a connected, resilient environment where critical building systems can be monitored, analyzed, and optimized together.",
    section4Content2: "As enterprise ESG mandates tighten and smart grid interactions become mandatory, investing in an extensible IBMS architecture ensures your assets remain compliant, cost-effective, and future-proof for decades to come.",
    section4Image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    section4ImageCaption: "The future of sustainable, human-centric built environments.",
  },
  {
    title: "Protecting High-Density Data Centers with Addressable Leak Sensing",
    slug: "water-leak-detection-critical-data-centers",
    subtitle: "A deep dive into addressable sensing cables for server rooms and semiconductor fabs.",
    category: "Leak Detection",
    readTime: "4 min read",
    date: "August 18, 2026",
    commentsCount: 2,
    featured: false,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
    summary: "Water damage is one of the top causes of unplanned downtime in data centers. Learn how addressable sensing cables pinpoint liquid leaks to within 1 meter.",
    author: {
      name: "Chun Sochet",
      role: "Managing Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  },
  {
    title: "Keyless Modernization: Salto Wireless Access in High-Rises",
    slug: "wireless-access-control-integration-salto",
    subtitle: "Overcoming legacy wiring constraints with smart locksets and virtual networks.",
    category: "Access Control",
    readTime: "5 min read",
    date: "August 12, 2026",
    commentsCount: 6,
    featured: false,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1000&auto=format&fit=crop",
    summary: "Retrofitting access control in commercial buildings no longer requires tearing open walls. Discover how Salto Wireless enables keyless access deployment.",
    author: {
      name: "Systems Architect",
      role: "Access & Security Specialist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
  },
  {
    title: "Early Warning Fire Safety: Why VESDA Aspirating Detection Matters",
    slug: "advanced-vesda-aspirating-smoke-detection",
    subtitle: "Detecting smoldering fires hours before traditional optical smoke detectors trigger.",
    category: "Fire Protection",
    readTime: "5 min read",
    date: "July 29, 2026",
    commentsCount: 1,
    featured: false,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
    summary: "In mission-critical spaces like cleanrooms and server vaults, standard smoke detectors react too late. VESDA continuous air sampling detects fires early.",
    author: {
      name: "Safety Engineering Dept",
      role: "Fire Safety Advisory",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
  },
  {
    title: "AI Video Analytics: Elevating CCTV Beyond Passive Recording",
    slug: "cctv-surveillance-ai-analytics-cambodia",
    subtitle: "Automated perimeter detection, facial recognition, and crowd density insights.",
    category: "Surveillance",
    readTime: "4 min read",
    date: "July 15, 2026",
    commentsCount: 3,
    featured: false,
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1000&auto=format&fit=crop",
    summary: "Modern security cameras do far more than store footage. AI video analytics actively monitor boundaries and trigger automated alerts in real time.",
    author: {
      name: "Security Division",
      role: "Surveillance Team",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    },
  },
  {
    title: "Designing Hybrid Corporate Workspaces with Smart AV Solutions",
    slug: "audio-visual-smart-meeting-room-guide",
    subtitle: "Seamless video conferencing, wireless screen sharing, and acoustic design.",
    category: "Audio Visual",
    readTime: "4 min read",
    date: "July 02, 2026",
    commentsCount: 5,
    featured: false,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
    summary: "Create friction-free boardroom environments with automated lighting, motorized screens, and integrated video conferencing equipment.",
    author: {
      name: "AV Project Team",
      role: "Media Solutions Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
  },
];

export async function seedBlogs() {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      console.log("Seeding default blog articles into MongoDB...");
      await Blog.insertMany(initialBlogs);
      console.log("Seeded blogs successfully!");
    }
  } catch (err) {
    console.error("Auto-seed blogs error:", err);
  }
}

if (process.argv[1]?.endsWith("seedBlogs.js")) {
  mongoose.connect(process.env.URI).then(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
    console.log("Manual blog seed complete!");
    process.exit();
  });
}
