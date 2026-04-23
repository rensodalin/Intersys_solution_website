import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import heroImg from "@/assets/hero.jpg";
import honeywellLogo from "@/assets/honeywelllogo.png";

export function AboutHero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-[#0A0F1A] overflow-hidden flex items-center justify-center min-h-[60vh]">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A]/80 via-[#0A0F1A]/40 to-[#0A0F1A]" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src={honeywellLogo}
            alt="Honeywell Authorized Partner"
            className="h-8 md:h-10 mb-8 invert grayscale brightness-200"
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-white font-display leading-[1.2] mb-6">
            About <span className="text-red-600">Intersys</span> Solutions.
          </h1>
          <p className="text-base text-gray-300 max-w-2xl leading-relaxed mx-auto">
            As Cambodia's premier authorized Honeywell partner since 2015, Intersys Solutions
            delivers international-standard building automation, security, and fire safety systems
            to meet the surging demands of the local construction sector.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
