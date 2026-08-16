import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";

import {
  Building2,
  Music,
  Flame,
  Lock,
  Video,
  Volume2,
  Car,
  Droplets,
  Wind,
  Bell,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import aboutImage3 from "@/assets/Certificates & Licenses/Certificates & Licenses/new/image.webp";

const solutions = [
  {
    icon: Building2,
    title: "Building Management",
    desc: "Centralized control of HVAC, lighting, and energy systems.",
    sub: "ComfortPoint® Open / Niagara",
    details: [
      "Unified monitoring of HVAC, lighting, and energy.",
      "Algorithms adjust consumption based on occupancy.",
      "Cloud-based mobile apps for anywhere monitoring.",
    ],
  },
  {
    icon: Flame,
    title: "Fire Alarm Systems",
    desc: "Intelligent sensing and addressable loop technology.",
    sub: "NOTIFIER® / ESSER",
    details: [
      "Distinguishes real smoke from steam/dust.",
      "Pinpoints exact fire location via addressable loops.",
      "Digital voice commands guide safety evacuation.",
    ],
  },
  {
    icon: Video,
    title: "Surveillance (CCTV)",
    desc: "AI-driven analytics and high-level encryption.",
    sub: "MAXPRO® VMS / AI Cameras",
    details: [
      "Smart Motion Detection and intrusion alerts.",
      "Clear images in total darkness (WDR/IR).",
      "Secure boot and high-level encryption.",
    ],
  },
  {
    icon: Lock,
    title: "Access Control",
    desc: "Role-based clearance and biometric authentication.",
    sub: "Pro-Watch® / LenelS2",
    details: [
      "Granular control based on time and clearance.",
      "Support for smart cards, mobile, and biometrics.",
      "Real-time employee tracking during emergencies.",
    ],
  },
  {
    icon: Music,
    title: "Audio Visual Systems",
    desc: "High-fidelity sound and zone management.",
    sub: "X-618 / Variodyn D1",
    details: [
      "High-fidelity sound for music and paging.",
      "Emergency override for evacuation announcements.",
      "Matrix switching for multi-room audio.",
    ],
  },
  {
    icon: Wind,
    title: "VESDA (Smoke)",
    desc: "Aspirating smoke detection for early warning.",
    sub: "VESDA-E Series",
    details: [
      "Actively samples air for earliest possible detection.",
      "Advanced particle analysis prevents false alarms.",
      "Ideal for high-sensitivity environments (Data Centers).",
    ],
  },
  {
    icon: Volume2,
    title: "Public Address",
    desc: "Digital processing and intelligent zone selection.",
    sub: "X-618 / Variodyn",
    details: [
      "High intelligibility in noisy industrial areas.",
      "Easy touch-control zone selection.",
      "Standardized protocol compliance.",
    ],
  },
  {
    icon: Car,
    title: "Car Parking",
    desc: "ANPR and automated guidance systems.",
    sub: "Video Analytics & Sensors",
    details: [
      "License plate recognition for automated entry.",
      "LED signage directs drivers to empty spots.",
      "Integrated payment and occupancy tracking.",
    ],
  },
  {
    icon: Droplets,
    title: "Leakage Detection",
    desc: "Pinpoint accuracy for liquid and gas leaks.",
    sub: "Searchline / WD3",
    details: [
      "Identifies exact distance to liquid leaks.",
      "Triggers automated valves for rapid shut-off.",
      "Essential for industrial safety.",
    ],
  },
  {
    icon: Bell,
    title: "Intrusion Alarm",
    desc: "Perimeter protection and motion sensors.",
    sub: "Galaxy® Dimension",
    details: [
      "Glass-break and vibration sensors.",
      "Dual-tech motion detection.",
      "Integrated with access control.",
    ],
  },
  {
    icon: Cpu,
    title: "Room Control",
    desc: "Hospitality-focused smart automation.",
    sub: "INNCOM",
    details: [
      "Adjusts AC/lights based on occupancy.",
      "Auto 'Do Not Disturb' signaling.",
      "Energy reporting system.",
    ],
  },
];

export function WhyChooseUs() {
  const [showAll, setShowAll] = React.useState(false);
  const [expanded, setExpanded] = React.useState<number | null>(null);

  const visibleSolutions = showAll
    ? solutions
    : solutions.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-24 items-start">

          {/* LEFT SIDE */}
          <div className="relative lg:sticky top-24 mb-12 lg:mb-0">
            <div className="relative">

              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-md overflow-hidden"
              >
                <img
                  src="https://files.intersys-solutions.com.kh/RandomIMG/774517225_1747710826274097_7002261266327147878_n.jpg"
                  alt="Intersys Team"
                  className="w-full h-[460px] object-cover"
                />
              </motion.div>

              {/* Floating Image */}


              {/* Experience Card */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute left-6 bottom-6 bg-white/95 backdrop-blur-md rounded-md px-5 py-3.5 shadow-xl border border-gray-100"
              >
                <div className="flex items-end gap-1">
                  <h3 className="text-3xl font-black text-[#111827] leading-none">
                    10
                  </h3>
                  <span className="text-[#C00707] text-lg font-bold mb-0.5">
                    +
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-1 leading-5">
                  Years of engineering excellence
                </p>
              </motion.div> */}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="pt-6 sm:pt-10 lg:pt-0">

            {/* Heading */}
            <div className="max-w-2xl">

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl lg:text-4xl font-black tracking-tight text-[#111827] leading-[1.2]"
              >
                Engineering
                <span className="block text-[#C00707]">
                  Built Around Reliability
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-[15px] leading-8 text-gray-500 max-w-xl"
              >
                Authorized Honeywell Engineering Services Distributor (ESD).
              </motion.p>
            </div>

            {/* Solutions */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleSolutions.map((item, i) => {
                const isExpanded = expanded === i;

                return (
                  <motion.div
                    key={item.title}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    onClick={() =>
                      setExpanded(isExpanded ? null : i)
                    }
                    className={`
                      group cursor-pointer
                      rounded-md
                      border
                      border-gray-100
                      bg-white
                      p-5
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-[#C00707]/20
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]
                    `}
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-[#C00707]">
                          <item.icon size={18} strokeWidth={1.8} />
                        </div>

                        <div>
                          <h4 className="text-[15px] font-semibold text-[#111827] leading-snug">
                            {item.title}
                          </h4>

                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.sub}
                          </p>
                        </div>
                      </div>

                      <ArrowRight
                        size={16}
                        className={`
                          text-[#111827]
                          transition-transform duration-300 shrink-0
                          ${isExpanded ? "rotate-90" : ""}
                        `}
                      />
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4">
                            <p className="text-xs leading-5 text-gray-500">
                              {item.desc}
                            </p>

                            <ul className="space-y-2 mt-4">
                              {item.details.map((d, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 text-xs text-gray-600 leading-5"
                                >
                                  <CheckCircle2
                                    size={14}
                                    className="text-[#C00707] mt-0.5 shrink-0"
                                  />

                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Button */}
            <div className="pt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="
                  inline-flex items-center gap-2.5
                  px-5 py-3
                  rounded-md
                  bg-[#111827]
                  text-white
                  text-xs
                  font-semibold
                  transition-all duration-300
                  hover:bg-[#C00707]
                "
              >
                {showAll
                  ? "Show Less"
                  : "Explore All Solutions"}

                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function SolutionsExpandableGrid() {
  return <WhyChooseUs />;
}