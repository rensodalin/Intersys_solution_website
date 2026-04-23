import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Common/Container";
import { PromotionOverlay } from "./PromotionOverlay";

export function CtaBand() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <section className="bg-white py-6 md:py-10 relative">
      <Container className="max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#1A3263] text-white rounded-2xl px-10 py-10 md:px-16 md:py-12 relative overflow-hidden"
        >
          {/* Big Huge Lightning Bolt Watermark */}
          <div className="absolute right-0 top-0 translate-x-[20%] -translate-y-[10%] md:translate-x-[15%] md:-translate-y-[15%] opacity-10 pointer-events-none">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[250px] h-[250px] md:w-[420px] md:h-[420px] text-white"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Text */}
            <div className="max-w-xl">
              <h2 className="font-display text-3xl md:text-[40px] font-bold leading-[1.1] tracking-tight mb-3">
                Ready to transform your building?
              </h2>
              <p className="text-[15px] text-white/60 leading-relaxed max-w-[480px]">
                Join hundreds of businesses optimizing their operations with Intersys Solutions. Our
                engineers are ready to design your custom roadmap.
              </p>
            </div>

            {/* CTA */}
            <div className="shrink-0">
              <button
                onClick={() => setIsOverlayOpen(true)}
                className="group inline-flex items-center gap-3 rounded-full bg-[#C3110C] text-white px-8 py-4 text-[14px] font-bold hover:bg-white hover:text-[#C3110C] transition-all whitespace-nowrap shadow-xl shadow-black/20"
              >
                Get a Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </Container>

      <PromotionOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </section>
  );
}
