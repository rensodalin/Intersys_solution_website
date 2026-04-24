import { Container } from "@/components/Common/Container";
import { motion } from "framer-motion";

export function SaltoHero() {
    return (
        <section className="relative pt-32 pb-24 overflow-hidden bg-[#1A3263]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            </div>

            <Container className="relative z-10">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 mb-5"
                    >
                        <div className="h-[2px] w-10 bg-[#9B0F06]" />
                        <span className="text-[#9B0F06] font-bold uppercase tracking-[0.15em] text-[10px]">
                            Smart Access Solutions
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
                    >
                        SALTO <span className="text-[#9B0F06]">Systems</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl"
                    >
                        Extensive range of electronic locks, cylinders, and smart access management solutions.
                        From hotel rooms to corporate offices, Salto provides flexible, keyless, and wire-free security.
                    </motion.p>
                </div>
            </Container>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/4 h-full pointer-events-none hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-l from-[#1A3263] via-transparent to-transparent z-10" />
                <img
                    src="https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neo-eu-list.jpg?itok=QQuuficY"
                    alt="Salto Design"
                    className="w-full h-full object-cover opacity-20 grayscale"
                />
            </div>
        </section>
    );
}