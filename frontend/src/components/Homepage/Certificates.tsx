import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { useRouter } from "@tanstack/react-router";
import certificate1 from "../../assets/certificate1.jpg";
import certificate2 from "../../assets/certificate2.jpg";

export function Certificates() {
  const router = useRouter();
  return (
    <section className="bg-[#C3110C] border-b border-white/5 overflow-hidden relative">
      <Container className="pb-16 md:pb-24 pt-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left: Certificate Image */}
          <div className="lg:w-5/12 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full max-w-[300px] group"
            >
              {/* Glowing halo behind certificate */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-10 bg-white/10 blur-[80px] rounded-full"
              />

              <motion.div
                animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white p-2 rounded-sm shadow-2xl group-hover:rotate-0 transition-transform duration-500"
              >
                <motion.img
                  src={certificate1}
                  alt="Intersys Official Certificate"
                  className="w-full h-auto rounded-sm"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 8 }}
                whileInView={{ opacity: 1, rotate: 4 }}
                viewport={{ once: true }}
                animate={{ y: [0, 10, 0], rotate: [4, 7, 4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 -z-10 bg-white/90 p-2 rounded-sm shadow-xl w-full translate-x-4 translate-y-4"
              >
                <img
                  src={certificate2}
                  alt="Secondary License"
                  className="w-full h-auto rounded-sm opacity-30 grayscale"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Information Content */}
          {/* Right: Information Content */}
          <div className="lg:w-7/12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-[2px] bg-white/60" />
              <span className="text-xs text-white/70 font-medium tracking-wide">
                Accreditation
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-xl md:text-3xl font-bold text-white leading-[1.15] tracking-tight mb-5"
            >
              Recognized for excellence
              <br />
              <span className="text-white/70">
                in engineering & innovation
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-[13px] md:text-sm text-white/75 leading-relaxed max-w-xl mb-8"
            >
              Intersys Solutions has earned recognition for delivering
              high-quality engineering systems that meet international
              standards. Our certifications and Honeywell partnership
              reflect a commitment to reliability and innovation.
            </motion.p>

            {/* Highlight Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
            >
              {[
                {
                  title: "Certified Standards",
                  desc: "International engineering and quality compliance.",
                },
                {
                  title: "Trusted Partnership",
                  desc: "Official Honeywell integration partner.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-sm p-4 hover:bg-white/10 transition-all duration-300"
                >
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-white/65 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >

            </motion.div>
          </div>
        </div>
      </Container>

      {/* Subtle Pattern (White version for dark background) */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
    </section>
  );
}
