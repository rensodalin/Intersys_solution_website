import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { MoveLeft, Download, Zap, BarChart3, Settings2, Eye } from "lucide-react";
import { CtaBand } from "@/components/Common/CtaBand";

export const Route = createFileRoute("/insights/retrofitting-heritage")({
  head: () => ({
    meta: [
      { title: "Retrofitting Heritage Buildings — Intersys Solutions" },
      {
        name: "description",
        content: "Case study on preserving architectural history with smart building intelligence and fire safety systems.",
      },
    ],
  }),
  component: RetrofittingHeritagePage,
});

function RetrofittingHeritagePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO SECTION ─── */}
      <section className="relative h-[65vh] min-h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1673724319943-3a05bf8956e4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Heritage Building"
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
              Retrofitting <br />
              Heritage Buildings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80 leading-relaxed max-w-xl"
            >
              Preserving the soul of architectural history while injecting the intelligence of the future.
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
                src="https://media.istockphoto.com/id/2218099428/photo/aerial-view-of-modern-eco-city.jpg?s=2048x2048&w=is&k=20&c=hcZVrCCJPs-zLb-GNgm9sYZZxP_an614J1OCaaTAcKM="
                alt="Structural Preservation"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Structural Preservation</h3>
                <p className="text-white/70 text-sm max-w-md">
                  Deploying neural networks to map the thermal inertia of heritage stone and brickwork for smart HVAC optimization.
                </p>
              </div>
            </div>

            {/* Right Info Card */}
            {/* Right Info Card */}
            <div className="lg:col-span-5 bg-gray-100 rounded-lg overflow-hidden shadow-sm">

              {/* Image full-bleed inside card */}
              <div className="w-full h-48">
                <img
                  src="https://images.unsplash.com/photo-1778483154281-70a8fa019871?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Load Balancers"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-10 flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-[#162E93] mb-3">
                  Load Balancers
                </h4>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Dynamic redistribution of power and mechanical loads based on real-time occupancy data in historic assembly spaces.
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
            <h2 className="text-2xl font-bold text-[#162E93] mb-6">Autonomous Efficiency: The 40% Benchmark</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Data-driven climate control systems leverage neural networks to map the thermal inertia of a building. This means the system knows exactly how long it takes for a specific zone to cool down or heat up based on current structural conditions. By optimizing these cycles, AI reduces the mechanical strain on compressors and fans, extending equipment life while slashing utility bills.
            </p>
          </div>

          {/* Banner with Button */}
          <div className="relative h-[250px] rounded-sm overflow-hidden my-16 group">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
              alt="Project Reference"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-end px-12 pt-35">
              <button className="bg-[#C3110C] hover:bg-red-700 text-white px-8 py-4 rounded-sm flex items-center gap-3 font-bold transition-all transform hover:scale-105 shadow-xl">
                Project Reference
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[#162E93] mb-6">Integrating Structural Intelligence</h2>
            <p className="text-gray-600 leading-relaxed mb-12">
              Integration is the cornerstone of our "Structural Intelligence" philosophy. When the HVAC system communicates directly with the building's structural sensors—monitoring everything from window seal integrity to solar gain—the result is a symbiotic environment that breathes with its occupants.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
              <div className="flex gap-4">
                <BarChart3 className="h-6 w-6 text-[#9B0F06] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#162E93] mb-1">Real-time Load Balancing</h5>
                  <p className="text-xs text-gray-400">Redistributing air flow based on actual room occupancy and heat load.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Settings2 className="h-6 w-6 text-[#9B0F06] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#162E93] mb-1">Predictive Maintenance</h5>
                  <p className="text-xs text-gray-400">Detecting anomalies in fan vibrations before mechanical failure occurs.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* ─── TECHNICAL DEPLOYMENT ─── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">

        <Container>

          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#162E93] tracking-tight">
              Technical Deployment
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
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Control Center"
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
                src="https://images.unsplash.com/photo-1581093803931-46e730e7622e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Modern Interior"
              />
            </motion.div>

            {/* SMALL LEFT IMAGE (replaces Eye div) */}
            <motion.div
              initial={{ opacity: 0, rotateX: 20, rotateY: -10, scale: 0.95 }}
              whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="md:col-span-4 group relative overflow-hidden rounded-sm shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=800"
                className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Tech Detail"
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
                alt="System Interface"
              />
            </motion.div>

          </div>
        </Container>
      </section>


    </div>
  );
}
