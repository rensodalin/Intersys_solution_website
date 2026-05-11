import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";

import team1 from "@/assets/team/team1.png";
import team2 from "@/assets/team/team2.png";
import team3 from "@/assets/team/team3.png";
import team4 from "@/assets/team/team4.png";

const teamData = [
  { name: "Omar Mehri", designation: "Founder & CEO", image: team1 },
  { name: "Layla Samuel", designation: "Managing Director", image: team2 },
  { name: "Draper Timothy", designation: "Technical Director", image: team3 },
  { name: "Mariam Shah", designation: "Operations Manager", image: team4 },
];

export function AboutTeam() {
  return (
    <section className="py-24 bg-[#F9F8F3] overflow-hidden text-sm">
      <Container>
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 tracking-tight"
          >
            The Team Behind Intersys
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-base leading-relaxed"
          >
            Our dedicated team of experienced professionals is at the heart of what we do. 
            With a deep knowledge of the local market and a passion for helping clients 
            achieve their engineering goals, we're here to guide you every step of the way.
          </motion.p>
        </div>

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {teamData.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative aspect-[1/1.1] bg-[#E8E7E2] overflow-hidden mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Info Area */}
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-[#1A1A1A]">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {member.designation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}