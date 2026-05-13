import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { MoveLeft, Download, Zap, BarChart3, Settings2, Eye } from "lucide-react";

export const Route = createFileRoute("/insights/raffle-bookstore")({
  head: () => ({
    meta: [
      { title: "Raffle Bookstore — Intersys Solutions" },
      {
        name: "description",
        content: "Redefining educational spaces with open-concept design and sustainable building management technology.",
      },
    ],
  }),
  component: RaffleBookstorePage,
});

function RaffleBookstorePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO SECTION ─── */}
      <section className="relative h-[65vh] min-h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=1170&auto=format&fit=crop"
          alt="Raffle Bookstore"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <Container className="relative h-full flex flex-col justify-center">
          <div className="max-w-3xl pt-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight pt-10"
            >
              Raffle <br />
              Bookstore
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80 leading-relaxed max-w-xl"
            >
              Redefining the educational landscape with open-concept learning spaces and sustainable systems.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ─── CONTENT SECTION 1 ─── */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Image Card */}
            <div className="lg:col-span-7 relative group overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb28f74b671?q=80&w=1170&auto=format&fit=crop"
                alt="Open Learning Spaces"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Sustainable Learning</h3>
                <p className="text-white/70 text-sm max-w-md">
                  Utilizing renewable energy and smart lighting to create an eco-friendly environment for student growth and focus.
                </p>
              </div>
            </div>

            {/* Right Info Card */}
            <div className="lg:col-span-5 bg-gray-100 p-10 rounded-sm flex flex-col justify-center">
              <div className="mb-6">
                <Zap className="h-8 w-8 text-[#9B0F06] mb-4" />
                <h4 className="text-xl font-bold text-[#162E93] mb-3">Eco-Intelligence</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Advanced ventilation and air filtration systems that ensure a healthy, oxygen-rich environment for intensive study.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── ARTICLE CONTENT ─── */}
      <section className="pb-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[#162E93] mb-6">Efficiency in Education</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              The Raffle Bookstore project demonstrates how modern building automation can transform institutional spaces. By integrating occupancy-based controls and smart scheduling, the facility achieves a 30% reduction in peak energy demand while improving occupant comfort.
            </p>
          </div>

          {/* Banner with Button */}
          <div className="relative h-[250px] rounded-sm overflow-hidden my-16 group">
            <img
              src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1200"
              alt="Sustainable Project Detail"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-end px-12 pt-35">
              <button className="bg-[#C3110C] hover:bg-red-700 text-white px-8 py-4 rounded-sm flex items-center gap-3 font-bold transition-all transform hover:scale-105 shadow-xl">
                Case Study PDF
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[#162E93] mb-6">Smart Campus Integration</h2>
            <p className="text-gray-600 leading-relaxed mb-12">
              Our Salto access control integration provides seamless security across all learning zones, allowing for flexible library hours and automated visitor management without compromising on safety.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
              <div className="flex gap-4">
                <BarChart3 className="h-6 w-6 text-[#9B0F06] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#162E93] mb-1">Occupancy Analytics</h5>
                  <p className="text-xs text-gray-400">Heat mapping of high-traffic zones to optimize cleaning and resource allocation.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Settings2 className="h-6 w-6 text-[#9B0F06] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#162E93] mb-1">Sustainable HVAC</h5>
                  <p className="text-xs text-gray-400">Demand-controlled ventilation based on CO2 levels in study rooms.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── TECHNICAL DEPLOYMENT ─── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#162E93] tracking-tight">
              Educational Excellence
            </h2>
            <div className="mt-3 h-[2px] w-16 bg-[#9B0F06]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 perspective-1000">
            {/* BIG LEFT IMAGE */}
            <motion.div
              initial={{ opacity: 0, rotateX: 25, rotateY: -10, scale: 0.95 }}
              whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="md:col-span-8 group relative overflow-hidden rounded-sm shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=1170&auto=format&fit=crop"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Modern Study Hall"
              />
            </motion.div>
 
            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, rotateX: -25, rotateY: 10, scale: 0.95 }}
              whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="md:col-span-4 group relative overflow-hidden rounded-sm shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1491843351663-7111e819955b?q=80&w=1170&auto=format&fit=crop"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Digital Archive"
              />
            </motion.div>

            {/* SMALL LEFT IMAGE */}
            <motion.div
              initial={{ opacity: 0, rotateX: 20, rotateY: -10, scale: 0.95 }}
              whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="md:col-span-4 group relative overflow-hidden rounded-sm shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop"
                className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Tech Enabled Learning"
              />
            </motion.div>

            {/* BOTTOM WIDE IMAGE */}
            <motion.div
              initial={{ opacity: 0, rotateX: -20, rotateY: 10, scale: 0.95 }}
              whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="md:col-span-8 group relative overflow-hidden rounded-sm shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200"
                className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Smart Campus Interface"
              />
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
