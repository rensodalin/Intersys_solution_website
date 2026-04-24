import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellKiosks } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { Monitor, MousePointer2, UserCheck } from "lucide-react";

export const Route = createFileRoute("/products_/access-control_/honeywell_/lobby-kiosks")({
  head: () => ({
    meta: [
      { title: "Honeywell Lobby Kiosks & Touch Screens — Intersys Solutions" },
      {
        name: "description",
        content: "Professional lobby management hardware and touch-screen call stations for secure visitor processing.",
      },
    ],
  }),
  component: HoneywellLobbyKiosksPage,
});

function HoneywellLobbyKiosksPage() {
  return (
    <div className="bg-white min-h-screen">
      <HoneywellHero
        title="Lobby Kiosks"
        subtitle="First impressions matter. Specialized touch-screen hardware designed for streamlined visitor management and facility communication."
        backLink="/products/access-control/honeywell"
        backText="Back to Honeywell Systems"
      />

      {/* Product Grid */}
      <section className="pb-24 -mt-12 relative z-20">
        <Container>
          <HoneywellGrid products={honeywellKiosks} />
        </Container>
      </section>

      {/* Station Features Section */}
      <section className="py-24 bg-navy-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-8 bg-[#9B0F06]" />
                <span className="text-[#9B0F06] font-bold uppercase tracking-widest text-[10px]">Interaction Optimized</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
                Seamless <span className="text-[#9B0F06]">Communication</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                The Call Station PC integrates directly with Pro-Watch and LobbyWorks to provide a high-resolution interface for security operators and visitors alike.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: Monitor,
                    title: "High-Brightness Display",
                    desc: "Industrial-grade touch panel optimized for 24/7 visibility in high-ambient light lobbies."
                  },
                  {
                    icon: UserCheck,
                    title: "Bi-Directional Video",
                    desc: "Integrated HD camera and audio modules for secure remote visitor verification."
                  },
                  {
                    icon: MousePointer2,
                    title: "Intuitive Interface",
                    desc: "Customizable touch UI allowing for rapid navigation of facility directories and check-in flows."
                  }
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#9B0F06]">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#9B0F06]/20 rounded-3xl blur-2xl group-hover:bg-[#9B0F06]/30 transition-all duration-700" />
                <img
                  src="https://s7d1.scene7.com/is/image/Honeywell65/hbt-fire-583560-pc-touch-screen-call-station-primaryimage"
                  alt="Call Station PC Interface"
                  className="relative w-full h-auto rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}
