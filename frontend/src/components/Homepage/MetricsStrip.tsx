import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { Play, ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/Common/AnimatedCounter";

const metrics = [
  {
    prefix: "More than",
    value: 100,
    suffix: "+",
    label: "Projects Completed",
    desc: "Successfully delivered high-tier ELV projects across Cambodia.",
    icon: "https://static.thenounproject.com/png/1598382-200.png",
    bg: "https://www.intersys-solutions.com/website_asset/Project.JPG",
  },
  {
    prefix: "Over",
    value: 10,
    suffix: "+",
    label: "Years Experience",
    desc: "A decade of engineering excellence and system integration.",
    icon: "https://cdn-icons-png.flaticon.com/512/3442/3442327.png",
    bg: "https://www.intersys-solutions.com/website_asset/global.png",
  },
  {
    prefix: "Available",
    value: 24,
    suffix: "/7",
    label: "Expert Support",
    desc: "Round-the-clock technical assistance for all systems.",
    icon: "https://cdn-icons-png.flaticon.com/512/943/943941.png",
    bg: "https://www.intersys-solutions.com/website_asset/support.jpg",
  },
  {
    prefix: "Trusted by",
    value: 20,
    suffix: "+",
    label: "Global Clients",
    desc: "Trusted by international brands for high-quality engineering.",
    icon: "https://cdn-icons-png.flaticon.com/512/1322/1322246.png",
    bg: "https://www.intersys-solutions.com/website_asset/year_experice.jpg",
  },
];

export function MetricsStrip() {
  return (
    <div className="relative z-40 -mt-20 mb-14">
      <Container className="px-4 md:px-8 max-w-[1350px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 shadow-2xl rounded-sm overflow-hidden bg-[#EEEEEE]">

          {/* Box 1: Featured Blue Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 bg-[#1A3263] p-7 flex flex-col justify-between min-h-[260px] relative overflow-hidden group"
          >
            <div className="relative z-20">
              <div className="w-9 h-9 mb-5 text-white/40 group-hover:text-white transition-colors">
                <Play fill="currentColor" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">Premium ELV Engineering</h3>
              <p className="text-white/60 text-[13px] leading-relaxed mb-5">
                Integrated solutions for safer building management and future-ready infrastructure.
              </p>
            </div>


            {/* Brush Effect */}
            <motion.div
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
              className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 group-hover:opacity-0 transition-opacity duration-300"
            />
          </motion.div>

          {/* Metric Boxes 2-5 */}
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#EEEEEE] p-7 border-l border-gray-200 flex flex-col items-start min-h-[260px] group relative overflow-hidden transition-all duration-500"
            >
              {/* Background Image (Original Animation) */}
              <div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-out grayscale group-hover:grayscale-0"
                style={{
                  backgroundImage: `url('${m.bg}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 z-10 bg-[#162E93]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-20 w-full">
                <div className="w-11 h-11 mb-6 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500">
                  <img src={m.icon} alt={m.label} className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:invert transition-all" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-white transition-colors">{m.label}</h4>
                  <div className="text-4xl font-black text-[#C00707] leading-none group-hover:text-white transition-colors">
                    <AnimatedCounter value={m.value as number} />
                    <span className="text-2xl ml-0.5">{m.suffix}</span>
                  </div>
                  <p className="text-gray-500 text-[13px] leading-relaxed group-hover:text-white/80 transition-colors pt-1">
                    {m.desc}
                  </p>
                </div>
              </div>

              {/* Brush Effect (Original Animation) */}
              <motion.div
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: i * 0.1, repeat: Infinity, repeatType: "loop" }}
                className="absolute inset-0 z-30 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20 group-hover:opacity-0 transition-opacity duration-300"
              />

              {/* Left accent line */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#9B0F06] transition-all duration-500 group-hover:h-full z-40 opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}