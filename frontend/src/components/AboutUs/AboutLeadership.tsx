import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import ceoImg from "@/assets/team/ceo.png";

export function AboutLeadership() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="relative"
          >
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-red-600" />
            <img
              src={ceoImg}
              alt="CEO"
              className="rounded-xl shadow-xl grayscale hover:grayscale-0 transition-all duration-700 w-full aspect-[4/5] object-cover max-w-[320px] mx-auto lg:mx-0"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-[#0A0F1A] leading-tight mb-6">
              Engineering excellence isn't a goal, it's a standard of living.
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-6 italic">
              "We built Intersys on the principle that the most complex problems require the most
              elegant, invisible solutions. Every project we undertake is a testament to our
              commitment to structural intelligence."
            </p>
            <div>
              <h4 className="text-lg font-bold text-[#0A0F1A]">Nathaniel Thorne</h4>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
