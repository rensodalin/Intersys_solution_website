import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";

// Import all project images
import pNovotelPP from "@/assets/project/Novo.png";
import pWingTower from "@/assets/project/WingTower.png";
import pGovKampongSpeu from "@/assets/project/image.png";
import pSkyVilla from "@/assets/project/sky_villa.png";
import pLaurelton from "@/assets/project/Laurelton Diamond Cambodia.png";
import pHathaBank from "@/assets/project/Hatta_bank.png";
import pNovotelHoliday from "@/assets/project/Novotel Holiday Palace.png";
import pGateway from "@/assets/project/the_Gateway.png";
import pHongkongLand from "@/assets/project/Hongkongland.png";
import pChipMongMall from "@/assets/project/Chipmong_598_mall.png";
import pESunTower from "@/assets/project/esuntower.png";
import pAirport from "@/assets/project/Phnom_penh_international_aireport.png";

const projects = [
  {
    title: "Novotel Phnom Penh",
    desc: "BMS for HVAC, plumbing, electrical, lighting, ventilation, lift control, and power metering.",
    image: pNovotelPP,
    category: "Hospitality",
  },
  {
    title: "Wing Tower",
    desc: "BMS for HVAC, plumbing, electrical, lighting, ventilation, lift control, and power metering.",
    image: pWingTower,
    category: "Commercial",
  },
  {
    title: "Department of Economy and Finance – Kampong Speu",
    desc: "BMS covering access control, VESDA, fire alarm, and fuel leak detection systems.",
    image: pGovKampongSpeu,
    category: "Government",
  },
  {
    title: "Sky Villa",
    desc: "BMS for plumbing, electrical, lighting, ventilation, lift control, and power metering.",
    image: pSkyVilla,
    category: "Residential",
  },
  {
    title: "Laurelton Diamond Cambodia",
    desc: "BMS for HVAC, plumbing, electrical, lighting, ventilation, and power metering.",
    image: pLaurelton,
    category: "Enterprise",
  },
  {
    title: "Data Center – Hatha Bank",
    desc: "Control chiller system for data center cooling.",
    image: pHathaBank,
    category: "Banking",
  },
  {
    title: "Novotel Holiday Palace",
    desc: "BMS for HVAC, plumbing, electrical, lighting, ventilation, lift control, and power metering.",
    image: pNovotelHoliday,
    category: "Hospitality",
  },
  {
    title: "The Gateway",
    desc: "BMS for water metering and power metering.",
    image: pGateway,
    category: "Commercial",
  },
  {
    title: "Hongkong Land",
    desc: "BMS for HVAC, plumbing, electrical, and lighting.",
    image: pHongkongLand,
    category: "Commercial",
  },
  {
    title: "Chip Mong 598 Mall",
    desc: "BMS covering access control, VESDA, fire alarm, and fuel leak detection systems.",
    image: pChipMongMall,
    category: "Retail",
  },
  {
    title: "E-Sun Tower",
    desc: "BMS for HVAC, plumbing, electrical, lighting, ventilation, lift control, and power metering.",
    image: pESunTower,
    category: "Commercial",
  },
  {
    title: "Phnom Penh International Airport",
    desc: "Supply and integration of BMS covering HVAC, plumbing, electrical, lighting, ventilation, and power metering.",
    image: pAirport,
    category: "Infrastructure",
  },
];

export function FeaturedProjects() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative aspect-square overflow-hidden cursor-pointer bg-[#162E93]"
          >
            {/* Image */}
            <img
              src={p.image}
              alt={p.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Soft overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-[#162E93]/70 transition-all duration-500" />

            {/* Bottom title (default state) */}
            <div className="absolute bottom-0 inset-x-0 p-5 z-20 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-sm font-semibold text-white leading-snug drop-shadow">
                {p.title}
              </h3>
            </div>

            {/* Hover content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-30 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">

              {/* category */}
              <span className="inline-block w-fit bg-[#9B0F06] text-white text-[10px] font-medium px-3 py-1 rounded-full mb-3">
                {p.category}
              </span>

              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-snug">
                {p.title}
              </h3>

              <div className="w-8 h-[2px] bg-[#9B0F06] mb-3" />

              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}