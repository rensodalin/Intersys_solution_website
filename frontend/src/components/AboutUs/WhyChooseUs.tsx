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
} from "lucide-react";
import teamWorking from "@/assets/team_working_intersys.png";

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

  const visible = showAll ? solutions : solutions.slice(0, 6);

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <img
              src={teamWorking}
              alt="Team"
              className="w-full rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* CONTENT */}
          <div className="lg:col-span-7">

            <div className="mb-12 max-w-xl">
              <div className="w-12 h-[2px] bg-red-600 mb-4" />

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>

              <p className="text-gray-500 leading-relaxed">
                We provide integrated engineering systems designed for safety,
                efficiency, and long-term performance.
              </p>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-2 gap-6">
              {visible.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition"
                >
                  <div className="flex gap-4">
                    <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-gray-500" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-base font-semibold text-gray-900">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {item.desc}
                      </p>

                      <p className="text-xs text-gray-400">
                        {item.sub}
                      </p>

                      <button
                        onClick={() => setExpanded(expanded === i ? null : i)}
                        className="text-sm text-red-600 font-medium hover:underline"
                      >
                        {expanded === i ? "Hide details" : "View details"}
                      </button>

                      <AnimatePresence>
                        {expanded === i && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 space-y-2 border-l-2 border-red-100 pl-3"
                          >
                            {item.details.map((d, idx) => (
                              <li key={idx} className="text-sm text-gray-500">
                                {d}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* BUTTON */}
            <div className="mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-red-600 transition"
              >
                {showAll ? "Show less" : "View all solutions"}
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