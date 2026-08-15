import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { ArrowRight } from "lucide-react";

export const sectors = [
  {
    id: "data-centers",
    name: "Data Centers",
    desc: "In critical environments like data centers, we ensure 24/7 uptime through advanced fire suppression, access control, environmental monitoring, and energy management systems.",
  },
  {
    id: "banking",
    name: "Banking & Financial Services",
    desc: "We provide secure, high-reliability infrastructure for financial institutions, including surveillance, access control, data protection, and building automation ensuring compliance, safety, and uptime.",
  },
  {
    id: "education",
    name: "Education",
    desc: "From school networks to university campuses, we deploy technology that supports smart learning environments, secure access, public announcement systems, and campus-wide connectivity.",
  },
  {
    id: "commercial",
    name: "Commercial Buildings",
    desc: "We transform commercial properties with intelligent building management systems (BMS), fire alarms, security systems, and energy-saving automation tailored to corporate needs.",
  },
  {
    id: "smart-cities",
    name: "Smart Cities & Communities",
    desc: "From city-wide surveillance to integrated public services, we help governments and developers implement smart technologies that improve urban safety, traffic management, and sustainability.",
  },
  {
    id: "airports",
    name: "Airports",
    desc: "We deliver scalable and secure systems for access control, fire detection, video surveillance, and public announcement across terminal zones, supporting safety and flow management.",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    desc: "We design smart hospitality environments with Room Control Units (RCUs), keyless access, centralized control panels, and safety systems improving guest experience and operational efficiency.",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    desc: "Hospitals and clinics require precision, reliability, and security. We provide integrated systems for nurse call, access control, CCTV, fire safety, and room automation for enhanced patient care and compliance.",
  },
];

export function JourneySection() {
  return (
    <section className="bg-white">

      {/* Header */}
      <div className="bg-[#C3110C] py-10 md:py-14 text-center">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2"
          >
            A journey of engineering excellence
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-sm md:text-base max-w-xl mx-auto"
          >
            Over 100+ projects delivered across Cambodia
          </motion.p>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-14 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left */}
          <div className="lg:w-1/2 text-center lg:text-left">

            <div className="text-sm font-medium text-[#9B0F06] mb-3 tracking-wide">
              Our footprint
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#162E93] leading-snug mb-4">
              Success across integrated technology sectors
            </h3>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              As a system integrator in Cambodia, we deliver end-to-end solutions
              across multiple industries — from design to full deployment.
            </p>
          </div>

          {/* Right */}
          <div className="lg:w-1/2 text-center lg:text-left">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 mb-8">
              {sectors.map((sector) => (
                <div key={sector.id} className="flex items-center gap-3 group">

                  <div className="w-1.5 h-1.5 rounded-full bg-[#9B0F06] group-hover:scale-150 transition-transform" />

                  <span className="text-sm text-[#162E93] font-medium group-hover:text-[#9B0F06] transition-colors">
                    {sector.name}
                  </span>

                </div>
              ))}
            </div>

            <Link
              to="/sectors"
              className="inline-flex items-center gap-2 bg-[#1A3263] text-white px-6 py-3 rounded-md text-xs font-medium hover:bg-[#9B0F06] transition-all group"
            >
              View more details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>
        </div>
      </Container>
    </section>
  );
}