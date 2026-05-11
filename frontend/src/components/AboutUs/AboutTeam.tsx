import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";

import team1 from "@/assets/team/team1.png";
import team2 from "@/assets/team/team2.png";
import team3 from "@/assets/team/team3.png";
import team4 from "@/assets/team/team4.png";

const teamData = [
  {
    name: "Omar Mehri",
    designation: "Founder & CEO",
    image: team1,
  },
  {
    name: "Layla Samuel",
    designation: "Managing Director",
    image: team2,
  },
  {
    name: "Draper Timothy",
    designation: "Technical Director",
    image: team3,
  },
  {
    name: "Mariam Shah",
    designation: "Operations Manager",
    image: team4,
  },
];

export function AboutTeam() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        {/* HEADER */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0F1A] tracking-tight">
            Board Of Directors
          </h2>
          <div className="w-16 h-1 bg-[#D62828] mt-6 mx-auto rounded-full" />
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {teamData.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative group h-[520px]"
            >
              {/* Background Red Shape */}
              <div className="absolute inset-0 top-12 left-0 right-12 bottom-0 bg-[#D62828] rounded-tl-[80px] -z-10" />

              {/* Background Vertical Text */}
              <div className="absolute left-6 top-24 bottom-10 overflow-hidden pointer-events-none select-none opacity-20">
                <span
                  className="text-white text-[50px] font-black tracking-widest uppercase leading-none whitespace-nowrap origin-top-left -rotate-90 block translate-y-full"
                  style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.4)",
                    color: "transparent"
                  }}
                >
                  INTERSYS
                </span>
              </div>

              {/* Portrait Image Container */}
              <div className="absolute inset-0 flex items-end">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[92%] object-contain object-bottom filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-[#D62828] via-[#D62828]/80 to-transparent">
                <h3 className="text-xl font-bold text-white mb-1.5">
                  {member.name}
                </h3>
                <p className="text-white/80 text-xs font-bold tracking-widest uppercase">
                  {member.designation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM DESCRIPTION */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 leading-relaxed text-[15px]">
            Our leadership team brings together decades of international expertise in security systems,
            building automation, and engineering excellence. Committed to the vision of a safer, smarter
            Cambodia, we architect resilient and intelligent digital ecosystems that empower businesses
            to operate with unprecedented precision and efficiency.
          </p>
        </div>
      </Container>
    </section>
  );
}