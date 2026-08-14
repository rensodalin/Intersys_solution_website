import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CheckCircle2 } from "lucide-react";
import aboutImage from "@/assets/Certificates & Licenses/Certificates & Licenses/new/evolution.webp"


const evolution = [
  {
    year: "2015",
    title: "Foundation",
    desc: "Introduced high-end building management System (BMS) solutions with global brands and strengthened operations across commercial building, industry, hospitality, education, and public sectors.",
    status: "completed" as const,
  },
  {
    year: "2018",
    title: "Scale",
    desc: "Expanded engineering team and project capacity to enter larger-scale projects, integrating complex access control, surveillance, and PA systems.",
    status: "completed" as const,
  },
  {
    year: "2021",
    title: "Diversified",
    desc: "Mission to deliver advanced ELV systems, starting with core services in fire detection and alarm systems and security systems.",
    status: "current" as const,
  },
  {
    year: "2025",
    title: "Market Leadership",
    desc: "Positioned as the trusted leader in ELV integration through enhanced digital platforms, with a strategic focus on energy efficiency, BMS, and smart building solutions.",
    status: "future" as const,
  },
];

export function AboutEvolution() {
  return (
    <section className="relative py-20 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 md:bg-fixed"
        style={{
          backgroundImage: `url(${aboutImage})`,
        }}
      >
        <div className="absolute inset-0 bg-[#05080F]/60" />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-black font-display tracking-tight">
              Our Evolution
            </h3>
          </motion.div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-0">
          {/* Timeline Line */}
          <div className="absolute top-[16px] left-0 w-full h-px bg-white/10 hidden md:block" />

          <div className="grid md:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {evolution.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-center md:text-left group"
              >
                <div className="flex flex-col items-center md:items-start">
                  <div
                    className={
                      item.status === "completed"
                        ? "text-red-500"
                        : item.status === "current"
                          ? "text-blue-400"
                          : "text-gray-600"
                    }
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mb-4 mx-auto md:mx-0 bg-[#05080F] group-hover:scale-110 transition-transform duration-300">
                      {item.status === "completed" ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      )}
                    </div>
                  </div>
                  <span className="text-2xl font-display font-black mb-1 text-white/90">{item.year}</span>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-[13px] leading-relaxed max-w-[280px] md:max-w-[220px] mx-auto md:mx-0 group-hover:text-gray-200 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function SolutionsExpandableGrid() {
  return <AboutEvolution />;
}
