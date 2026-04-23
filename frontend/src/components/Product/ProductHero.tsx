import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import solutionImg from "@/assets/solution.png";

export function ProductHero() {
    return (
        <section className="pt-32 pb-16 bg-[#1A3263] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        <div className="relative">
                            <img
                                src={solutionImg}
                                alt="Intersys Solutions"
                                className="relative w-full h-auto rounded-2xl"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Text Content */}
                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="h-[2px] w-8 bg-[#9B0F06]" />
                            <span className="text-[#9B0F06] font-bold uppercase tracking-widest text-[10px]">
                                Quality Systems
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl md:text-3xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                        >
                            Our <span className="text-[#9B0F06]">Products</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/80 text-base md:text-md max-w-xl leading-relaxed"
                        >
                            Elevate your facility with our comprehensive range of safety,
                            security, and building management technologies.
                        </motion.p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
