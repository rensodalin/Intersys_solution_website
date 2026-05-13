import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { MoveLeft, Download, Zap, BarChart3, Settings2, Eye } from "lucide-react";
import { CtaBand } from "@/components/Common/CtaBand";

export const Route = createFileRoute("/insights/krohom-bookstore")({
  head: () => ({
    meta: [
      { title: "Krohom Bookstore — Intersys Solutions" },
      {
        name: "description",
        content: "A bold architectural statement blending traditional Khmer elements with modern structural engineering and smart building systems.",
      },
    ],
  }),
  component: KrohomBookstorePage,
});

function KrohomBookstorePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO SECTION ─── */}
      <section className="relative h-[65vh] min-h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?q=80&w=687&auto=format&fit=crop"
          alt="Krohom Bookstore"
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
              Krohom <br />
              Bookstore
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80 leading-relaxed max-w-xl"
            >
              Blending traditional Khmer aesthetics with the pinnacle of modern structural engineering.
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
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1198&auto=format&fit=crop"
                alt="Architectural Synthesis"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Architectural Synthesis</h3>
                <p className="text-white/70 text-sm max-w-md">
                  Integrating intelligent climate controls within traditional structural motifs to ensure visitor comfort and book preservation.
                </p>
              </div>
            </div>

            {/* Right Info Card */}
            <div className="lg:col-span-5 bg-gray-100 p-10 rounded-sm flex flex-col justify-center">
              <div className="mb-6">
                <Zap className="h-8 w-8 text-[#9B0F06] mb-4" />
                <h4 className="text-xl font-bold text-[#162E93] mb-3">Adaptive Lighting</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Smart sensor arrays that adjust luminosity based on natural light levels, preserving delicate paper and reducing energy consumption.
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
            <h2 className="text-2xl font-bold text-[#162E93] mb-6">Traditional Soul, Modern Intellect</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Krohom Bookstore represents a new era of institutional design in Cambodia. Our integration of Honeywell BMS technology allows the building to maintain precise environmental conditions necessary for archiving valuable manuscripts while remaining open and inviting to the public.
            </p>
          </div>

          {/* Banner with Button */}
          <div className="relative h-[250px] rounded-sm overflow-hidden my-16 group">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200"
              alt="Krohom Project Detail"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-end px-12 pt-35">
              <button className="bg-[#C3110C] hover:bg-red-700 text-white px-8 py-4 rounded-sm flex items-center gap-3 font-bold transition-all transform hover:scale-105 shadow-xl">
                Technical Blueprint
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[#162E93] mb-6">Structural Innovation</h2>
            <p className="text-gray-600 leading-relaxed mb-12">
              The project utilizes advanced structural health monitoring systems that track stress and environmental wear on the traditional timber elements, ensuring the longevity of the bookstore's unique aesthetic.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
              <div className="flex gap-4">
                <BarChart3 className="h-6 w-6 text-[#9B0F06] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#162E93] mb-1">Preservation Monitoring</h5>
                  <p className="text-xs text-gray-400">Continuous tracking of humidity and temperature for archival protection.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Settings2 className="h-6 w-6 text-[#9B0F06] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#162E93] mb-1">Energy Optimization</h5>
                  <p className="text-xs text-gray-400">Automated HVAC adjustments based on visitor density and time of day.</p>
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
              Institutional Integration
            </h2>
            <div className="mt-3 h-[2px] w-16 bg-[#9B0F06]" />
          </div>

          {/* GRID */}
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
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1170&auto=format&fit=crop"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Library Interior"
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
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1170&auto=format&fit=crop"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Archival Section"
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
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1073&auto=format&fit=crop"
                className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Study Zone"
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
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1170&auto=format&fit=crop"
                className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Digital Repository"
              />
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
