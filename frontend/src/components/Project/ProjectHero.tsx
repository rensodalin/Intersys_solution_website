import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";

export function ProjectHero() {
    return (
        <section className="pt-50 pb-16 text-center">
            <Container>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-6 font-display tracking-tight"
                >
                    Our <span className="text-[#D62828]">Projects</span>
                </motion.h1>

                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Explore our complete portfolio of elite engineering installations and
                    integrated smart building systems across Southeast Asia.
                </p>
            </Container>
        </section>
    );
}
