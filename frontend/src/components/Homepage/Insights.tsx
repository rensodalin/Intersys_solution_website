import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { Section } from "@/components/Common/Section";

const insights = [
  {
    tag: "INDUSTRY TRENDS",
    title: "The Future of AI in Modern HVAC Systems",
    desc: "Exploring how predictive algorithms are saving up to 40% in operational energy costs...",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
  },
  {
    tag: "SECURITY",
    title: "Beyond CCTV: Integrated Security Ecosystems",
    desc: "How multi-layered authentication and biometric data are changing corporate security...",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
  },
  {
    tag: "CASE STUDY",
    title: "Retrofitting Heritage Buildings with Smart Tech",
    desc: "Preserving history while implementing 21st-century fire safety and power management...",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
];

export function Insights() {
  return (
    <section className="bg-[#f8f9fc] py-24">
      <Container>
        <div className="mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-[39px] font-bold text-[#162E93] tracking-tight">
            Latest Insights.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="aspect-[3/2] rounded-lg overflow-hidden mb-6 relative border border-black/5 shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/[0.03] group-hover:bg-transparent transition-colors" />
              </div>

              <div className="flex flex-col flex-grow">
                <div className="text-[10px] font-bold text-[#9B0F06]  tracking-widest mb-3">
                  {item.tag}
                </div>
                <h3 className="font-display text-[20px] font-bold text-[#162E93] leading-snug mb-3 group-hover:text-[#9B0F06] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#6b7c93] leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>
                <div className="mt-auto">
                  <Link
                    to={item.title.includes("Retrofitting") ? "/insights/retrofitting-heritage" : "#"}
                    className="text-[13px] font-bold text-[#162E93] group-hover:text-[#9B0F06] transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
