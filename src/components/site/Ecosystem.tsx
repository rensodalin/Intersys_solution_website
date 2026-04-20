import { motion } from "framer-motion";
import { Container } from "./Container";
import { SectionHeading } from "./Section";
import { Activity, Network, Zap, Shield } from "lucide-react";

export function Ecosystem() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Integrated Ecosystem"
          title="One platform. Every system. Total control."
          description="Our unified architecture connects building systems into a single intelligent layer."
        />

        <div className="grid grid-cols-12 gap-6 auto-rows-[200px]">
          {/* Big tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 lg:col-span-8 row-span-2 relative overflow-hidden rounded-2xl bg-navy-deep text-white p-10 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-brand-red/20 blur-[100px]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-red font-semibold">
                <Activity className="h-3.5 w-3.5" /> Realtime
              </div>
              <h3 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight max-w-md">
                Unified data platform across every connected device.
              </h3>
            </div>
            <div className="relative grid grid-cols-3 gap-4 max-w-lg">
              {[
                { v: "12K+", l: "Devices" },
                { v: "<50ms", l: "Latency" },
                { v: "99.99%", l: "Uptime" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold">{s.v}</div>
                  <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {[
            { icon: Network, title: "Open Protocols", desc: "BACnet, Modbus, KNX, MQTT" },
            { icon: Zap, title: "Edge AI", desc: "Predictive analytics on-device" },
            { icon: Shield, title: "Cyber-Hardened", desc: "Zero-trust architecture" },
            { icon: Activity, title: "Live Dashboards", desc: "Custom KPIs & alerts" },
          ].map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="col-span-6 lg:col-span-4 lg:col-start-9 first-of-type:lg:col-start-9 rounded-2xl border border-border p-6 hover:border-brand-red hover:-translate-y-1 transition-all bg-white shadow-sm"
              style={{
                gridColumnStart: i < 2 ? undefined : undefined,
              }}
            >
              <div className="grid h-10 w-10 place-items-center rounded-md bg-navy text-white">
                <b.icon className="h-5 w-5" />
              </div>
              <h4 className="mt-4 font-display text-base font-bold text-navy">
                {b.title}
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
