import { motion } from "framer-motion";
import {
  Building2, Flame, ShieldCheck, Wind, Lightbulb, Cpu,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./Section";
import { Container } from "./Container";

type Svc = { icon: LucideIcon; title: string; desc: string };

const services: Svc[] = [
  { icon: Building2, title: "Building Management", desc: "Integrated BMS for energy, comfort, and operational efficiency." },
  { icon: Flame, title: "Fire & Safety Systems", desc: "Code-compliant detection, suppression, and evacuation systems." },
  { icon: ShieldCheck, title: "Security & Access", desc: "Access control, surveillance, intrusion, and visitor management." },
  { icon: Wind, title: "HVAC Automation", desc: "Smart climate control with predictive maintenance and analytics." },
  { icon: Lightbulb, title: "Lighting Control", desc: "DALI, KNX and IoT lighting for adaptive, low-energy operations." },
  { icon: Cpu, title: "IoT & Edge Computing", desc: "Sensor networks, edge gateways, and unified data dashboards." },
];

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-offwhite py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Engineering services that power smart infrastructure."
          description="From single-system upgrades to full-stack building intelligence — we deliver end-to-end."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(compact ? services.slice(0, 6) : services).map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative bg-white border border-border rounded-xl p-8 hover:border-brand-red hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-brand-red/10"
            >
              <div className="grid h-14 w-14 place-items-center rounded-lg bg-navy text-white group-hover:bg-brand-red transition-colors">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-navy">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
              <div className="mt-6 h-px w-12 bg-border group-hover:w-full group-hover:bg-brand-red transition-all duration-500" />
              <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-brand-red opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                Learn More →
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
