import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/site/Container";
import { sectors } from "@/components/site/JourneySection";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/sectors")({
  component: SectorsPage,
});

const sectorImages = [
  'https://plus.unsplash.com/premium_photo-1740363268539-cd9093c3b5d1?q=80&w=1170&auto=format&fit=crop', // Data Centers
  'https://images.unsplash.com/photo-1710149459994-480e2b5c3b16?q=80&w=1197&auto=format&fit=crop', // Banking
  'https://images.unsplash.com/photo-1695774165691-8a01a6045952?q=80&w=1169&auto=format&fit=crop', // Education
  'https://images.unsplash.com/photo-1645504635513-4cedb9d5ffb2?q=80&w=1170&auto=format&fit=crop', // Commercial
  'https://images.unsplash.com/photo-1697057406467-60340e993e6e?q=80&w=687&auto=format&fit=crop', // Smart Cities
  'https://images.unsplash.com/photo-1561101904-da649fcbf03f?q=80&w=687&auto=format&fit=crop', // Airports
  'https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?q=80&w=1332&auto=format&fit=crop', // Hospitality
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop'   // Healthcare
];

function SectorsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[650px] overflow-hidden flex items-end">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1669543295828-0b9d26e905cf?q=80&w=687&auto=format&fit=crop"
            alt="Engineering Projects"
            className="w-full h-full object-cover scale-105"
          />

          {/* Gradient overlay instead of flat black */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <Container className="relative z-10 pb-20">
          {/* Back Button */}


          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-xl border border-white/20 p-8 md:p-14 max-w-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-xl"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[#162E93] leading-tight">
              We specialize in
              <br />
              <span className="text-[#9B0F06]">Engineering Projects</span>
            </h1>

            {/* Optional subtitle */}
            <p className="mt-4 text-[#162E93]/70 text-base md:text-lg">
              Delivering innovative, high-quality solutions tailored to modern engineering challenges.
            </p>
          </motion.div>
        </Container>
      </section>
      {/* Spacing for overlapping hero content */}
      <div className="h-32" />

      {/* Sectors List Section */}
      <Container className="pb-32 relative">
        {/* The Vertical Brand Lines (Red & Blue) */}
        <div className="absolute left-0 top-0 bottom-0 flex gap-1.5 ml-4 md:ml-0">
          <div className="w-[6px] md:w-[8px] bg-[#9B0F06] h-full relative">
            <div className="absolute top-1/2 -left-4 w-4 h-4 border-b-2 border-l-2 border-[#9B0F06] -rotate-45" />
          </div>
          <div className="w-[6px] md:w-[8px] bg-[#1877F2] h-full" />
        </div>

        <div className="pl-16 md:pl-32 space-y-20 md:space-y-32">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
            >
              {/* Text Side */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2b3a67] mb-6 tracking-tight">
                  {sector.name}
                </h2>
                <p className="text-[#4a5568] text-[15px] md:text-base leading-relaxed max-w-2xl font-normal">
                  {sector.desc}
                </p>
              </div>

              {/* Image Side */}
              <div className="w-full md:w-[320px] lg:w-[400px] shrink-0">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="aspect-[16/10] bg-gray-100 overflow-hidden shadow-xl"
                >
                  <img
                    src={sectorImages[i]}
                    alt={sector.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Footer-like CTA */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <Container className="text-center">
          <h3 className="text-2xl font-bold text-[#162E93] mb-8">Want to learn more about our solutions?</h3>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#9B0F06] text-white px-10 py-4 rounded-full font-bold text-[13px] tracking-widest uppercase hover:bg-[#162E93] hover:shadow-[0_10px_40px_-10px_rgba(255,59,59,0.5)] transition-all duration-300 transform hover:-translate-y-1"
          >
            Contact Our Team
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Container>
      </section>
    </div>
  );
}

