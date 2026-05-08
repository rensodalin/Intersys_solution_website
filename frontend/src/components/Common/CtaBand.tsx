import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Common/Container";
import { PromotionOverlay } from "./PromotionOverlay";

export function CtaBand() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <section className="bg-white py-6 md:py-8">
      <Container className="max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -2 }}
          className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[#1A3263] px-6 py-8 md:px-10 md:py-10"
        >
          {/* Animated Gradient Glow */}
          <motion.div
            animate={{
              x: ["0%", "20%", "0%"],
              y: ["0%", "-10%", "0%"],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />

          {/* Animated Background Overlay */}
          <motion.div
            animate={{
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-br from-white to-transparent"
          />

          {/* Floating Line */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="max-w-xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-3">
                Ready to transform your building?
              </h2>

              <p className="text-sm md:text-[15px] leading-relaxed text-white/70">
                Modern safety, security, and automation solutions
                tailored for your facility and operations.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="shrink-0"
            >
              <motion.button
                onClick={() => setIsOverlayOpen(true)}
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-lg bg-[#C3110C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#C3110C]"
              >
                Get Consultation

                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <PromotionOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </section>
  );
}