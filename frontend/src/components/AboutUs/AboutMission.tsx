import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";

const values = [
  {
    icon: "https://static.thenounproject.com/png/2191323-200.png",
    title: "Our Mission",
    desc: "We deliver high-performance smart building and ELV systems tailored to our clients’ needs, integrating world-class technologies with strong engineering expertise to enhance safety, operational efficiency, and cost effectiveness. Support clients through strong technical expertise and reliable after-sales service.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/561/561094.png",
    title: "Our Vision",
    desc: "To be Cambodia’s most trusted provider of smart, safe, and sustainable building technology solutions, empowering organizations to create more efficient, secure, and future-ready environments.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/9042/9042975.png",
    title: "Core Values",
    points: [
      {
        keyword: "Integrity",
        text: "Commitment to quality, honesty, and transparency.",
      },
      {
        keyword: "Innovation",
        text: "Embracing technology for future-ready solutions.",
      },
      {
        keyword: "Excellence",
        text: "High-standard professional engineering services.",
      },
      {
        keyword: "Partnership",
        text: "Building long-term success with clients and brands.",
      },
      {
        keyword: "Reliability",
        text: "Delivering safety and consistent performance.",
      },
    ],
  },
];

export function AboutMission() {
  return (
    <section className="relative py-24 bg-[#F5F7FA] overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-md blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-md blur-3xl opacity-20" />

      <Container>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
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
              className="relative bg-white rounded-md p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden flex flex-col items-center text-center h-full"
            >
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400" />

              {/* Icon */}
              <div className="w-20 h-20 rounded-md bg-[#F8F9FA] flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-500 shrink-0">
                <img
                  src={v.icon}
                  alt={v.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#0A0F1A] mb-5 font-display text-center">
                {v.title}
              </h3>

              {/* Content / Description / Points */}
              <div className="flex-1 flex flex-col justify-start items-center w-full">
                {v.points ? (
                  <ul className="space-y-3 text-gray-500 text-[14px] leading-relaxed text-center w-full">
                    {v.points.map((p) => (
                      <li key={p.keyword} className="text-center">
                        <strong className="font-bold text-[#0A0F1A] mr-1.5">
                          {p.keyword}
                        </strong>
                        <span>{p.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 leading-relaxed text-[15px] text-center">
                    {v.desc}
                  </p>
                )}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-red-100 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}