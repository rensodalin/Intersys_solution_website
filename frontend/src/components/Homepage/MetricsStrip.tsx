import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { AnimatedCounter } from "@/components/Common/AnimatedCounter";

const metrics = [
  {
    prefix: "More than",
    value: 100,
    suffix: "+",
    label: "Projects Completed",
    bg: "https://i.pinimg.com/1200x/88/c0/cb/88c0cb9ddb8e6ee74ed64be01a4e1f7d.jpg",
  },
  {
    prefix: "Over",
    value: 10,
    suffix: "+",
    label: "Years Experience",
    bg: "https://i.pinimg.com/736x/7b/ae/43/7bae43c1c1e014819f7982115b36bea8.jpg",
  },
  {
    prefix: "Available",
    value: 24,
    suffix: "/7",
    label: "Support",
    bg: "https://i.pinimg.com/736x/75/d2/fd/75d2fd3aa464181a15b029eb241c6bcf.jpg",
  },
  {
    prefix: "Up to",
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    bg: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
  },
  {
    prefix: "Trusted by",
    value: 20,
    suffix: "+",
    label: "Global Clients",
    bg: "https://i.pinimg.com/736x/d7/29/dd/d729dd5248143e120ca299cf3d448f9f.jpg",
  },
];

export function MetricsStrip() {
  return (
    <section className="relative bg-[#f8f9fc] py-16">
      <Container className="px-4 md:px-8 max-w-[1400px]">
        {/* We use gap-[2px] to beautifully separate the dark cards just like the screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[2px]">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group h-[200px] md:h-[240px] bg-[#1A3263] overflow-hidden flex flex-col justify-between p-6 border-b-[6px] border-[#9B0F06]"
            >
              {/* Background Image that fades in on hover */}
              <div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-out"
                style={{
                  backgroundImage: `url('${m.bg}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Overlay gradient to ensure text readability with a subtle red wash */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#4a0808] via-[#ad1818]/60 to-[#9B0F06]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none mix-blend-multiply" />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0c1f36] via-[#0c1f36]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none" />

              {/* Top content (Prefix text) */}
              <div className="relative z-20 top-0 transform transition-transform duration-500 group-hover:translate-x-1">
                <div className="text-[12px] font-mono font-medium text-white/80 tracking-wide">
                  {m.prefix}
                </div>
              </div>

              {/* Bottom content (Number & Label) */}
              <div className="relative z-20 flex flex-col items-start transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-1">
                <div className="font-display text-[44px] md:text-[52px] font-bold tracking-tight text-white mb-1 leading-none">
                  <AnimatedCounter value={m.value} />
                  <span className="text-white ml-0.5">{m.suffix}</span>
                </div>

                <div className="text-[13px] text-white/70 leading-snug font-medium">
                  {m.label}
                </div>
              </div>

              {/* Subtle hover line effect to draw the eye */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#9B0F06] transition-all duration-500 group-hover:h-full z-20 opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

