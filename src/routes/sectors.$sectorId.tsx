import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/site/Container";
import { sectors } from "@/components/site/JourneySection";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sectors/$sectorId")({
  component: SectorDetail,
});

function SectorDetail() {
  const { sectorId } = Route.useParams();
  const sector = sectors.find((s) => s.id === sectorId);

  if (!sector) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Sector not found</h1>
          <Link to="/" className="text-[#9B0F06] font-bold">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <Container>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#6b7c93] hover:text-[#9B0F06] font-bold mb-12 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Services
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#9B0F06] mb-4 uppercase">
                Industry Specialization
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#162E93] leading-tight mb-8">
                {sector.name}
              </h1>
              <p className="text-lg md:text-xl text-[#4a5568] leading-relaxed mb-10">
                {sector.desc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-[#162E93]">Key Features:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Standard Compliance",
                  "24/7 Reliability",
                  "Scalable Architecture",
                  "Seamless Integration",
                  "Technical Excellence",
                  "Future-Proof Systems"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9B0F06]" />
                    <span className="text-[#162E93]/80 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-12 p-8 bg-[#f8f9fc] rounded-2xl border border-gray-100"
            >
              <h4 className="font-bold text-[#162E93] mb-2">Ready to secure your project?</h4>
              <p className="text-sm text-[#4a5568] mb-6">Contact our engineering team today for a tailored solution for your {sector.name.toLowerCase()} infrastructure.</p>
              <Link to="/contact" className="bg-[#9B0F06] text-white px-8 py-3.5 rounded-sm font-bold text-[12px] tracking-widest uppercase hover:bg-[#162E93] transition-all duration-300">
                Inquire Now
              </Link>
            </motion.div>
          </div>

          {/* Right: Image / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full relative"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[#9B0F06]/10 blur-[100px] rounded-full scale-75" />

            <div className="relative aspect-[4/5] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              {/* Fallback image style or placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-[#162E93] to-[#162E93] flex items-center justify-center p-12 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop`}
                  alt={sector.name}
                  className="w-full h-full object-cover opacity-60 absolute inset-0 mix-blend-overlay"
                />
                <div className="relative text-center">
                  <div className="text-white fill-white mb-6 flex justify-center">
                    {/* Dynamically show an icon or abstract mark */}
                    <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center">
                      <span className="text-3xl font-bold">{sector.name.charAt(0)}</span>
                    </div>
                  </div>
                  <h2 className="text-white text-3xl font-bold tracking-tight mb-2">{sector.name}</h2>
                  <p className="text-white/60 text-sm tracking-widest uppercase font-mono">Integrated Solution</p>
                </div>
              </div>

              {/* Technical Overlay */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl">
                <p className="text-white text-xs font-mono uppercase tracking-widest mb-1">Engineering excellence</p>
                <p className="text-white/80 text-sm">Professional deployment of {sector.name} infrastructure since 2015.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

