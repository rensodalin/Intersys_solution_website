import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { Cpu, Radio, Server, Shield, Gauge, Zap } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Intersys Solutions" },
      {
        name: "description",
        content:
          "Edge controllers, sensors, gateways and unified dashboards engineered for industrial reliability.",
      },
      { property: "og:title", content: "Products — Intersys Solutions" },
      {
        property: "og:description",
        content: "Hardware and software products for smart building integration.",
      },
    ],
  }),
  component: Products,
});

const products = [
  {
    icon: Cpu,
    name: "Intersys EdgeOne",
    tag: "Edge Controller",
    desc: "Ruggedized edge gateway with on-device AI for predictive maintenance.",
  },
  {
    icon: Radio,
    name: "MeshNet 2.4",
    tag: "Wireless Sensors",
    desc: "Low-power mesh sensor family for temperature, occupancy, and CO₂.",
  },
  {
    icon: Server,
    name: "OpsCloud",
    tag: "SaaS Platform",
    desc: "Multi-site operations console with realtime KPIs and incident management.",
  },
  {
    icon: Shield,
    name: "GuardLink",
    tag: "Access Control",
    desc: "Encrypted access controllers with mobile credentials and audit trails.",
  },
  {
    icon: Gauge,
    name: "PulseMeter",
    tag: "Energy Monitoring",
    desc: "Sub-metering with circuit-level analytics and tariff modeling.",
  },
  {
    icon: Zap,
    name: "FlexBus IO",
    tag: "I/O Modules",
    desc: "Modular DIN-rail IO with BACnet, Modbus, and MQTT support.",
  },
];

function Products() {
  return (
    <>
      <section className="pt-40 pb-20 bg-navy-deep text-white dark">
        <Container>
          <div className="max-w-4xl">
            <div className="text-xs uppercase tracking-[0.2em] text-brand-red font-semibold">
              Hardware & Software
            </div>
            <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold leading-[1.02]">
              Built in-house. <span className="text-brand-red">Battle-tested</span> in the field.
            </h1>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group p-8 rounded-xl border border-border bg-white hover:border-brand-red hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-md bg-navy text-white group-hover:bg-brand-red transition-colors">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red border border-brand-red rounded-full px-2.5 py-1">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-navy">{p.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}


