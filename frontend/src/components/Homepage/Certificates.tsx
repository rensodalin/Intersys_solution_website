import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import certificate1 from "../../assets/certificate1.jpg";
import certificate2 from "../../assets/certificate2.jpg";

export function Certificates() {
    return (
        <section className="bg-[#9B0F06] border-b border-white/5 overflow-hidden relative">
            <Container className="py-16 md:py-24">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Left: Certificate Image */}
                    <div className="lg:w-5/12 relative flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 w-full max-w-[340px] group"
                        >
                            {/* Glowing halo behind certificate */}
                            <div className="absolute -inset-10 bg-white/10 blur-[80px] rounded-full opacity-50" />

                            <div className="relative bg-white p-2 rounded-sm shadow-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                                <img
                                    src={certificate1}
                                    alt="Intersys Official Certificate"
                                    className="w-full h-auto rounded-sm"
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, rotate: 8 }}
                                whileInView={{ opacity: 1, rotate: 4 }}
                                viewport={{ once: true }}
                                className="absolute top-0 right-0 -z-10 bg-white/90 p-2 rounded-sm shadow-xl w-full translate-x-4 translate-y-4"
                            >
                                <img
                                    src={certificate2}
                                    alt="Secondary License"
                                    className="w-full h-auto rounded-sm opacity-30 grayscale"
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
                            className="text-[11px] font-mono font-bold tracking-[0.2em] text-white/70 mb-4 uppercase"
                        >
                            Accreditation
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-6"
                        >
                            A multiple rewarded <br />
                            <span className="text-white/80">Engineering Company</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-sm md:text-[15px] text-white/80 leading-relaxed mb-8 max-w-lg"
                        >
                            Throughout our history, Intersys Solutions has been recognized for its technical
                            excellence and adherence to global standards. Our licenses and Honeywell partnership
                            vouch for our commitment to world-class engineering quality.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <button className="bg-[#162E93] text-white px-8 py-3.5 rounded-sm font-bold text-[12px] tracking-widest uppercase hover:bg-white hover:text-[#162E93] transition-all duration-300 shadow-xl shadow-black/20">
                                View Credentials
                            </button>
                        </motion.div>
                    </div>

                </div>
            </Container>

            {/* Subtle Pattern (White version for dark background) */}
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </section>
    );
}

