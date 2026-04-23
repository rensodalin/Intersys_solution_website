import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";

export function ProjectHero() {
    return (
        <section className="pt-40 pb-16 text-center">
            <Container>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    Our Projects
                </motion.h1>

                <p className="text-white/40 max-w-2xl mx-auto">
                    Explore our portfolio of smart engineering systems.
                </p>
            </Container>
        </section>
    );
}
