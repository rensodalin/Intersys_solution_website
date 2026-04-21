import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";
import { Container } from "./Container";

export function CtaBand() {
  return (
    <section className="bg-white py-10 md:py-20 relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#071321] text-white rounded-[32px] p-10 md:p-20 relative overflow-hidden"
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
              className="w-[350px] h-[350px] md:w-[600px] md:h-[600px] text-white"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>

          <div className="relative z-10 max-w-xl">
            <h2 className="font-display text-4xl md:text-[56px] font-bold leading-[1.1] tracking-tight mb-6">
              Ready to transform<br />your building?
            </h2>
            <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-[480px]">
              Join hundreds of businesses optimizing their operations with Intersys Solutions. Our engineers are ready to design your custom roadmap.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded bg-[#ff3b3b] text-white px-8 py-4 text-[15px] font-bold hover:bg-white hover:text-[#ff3b3b] transition-all"
            >
              Get a Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
