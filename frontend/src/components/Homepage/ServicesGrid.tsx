import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { useRouter } from "@tanstack/react-router";
import {
  Cpu,
  Flame,
  Shield,
  Video,
  Volume2,
  Settings,
  LayoutGrid,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import bmsImg from "@/assets/BMS/pic1.png";
import fireImg from "@/assets/fire_safety.png";
import securityImg from "@/assets/security_access.png";
import cctvImg from "@/assets/cctv_service.png";
import avImg from "@/assets/av_service.png";

function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const done = useRef(false);

  useEffect(() => {
    if (!isInView || done.current) return;
    done.current = true;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return <span ref={ref} className={className}>{displayed}</span>;
}

export function ServicesGrid() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="solutions" className="py-28 bg-[#F8F9FA] overflow-hidden relative">
      <Container>

        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >

            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-[#0A0F1A]"
            >
              Our{" "}
              <span className="text-[#DA3D20]">
                <TypewriterText text="Solutions" />
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-lg text-sm leading-relaxed md:text-right"
          >
            At Intersys Solutions Co.,Ltd , we offer a comprehensive range of smart building solutions tailored to meet your specific needs. It's easy to get started - simply explore our key services below.
          </motion.p>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:auto-rows-min">

          {/* BMS — wide with image */}
          <ServiceCard
            id="bms"
            icon={Cpu}
            title="Building Management Systems"
            desc="Discover how our advanced Building Management Systems (BMS) can optimize the performance of your building's essential systems, ensuring seamless operation and energy efficiency."
            features={["Real-time monitoring", "Energy analytics", "Remote HVAC control"]}
            img={bmsImg}
            className="lg:col-span-4"
            isExpanded={expandedIds.includes("bms")}
            onToggle={() => toggleExpand("bms")}
            layout="horizontal"
            href="/services/building-management"
            btnText="Discover BMS Solutions"


          />

          {/* Fire */}
          <ServiceCard
            id="fire"
            icon={Flame}
            title="Fire Alarm System"
            desc="Safeguard your property and occupants with our state-of-the-art Fire Alarm Systems, designed to provide early detection and rapid response to potential fire hazards."
            className="lg:col-span-2"
            isExpanded={expandedIds.includes("fire")}
            onToggle={() => toggleExpand("fire")}
            href="/services/fire-alarm"
            theme="dark"
            btnText="Explore Fire Safety"
          />

          {/* CCTV */}
          <ServiceCard
            id="cctv"
            icon={Video}
            title="CCTV Surveillance"
            desc="Ensure constant vigilance and monitoring with our Surveillance (CCTV) solutions, providing comprehensive coverage and real-time visual insights for enhanced security."
            img="https://digits-home.com/wp-content/uploads/2026/03/honeywell_top_1.jpg"
            className="lg:col-span-2"
            isExpanded={expandedIds.includes("cctv")}
            onToggle={() => toggleExpand("cctv")}
            href="/services/surveillance"
            theme="image"
            btnText="View CCTV Solutions"
          />

          {/* Security & Access */}
          <ServiceCard
            id="security"
            icon={LayoutGrid}
            title="Security & Access Control"
            desc="Protect your building and assets with our Access Control Systems, offering advanced security features and flexible access management tailored to your requirements."
            stats={[
              { label: "Auth Speed", value: "0.3s" },
              { label: "Encryption", value: "AES-256" },
            ]}
            img="https://cdn.prod.website-files.com/606184adb7296d59f51c3323/67604016217ce3d128de1597_access-control-system-installation-101-the-essential-guide.webp"
            className="lg:col-span-4"
            isExpanded={expandedIds.includes("security")}
            onToggle={() => toggleExpand("security")}
            layout="horizontal-reverse"
            href="/services/access-control"
            btnText="Enhance Security"
          />

          {/* AV */}
          <ServiceCard
            id="av"
            icon={Volume2}
            title="Audio Visual Systems"
            desc="Enhance communication and engagement with our AV solutions designed for meeting rooms, classrooms, auditoriums, and control centers, delivering seamless audio, visual, and collaboration experiences."
            tags={["Video walls", "Smart glass", "PA systems"]}
            className="lg:col-span-3"
            isExpanded={expandedIds.includes("av")}
            onToggle={() => toggleExpand("av")}
            href="/services/audio-visual"
            btnText="Explore AV Solutions"
          />

          {/* Custom */}
          <ServiceCard
            id="custom"
            icon={Settings}
            title="Custom Solutions"
            desc="Unleash the full potential of your building with our expert support and consulting services, tailored to address your unique challenges and requirements."
            className="lg:col-span-3"
            isExpanded={expandedIds.includes("custom")}
            onToggle={() => toggleExpand("custom")}
            theme="red"
            btnText="Explore Custom Solutions"
            href="/services/custom-solution"
          />

        </div>
      </Container>
    </section>
  );
}

function ServiceCard({
  id,
  icon: Icon,
  title,
  desc,
  features,
  stats,
  tags,
  img,
  className,
  isExpanded,
  onToggle,
  href,
  theme = "light",
  layout = "vertical",
  btnText = "View details",
}: any) {
  const router = useRouter();

  const isDark = theme === "dark";
  const isRed = theme === "red";
  const isImage = theme === "image";
  const isLight = theme === "light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`
        ${className} rounded-md flex flex-col overflow-hidden relative group
        transition-all duration-500 hover:-translate-y-1
        ${isDark ? "bg-[#0A0F1A] text-white" : ""}
        ${isRed ? "bg-[#FC3B1F] text-white" : ""}
        ${isImage ? "relative min-h-[280px]" : ""}
        ${isLight ? "bg-white text-[#0A0F1A] border border-gray-100 shadow-sm hover:shadow-lg" : ""}
      `}
    >

      {/* IMAGE THEME — full background image card */}
      {isImage && img && (
        <>
          <img
            src={img}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A]/90 via-[#0A0F1A]/40 to-transparent" />
          <div className="relative z-10 p-8 mt-auto">
            <div className="w-9 h-9 rounded-sm bg-white/10 flex items-center justify-center mb-4">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{desc}</p>
            <button
              onClick={() => href && router.navigate({ to: href })}
              className="inline-flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white transition-colors group/btn"
            >
              View details
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </>
      )}

      {/* ALL OTHER THEMES */}
      {!isImage && (
        <div className={`flex flex-col h-full ${layout === "horizontal" || layout === "horizontal-reverse" ? "lg:flex-row" : ""}`}>

          {/* Image side for horizontal-reverse */}
          {layout === "horizontal-reverse" && img && (
            <div className="lg:w-2/5 relative overflow-hidden min-h-[240px]">
              <img
                src={img}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
            </div>
          )}

          {/* Content */}
          <div className={`flex-1 flex flex-col p-8 ${layout === "horizontal" || layout === "horizontal-reverse" ? "lg:p-10" : ""}`}>

            {/* Icon */}
            <div className={`
              w-10 h-10 rounded-sm flex items-center justify-center mb-6 
              ${isDark ? "bg-white/5" : isRed ? "bg-white/15" : "bg-gray-50 group-hover:bg-red-50"}
              transition-colors duration-300
            `}>
              <Icon className={`w-5 h-5 ${isDark ? "text-red-400" : isRed ? "text-white" : "text-gray-400 group-hover:text-red-500"} transition-colors duration-300`} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 tracking-tight leading-snug">{title}</h3>

            {/* Desc */}
            <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-white/40" : isRed ? "text-white/75" : "text-gray-400"}`}>
              {desc}
            </p>

            {/* Expandable content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {features && (
                    <ul className="space-y-2.5 mb-6">
                      {features.map((f: string) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm font-medium">
                          <div className={`w-1 h-1 rounded-full flex-shrink-0 ${isRed ? "bg-white" : "bg-red-500"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {stats && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {stats.map((s: any) => (
                        <div
                          key={s.label}
                          className={`p-4 rounded-sm ${isDark ? "bg-white/5" : "bg-gray-50"} border ${isDark ? "border-white/5" : "border-gray-100"}`}
                        >
                          <div className="text-lg font-bold">{s.value}</div>
                          <div className={`text-[10px] font-semibold tracking-wide mt-0.5 ${isDark ? "text-white/30" : "text-gray-400"}`}>
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {tags && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((t: string) => (
                        <span
                          key={t}
                          className={`px-3 py-1.5 rounded-sm text-[11px] font-semibold
                            ${isDark ? "bg-white/10 text-white/50" : "bg-gray-50 text-gray-400 border border-gray-100"}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-auto flex items-center gap-2 pt-2">
              <button
                onClick={() => href && router.navigate({ to: href })}
                className={`
                  inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-sm
                  transition-all duration-300 group/btn
                  ${isRed ? "bg-white text-[#FC3B1F] hover:bg-[#0A0F1A] hover:text-white" : ""}
                  ${isDark ? "bg-white/8 text-red-400 hover:bg-white/15" : ""}
                  ${isLight ? "bg-gray-50 text-gray-700 hover:bg-[#0A0F1A] hover:text-white border border-gray-100" : ""}
                `}
              >
                {btnText}
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>

              {(features || stats || tags) && (
                <button
                  onClick={onToggle}
                  className={`
                    p-2.5 rounded-sm transition-all duration-300
                    ${isRed ? "bg-white/15 text-white hover:bg-white/25" : ""}
                    ${isDark ? "bg-white/5 text-white/40 hover:bg-white/10" : ""}
                    ${isLight ? "bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-100" : ""}
                  `}
                >
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
              )}
            </div>
          </div>

          {/* Image side for horizontal */}
          {layout === "horizontal" && img && (
            <div className="lg:w-2/5 relative overflow-hidden min-h-[240px] rounded-r-sm">
              <img
                src={img}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/5" />
            </div>
          )}

        </div>
      )}

      {/* Vertical image at bottom */}
      {layout === "vertical" && img && !isImage && (
        <div className="h-52 relative overflow-hidden mt-auto">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          {isDark && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] to-transparent" />
          )}
        </div>
      )}

    </motion.div>
  );
}