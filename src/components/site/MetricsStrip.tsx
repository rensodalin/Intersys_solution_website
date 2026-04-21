import { motion } from "framer-motion";
import { Container } from "./Container";
import { AnimatedCounter } from "./AnimatedCounter";

const metrics = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Years of Engineering" },
  { value: 120, suffix: "+", label: "Expert Engineers" },
  { value: 99, suffix: "%", label: "Client Retention" },
];

export function MetricsStrip() {
  return (
    <section className="relative bg-navy text-white border-y border-white/10">
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center md:text-left md:border-l md:border-white/10 md:pl-6 first:border-l-0 first:pl-0"
            >
              <div className="font-display text-5xl md:text-6xl font-bold tracking-tight">
                <AnimatedCounter value={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-white/60">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
