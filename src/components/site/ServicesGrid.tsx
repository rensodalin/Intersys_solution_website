import { motion } from "framer-motion";
import { Container } from "./Container";
import solutionImg from "@/assets/solution.png";

const services = [
  {
    title: "Building Management Systems",
    desc: "Optimize building performance and energy efficiency with our centralized, intelligent BMS platforms.",
    btn: "Discover BMS",
  },
  {
    title: "Fire Alarm Systems",
    desc: "Globally certified early detection and rapid response systems to protect occupants and high-value assets.",
    btn: "Explore Fire Safety",
  },
  {
    title: "Access Control Systems",
    desc: "Advanced security protocols and flexible management tools tailored to your specific site requirements.",
    btn: "Enhance Security",
  },
  {
    title: "Surveillance (CCTV)",
    desc: "Constant vigilance with AI-driven visual insights and comprehensive site-wide monitoring.",
    btn: "View CCTV Solutions",
  },
  {
    title: "Audio Visual (AV) System",
    desc: "Seamless communication and collaboration tools designed for high-performance meeting and control environments.",
    btn: "Explore AV Solutions",
  },
  {
    title: "Custom Solutions",
    desc: "Bespoke engineering support and consulting to solve your most complex architectural and technical challenges.",
    btn: "Explore Custom Solutions",
  },
];

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  const displayedServices = compact ? services.slice(0, 6) : services;

  return (
    <section className="relative bg-white pb-24 md:pb-32 mt-[-1px]">
      {/* Blue Split Background - Top Half */}
      <div className="absolute top-0 left-0 right-0 h-[65%] md:h-[50%] bg-[#121f3d] z-0" />

      <Container className="relative z-10 pt-24 md:pt-32">
        {/* Header Content with Floating Image */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mb-16 md:mb-24">
          <div className="max-w-2xl z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-[56px] font-bold text-white tracking-tight mb-6"
            >
              Our Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[16px] text-white/80 leading-relaxed font-medium"
            >
              Comprehensive range of smart building systems tailored to your specific needs.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1.5, bounce: 0.3 }}
            className="w-full lg:w-[45%] max-w-lg relative"
          >
            {/* Glowing effect behind image */}
            <div className="absolute inset-0 bg-[#ff3b3b]/30 blur-[60px] rounded-full scale-75" />

            {/* Infinite floating animation layer */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative z-10"
            >
              <img
                src={solutionImg}
                alt="Intersys Smart Solutions"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] lg:scale-110 right-0 transform origin-right"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* CSS Grid for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {displayedServices.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group h-full flex"
            >
              {/* Outer stroke / offset box effect */}
              <div className="absolute top-4 left-4 right-[-4px] bottom-[-4px] border border-[#071321]/15 rounded-[20px] pointer-events-none transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

              {/* Main Interactive Card */}
              <div className="relative z-10 w-full bg-gradient-to-br from-[#ffffff] to-[#f8f9fc] border border-white shadow-sm rounded-[20px] p-8 md:p-10 flex flex-col items-start transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[0_20px_40px_-15px_rgba(7,19,33,0.1)]">

                <h3 className="font-display text-[26px] font-bold text-[#071321] mb-4 leading-[1.2]">
                  {s.title}
                </h3>

                <p className="text-[15px] text-[#4a5568] leading-relaxed flex-grow mb-10">
                  {s.desc}
                </p>

                <button className="mt-auto bg-white text-[#ff3b3b] shadow-[0_4px_14px_0_rgba(0,0,0,0.06)] border border-[#ff3b3b]/10 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 group-hover:bg-[#ff3b3b] group-hover:text-white group-hover:shadow-[0_4px_20px_0_rgba(255,59,59,0.4)]">
                  {s.btn}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
