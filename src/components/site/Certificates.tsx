import { motion } from "framer-motion";
import { Container } from "./Container";
import certificate1 from "../../assets/certificate1.jpg";
import certificate2 from "../../assets/certificate2.jpg";

export function Certificates() {
    return (
        <section className="relative bg-[#a81c1c] overflow-hidden">
            <Container className="py-12 md:py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

                    {/* Left: Certificate Image */}
                    <div className="lg:w-5/12 relative flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 w-full max-w-[320px] group"
                        >
                            <div className="absolute -inset-4 bg-white/10 blur-2xl rounded-full scale-90" />

                            <div className="relative bg-white p-2 rounded-lg shadow-xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                <img
                                    src={certificate1}
                                    alt="Intersys Official Certificate"
                                    className="w-full h-auto rounded"
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, rotate: 8 }}
                                whileInView={{ opacity: 1, rotate: 4 }}
                                viewport={{ once: true }}
                                className="absolute top-0 right-0 -z-10 bg-white/80 p-2 rounded-lg shadow-lg w-full translate-x-3 translate-y-3"
                            >
                                <img
                                    src={certificate2}
                                    alt="Secondary License"
                                    className="w-full h-auto rounded opacity-30 blur-[1px]"
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right: Information Content */}
                    <div className="lg:w-7/12 text-white">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[12px] font-mono font-bold tracking-[0.2em] opacity-80 mb-4 uppercase"
                        >
                            Accreditation
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
                        >
                            A multiple rewarded <br /> Engineering Company
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-[15px] md:text-[16px] text-white/90 leading-relaxed mb-8 max-w-lg"
                        >
                            During our history, Intersys Solutions has been recognized for technical excellence.
                            Our licenses and Honeywell partnership reflect our commitment to world-class
                            engineering standards.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <button className="bg-white text-[#a81c1c] px-8 py-3 rounded-sm font-bold text-[13px] tracking-widest uppercase hover:bg-[#071321] hover:text-white transition-all duration-300 shadow-xl">
                                Read More
                            </button>
                        </motion.div>
                    </div>

                </div>
            </Container>

            {/* Decorative Technical Overlay */}
            <div className="absolute right-0 top-0 w-1/4 h-full opacity-10 pointer-events-none">
                <svg fill="currentColor" viewBox="0 0 100 100" className="w-full h-full text-white">
                    <circle cx="100" cy="50" r="50" />
                </svg>
            </div>
        </section>
    );
}
