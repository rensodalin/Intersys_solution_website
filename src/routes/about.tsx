import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/site/Container";
import { SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Intersys Solutions" },
      { name: "description", content: "Engineering excellence delivered by a team obsessed with reliability, safety and sustainable infrastructure." },
      { property: "og:title", content: "About Intersys Solutions" },
      { property: "og:description", content: "Engineering excellence delivered by a team obsessed with reliability, safety and sustainable infrastructure." },
    ],
  }),
  component: About,
});

const values = [
  { n: "01", t: "Engineering Rigor", d: "Every system we deploy is designed to outlast its specifications." },
  { n: "02", t: "Operational Safety", d: "Safety is the first principle, not the last checklist item." },
  { n: "03", t: "Long-Term Partnership", d: "We measure success in decades of uptime, not delivery dates." },
];

const team = [
  { name: "Daniel Marsh", role: "Founder & CEO" },
  { name: "Aisha Khan", role: "Chief Engineer" },
  { name: "Marcus Lee", role: "Head of Operations" },
  { name: "Elena Rossi", role: "Director of Safety" },
];

function About() {
  return (
    <>
      <section className="pt-40 pb-20 bg-navy-deep text-white relative overflow-hidden dark">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <Container className="relative">
          <div className="max-w-4xl">
            <div className="text-xs uppercase tracking-[0.2em] text-brand-red font-semibold">
              About Intersys
            </div>
            <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold leading-[1.02]">
              Building the <span className="text-brand-red">invisible</span> infrastructure of modern life.
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
              For over 15 years we've engineered the control systems that keep
              the world's most critical buildings safe, efficient, and alive.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-12 gap-10 items-center">
            <div className="col-span-12 lg:col-span-6">
              <SectionHeading
                eyebrow="Our Mission"
                title="Smart systems built by engineers who care."
                description="We exist to eliminate operational chaos through deeply integrated, code-compliant, future-proof control systems. Our work powers hospitals, data centers, industrial parks and mixed-use developments across three continents."
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="col-span-12 lg:col-span-6"
            >
              <img
                src={heroImg}
                alt="Engineering team"
                width={1200}
                height={800}
                loading="lazy"
                className="rounded-2xl w-full aspect-[4/3] object-cover border border-border"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-offwhite">
        <Container>
          <SectionHeading eyebrow="Our Values" title="What we stand for." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 border border-border"
              >
                <div className="font-display text-5xl font-bold text-brand-red">
                  {v.n}
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-navy">{v.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <SectionHeading eyebrow="Leadership" title="Meet the engineers behind Intersys." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-navy">
                  <img
                    src={heroImg}
                    alt={p.name}
                    width={600}
                    height={800}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
                </div>
                <div className="mt-4">
                  <div className="font-display font-bold text-navy">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
