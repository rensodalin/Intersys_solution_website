import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "./Container";
import { ArrowRight } from "lucide-react";

export const sectors = [
    {
        id: "data-centers",
        name: "Data Centers",
        desc: "In critical environments like data centers, we ensure 24/7 uptime through advanced fire suppression, access control, environmental monitoring, and energy management systems."
    },
    {
        id: "banking",
        name: "Banking & Financial Services",
        desc: "We provide secure, high-reliability infrastructure for financial institutions, including surveillance, access control, data protection, and building automation ensuring compliance, safety, and uptime."
    },
    {
        id: "education",
        name: "Education",
        desc: "From school networks to university campuses, we deploy technology that supports smart learning environments, secure access, public announcement systems, and campus-wide connectivity."
    },
    {
        id: "commercial",
        name: "Commercial Buildings",
        desc: "We transform commercial properties with intelligent building management systems (BMS), fire alarms, security systems, and energy-saving automation tailored to corporate needs."
    },
    {
        id: "smart-cities",
        name: "Smart Cities & Communities",
        desc: "From city-wide surveillance to integrated public services, we help governments and developers implement smart technologies that improve urban safety, traffic management, and sustainability."
    },
    {
        id: "airports",
        name: "Airports",
        desc: "We deliver scalable and secure systems for access control, fire detection, video surveillance, and public announcement across terminal zones, supporting safety and flow management."
    },
    {
        id: "hospitality",
        name: "Hospitality",
        desc: "We design smart hospitality environments with Room Control Units (RCUs), keyless access, centralized control panels, and safety systems improving guest experience and operational efficiency."
    },
    {
        id: "healthcare",
        name: "Healthcare",
        desc: "Hospitals and clinics require precision, reliability, and security. We provide integrated systems for nurse call, access control, CCTV, fire safety, and room automation for enhanced patient care and compliance."
    },
];

export function JourneySection() {
    return (
        <section className="bg-white">
            {/* Top Brand Banner */}
            <div className="bg-[#9B0F06] py-10 md:py-14 text-center">
                <Container>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-2xl md:text-3xl font-bold text-white mb-2"
                    >
                        A Journey of Engineering Excellence
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/90 text-sm md:text-base font-medium"
                    >
                        Over the years we have successfully integrated more than 100+ projects across Cambodia
                    </motion.p>
                </Container>
            </div>

            {/* Content Section */}
            <Container className="py-14 md:py-20">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#9B0F06] mb-4 uppercase"
                        >
                            Our Footprint
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-2xl md:text-3xl font-bold text-[#162E93] leading-tight mb-5"
                        >
                            Success in all sectors of Integrated Technology
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-[#4a5568] text-sm md:text-base leading-relaxed"
                        >
                            As a leading system integrator in Cambodia, Intersys Solutions meets the clients' needs from
                            concept to turnkey solutions across a wide-ranging array of building requirements.
                            These include large-scale projects such as:
                        </motion.p>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-10">
                            {sectors.map((sector, i) => (
                                <motion.div
                                    key={sector.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#9B0F06] group-hover:scale-150 transition-transform" />
                                    <span className="text-[#162E93] font-semibold text-[13px] md:text-[14px] group-hover:text-[#9B0F06] transition-colors">
                                        {sector.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                to="/sectors"
                                className="inline-flex items-center gap-3 bg-[#162E93] text-white px-8 py-4  font-bold text-[11px] tracking-widest uppercase hover:bg-[#9B0F06] hover:shadow-[0_10px_30px_-5px_rgba(255,59,59,0.3)] transition-all duration-300 transform hover:-translate-y-1 group"
                            >
                                View More Detail
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </motion.div>


                    </div>
                </div>
            </Container>
        </section>
    );
}
