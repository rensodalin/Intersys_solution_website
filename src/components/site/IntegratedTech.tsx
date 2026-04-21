import { motion } from "framer-motion";
import { Building2, Flame, ShieldAlert } from "lucide-react";
import { Container } from "./Container";
import { Link } from "@tanstack/react-router";

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

const expertise = [
  {
    icon: Building2,
    title: "BMS & Automation",
    desc: "Centralized building management systems to monitor and control HVAC, lighting, and utilities for peak efficiency.",
    link: "/services",
  },
  {
    icon: Flame,
    title: "Fire Safety Systems",
    desc: "Advanced detection and suppression technologies designed to protect lives and physical assets with 24/7 reliability.",
    link: "/services",
  },
  {
    icon: ShieldAlert,
    title: "Security & Surveillance",
    desc: "AI-driven access control and high-definition surveillance networks providing comprehensive site perimeter protection.",
    link: "/services",
  },
];

const partnerLogos = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

export function IntegratedTech() {
  return (
    <section className="bg-[#fcfdfd]">
      <Container className="pt-24 pb-20">
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#ff3b3b] mb-4">
              Our Expertise
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-[#071321] leading-[1.1] tracking-tight">
              Integrated Technologies <br className="hidden md:block" />
              for Every Structure.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="text-[13px] text-[#6b7c93] leading-relaxed max-w-sm">
              We specialize in end-to-end design, implementation, and maintenance of smart systems that talk to each other.
            </p>
          </div>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {expertise.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#f5f6f7] rounded-xl p-10 flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
            >
              <item.icon className="h-6 w-6 text-[#162a45] mb-8" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-bold text-[#071321] mb-4">{item.title}</h3>
              <p className="text-[13px] text-[#6b7c93] leading-relaxed flex-grow">
                {item.desc}
              </p>
              <Link
                to={item.link}
                className="mt-8 text-[11px] font-bold text-[#ff3b3b] hover:text-[#e32424] transition-colors inline-flex items-center gap-1 uppercase tracking-wider"
              >
                Learn More <span className="text-[14px] leading-none mb-[2px] ml-0.5">›</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Global Brand Partners Title (Moved Outside) */}
      <Container className="pt-16 pb-8">
        <h2 className="text-center font-display text-2xl md:text-1xl lg:text-[48px] font-bold text-[#071321] tracking-tight">
          Global Brand <span className="text-[#ff3b3b]">Partners</span>
        </h2>
      </Container>

      {/* Global Brand Partners Marquee Section */}
      <div className="w-full bg-[#f1f2f4] py-16">

        {/* Infinite Scrolling Marquee */}
        <div className="overflow-hidden flex w-full group relative">
          {/* Smooth edge fade gradients */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f1f2f4] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f1f2f4] to-transparent z-10" />

          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center px-12 md:px-20 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={logo}
                  alt={`Partner logo ${idx + 1}`}
                  className="h-10 md:h-16 lg:h-20 w-auto object-contain max-w-[140px] md:max-w-[200px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
