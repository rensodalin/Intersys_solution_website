import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { useRouter } from "@tanstack/react-router";
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
    desc: "Intelligent automation and control for HVAC, lighting, and power systems.",
    href: "/services/building-management"
  },
  {
    icon: Flame,
    title: "Fire Alarm Systems",
    desc: "Advanced detection and suppression solutions compliant with international standards.",
    href: "/services/fire-alarm"
  },
  {
    icon: ShieldCheck,
    title: "Security Access Control",
    desc: "Comprehensive identity management and facility entry protection.",
    href: "/services/access-control"
  },
  {
    icon: Video,
    title: "CCTV Surveillance Systems",
    desc: "High-definition video monitoring with intelligent analytics and storage.",
    href: "/services/surveillance"
  },
  {
    icon: Volume2,
    title: "Audio Visual Conference",
    desc: "Seamless collaboration tools for modern workspaces and meeting rooms.",
    href: "/services/audio-visual"
  },
  {
    icon: Hotel,
    title: "Room Control Unit",
    desc: "Personalized guest experiences through integrated hotel automation systems.",
    href: "/services/room-control"
  },
  {
    icon: Droplets,
    title: "Leak Detection Systems",
    desc: "Critical protection for water, oil, and fuel in high-value infrastructure.",
    href: "/services/leak-detection"
  },
  {
    icon: Car,
    title: "Parking & ANPR",
    desc: "Automated entry and monitoring with advanced vehicle management.",
    href: "/services/car-parking"
  },
  {
    icon: Server,
    title: "Data Center Monitoring",
    desc: "Environmental control and power monitoring for mission-critical IT facilities.",
    href: "/services/data-center"
  },
  {
    icon: Network,
    title: "Smart Integration IoT",
    desc: "Unified dashboarding for real-time insights across all building assets.",
    href: "/services/smart-integration"
  }
];

export function AboutExpertise() {
  const router = useRouter();

  return (
    <section className="py-24 bg-[#081F3D] border-t border-white/5">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white tracking-tight"
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
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-sm overflow-hidden"
        >
          {expertise.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              onClick={() => item.href && router.navigate({ to: item.href })}
              className={`p-10 flex flex-col items-start gap-6 group hover:bg-white/[0.03] transition-all duration-500 relative cursor-pointer
                ${idx < 4 ? "" : "border-t border-white/10"}
                ${(idx + 1) % 4 === 0 ? "" : "lg:border-r border-white/10"}
                ${(idx + 1) % 2 === 0 ? "" : "md:border-r lg:border-r-0 border-white/10"}
              `}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.05] group-hover:to-transparent transition-all duration-700 opacity-0 group-hover:opacity-100" />

              <div className="w-10 h-10 flex items-center justify-center text-[#DA3D20] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 relative z-10">
                <item.icon size={32} strokeWidth={1.5} className="drop-shadow-[0_0_8px_rgba(218,61,32,0.3)]" />
              </div>

              <div className="space-y-3 relative z-10">
                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#DA3D20] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed line-clamp-3 group-hover:text-white/60 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[1px] border-r-[1px] border-white/0 group-hover:w-4 group-hover:h-4 group-hover:border-white/40 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
