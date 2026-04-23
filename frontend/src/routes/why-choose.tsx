import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { motion } from "framer-motion";

import {
  Settings2,
  ShieldCheck,
  Users2,
  BarChart3,
  Handshake,
} from "lucide-react";

export const Route = createFileRoute("/why-choose")({
  component: WhyChoosePage,
});

const features = [
  {
    icon: <Settings2 className="w-5 h-5" />,
    title: "Integrated Tech",
    desc: "BMS, Fire Alarm, Access Control & CCTV integration.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Tier-1 Brands",
    desc: "Honeywell, NOTIFIER & ESSER trusted systems.",
  },
  {
    icon: <Users2 className="w-5 h-5" />,
    title: "Expert Team",
    desc: "Experienced engineers & system integrators.",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Proven Track",
    desc: "Projects across banks, hotels & commercial buildings.",
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "Partnership",
    desc: "Long-term value-driven client relationships.",
  },
];

function WhyChoosePage() {
  return (
    <section className="py-16 bg-[#F3F4F6] min-h-screen">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 mt-20">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-3"
          >
            Why Intersys?
          </motion.h1>

          <p className="text-gray-500 text-sm md:text-base">
            Trusted engineering solutions built for performance & reliability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="group flex flex-col items-center text-center p-5 bg-white rounded-lg border border-gray-100 hover:bg-[#1A3263] transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-white text-[#1A3263] mb-3 transition-all">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-[#1A3263] group-hover:text-white mb-2">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-[11px] text-gray-500 group-hover:text-white/80 leading-snug">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex px-8 py-3 bg-[#162E93] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#9B0F06] transition-all"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </section>
  );
}