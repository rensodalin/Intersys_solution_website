import { motion } from "framer-motion";
import { Container } from "./Container";
import solutionImg from "@/assets/solution.png";

const services = [
  {
    title: "Building Management Systems",
    desc: "Optimize building performance with intelligent automation.",
    btn: "Discover",
  },
  {
    title: "Fire Alarm Systems",
    desc: "Early detection systems to protect people and assets.",
    btn: "Explore",
  },
  {
    title: "Access Control",
    desc: "Secure, flexible access tailored to your site.",
    btn: "Secure",
  },
  {
    title: "CCTV Surveillance",
    desc: "AI-powered monitoring with real-time insights.",
    btn: "View",
  },
  {
    title: "AV Systems",
    desc: "High-performance communication environments.",
    btn: "Explore",
  },
  {
    title: "Custom Solutions",
    desc: "Tailored engineering for complex challenges.",
    btn: "Custom",
  },
];

export function ServicesGrid() {
  return (
    <section className="relative bg-white py-20">
      {/* Top background */}
      <div className="absolute top-0 left-0 right-0 h-[45%] bg-[#1A3263]" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-16">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Our Smart Solutions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/70 text-sm"
            >
              Intelligent building systems designed for performance and security.
            </motion.p>
          </div>

          {/* Floating Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1.5 }}
            className="relative w-full max-w-md"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <img
                src={solutionImg}
                className="w-full drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#9B0F06]/0 to-[#9B0F06]/0 group-hover:from-[#9B0F06]/10 group-hover:to-transparent blur-xl transition duration-300" />

              {/* Card */}
              <div className="relative bg-white border border-gray-100 rounded-xl p-6 flex flex-col h-full transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">

                <h3 className="text-lg font-semibold text-[#162E93] mb-2">
                  {s.title}
                </h3>

                <p className="text-sm text-gray-500 mb-6 flex-grow">
                  {s.desc}
                </p>

                {/* Button */}
                <button className="text-sm font-semibold text-[#9B0F06] flex items-center gap-2 transition group-hover:gap-3">
                  {s.btn}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
