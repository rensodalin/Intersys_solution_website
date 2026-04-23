import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Intersys Solutions" },
      {
        name: "description",
        content:
          "Explore engineering case studies across smart buildings, healthcare, data centers and industrial sites.",
      },
      { property: "og:title", content: "Portfolio — Intersys Solutions" },
      {
        property: "og:description",
        content: "Selected engineering work across critical infrastructure.",
      },
    ],
  }),
  component: Portfolio,
});

const projects = [
  { title: "Helix Tower BMS", category: "Smart Building", year: "2024", location: "Singapore" },
  {
    title: "Northgate Hospital Safety",
    category: "Fire & Life Safety",
    year: "2024",
    location: "Toronto",
  },
  { title: "Atlas Data Center", category: "HVAC + Power", year: "2023", location: "Frankfurt" },
  {
    title: "Vertex Industrial Park",
    category: "IoT Integration",
    year: "2023",
    location: "Rotterdam",
  },
  {
    title: "Meridian University",
    category: "Multi-Building BMS",
    year: "2023",
    location: "London",
  },
  {
    title: "Coastal Logistics Hub",
    category: "Security + Access",
    year: "2022",
    location: "Dubai",
  },
];

function Portfolio() {
  return (
    <>
      <section className="pt-40 pb-20 bg-navy-deep text-white dark">
        <Container>
          <div className="max-w-4xl">
            <div className="text-xs uppercase tracking-[0.2em] text-brand-red font-semibold">
              Selected Work
            </div>
            <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold leading-[1.02]">
              Projects that <span className="text-brand-red">power</span> critical environments.
            </h1>
          </div>
        </Container>
      </section>

      <section className="bg-offwhite py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <motion.a
                href="#"
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
                  src={heroImg}
                  alt={p.title}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/25 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/70 mb-3">
                    <span>{p.category}</span>
                    <span>
                      {p.location} · {p.year}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold transition-transform duration-500 group-hover:-translate-y-1">
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

      <CtaBand />
    </>
  );
}


