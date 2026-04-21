import { motion } from "framer-motion";
import { Container } from "./Container";

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
    category: "Hospitality"
  },
  {
    title: "Wing Tower",
    desc: "BMS for HVAC, plumbing, electrical, lighting, ventilation, lift control, and power metering.",
    image: pWingTower,
    category: "Commercial"
  },
  {
    title: "Department of Economy and Finance – Kampong Speu",
    desc: "BMS covering access control, VESDA, fire alarm, and fuel leak detection systems.",
    image: pGovKampongSpeu,
    category: "Government"
  },
  {
    title: "Sky Villa",
    desc: "BMS for plumbing, electrical, lighting, ventilation, lift control, and power metering.",
    image: pSkyVilla,
    category: "Residential"
  },
  {
    title: "Laurelton Diamond Cambodia",
    desc: "BMS for HVAC, plumbing, electrical, lighting, ventilation, and power metering.",
    image: pLaurelton,
    category: "Enterprise"
  },
  {
    title: "Data Center – Hatha Bank",
    desc: "Control chiller system for data center cooling.",
    image: pHathaBank,
    category: "Banking"
  },
  {
    title: "Novotel Holiday Palace",
    desc: "BMS for HVAC, plumbing, electrical, lighting, ventilation, lift control, and power metering.",
    image: pNovotelHoliday,
    category: "Hospitality"
  },
  {
    title: "The Gateway",
    desc: "BMS for water metering and power metering.",
    image: pGateway,
    category: "Commercial"
  },
  {
    title: "Hongkong Land",
    desc: "BMS for HVAC, plumbing, electrical, and lighting.",
    image: pHongkongLand,
    category: "Commercial"
  },
  {
    title: "Chip Mong 598 Mall",
    desc: "BMS covering access control, VESDA, fire alarm, and fuel leak detection systems.",
    image: pChipMongMall,
    category: "Retail"
  },
  {
    title: "E-Sun Tower",
    desc: "BMS for HVAC, plumbing, electrical, lighting, ventilation, lift control, and power metering.",
    image: pESunTower,
    category: "Commercial"
  },
  {
    title: "Phnom Penh International Airport",
    desc: "Supply and integration of BMS covering HVAC, plumbing, electrical, lighting, ventilation, and power metering.",
    image: pAirport,
    category: "Infrastructure"
  }
];

export function FeaturedProjects() {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden border-t border-gray-100">
      <Container>
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#ff3b3b] mb-4"
          >
            Project Complete
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-xl md:text-[52px] font-bold text-[#071321] tracking-tight leading-[1.1] mb-8"
          >
            Successful Delivery.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-[#6b7c93] leading-relaxed max-w-1xl"
          >
            We have successfully delivered Building Management System (BMS) solutions for diverse industries, covering HVAC, plumbing, electrical, lighting, access control, fire safety, metering, and specialized systems. Below is a summary of our completed projects:
          </motion.p>
        </div>
      </Container>

      {/* Seamless Tile Grid - No Gaps, Edge to Edge */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden bg-[#071321] cursor-pointer"
            >
              {/* Background Image - High quality fill */}
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-100 group-hover:opacity-40"
              />

              {/* Dark Overlay (Transitions in on hover) */}
              <div className="absolute inset-0 bg-[#071321]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Seamless Bottom Label (Initially Visible) */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="font-display text-[15px] font-bold text-white leading-tight uppercase tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {p.title}
                </h3>
              </div>

              {/* Hover Detailed Content (Reveal interaction) */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-30 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="mb-3">
                  <span className="inline-block bg-[#ff3b3b] text-white uppercase text-[9px] font-bold px-3 py-1 rounded-full tracking-widest">
                    {p.category}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                  {p.title}
                </h3>
                <div className="w-8 h-[2px] bg-[#ff3b3b] mb-4" />
                <p className="text-white/80 text-[13px] leading-relaxed line-clamp-4">
                  {p.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 group/btn">
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] group-hover/btn:text-[#ff3b3b] transition-colors">
                    Learn More
                  </span>
                  <div className="w-5 h-[1px] bg-white group-hover/btn:bg-[#ff3b3b] transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

