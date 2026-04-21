import { motion } from "framer-motion";
import { Container } from "./Container";
import blueprintBg from "@/assets/project/image.png"; // Blueprint-style site image
import siteBg from "@/assets/Intelligeinc.png"; // Site/Construction background

export function Ecosystem() {
  return (
    <section className="bg-white overflow-hidden">
      {/* Section 1: Design & Engineering (Left Floating Box) */}
      <div className="relative min-h-[500px] flex items-center">
        {/* Background - Technical Overlay Filter */}
        <div className="absolute inset-0 z-0">
          <img
            src={blueprintBg}
            className="w-full h-full object-cover opacity-30 grayscale brightness-110"
            alt="Technical Background"
          />
          {/* Subtle blueprint grid overlay */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #071321 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        <Container className="relative z-10 py-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-14 max-w-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#071321] mb-6 tracking-tight">
              Design & Specialized Engineering
            </h3>
            <p className="text-[#4a5568] text-[15px] md:text-base leading-relaxed">
              Comprehensive solutions based on the close and continuous cooperation between
              the client and our engineering team. From basic conceptual design to
              fully detailed technical documentation, Intersys uses its extensive internal
              resources to ensure a single, reliable point of contact for every integrated project.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Section 2: Execution & Quality (Right Floating Box) */}
      <div className="relative min-h-[500px] flex items-center justify-end overflow-hidden">
        {/* Background - Modern Architecture/Site */}
        <div className="absolute inset-0 z-0">
          <img
            src={siteBg}
            className="w-full h-full object-cover"
            alt="Execution Site"
          />
          {/* Navy tint overlay to match reference vibe */}
          <div className="absolute inset-0 bg-[#071321]/40 mix-blend-multiply" />
        </div>

        <Container className="relative z-10 py-16 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#071321] p-10 md:p-14 max-w-2xl shadow-2xl text-white border border-white/5"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-6 tracking-tight">
              Expert Execution & Build
            </h3>
            <p className="text-white/80 text-[15px] md:text-base leading-relaxed">
              The heart of each project is its successful installation and integration.
              With our technical expertise and world-class technology partners like Honeywell,
              we conduct operations with dedicated professional teams, delivering creative
              and cost-efficient solutions that are fully compliant with the specific
              conditions of each project.
            </p>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}

