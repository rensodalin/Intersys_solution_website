import { motion } from "framer-motion";
import { Layers, Gauge, Workflow } from "lucide-react";
import { Container } from "./Container";

const tech = [
  {
    icon: Layers,
    title: "Multi-Layer Architecture",
    desc: "From sensor to cloud — engineered as a single, resilient stack with no integration debt.",
  },
  {
    icon: Gauge,
    title: "Performance at Scale",
    desc: "Sub-second response across millions of data points, validated across 500+ deployments.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Custom logic, alarms, and escalations tailored to your operations team's daily reality.",
  },
];

export function IntegratedTech() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tech.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 border border-border rounded-xl hover:border-navy hover:shadow-lg transition-all"
            >
              <t.icon className="h-8 w-8 text-brand-red" />
              <h3 className="mt-5 font-display text-xl font-bold text-navy">{t.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              <div className="mt-6 h-0.5 w-10 bg-brand-red group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
