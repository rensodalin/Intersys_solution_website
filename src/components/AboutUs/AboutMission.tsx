import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { Rocket, Eye, Shield } from "lucide-react";

const values = [
    {
        icon: Rocket,
        title: "Our Mission",
        desc: "To architect resilient, scalable, and intelligent digital ecosystems that empower businesses to operate with unprecedented precision and efficiency.",
    },
    {
        icon: Eye,
        title: "Our Vision",
        desc: "To be Cambodia’s most trusted provider of smart, safe, and sustainable building technology solutions.",
    },
    {
        icon: Shield,
        title: "Core Values",
        desc: "Integrity by design, relentless innovation, and a commitment to engineering excellence that transcends temporary trends.",
    },
];

export function AboutMission() {
    return (
        <section className="py-16 bg-[#F8F9FA]">
            <Container>
                <div className="grid md:grid-cols-3 gap-6">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.1, type: "spring", damping: 20 }}
                            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 group"
                        >
                            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-500">
                                <v.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-500" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0A0F1A] mb-3 font-display">{v.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {v.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
