import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import bmsImg from "@/assets/bms_service.png";
import fireImg from "@/assets/fire_safety.png";
import securityImg from "@/assets/security_access.png";
import cctvImg from "@/assets/cctv_service.png";
import avImg from "@/assets/av_service.png";

export function ServicesGrid() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <section id="solutions" className="py-24 bg-[#F9FAFB] overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <Container>
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-[#0A0F1A] mb-6 tracking-tight"
          >
            Our <span className="text-red-500">Solution</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-gray-500 max-w-2xl text-base leading-relaxed"
          >
            Integrated technology solutions for modern architectural marvels. We design, deploy, and
            manage the technical nervous system of your facility with precision engineering.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:auto-rows-min">
          {/* BMS */}
          <ServiceCard
            id="bms"
            icon={Cpu}
            title="Building Management Systems (BMS)"
            desc="Discover how our advanced Building Management Systems (BMS) can optimize the performance of your building's essential systems, ensuring seamless operation and energy efficiency."
            features={["Real-time monitoring", "Energy analytics", "Remote HVAC control"]}
            img={bmsImg}
            className="lg:col-span-4"
            isExpanded={expandedIds.includes("bms")}
            onToggle={() => toggleExpand("bms")}
            layout="horizontal"
            href="/services/building-management"
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
          />

          {/* CCTV */}
          <ServiceCard
            id="cctv"
            icon={Video}
            title="CCTV Surveillance"
            desc="Ensure constant vigilance and monitoring with our Surveillance (CCTV) solutions, providing comprehensive coverage and real-time visual insights for enhanced security."
            img={cctvImg}
            className="lg:col-span-2"
            isExpanded={expandedIds.includes("cctv")}
            onToggle={() => toggleExpand("cctv")}
            theme="dark"
            href="/services/surveillance"
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
            img={securityImg}
            className="lg:col-span-4"
            isExpanded={expandedIds.includes("security")}
            onToggle={() => toggleExpand("security")}
            layout="horizontal-reverse"
            href="/services/access-control"
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
            btnText="View More"
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
  tag,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${className} rounded-3xl p-8 flex flex-col shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border relative transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] group
                ${theme === "dark"
          ? "bg-[#0A0F1A] border-white/5 text-white"
          : theme === "red"
            ? "bg-[#FC3B1F] border-none text-white"
            : "bg-white border-gray-100 text-[#0A1F44]"
        }
            `}
    >
      <div
        className={
          layout === "horizontal" || layout === "horizontal-reverse"
            ? "flex flex-col lg:flex-row gap-10"
            : ""
        }
      >
        {layout === "horizontal-reverse" && img && (
          <div className="flex-1 relative overflow-hidden rounded-2xl h-48 lg:min-h-[300px]">
            <img
              src={img}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 transition-colors duration-500
                        ${theme === "dark" ? "bg-white/5" : theme === "red" ? "bg-white/10" : "bg-gray-50 group-hover:bg-red-50"}`}
          >
            <Icon
              className={`w-6 h-6 transition-colors duration-500 ${theme === "dark" ? "text-red-500" : theme === "red" ? "text-white" : "text-[#0A1F44] group-hover:text-red-600"}`}
            />
          </div>

          <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight">{title}</h3>
          <p
            className={`leading-relaxed text-sm mb-8 font-light ${theme === "dark" ? "text-white/40" : theme === "red" ? "text-white/80" : "text-gray-500"}`}
          >
            {desc}
          </p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {features && (
                  <ul className="space-y-4 mb-8">
                    {features.map((f: string) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-sm font-medium"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${theme === "red" ? "bg-white" : "bg-red-600"}`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {stats && (
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {stats.map((s: any) => (
                      <div
                        key={s.label}
                        className={`${theme === "light" ? "bg-gray-50" : "bg-white/5"} p-4 rounded-xl border ${theme === "light" ? "border-gray-100" : "border-white/5"}`}
                      >
                        <div className="text-xl font-bold">{s.value}</div>
                        <div className={`text-[10px] font-semibold tracking-wide mt-1 ${theme === "light" ? "text-gray-400" : "text-white/30"}`}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {tags && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((t: string) => (
                      <span
                        key={t}
                        className={`px-4 py-2 rounded-lg text-[10px] font-semibold tracking-wide
                                                ${theme === "light" ? "bg-gray-50 text-gray-500" : "bg-white/10 text-white/60"}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto flex items-center gap-3">
            <button
              onClick={() => {
                if (href) {
                  router.navigate({ to: href });
                }
              }}
              className={`flex items-center gap-2 text-[11px] font-bold tracking-widest transition-all duration-300 px-6 py-3 rounded-full group/btn
                            ${theme === "red"
                  ? "bg-white text-[#FC3B1F] hover:bg-[#0A0F1A] hover:text-white shadow-xl shadow-red-900/10"
                  : theme === "dark"
                    ? "bg-white/5 text-red-500 hover:bg-white/10 hover:text-red-400"
                    : "bg-gray-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-red-500/20"
                }
                        `}
            >
              <span>{btnText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>

            {/* Toggle Arrow for expansion */}
            {(features || stats || tags) && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onToggle();
                }}
                className={`p-3 rounded-full transition-all duration-300 
                                ${theme === "red" ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}
                            `}
              >
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
            )}
          </div>

          {tag && !isExpanded && (
            <div className="mt-8 text-[10px] font-bold text-red-600 tracking-wider">
              {tag}
            </div>
          )}
        </div>

        {layout === "horizontal" && img && (
          <div className="flex-1 relative overflow-hidden rounded-2xl h-48 lg:min-h-[300px]">
            <img
              src={img}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        )}
      </div>

      {layout === "vertical" && img && (
        <div className="mt-10 -mx-8 -mb-8 relative h-56 overflow-hidden rounded-b-3xl">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
          />
          {theme === "dark" && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] to-transparent" />
          )}
        </div>
      )}
    </motion.div>
  );
}
