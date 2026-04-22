import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/site/Container";
import { motion } from "framer-motion";
import {
  Cpu,
  Flame,
  Shield,
  Video,
  Volume2,
  Settings,
  LayoutGrid
} from "lucide-react";
import heroImg from "@/assets/Hero1.png";
import bmsImg from "@/assets/bms_service.png";
import fireImg from "@/assets/fire_safety.png";
import securityImg from "@/assets/security_access.png";
import cctvImg from "@/assets/cctv_service.png";
import avImg from "@/assets/av_service.png";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Solutions — Intersys Solutions" },
      {
        name: "description",
        content: "Discover our comprehensive range of smart building solutions, from BMS and fire safety to advanced security and integrated AV systems.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen font-display pb-16 text-xs">
      {/* Hero Section - Reduced padding and font size */}
      <section className="relative pt-24 pb-32 bg-[#0A0F1A] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Solutions Background" className="w-full h-full object-cover opacity-20 grayscale brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A]/50 to-[#0A0F1A]" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6">
              Precision Engineered <br />
              <span className="text-red-500">Ecosystems.</span>
            </h1>
            <p className="text-base text-white/40 max-w-xl leading-relaxed">
              Integrated technology solutions for modern architectural marvels. We design, deploy, and manage the technical nervous system of your facility.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Content Section - More compact grid */}
      <section className="-mt-20 relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">

            {/* BMS - Horizontal Large Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 bg-white rounded-2xl p-8 flex flex-col lg:flex-row gap-8 shadow-lg border border-gray-100 group"
            >
              <div className="flex-1">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                  <Cpu className="w-5 h-5 text-[#0A1F44]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Building Management Systems (BMS)</h3>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Centralized control for lighting, HVAC, and power systems. Our BMS solutions optimize energy consumption by up to 30% while ensuring peak operational performance.
                </p>
                <ul className="space-y-3">
                  {['REAL-TIME MONITORING', 'ENERGY ANALYTICS', 'REMOTE HVAC CONTROL'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-[9px] font-bold text-[#0A1F44] tracking-widest">
                      <div className="w-1 h-1 bg-red-600 rounded-sm" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 relative overflow-hidden rounded-xl min-h-[240px]">
                <img src={bmsImg} alt="BMS" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </motion.div>

            {/* Fire & Life Safety - Spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-2xl p-8 flex flex-col justify-between shadow-lg border border-gray-100"
            >
              <div>
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                  <Flame className="w-5 h-5 text-[#0A1F44]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A1F44] mb-3">Fire & Life Safety</h3>
                <p className="text-gray-500 leading-relaxed text-[11px]">
                  UL-listed detection systems integrated with intelligent evacuation protocols. Every second counts in emergency management.
                </p>
              </div>
              <div className="mt-8 text-[9px] font-bold text-red-600 tracking-widest">
                CERTIFIED STANDARDS
              </div>
            </motion.div>

            {/* CCTV - Spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-[#0A0F1A] rounded-2xl overflow-hidden flex flex-col shadow-lg border border-white/5 group"
            >
              <div className="p-8">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                  <Video className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">CCTV Surveillance</h3>
                <p className="text-white/40 leading-relaxed text-[11px]">
                  Advanced IP-based video management with thermal imaging and facial recognition. Total visibility, 24/7.
                </p>
              </div>
              <div className="mt-auto relative h-48 overflow-hidden">
                <img src={cctvImg} alt="CCTV" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] to-transparent" />
              </div>
            </motion.div>

            {/* Security & Access Control - Wide Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 bg-white rounded-2xl p-8 flex flex-col lg:flex-row gap-8 shadow-lg border border-gray-100 group"
            >
              <div className="flex-1 relative overflow-hidden rounded-xl min-h-[240px]">
                <img src={securityImg} alt="Security" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                  <LayoutGrid className="w-5 h-5 text-[#0A1F44]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Security & Access Control</h3>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Beyond locks and keys. Our biometrically secured systems integrate seamlessly with HR databases to manage personnel flow.
                </p>
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <div className="bg-[#F8F9FA] p-3 rounded-lg">
                    <div className="text-lg font-bold text-[#0A1F44]">0.3s</div>
                    <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">AUTH SPEED</div>
                  </div>
                  <div className="bg-[#F8F9FA] p-3 rounded-lg">
                    <div className="text-lg font-bold text-[#0A1F44]">AES-256</div>
                    <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">ENCRYPTION</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Audio Visual - Spans 3 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white rounded-2xl p-8 flex flex-col shadow-lg border border-gray-100"
            >
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                <Volume2 className="w-5 h-5 text-[#0A1F44]" />
              </div>
              <h3 className="text-lg font-bold text-[#0A1F44] mb-3">Audio Visual Systems</h3>
              <p className="text-gray-500 leading-relaxed mb-8 text-[11px]">
                Immersive communication environments. From boardrooms to auditoriums, we provide high-fidelity audio and collaboration.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['VIDEO WALLS', 'SMART GLASS', 'PA SYSTEMS'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-[#F1F3F5] text-[8px] font-bold text-gray-400 tracking-widest rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Custom Solutions - Spans 3 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-[#FC3B1F] rounded-2xl p-8 flex flex-col shadow-lg"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Custom Solutions</h3>
              <p className="text-white/80 leading-relaxed mb-10 text-[11px]">
                Your challenges are unique. We offer bespoke engineering for specialized environments and high-security installations.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto px-6 py-3 bg-white text-[#FC3B1F] text-[10px] font-bold uppercase tracking-widest rounded-lg w-fit"
              >
                CONSULT AN ENGINEER
              </motion.button>
            </motion.div>

          </div>
        </Container>
      </section>
    </div>
  );
}
