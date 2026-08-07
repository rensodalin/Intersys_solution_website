import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";

import p1 from "../../assets/Partner/p1.png";
import p2 from "../../assets/Partner/p2.png";
import p3 from "../../assets/Partner/p3.webp";
import p4 from "../../assets/Partner/p4.webp";
import p5 from "../../assets/Partner/p5.png";
import p6 from "../../assets/Partner/p6.png";
import p7 from "../../assets/Partner/p7.png";
import p8 from "../../assets/Partner/p8.png";
import p9 from "../../assets/Partner/p9.avif";
import p10 from "../../assets/Partner/p10.png";

const partners = [
    { src: p1, name: "Partner 1" },
    { src: p2, name: "Partner 2" },
    { src: p3, name: "Partner 3" },
    { src: p4, name: "Partner 4" },
    { src: p5, name: "Partner 5" },
    { src: p6, name: "Partner 6" },
    { src: p7, name: "Partner 7" },
    { src: p8, name: "Partner 8" },
    { src: p9, name: "Partner 9" },
    { src: p10, name: "Partner 10" },
];

export function Partnership() {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <Container>

                {/* Header */}
                <div className="text-center mb-14 space-y-3">


                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-3xl md:text-4xl font-bold text-[#1A3263] "
                    >
                        Partnerships we <span className="text-[#C00707]">value</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed"
                    >
                        Trusted by industry leaders worldwide
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                    {partners.map((partner, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
                            className="h-28 cursor-pointer bg-white rounded-lg border border-gray-100 shadow-sm flex items-center justify-center p-5 hover:shadow-md transition-shadow"
                        >
                            <img
                                src={partner.src}
                                alt={partner.name}
                                className="w-32 h-16 object-contain"
                            />
                        </motion.div>
                    ))}
                </div>



            </Container>
        </section>
    );
}