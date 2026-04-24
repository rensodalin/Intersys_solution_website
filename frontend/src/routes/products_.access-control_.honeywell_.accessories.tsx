import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { HoneywellHero } from "@/components/Product/AccessControl/Honeywell/HoneywellHero";
import { HoneywellGrid } from "@/components/Product/AccessControl/Honeywell/HoneywellGrid";
import { honeywellAccessories } from "@/components/Product/AccessControl/Honeywell/data";

export const Route = createFileRoute("/products_/access-control_/honeywell_/accessories")({
  head: () => ({
    meta: [
      { title: "Honeywell Accessories — Intersys Solutions" },
      {
        name: "description",
        content: "Detailed Honeywell access control accessories: Programmers, Converters, Power Supplies, and more.",
      },
    ],
  }),
  component: HoneywellAccessoriesPage,
});

function HoneywellAccessoriesPage() {
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
          { name: "Accessories", href: "/products/access-control/honeywell/accessories" },
        ]}
      />

      <section className="pb-24 -mt-12 relative z-20">
        <Container>
          <HoneywellGrid products={honeywellAccessories} />
        </Container>
      </section>

      {/* Accessories Technical Support Section */}
      <section className="py-24 bg-navy-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-8 bg-[#9B0F06]" />
                <span className="text-[#9B0F06] font-bold uppercase tracking-widest text-[10px]">Infrastructure Ready</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
                Industrial <span className="text-[#9B0F06]">Integrity</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10">
                Secondary components are often the most critical points of failure. Intersys ensures every accessory—from power converters to specialized data cabling—meets Honeywell's strict certification for high-uptime environments.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Rapid Deployment", desc: "Standardized mounting and pre-configured modules for faster on-site installation." },
                  { title: "Technical Validation", desc: "Every peripheral is stress-tested for thermal and electrical stability before handover." },
                  { title: "Longevity Guaranteed", desc: "Long lifecycle components ensuring your system remains serviceable for decades." }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-1 h-12 bg-[#9B0F06]" />
                    <div>
                      <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">{item.title}</h4>
                      <p className="text-white/40 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#9B0F06]/10 rounded-3xl blur-3xl" />
              <img
                src="https://honeywell.scene7.com/is/image/Honeywell65/hbt-Fire-P1914944-primaryimage"
                className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                alt="Honeywell Infrastructure"
              />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}
