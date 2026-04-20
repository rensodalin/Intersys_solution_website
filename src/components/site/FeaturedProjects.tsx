import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { SectionHeading } from "./Section";
import heroImg from "@/assets/hero.jpg";

const projects = [
  { title: "Helix Tower BMS", category: "Smart Building", year: "2024" },
  { title: "Northgate Hospital Safety", category: "Fire & Life Safety", year: "2024" },
  { title: "Atlas Data Center", category: "HVAC + Power", year: "2023" },
  { title: "Vertex Industrial Park", category: "IoT Integration", year: "2023" },
];

export function FeaturedProjects() {
  return (
    <section className="bg-navy-deep text-white py-24 md:py-32 dark">
      <Container>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-brand-red">
              <span className="h-px w-8 bg-brand-red" /> Featured Projects
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Engineered for the world's most demanding environments.
            </h2>
          </div>
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold border-b border-brand-red pb-1 hover:gap-3 transition-all"
          >
            View all projects <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.a
              href="/portfolio"
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl border border-white/10"
            >
              <img
                src={heroImg}
                alt={p.title}
                width={1200}
                height={750}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-transparent" />
              <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/20 transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/60 mb-3">
                  <span>{p.category}</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight transition-transform duration-500 group-hover:-translate-y-1">
                  {p.title}
                </h3>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-red opacity-0 group-hover:opacity-100 transition-opacity">
                  View Case Study <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
