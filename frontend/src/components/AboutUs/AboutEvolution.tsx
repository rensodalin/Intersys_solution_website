import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CheckCircle2 } from "lucide-react";

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
    <section className="py-24 bg-[#05080F] text-white overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold font-display">Our Evolution</h3>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden md:block" />

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {evolution.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, type: "spring", damping: 20 }}
                className="text-center md:text-left"
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
                    <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center mb-4 mx-auto md:mx-0 bg-[#05080F]">
                      {item.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>
                  </div>
                  <span className="text-2xl font-display font-bold mb-1">{item.year}</span>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-[13px] leading-relaxed max-w-[240px] mx-auto md:mx-0">
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
