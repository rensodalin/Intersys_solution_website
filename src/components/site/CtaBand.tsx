import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "./Container";

export function CtaBand() {
  return (
    <section className="bg-brand-red text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold opacity-80">
              Ready to Build?
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">
              Need a custom industrial system?
            </h2>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-md bg-white text-navy px-8 py-4 text-sm font-bold hover:bg-navy hover:text-white transition-colors"
          >
            Talk to an Engineer
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
