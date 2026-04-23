import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import team1 from "@/assets/team/team1.png";
import team2 from "@/assets/team/team2.png";
import team3 from "@/assets/team/team3.png";
import team4 from "@/assets/team/team4.png";

const team = [
    { name: "Elena Vance", role: "Lead Systems Engineer", img: team1, bio: "Expert in high-density network architecture and automated systems integration." },
    { name: "Marcus Sterling", role: "Senior Project Manager", img: team2, bio: "Over 15 years of experience delivering multi-million dollar infrastructure projects." },
    { name: "Sarah Chen", role: "Head of Digital Strategy", img: team3, bio: "Specializes in digital transformation and cloud-native structural implementations." },
    { name: "David Miller", role: "Chief Technical Architect", img: team4, bio: "The visionary behind our core proprietary automation frameworks and security protocols." },
];

export function AboutTeam() {
    return (
        <section className="py-16 bg-[#F1F3F5] overflow-hidden">
            <Container>
                <div className="mb-12 text-center lg:text-left">
                    <h3 className="text-3xl font-bold font-display text-[#0A0F1A]">The Architects</h3>
                    <div className="w-10 h-1 bg-red-600 mt-4 mx-auto lg:mx-0" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.1, type: "spring", damping: 20 }}
                            className="group"
                        >
                            <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-500">
                                <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <h4 className="text-base font-bold text-[#0A0F1A]">{member.name}</h4>
                                <p className="text-[11px] text-red-600 mt-0.5 mb-2 font-semibold">
                                    {member.role}
                                </p>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
