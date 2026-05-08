import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { sectors } from "@/components/Homepage/JourneySection";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/sectors")({
  component: SectorsPage,
});

const sectorImages = [
  "https://plus.unsplash.com/premium_photo-1740363268539-cd9093c3b5d1?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1710149459994-480e2b5c3b16?q=80&w=1197&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1695774165691-8a01a6045952?q=80&w=1169&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1645504635513-4cedb9d5ffb2?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1697057406467-60340e993e6e?q=80&w=687&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561101904-da649fcbf03f?q=80&w=687&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?q=80&w=1332&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
];

function SectorsPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ─── HERO ─── */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1774600166818-e554a4d4c376?q=80&w=1322&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Engineering Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1A]/90 via-[#0A0F1A]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A]/70 via-transparent to-transparent" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-6">

            {/* Label */}

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight pt-30">
                We Specialize in
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-[#FC3B1F]">Project</span>
              </h2>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="origin-left h-px w-24 bg-white/20"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/50 text-base md:text-lg leading-relaxed max-w-lg"
            >
              Delivering innovative, high-quality systems tailored to modern infrastructure demands — from smart cities to healthcare facilities.
            </motion.p>

            {/* Sector count */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 pt-2"
            >
              <div className="text-center">
                <p className="text-3xl font-black text-white">{sectors.length}</p>
                <p className="text-[11px] text-white/30 tracking-wider mt-0.5">Sectors served</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-black text-white">10+</p>
                <p className="text-[11px] text-white/30 tracking-wider mt-0.5">Years experience</p>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>
      {/* ─── SECTORS LIST ─── */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="space-y-0">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="group grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-100 py-16 md:py-20 items-center"
              >
                {/* Text — alternates side */}
                <div className={`space-y-5 ${i % 2 === 1 ? "md:order-2 md:pl-16" : "md:pr-16"}`}>

                  {/* Index */}
                  <span className="text-[11px] font-bold tracking-[0.2em] text-gray-300">
                    {String(i + 1).padStart(2, "0")} / {String(sectors.length).padStart(2, "0")}
                  </span>

                  <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F1A] leading-snug tracking-tight group-hover:text-[#162E93] transition-colors duration-500">
                    {sector.name}
                  </h2>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                    {sector.desc}
                  </p>

                  {/* Animated underline */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="h-px w-8 bg-[#9B0F06] group-hover:w-16 transition-all duration-500" />
                    <span className="text-xs text-gray-300 group-hover:text-[#9B0F06] transition-colors duration-300 font-medium">
                      Learn more
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl aspect-[16/10] shadow-lg group-hover:shadow-2xl transition-shadow duration-500"
                  >
                    <img
                      src={sectorImages[i]}
                      alt={sector.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Image overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Sector name on image hover */}
                    <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="text-white text-sm font-bold">{sector.name}</span>
                    </div>
                  </motion.div>
                </div>

              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative bg-[#0A0F1A] py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#9B0F06]/10 via-transparent to-[#162E93]/10" />

        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 max-w-xl mx-auto"
          >
            <p className="text-white/30 text-xs tracking-[0.2em] font-medium">
              Ready to get started?
            </p>
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Want to learn more about our solutions?
            </h3>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#9B0F06] text-white px-8 py-4 rounded-2xl font-semibold text-sm hover:bg-white hover:text-[#9B0F06] transition-all duration-300 group shadow-xl shadow-red-900/20"
            >
              Contact our team
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </Container>
      </section>

    </div>
  );
}