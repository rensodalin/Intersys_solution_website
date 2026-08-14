import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { sectors } from "@/components/Homepage/JourneySection";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import datacenter from "@/assets/datacenter.png";
import education from "@/assets/education.jpg";
import healthcare from "@/assets/healthcare.webp";
import hospital from "@/assets/hospital.webp";
import commercial from "@/assets/commercial.jpg";

export const Route = createFileRoute("/sectors")({
  component: SectorsPage,
});

const sectorImages = [
  datacenter,
  "https://images.unsplash.com/photo-1710149459994-480e2b5c3b16?q=80&w=1197&auto=format&fit=crop",
  education,
  commercial,
  "https://images.unsplash.com/photo-1697057406467-60340e993e6e?q=80&w=687&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561101904-da649fcbf03f?q=80&w=687&auto=format&fit=crop",
  hospital,
  healthcare,

];

function SectorsPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ─── HERO ─── */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Engineering Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1A]/90 via-[#0A0F1A]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A]/70 via-transparent to-transparent" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight pt-20">
                We Specialize in
              </h1>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                <span className="text-[#FC3B1F]">Project</span>
              </h2>
            </motion.div>


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/50 text-base md:text-md leading-relaxed max-w-lg"
            >
              Delivering innovative, high-quality systems tailored to modern infrastructure demands — from smart cities to healthcare facilities.
            </motion.p>

          </div>
        </Container>
      </section>

      {/* ─── SECTORS ─── */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="space-y-0">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="group grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-100 py-16 md:py-20 items-center"
              >

                {/* TEXT */}
                <div className={`space-y-5 ${i % 2 === 1 ? "md:order-2 md:pl-16" : "md:pr-16"}`}>

                  <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F1A] group-hover:text-[#162E93] transition-colors duration-500">
                    {sector.name}
                  </h2>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                    {sector.desc}
                  </p>

                  <div className="h-px w-8 bg-[#9B0F06] group-hover:w-16 transition-all duration-500" />

                </div>

                {/* IMAGE WITH SKETCH ANIMATION */}
                <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <motion.div
                    initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                    whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.1,
                      ease: [0.77, 0, 0.175, 1],
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative overflow-hidden rounded-md aspect-[16/10] shadow-lg hover:shadow-2xl transition-all duration-700"
                  >

                    {/* IMAGE */}
                    <img
                      src={sectorImages[i]}
                      alt={sector.name}
                      className="w-full h-full object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-[1600ms]"
                    />

                    {/* BLUE SKETCH OVERLAY */}
                    <div className="absolute inset-0 bg-[#1A3263]/30 mix-blend-multiply group-hover:bg-[#1A3263]/50 transition-all duration-700" />

                    {/* GRID SKETCH LINES */}
                    <div
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />

                    {/* SCAN LINE */}
                    <motion.div
                      initial={{ x: "-120%" }}
                      whileInView={{ x: "120%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.4,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />

                    {/* TOP LINE SKETCH */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="absolute top-5 left-5 h-[1px] w-[80px] origin-left bg-white/70"
                    />

                    {/* LEFT LINE SKETCH */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute top-5 left-5 w-[1px] h-[80px] origin-top bg-white/70"
                    />

                    {/* HOVER LABEL */}
                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="text-white text-sm font-semibold">
                        {sector.name}
                      </span>
                      <div className="h-[2px] w-10 bg-[#FC3B1F] mt-2" />
                    </div>

                  </motion.div>
                </div>

              </motion.div>
            ))}
          </div>
        </Container>
      </section>



    </div>
  );
}