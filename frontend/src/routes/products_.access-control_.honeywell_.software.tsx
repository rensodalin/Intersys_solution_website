import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellSoftware } from "@/components/Product/AccessControl/Honeywell/data";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/products_/access-control_/honeywell_/software")({
  head: () => ({
    meta: [
      { title: "Honeywell Security Software — Intersys Solutions" },
      {
        name: "description",
        content: "Enterprise management software including Pro-Watch, WIN-PAK, and visitor management systems.",
      },
    ],
  }),
  component: HoneywellSoftwarePage,
});

function HoneywellSoftwarePage() {
  return (
    <div className="bg-white min-h-screen">
      <HoneywellHero
        title="Honeywell Systems"
        subtitle="Industrial-grade security architecture designed for mission-critical infrastructure."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "Access Control", href: "/products/access-control" },
          { name: "Honeywell", href: "/products/access-control/honeywell" },
          { name: "Software", href: "/products/access-control/honeywell/software" },
        ]}
      />

      {/* Product Grid */}
      <section className="pb-24 -mt-12 relative z-20">
        <Container>
          <HoneywellGrid products={honeywellSoftware} />
        </Container>
      </section>

      {/* Satisfaction Guarantee Section */}
      <section className="py-24 bg-[#1A3263] text-white overflow-hidden relative">
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
                <span className="text-[#9B0F06] font-bold uppercase tracking-widest text-[10px]">Reliability First</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
                Our Satisfaction <span className="text-[#9B0F06]">Guarantee</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Intersys Solutions stands behind every software deployment. We ensure that your security management platform is configured, licensed, and integrated to the highest industry standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "24/7 Technical Support",
                  "Seamless Legacy Integration",
                  "Verified License Compliance",
                  "On-site System Training"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9B0F06]" />
                    <span className="text-sm font-medium text-white/90">{item}</span>
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
                  src="https://img.securityinfowatch.com/files/base/cygnus/siw/image/2024/02/65d7cd1633b2ea001edfa8d4-hbtsecprw65dsusen1.png?auto=format,compress&fit=fill&fill=blur&w=1200&h=630"
                  alt="Pro-Watch Suite"
                  className="relative w-full h-auto rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
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
