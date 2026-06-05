import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import bgImage from "@/assets/BMS/IMG_20260425_124911.jpg"; // Using a high-end project as background

export function AnniversaryBanner() {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden bg-[#0a1a2f] border-y border-white/5">
      {/* Background Image with Reference-style Tint */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Engineering Background"
          className="w-full h-full object-cover opacity-40 grayscale contrast-125"
        />
        {/* The specific navy/steel tint from the image */}
        <div className="absolute inset-0 bg-[#162E93]/70 mix-blend-multiply" />
      </div>

      {/* Technical Blueprint Overlay Background (Visible but subtle) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="100" y2="80" stroke="white" strokeWidth="0.05" />
          <line x1="20" y1="0" x2="80" y2="100" stroke="white" strokeWidth="0.05" />
          <line x1="100" y1="20" x2="0" y2="80" stroke="white" strokeWidth="0.05" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="white"
            strokeWidth="0.02"
            strokeDasharray="1 1"
          />
        </svg>
      </div>

      {/* Decorative Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="anniv-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#anniv-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Content (Matching Layout) */}
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[13px] font-mono font-medium text-white/60 mb-2 uppercase tracking-[0.3em]"
            >
              10th Anniversary
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-[52px] font-bold text-white tracking-tight leading-[1.1] mb-6"
            >
              +10 years of engineering experience in Cambodia
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[15px] md:text-[16px] text-white/80 leading-relaxed mb-8 max-w-lg font-medium"
            >
              Supported by a strong team working on inspiring projects. Expertise, quality, and
              reliability made our reputation and are the company's core values.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <button className="bg-[#9B0F06] text-white px-8 py-3 rounded-sm font-bold text-[13px] tracking-widest uppercase hover:bg-white hover:text-[#162E93] transition-all duration-300 shadow-xl">
                Read more
              </button>
            </motion.div>
          </div>

          {/* Right Visual (The Large "10TH" Reveal) */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative flex items-center justify-center select-none"
            >
              {/* Big "10" with split color */}
              <div className="flex items-baseline font-bold leading-none transform -translate-y-2">
                <span className="text-[120px] md:text-[200px] text-white tracking-tighter">1</span>
                <span className="text-[120px] md:text-[200px] text-[#9B0F06] tracking-tighter -ml-2 md:-ml-4">
                  0
                </span>
                <span className="text-[28px] md:text-[44px] text-[#9B0F06] font-bold absolute top-0 -right-8 md:-right-16 translate-y-4 md:translate-y-8">
                  TH
                </span>
              </div>

              {/* Script Overlay "Anniversary" */}
              <div className="absolute inset-0 flex items-center justify-center pt-[90px] md:pt-[130px]">
                <div className="font-serif italic text-5xl md:text-[90px] text-[#9B0F06] opacity-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] whitespace-nowrap transform -rotate-6 filter drop-shadow-[#000000_2px_2px_10px]">
                  Anniversary
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
