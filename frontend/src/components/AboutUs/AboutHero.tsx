import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

import { Container } from "@/components/Common/Container";
import heroImg from "@/assets/Hero.png";
import honeywellLogo from "@/assets/honeywelllogo.png";

export function AboutHero() {
  return (
    <section className="relative pt-25 pb-16 lg:pt-36 lg:pb-24 bg-[#0A0F1A] overflow-hidden flex items-center justify-center min-h-[60vh]">
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
            className="h-14 md:h-14 mb-8 invert grayscale brightness-200 hover:invert-0 hover:grayscale-0 hover:brightness-100 transition-all duration-500"
          />

          <h1 className="text-3xl lg:text-4xl font-bold text-white font-display leading-[1.2] mb-6">
            About{" "}
            <span className="text-red-600">
              <Typewriter
                words={["Intersys"]}
                loop={1}


                typeSpeed={100}
              />
            </span>{" "}
            Solutions.
          </h1>
          <p className="text-base text-gray-300 max-w-2xl leading-relaxed mx-auto">
            As Cambodia's premier authorized Honeywell partner since 2015,
            Intersys Solutions delivers international-standard building
            automation, security, and fire safety systems to meet the surging
            demands of the local construction sector.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}