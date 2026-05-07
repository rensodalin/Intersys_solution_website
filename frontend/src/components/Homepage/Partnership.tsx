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
        <section className="py-20 bg-[#F8FAFC]">
            <Container>
                {/* Header */}
                <div className="text-center mb-12 space-y-3">
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-[#1A3263] tracking-tight"
                    >
                        Partnerships we value
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 max-w-xl mx-auto text-md leading-relaxed"
                    >
                        Trusted by industry leaders worldwide
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
                    {partners.map((partner, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
                            className="h-28 cursor-pointer"
                            style={{ perspective: "800px" }}
                        >
                            {/* Flip container */}
                            <div className="relative w-full h-full group" style={{ transformStyle: "preserve-3d" }}>

                                {/* FRONT */}
                                <div
                                    className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <img
                                        src={partner.src}
                                        alt={partner.name}
                                        className="max-h-12 w-auto object-contain"
                                    />
                                </div>

                                {/* BACK */}
                                <div
                                    className="absolute inset-0 bg-[#1A3263] rounded-xl flex items-center justify-center [transform:rotateY(180deg)] transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(360deg)]"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <img
                                        src={partner.src}
                                        alt={partner.name}
                                        className="max-h-10 w-auto object-contain brightness-0 invert opacity-90"
                                    />
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}