import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";

export function ProjectHero() {
    return (
        <section className="pt-36 md:pt-50 pb-12 md:pb-16 text-center">
            <Container>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-display tracking-tight"
                >
                    Our <span className="text-[#D62828]">Projects</span>
                </motion.h1>

                <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
                    Explore our complete portfolio of elite engineering installations and
                    integrated smart building systems across Southeast Asia.
                </p>
            </Container>
        </section>
    );
}
