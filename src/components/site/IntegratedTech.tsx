import { motion } from "framer-motion";
import { Container } from "./Container";

// Expertise Images
import img1 from "@/assets/BMS/image.png";
import img2 from "@/assets/BMS/pic2.png";
import img3 from "@/assets/BMS/pic3.png";
import img4 from "@/assets/BMS/pic1.png";

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
  return (
    <>
      {/* Our Expertise Marquee Section (Flowing Left to Right) */}
      <section className="bg-gray-50 py-24 md:py-32 overflow-hidden border-t border-gray-100">
        <Container className="mb-16">
          <div className="max-w-2xl">

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl md:text-5xl font-bold text-[#162E93] tracking-tight leading-tight"
            >
              Advanced Expertise <br /> in Every System.
            </motion.h2>
          </div>
        </Container>

        <div className="w-full relative">
          {/* Smooth edge fade gradients */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* Left to Right Marquee for Expertise Cards */}
          <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...expertiseData, ...expertiseData].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[75vw] md:w-[320px] px-3 group"
              >
                <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden rounded-md mb-4 bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <span className="text-[9px] font-mono font-bold text-[#6b7c93] uppercase tracking-[0.15em]">
                    {item.tag}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#162E93] mt-1 mb-2 group-hover:text-[#9B0F06] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#4a5568] text-[13px] leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Brand Partners Section (Flowing Left to Right) */}
      <section className="bg-white pt-16 pb-0 overflow-hidden border-t border-gray-100">
        <Container className="pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[#162E93] tracking-tight">
              Global Brand <span className="text-[#9B0F06]">Partners</span>
            </h2>
          </motion.div>
        </Container>

        <div className="w-full bg-[#f8f9fc] py-10">
          <div className="overflow-hidden flex w-full relative">
            {/* Smooth edge fade gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8f9fc] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8f9fc] to-transparent z-10" />

            {/* Left to Right Marquee for Partners */}
            <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
              {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center px-8 md:px-14 transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src={logo}
                    alt="Partner"
                    className="h-8 md:h-10 w-auto object-contain max-w-[100px] md:max-w-[140px]"
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
