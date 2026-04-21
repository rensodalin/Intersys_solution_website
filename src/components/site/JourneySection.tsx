import { motion } from "framer-motion";
import { Container } from "./Container";

export function JourneySection() {
    return (
        <section className="bg-white">
            {/* Top Brand Banner */}
            <div className="bg-[#ff3b3b] py-16 md:py-24 text-center">
                <Container>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-xl md:text-6xl font-bold text-white mb-6"
                    >
                        A Journey of Engineering Excellence
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/90 text-lg md:text-xl font-medium"
                    >
                        Over the years we have successfully integrated more than 100+ projects across Cambodia
                    </motion.p>
                </Container>
            </div>

            {/* Content Section */}
            <Container className="py-24 md:py-32">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-[12px] font-mono font-bold tracking-[0.2em] text-[#ff3b3b] mb-6 uppercase"
                        >
                            Our Footprint
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-4xl md:text-5xl font-bold text-[#071321] leading-tight mb-8"
                        >
                            Success in all sectors of Integrated Technology
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-[#4a5568] text-lg leading-relaxed mb-8"
                        >
                            As a leading system integrator in Cambodia, Intersys Solutions meets the clients' needs from
                            concept to turnkey solutions across a wide-ranging array of building requirements.
                            These include large-scale projects such as:
                        </motion.p>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {[
                                "Commercial & High-Rise Towers",
                                "Hotels & Luxury Resorts",
                                "Banking & Financial Data Centers",
                                "Government & Public Institutions",
                                "Residential & Prestigious Villas",
                                "Industrial & Manufacturing Plants",
                                "Malls & Retail Complexes",
                                "Aviation & Infrastructure"
                            ].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff3b3b] group-hover:scale-150 transition-transform" />
                                    <span className="text-[#071321] font-semibold text-[15px] md:text-[16px] group-hover:text-[#ff3b3b] transition-colors">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 text-[#4a5568] font-medium"
                        >
                            And many other specialized engineering fields.
                        </motion.p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
