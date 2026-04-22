import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/site/Container";
import { motion } from "framer-motion";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import heroImg from "@/assets/Hero1.png";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Solutions — Intersys Solutions" },
      {
        name: "description",
        content: "Discover our comprehensive range of smart building solutions, from BMS and fire safety to advanced security and integrated AV systems.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen font-display pb-16 text-xs">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-[#0A0F1A] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Solutions Background" className="w-full h-full object-cover opacity-20 grayscale brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A]/50 to-[#0A0F1A]" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6">
              Our <br />
              <span className="text-red-500">Solution</span>
            </h1>
            <p className="text-base text-white/40 max-w-xl leading-relaxed">
              Integrated technology solutions for modern architectural marvels. We design, deploy, and manage the technical nervous system of your facility.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Content Section */}
      <div className="-mt-20 relative z-10">
        <ServicesGrid />
      </div>
    </div>
  );
}
