import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "./Container";
import heroImg from "@/assets/hero.jpg";

export function Testimonial() {
  return (
    <section className="bg-navy text-white py-24 md:py-32 relative overflow-hidden dark">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <Container className="relative">
        <div className="grid grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-span-12 lg:col-span-4"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
              <img
                src={heroImg}
                alt="Leadership"
                width={800}
                height={1000}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="col-span-12 lg:col-span-8"
          >
            <Quote className="h-12 w-12 text-brand-red" />
            <blockquote className="mt-6 font-display text-2xl md:text-4xl font-bold leading-tight tracking-tight">
              "Intersys didn't just integrate our systems — they transformed how we operate. Their
              engineering rigor and obsession with uptime set a new standard for our portfolio."
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12 bg-brand-red" />
              <div>
                <div className="font-display font-bold text-lg">Sarah Chen</div>
                <div className="text-sm text-white/60">VP of Operations, Atlas Properties</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
