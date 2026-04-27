import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import team1 from "@/assets/team/team1.png";
import team2 from "@/assets/team/team2.png";
import team3 from "@/assets/team/team3.png";
import team4 from "@/assets/team/team4.png";

const team = [
  {
    name: "Elena Vance",
    role: "Lead Systems Engineer",
    img: team1,
    bio: "Expert in high-density network architecture and automated systems integration.",
  },
  {
    name: "Marcus Sterling",
    role: "Senior Project Manager",
    img: team2,
    bio: "Over 15 years of experience delivering multi-million dollar infrastructure projects.",
  },
  {
    name: "Sarah Chen",
    role: "Head of Digital Strategy",
    img: team3,
    bio: "Specializes in digital transformation and cloud-native structural implementations.",
  },
  {
    name: "David Miller",
    role: "Chief Technical Architect",
    img: team4,
    bio: "The visionary behind our core proprietary automation frameworks and security protocols.",
  },
];

export function AboutTeam() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#F1F3F5] to-white overflow-hidden">
      <Container>

        {/* HEADER */}
        <div className="mb-14 text-center lg:text-left">

          <h3 className="text-4xl font-bold text-[#0A0F1A] mt-2">
            The Architects Behind Innovation
          </h3>

          <div className="w-14 h-[3px] bg-[#D62828] mt-5 mx-auto lg:mx-0 rounded-full" />
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500">

                {/* IMAGE */}
                <div className="relative h-[320px] overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A]/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition" />
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-2">

                  <h4 className="text-lg font-bold text-[#0A0F1A] group-hover:text-[#D62828] transition">
                    {member.name}
                  </h4>

                  <p className="text-sm font-semibold text-[#D62828]">
                    {member.role}
                  </p>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {member.bio}
                  </p>

                </div>

                {/* ACCENT LINE */}
                <div className="h-[3px] w-0 group-hover:w-full bg-[#D62828] transition-all duration-500" />
              </div>
            </motion.div>
          ))}

        </div>
      </Container>
    </section>
  );
}