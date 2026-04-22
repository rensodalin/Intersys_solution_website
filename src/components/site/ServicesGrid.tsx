import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./Container";
import {
  Cpu,
  Flame,
  Shield,
  Video,
  Volume2,
  Settings,
  LayoutGrid,
  ChevronDown
} from "lucide-react";
import bmsImg from "@/assets/bms_service.png";
import fireImg from "@/assets/fire_safety.png";
import securityImg from "@/assets/security_access.png";
import cctvImg from "@/assets/cctv_service.png";
import avImg from "@/assets/av_service.png";

export function ServicesGrid() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="solutions" className="py-20 bg-[#F8F9FA] overflow-hidden">
      <Container>
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-[#0A0F1A] mb-4"
          >
            Our <span className="text-red-500">Solution</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-500 max-w-2xl text-sm"
          >
            Integrated technology solutions for modern architectural marvels. We design, deploy, and manage the technical nervous system of your facility.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:auto-rows-min">

          {/* BMS */}
          <ServiceCard
            id="bms"
            icon={Cpu}
            title="Building Management Systems (BMS)"
            desc="Centralized control for lighting, HVAC, and power systems. Our BMS solutions optimize energy consumption by up to 30% while ensuring peak operational performance."
            features={['REAL-TIME MONITORING', 'ENERGY ANALYTICS', 'REMOTE HVAC CONTROL']}
            img={bmsImg}
            className="lg:col-span-4"
            isExpanded={expandedIds.includes('bms')}
            onToggle={() => toggleExpand('bms')}
            layout="horizontal"
          />

          {/* Fire */}
          <ServiceCard
            id="fire"
            icon={Flame}
            title="Fire & Life Safety"
            desc="UL-listed detection systems integrated with intelligent evacuation protocols. Every second counts in emergency management."
            className="lg:col-span-2"
            isExpanded={expandedIds.includes('fire')}
            onToggle={() => toggleExpand('fire')}
          />

          {/* CCTV */}
          <ServiceCard
            id="cctv"
            icon={Video}
            title="CCTV Surveillance"
            desc="Advanced IP-based video management with thermal imaging and facial recognition. Total visibility, 24/7."
            img={cctvImg}
            className="lg:col-span-2"
            isExpanded={expandedIds.includes('cctv')}
            onToggle={() => toggleExpand('cctv')}
            theme="dark"
          />

          {/* Security & Access */}
          <ServiceCard
            id="security"
            icon={LayoutGrid}
            title="Security & Access Control"
            desc="Beyond locks and keys. Our biometrically secured systems integrate seamlessly with HR databases to manage personnel flow."
            stats={[
              { label: "AUTH SPEED", value: "0.3s" },
              { label: "ENCRYPTION", value: "AES-256" }
            ]}
            img={securityImg}
            className="lg:col-span-4"
            isExpanded={expandedIds.includes('security')}
            onToggle={() => toggleExpand('security')}
            layout="horizontal-reverse"
          />

          {/* AV */}
          <ServiceCard
            id="av"
            icon={Volume2}
            title="Audio Visual Systems"
            desc="Immersive communication environments. From boardrooms to auditoriums, we provide high-fidelity audio and collaboration."
            tags={['VIDEO WALLS', 'SMART GLASS', 'PA SYSTEMS']}
            className="lg:col-span-3"
            isExpanded={expandedIds.includes('av')}
            onToggle={() => toggleExpand('av')}
          />

          {/* Custom */}
          <ServiceCard
            id="custom"
            icon={Settings}
            title="Custom Solutions"
            desc="Your challenges are unique. We offer bespoke engineering for specialized environments and high-security installations."
            className="lg:col-span-3"
            isExpanded={expandedIds.includes('custom')}
            onToggle={() => toggleExpand('custom')}
            theme="red"
            btnText="view More"
          />

        </div>
      </Container>
    </section>
  );
}

function ServiceCard({
  id, icon: Icon, title, desc, features, stats, tags, tag, img, className, isExpanded, onToggle, theme = 'light', layout = 'vertical', btnText = 'VIEW DETAIL'
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`${className} rounded-2xl p-8 flex flex-col shadow-lg border relative transition-all duration-500 hover:shadow-xl group
                ${theme === 'dark' ? 'bg-[#0A0F1A] border-white/5 text-white' :
          theme === 'red' ? 'bg-[#FC3B1F] border-none text-white' :
            'bg-white border-gray-100 text-[#0A1F44]'}
            `}
    >
      <div className={layout === 'horizontal' || layout === 'horizontal-reverse' ? 'flex flex-col lg:flex-row gap-8' : ''}>
        {layout === 'horizontal-reverse' && img && (
          <div className="flex-1 relative overflow-hidden rounded-xl h-48 lg:h-auto">
            <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0" />
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 
                        ${theme === 'dark' ? 'bg-white/5' : theme === 'red' ? 'bg-white/10' : 'bg-gray-50'}`}>
            <Icon className={`w-5 h-5 ${theme === 'dark' ? 'text-red-500' : theme === 'red' ? 'text-white' : 'text-[#0A1F44]'}`} />
          </div>

          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className={`leading-relaxed text-[11px] mb-6 ${theme === 'dark' ? 'text-white/40' : theme === 'red' ? 'text-white/80' : 'text-gray-500'}`}>
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
                  <ul className="space-y-3 mb-6">
                    {features.map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-[9px] font-bold tracking-widest">
                        <div className={`w-1 h-1 rounded-sm ${theme === 'red' ? 'bg-white' : 'bg-red-600'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {stats && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {stats.map((s: any) => (
                      <div key={s.label} className={`${theme === 'light' ? 'bg-[#F8F9FA]' : 'bg-white/5'} p-3 rounded-lg`}>
                        <div className="text-lg font-bold">{s.value}</div>
                        <div className="text-[8px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((t: string) => (
                      <span key={t} className={`px-3 py-1.5 rounded-md text-[8px] font-bold tracking-widest
                                                ${theme === 'light' ? 'bg-[#F1F3F5] text-gray-400' : 'bg-white/10 text-white/60'}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={(e) => { e.preventDefault(); onToggle(); }}
            className={`mt-auto flex items-center gap-2 text-[10px] font-bold tracking-widest transition-all w-fit
                            ${theme === 'red' ? 'px-6 py-3 bg-white text-[#FC3B1F] rounded-lg' : 'text-red-600 hover:text-red-700'}
                        `}
          >
            {theme === 'red' ? btnText : isExpanded ? 'VIEW LESS' : 'VIEW MORE'}
            {theme !== 'red' && (
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <ChevronDown className="w-3 h-3" />
              </motion.div>
            )}
          </button>

          {tag && !isExpanded && (
            <div className="mt-8 text-[9px] font-bold text-red-600 tracking-widest uppercase">
              {tag}
            </div>
          )}
        </div>

        {layout === 'horizontal' && img && (
          <div className="flex-1 relative overflow-hidden rounded-xl h-48 lg:h-auto min-h-[240px]">
            <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        )}
      </div>

      {layout === 'vertical' && img && (
        <div className="mt-8 -mx-8 -mb-8 relative h-48 overflow-hidden rounded-b-2xl">
          <img src={img} alt={title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
          {theme === 'dark' && <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] to-transparent" />}
        </div>
      )}
    </motion.div>
  );
}

