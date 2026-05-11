import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";

const values = [
  {
    icon: "https://static.thenounproject.com/png/2191323-200.png",
    title: "Our Mission",
    desc: "To architect resilient, scalable, and intelligent digital ecosystems that empower businesses to operate with unprecedented precision and efficiency.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/561/561094.png",
    title: "Our Vision",
    desc: "To be Cambodia’s most trusted provider of smart, safe, and sustainable building technology solutions.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/9042/9042975.png",
    title: "Core Values",
    desc: "Integrity by design, relentless innovation, and a commitment to engineering excellence that transcends temporary trends.",
  },
];

export function AboutMission() {
  return (
    <section className="relative py-24 bg-[#F5F7FA] overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-20" />

      <Container>
        <div className="text-center mb-7">


        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: "easeOut",
              }}
              whileHover={{ y: -10 }}
              className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden"
            >
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400" />

              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-[#F8F9FA] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <img
                  src={v.icon}
                  alt={v.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#0A0F1A] mb-4 font-display">
                {v.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed text-[15px]">
                {v.desc}
              </p>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-red-100 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}