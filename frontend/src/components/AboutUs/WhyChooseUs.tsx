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
  Plus,
  Minus,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import teamWorking from "@/assets/team_working_intersys.png";
import aboutImage2 from "@/assets/Certificates & Licenses/Certificates & Licenses/new/new1.jpg"
import aboutImage3 from "@/assets/Certificates & Licenses/Certificates & Licenses/new/new2.jpg"

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

  const visibleSolutions = showAll ? solutions : solutions.slice(0, 6);

  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          {/* Left Side: Overlapping Images */}
          <div className="lg:w-5/12 relative sticky top-24">

            {/* Background Technical Grid */}
            <div className="absolute -top-10 -left-10 w-full h-full opacity-[0.03] pointer-events-none z-0">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#C00707 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            </div>

            {/* Red Splash Background Effect */}
            <div className="absolute -top-20 -left-20 w-[140%] h-[140%] z-0 opacity-5 pointer-events-none">
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="fill-[#C00707]">
                <path d="M414,330.5Q373,411,289,425.5Q205,440,146,380.5Q87,321,79.5,236.5Q72,152,143.5,108.5Q215,65,296,87Q377,109,416,179.5Q455,250,414,330.5Z" />
              </svg>
            </div>

            <div className="relative z-10 flex items-end pt-10">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-4/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-sm overflow-hidden border border-white/20"
              >
                <img
                  src={aboutImage3}
                  alt="Intersys Team"
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-100 hover:scale-105"
                />
              </motion.div>

              {/* Overlapping Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-1/2 -ml-32 mb-[-30px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-sm border-[6px] border-white overflow-hidden relative z-20 group"
              >
                <img
                  src={aboutImage2}
                  alt="Technician"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </motion.div>

              {/* Floating Tech Detail */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-brand-red z-30"
              />

              {/* Compact Experience Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, x: -20 }}
                whileInView={{ scale: 1, opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                className="absolute left-[-10px] bottom-8 z-30 bg-[#C00707] text-white p-5 shadow-[0_15px_30px_rgba(192,7,7,0.3)] min-w-[160px]"
              >
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-1 flex items-baseline gap-1">
                    10<span className="text-sm">+</span>
                  </h3>
                  <div className="w-8 h-[2px] bg-white/30 mb-2" />
                  <p className="text-[10px] font-bold uppercase tracking-wider leading-tight">
                    Years of <br /> Engineering <br /> Excellence
                  </p>
                </div>
                {/* Badge accent */}
                <div className="absolute top-0 right-0 p-1.5 opacity-20">
                  <ShieldCheck size={28} strokeWidth={1} />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-7/12 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#C00707]">

              </div>
              <h2 className="text-4xl lg:text-4xl font-black text-[#1A3263] leading-[1.1]">
                Why Choose Us
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-lg">
                We provide integrated engineering systems designed for safety, efficiency, and long-term performance.
              </p>
            </div>

            {/* Detailed Solutions (Expandable Grid - Original Information Only) */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-[#1A3263] flex items-center gap-3">

                Explore Our Solutions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleSolutions.map((item, i) => (
                  <motion.div
                    key={item.title}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-sm border border-gray-100 bg-white shadow-sm transition-all duration-300 ${expanded === i ? "ring-2 ring-[#C00707] shadow-xl" : "hover:shadow-md"
                      }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-sm transition-colors ${expanded === i ? "bg-[#C00707] text-white" : "bg-gray-50 text-[#C00707]"}`}>
                          <item.icon size={18} />
                        </div>
                        <button
                          onClick={() => setExpanded(expanded === i ? null : i)}
                          className="text-[#C00707] hover:scale-110 transition-transform"
                        >
                          {expanded === i ? <Minus size={16} /> : <Plus size={16} />}
                        </button>
                      </div>

                      <h4 className="text-[15px] font-bold text-[#1A3263] mb-1">{item.title}</h4>
                      <p className="text-[13px] text-gray-400 line-clamp-1">
                        {item.sub}
                      </p>

                      <AnimatePresence>
                        {expanded === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-50"
                          >
                            <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">{item.desc}</p>
                            <ul className="space-y-2">
                              {item.details.map((d, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className="w-1 h-1 bg-[#C00707] rounded-full mt-1.5 shrink-0" />
                                  <span className="text-[12px] text-gray-600 leading-snug">{d}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View More Button */}
              <div className="flex flex-wrap items-center gap-10 pt-6">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-[#C00707] text-white px-8 py-4 font-bold text-xs hover:bg-[#1A3263] transition-all shadow-xl shadow-[#C00707]/20"
                >
                  {showAll ? "Show Less" : "Discover More"}
                </button>


              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Decorative Technical Element */}
      <div className="absolute bottom-[-50px] right-[-50px] opacity-[0.03] pointer-events-none hidden lg:block">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" />
        </svg>
      </div>
    </section>
  );
}

export function SolutionsExpandableGrid() {
  return <WhyChooseUs />;
}
