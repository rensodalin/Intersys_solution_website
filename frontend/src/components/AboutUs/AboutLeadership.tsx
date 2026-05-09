import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import ceoImg from "@/assets/team/ceo.png";

export function AboutLeadership() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">

          {/* ─── IMAGE (BOOK FLIP EFFECT) ─── */}
          <motion.div
            initial={{ opacity: 0, rotateY: -80, scale: 0.9 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1200 }}
            className="relative flex justify-center lg:justify-start"
          >
            {/* Frame */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-red-600" />

            {/* Glow */}
            <div className="absolute inset-0 flex justify-center lg:justify-start">
              <div className="w-[320px] h-[420px] bg-red-600/10 blur-2xl rounded-full opacity-70" />
            </div>

            {/* FLIP CARD */}
            <motion.div
              initial={{ rotateY: -90, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.1 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              <motion.img
                src={ceoImg}
                alt="CEO"
                className="rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full aspect-[4/5] object-cover max-w-[320px] mx-auto lg:mx-0"
              />

              {/* Page shine effect */}
              <motion.div
                initial={{ x: "-120%" }}
                whileInView={{ x: "120%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
              />
            </motion.div>
          </motion.div>

          {/* ─── TEXT ─── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-[#0A0F1A] leading-tight mb-6">
              Engineering excellence isn't a goal, it's a standard of living.
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-6 italic">
              "We built Intersys on the principle that the most complex problems require the most
              elegant, invisible solutions. Every project we undertake is a testament to our
              commitment to structural intelligence."
            </p>

            <h4 className="text-lg font-bold text-[#0A0F1A]">
              Nathaniel Thorne
            </h4>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}