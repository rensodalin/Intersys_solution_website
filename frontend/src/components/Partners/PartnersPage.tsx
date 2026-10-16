import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import {
  ShieldCheck,
  Award,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  FileCheck,
  Building2,
  Lock,
  Flame,
  Cpu,
  Video,
  Sliders,
} from "lucide-react";

// Real Images & Logos from the project
import heroBg from "@/assets/Hero.webp";
import honeywellLogo from "@/assets/honeywelllogo.png";
import p1 from "@/assets/Partner/p1.png";
import p2 from "@/assets/Partner/p2.png";
import p3 from "@/assets/Partner/p3.webp";
import p4 from "@/assets/Partner/p4.webp";
import p5 from "@/assets/Partner/p5.png";
import p6 from "@/assets/Partner/p6.png";
import p7 from "@/assets/Partner/p7.png";
import p8 from "@/assets/Partner/p8.png";
import p9 from "@/assets/Partner/p9.avif";
import p10 from "@/assets/Partner/p10.png";

type CategoryKey = "all" | "bms" | "fire" | "access" | "surveillance" | "specialized";

interface PartnerData {
  id: string;
  name: string;
  logo: string;
  category: "bms" | "fire" | "access" | "surveillance" | "specialized";
  tierLabel: string;
  scope: string;
  description: string;
  keyProducts: string[];
  link: string;
  linkLabel: string;
}

const PARTNERS_LIST: PartnerData[] = [
  {
    id: "honeywell-bms",
    name: "Honeywell Building Solutions",
    logo: honeywellLogo,
    category: "bms",
    tierLabel: "Authorized System Distributor",
    scope: "Building Management (BMS) & HVAC Automation",
    description:
      "Centralized building management systems using the Niagara N4 framework, Spyder controllers, and energy metering to automate commercial towers, hotels, and hospitals.",
    keyProducts: ["WEBs-N4 / Niagara", "Spyder Controllers", "ComfortPoint DDC", "Energy & IAQ Sensors"],
    link: "/services/building-management",
    linkLabel: "View BMS Services",
  },
  {
    id: "salto",
    name: "SALTO Systems",
    logo: p2,
    category: "access",
    tierLabel: "Certified Solution Partner",
    scope: "Smart Electronic Locks & Cloud Access",
    description:
      "World-class wire-free electronic locking systems, wall readers, and hotel guest room access control operating on SALTO Virtual Network (SVN) and SALTO KS cloud.",
    keyProducts: ["XS4 & AElement Locks", "SALTO Space (SVN)", "SALTO KS Mobile Keys", "Electronic Cylinders"],
    link: "/products/access-control/salto",
    linkLabel: "View SALTO Catalog",
  },
  {
    id: "notifier",
    name: "NOTIFIER by Honeywell",
    logo: p3,
    category: "fire",
    tierLabel: "Authorized Life Safety Partner",
    scope: "Intelligent Addressable Fire Alarms",
    description:
      "UL and FM certified intelligent fire detection panels, high-speed smoke sensors, and digital emergency voice evacuation systems for mission-critical infrastructure.",
    keyProducts: ["ONYX Series Panels", "FlashScan Protocol", "DVC Voice Evacuation", "Networked Panels"],
    link: "/services/fire-alarm",
    linkLabel: "View Fire Alarm Systems",
  },
  {
    id: "honeywell-security",
    name: "Honeywell Access & Security",
    logo: p1,
    category: "access",
    tierLabel: "Enterprise Security Partner",
    scope: "Enterprise Access Control & Turnstile Security",
    description:
      "Modular high-capacity access control architectures with seamless integration to turnstiles, elevator destination dispatch, and multi-tenant privileges.",
    keyProducts: ["Pro-Watch Security Suite", "WIN-PAK Software", "PW-Series Controllers", "OmniClass Readers"],
    link: "/products/access-control/honeywell",
    linkLabel: "View Honeywell Access Products",
  },
  {
    id: "esser",
    name: "ESSER by Honeywell",
    logo: p4,
    category: "fire",
    tierLabel: "European Standard Partner",
    scope: "EN54 / VdS Addressable Life Safety",
    description:
      "Precision German-engineered fire alarm systems adhering strictly to EN54 European norms, deployed across international grade-A properties and industrial plants.",
    keyProducts: ["FlexES Control Panels", "IQ8Quad Multi-Sensors", "Integrated PAVA Voice Alarm", "Wireless Loops"],
    link: "/services/fire-alarm",
    linkLabel: "View EN54 Solutions",
  },
  {
    id: "vesda",
    name: "Xtralis VESDA",
    logo: p5,
    category: "specialized",
    tierLabel: "Certified Aspirating Smoke Integrator",
    scope: "Very Early Warning Smoke Detection",
    description:
      "Aspirating smoke detection systems engineered for clean rooms, server rooms, and telecommunications data centers to detect incipient smoke long before flames appear.",
    keyProducts: ["VESDA-E Series (VEP/VEU)", "LaserFOCUS Detectors", "ASPIRE Pipe Network Design", "Gas Detection"],
    link: "/services/vesda",
    linkLabel: "View VESDA Systems",
  },
  {
    id: "surveillance-enterprise",
    name: "Enterprise Surveillance Partners",
    logo: p6,
    category: "surveillance",
    tierLabel: "Authorized Integrator",
    scope: "IP Video Surveillance & AI Analytics",
    description:
      "High-definition optical and thermal CCTV networks with deep-learning AI analytics for automated perimeter defense, license plate recognition, and centralized VMS.",
    keyProducts: ["AI Analytics Cameras", "Network Video Recorders", "PTZ Perimeter Cameras", "Control Room VMS"],
    link: "/services/surveillance",
    linkLabel: "View Surveillance Systems",
  },
  {
    id: "water-leak",
    name: "Specialized Fluid & Leak Detection",
    logo: p7,
    category: "specialized",
    tierLabel: "Authorized Integrator",
    scope: "Pinpoint Water & Hydrocarbon Leak Sensing",
    description:
      "Direct sensing cables and digital location modules to prevent water and fluid damage under data center raised floors, server rooms, and mechanical shafts.",
    keyProducts: ["Conductive Sensing Cable", "Addressable Alarm Panels", "BMS BACnet Modems", "Solenoid Cutoffs"],
    link: "/services/leak-detection",
    linkLabel: "View Leak Detection",
  },
  {
    id: "audio-visual",
    name: "Commercial Audio Visual & PAVA",
    logo: p8,
    category: "specialized",
    tierLabel: "Certified Systems Partner",
    scope: "Public Address & Emergency Evacuation",
    description:
      "Integrated public address, background music, digital conference systems, and EN54-16 compliant life safety voice alarm systems for commercial venues.",
    keyProducts: ["Digital Signal Processors", "Ceiling & Column Speakers", "Zone Paging Consoles", "Conference Mics"],
    link: "/services/audio-visual",
    linkLabel: "View Audio Visual Services",
  },
  {
    id: "grms",
    name: "Guest Room Management (GRMS)",
    logo: p9,
    category: "bms",
    tierLabel: "Hospitality Automation Partner",
    scope: "Hotel Room Automation & Energy Control",
    description:
      "Smart guest room automation managing lighting scenes, digital thermostats, and occupancy sensing integrated with hotel property management systems (PMS).",
    keyProducts: ["Smart Touch Thermostats", "Keycard Holders & Relays", "PMS Integration Gateways", "Lighting Actuators"],
    link: "/services/room-control",
    linkLabel: "View Room Control Systems",
  },
  {
    id: "intrusion",
    name: "High-Security Intrusion Detection",
    logo: p10,
    category: "surveillance",
    tierLabel: "Perimeter Defense Partner",
    scope: "Bank Vault & Perimeter Intrusion",
    description:
      "Grade-3 certified commercial intrusion alarm systems, microwave perimeter barriers, and seismic sensors designed for banking facilities and secure sites.",
    keyProducts: ["Dual-Tech Motion Detectors", "Seismic Safe Sensors", "Microwave Barriers", "Central Monitoring Links"],
    link: "/services/intrusion-system",
    linkLabel: "View Intrusion Detection",
  },
];

