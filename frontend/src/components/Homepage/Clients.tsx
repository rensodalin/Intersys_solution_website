import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Container } from "@/components/Common/Container";
import pic1 from "../../assets/Client logo/pic1.png";
import pic2 from "../../assets/Client logo/pic2.png";
import pic3 from "../../assets/Client logo/pic3.png";
import pic4 from "../../assets/Client logo/pic4.png";
import pic5 from "../../assets/Client logo/pic5.png";
import pic6 from "../../assets/Client logo/pic6.png";
import pic7 from "../../assets/Client logo/pic7.png";
import pic8 from "../../assets/Client logo/pic8.png";

interface Client {
    src: string;
    name: string;
}

const clients: Client[] = [
    { src: pic1, name: "Aston Martin" },
    { src: pic2, name: "Lamborghini" },
    { src: pic3, name: "McLaren" },
    { src: pic4, name: "Raffles" },
    { src: pic5, name: "Hyatt" },
    { src: pic6, name: "Belmond" },
    { src: pic7, name: "Sokha" },
    { src: pic8, name: "Aman Resorts" },
    { src: pic1, name: "Sun Moon" },
    { src: pic2, name: "Starbucks" },
    { src: pic3, name: "Nawarat" },
    { src: pic4, name: "Toyota" },
];

// Group clients into rows of 4
const rows: Client[][] = [];
for (let i = 0; i < clients.length; i += 4) {
    rows.push(clients.slice(i, i + 4));
}

export function Clients() {
    const [currentRow, setCurrentRow] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentRow((prev) => (prev + 1) % rows.length);
        }, 4000); // Change row every 4 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-white py-24 md:py-32 overflow-hidden">
            <Container>
                {/* Section Header */}
                <div className="mb-16 md:mb-24 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9B0F06] mb-3"
                    >
                        Trusted Partnerships
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-serif font-bold text-[#1A3263] tracking-tight"
                    >
                        Our Valued Clients
                    </motion.h2>
                    <div className="mt-5 mx-auto w-10 h-px bg-neutral-300" />
                </div>

                {/* Animated Row-by-Row Logo Display */}
                <div className="relative h-32 md:h-40 max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentRow}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center"
                        >
                            {rows[currentRow].map((client, i) => (
                                <motion.div
                                    key={`${currentRow}-${i}`}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                    className="flex items-center justify-center p-4"
                                >
                                    <div className="relative group transition-all duration-500">
                                        <img
                                            src={client.src}
                                            alt={client.name}
                                            className="max-h-16 md:max-h-24 w-auto object-contain transform hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-20">
                                            {client.name}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination Indicators */}
                <div className="mt-12 flex justify-center gap-2">
                    {rows.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentRow(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentRow === i ? "bg-[#9B0F06] w-6" : "bg-neutral-200"
                                }`}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
