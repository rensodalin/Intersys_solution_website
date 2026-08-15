import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import blueprintBg from "@/assets/BMS/Intelligeinc.webp";
import siteBg from "@/assets/BMS/image1.webp";

export function Ecosystem() {
  const [hovered, setHovered] = useState<"design" | "execution" | null>(null);

  // Images swap when hovering the opposite section
  const section1Img = hovered === "execution" ? siteBg : blueprintBg;
  const section2Img = hovered === "design" ? blueprintBg : siteBg;

  return (
    <section className="bg-white overflow-hidden pt-5">
      {/* Section 1: Design & Engineering (Left Floating Box + Right Cutout Image aligned with Section 1 Background) */}
      <div
        className="relative min-h-[500px] flex items-center cursor-pointer overflow-hidden"
        onMouseEnter={() => setHovered("design")}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Background with crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={section1Img}
              src={section1Img}
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-110"
              alt="Technical Background"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimatePresence>
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(circle, #162E93 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Transparent Feature Cutout Image on the Right side of Container 1 background */}
        <div className="absolute -top-3 sm:-top-5 md:-top-7 right-4 sm:right-10 md:right-16 lg:right-28 bottom-0 z-10 hidden sm:flex items-start pt-1 sm:pt-2 pointer-events-none">
          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src="https://files.intersys-solutions.com.kh/RandomIMG/Screenshot_2026-08-15_140607-removebg-preview.png"
            alt="Engineering Feature Illustration"
            className="h-[78%] sm:h-[83%] md:h-[88%] lg:h-[93%] max-h-[460px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
          />
        </div>

        <Container className="relative z-20 py-16">
          {/* Original Container 1 Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-14 max-w-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100"
          >
            <motion.h3
              animate={{
                color: hovered === "design" ? "#b91c1c" : "#162E93",
              }}
              transition={{ duration: 0.3 }}
              className="font-display text-2xl md:text-3xl font-bold mb-6 tracking-tight"
            >
              Design & Specialized Engineering
            </motion.h3>
            <p className="text-[#4a5568] text-[15px] md:text-base leading-relaxed">
              Comprehensive solutions based on the close and continuous cooperation between the
              client and our engineering team. From basic conceptual design to fully detailed
              technical documentation, Intersys uses its extensive internal resources to ensure a
              single, reliable point of contact for every integrated project.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Section 2: Execution & Quality (Right Floating Box) */}
      <div
        className="relative min-h-[500px] flex items-center justify-end overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered("execution")}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Background with crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={section2Img}
              src={section2Img}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Execution Site"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[#162E93]/40 mix-blend-multiply" />
        </div>

        <Container className="relative z-10 py-16 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#162E93] p-10 md:p-14 max-w-2xl shadow-2xl text-white border border-white/5"
          >
            <motion.h3
              animate={{
                color: hovered === "execution" ? "#d47e71ff" : "#ffffff",
              }}
              transition={{ duration: 0.3 }}
              className="font-display text-2xl md:text-3xl font-bold mb-6 tracking-tight"
            >
              Expert Execution & Build
            </motion.h3>
            <p className="text-white/80 text-[15px] md:text-base leading-relaxed">
              The heart of each project is its successful installation and integration. With our
              technical expertise and world-class technology partners like Honeywell, we conduct
              operations with dedicated professional teams, delivering creative and cost-efficient
              solutions that are fully compliant with the specific conditions of each project.
            </p>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