const FILTER_BUTTONS = [
  { key: "all", label: "All Partners" },
  { key: "bms", label: "Building Management (BMS)" },
  { key: "fire", label: "Fire & Life Safety" },
  { key: "access", label: "Access Control & Locks" },
  { key: "surveillance", label: "Surveillance & CCTV" },
  { key: "specialized", label: "Specialized & AV" },
];

export function PartnersPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");

  const filtered = selectedCategory === "all"
    ? PARTNERS_LIST
    : PARTNERS_LIST.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen text-[#1A202C]">
      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0A0F1A] overflow-hidden">
        {/* Real photo background with authentic dark overlays */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Intersys Engineering Facilities"
            className="w-full h-full object-cover opacity-25 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A]/90 via-[#0A0F1A]/75 to-[#0A0F1A]" />
        </div>

        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {/* Honeywell Authorized Brand Seal */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white/90">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Official Authorised Distributor & Engineering Partner</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Our Technology Partners <br />
              <span className="text-[#C00707]">& Certified Brands</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Since 2015, Intersys Solutions has partnered directly with global manufacturers in
              building management, fire protection, and security systems to deliver authentic,
              certified installations across Cambodia and regional construction projects.
            </p>

            {/* Quick credentials link */}
            <div className="pt-2">
              <Link
                to="/credentials"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white underline underline-offset-4 transition-colors"
              >
                <FileCheck className="w-4 h-4 text-red-500" />
                <span>View our official manufacturer certificates & licenses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ─── MAIN PARTNER HIGHLIGHT: HONEYWELL ALLIANCE ─── */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-gray-200">
        <Container>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Brand & Context */}
              <div className="lg:col-span-5 space-y-5">
                <div className="h-14 w-auto inline-flex items-center">
                  <img
                    src={honeywellLogo}
                    alt="Honeywell Authorized Partner"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C00707]">
                    Primary Technology Alliance Since 2015
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3263] leading-snug">
                    Official Honeywell Engineering Distributor in Cambodia
                  </h2>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  Intersys Solutions is Cambodia's premier authorized partner for Honeywell Building
                  Solutions, NOTIFIER fire alarms, and security systems. Our engineering staff is
                  factory-certified to design, supply, install, and commission complete Honeywell
                  building automation and life safety systems.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/services/building-management"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1A3263] hover:bg-[#132549] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Honeywell BMS Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/products/access-control/honeywell"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#1A3263] text-xs font-semibold transition-colors"
                  >
                    <span>Honeywell Product Catalog</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Honeywell Portfolio Breakdown */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Building Management (BMS)",
                    desc: "Niagara WEBs-N4, Spyder DDC, and ComfortPoint HVAC automation.",
                    icon: Cpu,
                    link: "/services/building-management",
                  },
                  {
                    title: "NOTIFIER Fire Alarms",
                    desc: "Intelligent addressable fire protection panels, DVC, and voice evacuation.",
                    icon: Flame,
                    link: "/services/fire-alarm",
                  },
                  {
                    title: "Access Control & Security",
                    desc: "Pro-Watch, WIN-PAK, and PW-series enterprise access management.",
                    icon: Lock,
                    link: "/products/access-control/honeywell",
                  },
                  {
                    title: "Xtralis VESDA Smoke Detection",
                    desc: "Aspirating smoke detection for data centers, telecommunications, and server rooms.",
                    icon: Building2,
                    link: "/services/vesda",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      to={item.link}
                      className="group p-5 rounded-xl border border-gray-200 hover:border-[#1A3263] hover:shadow-md transition-all bg-[#FDFDFD]"
                    >
                      <div className="w-9 h-9 rounded-lg bg-red-50 text-[#C00707] flex items-center justify-center mb-3 group-hover:bg-[#1A3263] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#1A3263] mb-1 group-hover:text-[#C00707] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── PARTNERS DIRECTORY SECTION ─── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3263]">
              Authorized Manufacturer Portfolio
            </h2>
            <p className="text-sm text-gray-600">
              Browse the certified brands and equipment lines we supply, install, and support with full
              manufacturer warranty in Cambodia.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {FILTER_BUTTONS.map((btn) => {
              const active = selectedCategory === btn.key;
              return (
                <button
                  key={btn.key}
                  onClick={() => setSelectedCategory(btn.key as CategoryKey)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-[#1A3263] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Grid of Partners */}
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col justify-between p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 bg-white"
                >
                  <div>
                    {/* Top Tile: Logo + Status */}
                    <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
                      <div className="h-12 w-28 flex items-center justify-start">
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-gray-100 text-gray-700">
                        {item.tierLabel}
                      </span>
                    </div>

                    {/* Partner Name & Scope */}
                    <h3 className="text-base font-bold text-[#1A3263] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#C00707] mb-3">
                      {item.scope}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Key Equipment Lines */}
                    <div className="space-y-2 mb-6">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Core Systems:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.keyProducts.map((p) => (
                          <span
                            key={p}
                            className="text-[11px] px-2 py-0.5 rounded bg-gray-50 border border-gray-200 text-gray-700 font-medium"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Link */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-medium">
                      Genuine Sourcing
                    </span>
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1A3263] hover:text-[#C00707] transition-colors"
                    >
                      <span>{item.linkLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </Container>
      </section>

      {/* ─── WHY AUTHORIZED MATTERS (AUTHENTIC 4 REASONS) ─── */}
      <section className="py-16 bg-[#F8FAFC] border-t border-gray-200">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C00707]">
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3263]">
              Why Work With an Authorized Integrator?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Contractors, developers, and MEP consultants rely on Intersys Solutions because our
              supplies and services are backed directly by the equipment manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: ShieldCheck,
                title: "100% Genuine Hardware",
                desc: "Direct manufacturer supply chain with full serial number verification. Zero grey-market or counterfeit equipment.",
              },
              {
                icon: Award,
                title: "Certified Engineering Staff",
                desc: "Our project engineers receive official training from Honeywell and SALTO technical academies for compliant commissioning.",
              },
              {
                icon: FileCheck,
                title: "Direct Factory Warranty",
                desc: "Official RMA procedures and direct manufacturer warranty coverage preserved for the full contractual duration.",
              },
              {
                icon: Building2,
                title: "Long-Term Spare Parts",
                desc: "Guaranteed access to authentic replacement boards, sensors, and firmware patches for years after project handover.",
              },
            ].map((col) => {
              const Icon = col.icon;
              return (
                <div
                  key={col.title}
                  className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-[#C00707] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1A3263] mb-2">{col.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{col.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── OFFICIAL CTA BAND (CONSISTENT WITH REST OF SITE) ─── */}
      <CtaBand />
    </div>
  );
}
