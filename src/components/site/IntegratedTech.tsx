import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "./Container";

// Expertise Images
import img1 from "@/assets/project/Hatta_bank.png";
import img2 from "@/assets/project/WingTower.png";
import img3 from "@/assets/project/Novotel Holiday Palace.png";
import img4 from "@/assets/project/Phnom_penh_international_aireport.png";

// Partner Logos
import p1 from "@/assets/Partner/p1.png";
import p2 from "@/assets/Partner/p2.png";
import p3 from "@/assets/Partner/p3.webp";
import p4 from "@/assets/Partner/p4.webp";
import p5 from "@/assets/Partner/p5.png";
import p6 from "@/assets/Partner/p6.png";
import p7 from "@/assets/Partner/p7.png";
import p8 from "@/assets/Partner/p8.png";
import p9 from "@/assets/Partner/p9.avif";
import p10 from "@/assets/Partner/p10.png";

const expertiseData = [
  {
    image: img1,
    tag: "TECHNICAL EXPERTISE",
    title: "Integrated BMS",
    desc: "Centralized building management systems to monitor and control HVAC, lighting, and utilities for peak efficiency."
  },
  {
    image: img2,
    tag: "SECURITY SYSTEMS",
    title: "AI Surveillance",
    desc: "AI-driven access control and high-definition surveillance networks providing comprehensive site protection."
  },
  {
    image: img3,
    tag: "FIRE SAFETY",
    title: "Life Safety Engineering",
    desc: "Advanced detection and suppression technologies designed to protect lives and physical assets with 24/7 reliability."
  },
  {
    image: img4,
    tag: "SPECIALIZED SYSTEMS",
    title: "Public Infrastructure",
    desc: "High-tier integration for airports, commerce, and logistics centers requiring maximum stability."
  }
];

const partnerLogos = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

export function IntegratedTech() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 450;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Our Expertise Carousel Section (White) */}
      <section className="bg-gray-100 py-24 md:py-32 overflow-hidden border-t border-gray-100">
        <Container className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left Side: Info & Navigation */}
          <div className="lg:w-1/4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[12px] font-mono font-bold tracking-[0.2em] text-[#ff3b3b] mb-4 uppercase"
            >
              Engineering Solution
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-[#071321] tracking-tight leading-tight mb-12"
            >
              Our <br /> Expertise.
            </motion.h2>

            {/* Navigation Buttons */}
            <div className="flex flex-col gap-4 max-w-[160px]">
              <button
                onClick={() => scroll('right')}
                className="group flex items-center justify-between bg-[#ff3b3b] text-white px-6 py-4 rounded font-bold text-sm transition-all hover:bg-[#071321] hover:text-white"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scroll('left')}
                className="group flex items-center justify-between bg-[#f8f9fc] text-[#071321] px-6 py-4 rounded font-bold text-sm transition-all hover:bg-gray-200"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Prev</span>
              </button>
            </div>
          </div>

          {/* Right Side: Horizontal Carousel */}
          <div className="lg:w-3/4 flex-grow relative">
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 pr-12"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {expertiseData.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-shrink-0 w-[85%] md:w-[420px] snap-start group"
                >
                  {/* Large Image */}
                  <div className="aspect-[16/10] overflow-hidden rounded-[8px] mb-6 bg-gray-100 border border-gray-100 shadow-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <span className="text-[10px] font-mono font-bold text-[#6b7c93] uppercase tracking-[0.2em]">
                    {item.tag}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#071321] mt-2 mb-4 group-hover:text-[#ff3b3b] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#4a5568] text-[14px] leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Fade on edge */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        </Container>
      </section>

      {/* Global Brand Partners Section (White) */}
      <section className="bg-white pt-24 pb-0 overflow-hidden border-t border-gray-100">
        <Container className="pb-16 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#071321] tracking-tight">
            Global Brand <span className="text-[#ff3b3b]">Partners</span>
          </h2>
        </Container>

        <div className="w-full bg-[#f8f9fc] py-16">
          <div className="overflow-hidden flex w-full relative">
            {/* Smooth edge fade gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8f9fc] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8f9fc] to-transparent z-10" />

            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center px-12 md:px-20 transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src={logo}
                    alt="Partner"
                    className="h-10 md:h-16 w-auto object-contain max-w-[140px] md:max-w-[200px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
