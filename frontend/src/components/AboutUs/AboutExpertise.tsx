import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import {
  Cpu,
  Flame,
  ShieldCheck,
  Video,
  Volume2,
  Hotel,
  Droplets,
  Car,
  Server,
  Network
} from "lucide-react";

const expertise = [
  {
    icon: Cpu,
    title: "Building Management Systems",
    desc: "Intelligent automation and control for HVAC, lighting, and power systems."
  },
  {
    icon: Flame,
    title: "Fire Alarm Systems",
    desc: "Advanced detection and suppression solutions compliant with international standards."
  },
  {
    icon: ShieldCheck,
    title: "Security Access Control",
    desc: "Comprehensive identity management and facility entry protection."
  },
  {
    icon: Video,
    title: "CCTV Surveillance Systems",
    desc: "High-definition video monitoring with intelligent analytics and storage."
  },
  {
    icon: Volume2,
    title: "Audio Visual Conference",
    desc: "Seamless collaboration tools for modern workspaces and meeting rooms."
  },
  {
    icon: Hotel,
    title: "Room Control Unit",
    desc: "Personalized guest experiences through integrated hotel automation systems."
  },
  {
    icon: Droplets,
    title: "Leak Detection Systems",
    desc: "Critical protection for water, oil, and fuel in high-value infrastructure."
  },
  {
    icon: Car,
    title: "Parking & ANPR",
    desc: "Automated entry and monitoring with advanced vehicle management."
  },
  {
    icon: Server,
    title: "Data Center Monitoring",
    desc: "Environmental control and power monitoring for mission-critical IT facilities."
  },
  {
    icon: Network,
    title: "Smart Integration IoT",
    desc: "Unified dashboarding for real-time insights across all building assets."
  }
];

export function AboutExpertise() {
  return (
    <section className="py-24 bg-[#05080F] border-t border-white/5">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              Our Expertise
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-xs text-sm md:text-right leading-relaxed"
          >
            We
            specialize in a wide range of integrated
            engineering and ELV solutions designed to
            make buildings smarter and safer
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-sm overflow-hidden">
          {expertise.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`p-10 flex flex-col items-start gap-6 group hover:bg-white/[0.02] transition-colors relative
                ${idx < 4 ? "" : "border-t border-white/10"}
                ${(idx + 1) % 4 === 0 ? "" : "lg:border-r border-white/10"}
                ${(idx + 1) % 2 === 0 ? "" : "md:border-r lg:border-r-0 border-white/10"}
              `}
            >
              <div className="w-10 h-10 flex items-center justify-center text-[#99CC33] group-hover:scale-110 transition-transform duration-500">
                <item.icon size={32} strokeWidth={1.5} className="drop-shadow-[0_0_8px_rgba(153,204,51,0.4)]" />
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#99CC33] transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
