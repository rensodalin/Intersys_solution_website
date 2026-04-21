import { motion } from "framer-motion";
import { Container } from "./Container";
import pic1 from "../../assets/Client logo/pic1.png";
import pic2 from "../../assets/Client logo/pic2.png";
import pic3 from "../../assets/Client logo/pic3.png";
import pic4 from "../../assets/Client logo/pic4.png";
import pic5 from "../../assets/Client logo/pic5.png";
import pic6 from "../../assets/Client logo/pic6.png";
import pic7 from "../../assets/Client logo/pic7.png";
import pic8 from "../../assets/Client logo/pic8.png";

const clients = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

export function Clients() {
    return (
        <section className="bg-white py-24 border-t border-border overflow-hidden">
            <Container>
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#6b7c93] mb-4"
                    >
                        Trusted Across Industries
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display text-3xl md:text-4xl lg:text-[40px] font-bold text-[#071321] tracking-tight"
                    >
                        Our Valued <span className="text-[#ff3b3b]">Clients</span>
                    </motion.h2>
                </div>
            </Container>

            {/* Marquee Animation */}
            <div className="relative w-full max-w-[100vw] overflow-hidden flex mt-8">
                {/* Gradient Fades for Marquee */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex shrink-0 gap-16 md:gap-24 items-center pl-16 md:pl-24"
                    animate={{
                        x: ["0%", "-50%"]
                    }}
                    transition={{
                        ease: "linear",
                        duration: 35, // Smooth scrolling speed
                        repeat: Infinity,
                    }}
                >
                    {/* Double the array to ensure smooth seamless infinity scroll */}
                    {[...clients, ...clients].map((src, i) => (
                        <div
                            key={i}
                            className="flex shrink-0 items-center justify-center w-32 md:w-48 h-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                        >
                            <img
                                src={src}
                                alt={`Client logo ${i + 1}`}
                                className="max-w-full max-h-full object-contain drop-shadow-sm"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
