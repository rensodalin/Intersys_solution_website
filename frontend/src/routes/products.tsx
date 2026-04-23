import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import solutionImg from "@/assets/solution.png";
import {
  ShieldCheck,
  Video,
  Settings,
  Cpu,
  Speaker,
  Flame,
  ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Our Products — Intersys Solutions" },
      {
        name: "description",
        content:
          "Elevate your facility with our comprehensive range of safety, security, and building management technologies.",
      },
    ],
  }),
  component: Products,
});

const productCategories = [
  {
    title: "Access Control",
    desc: "Secure biometric and card-based entry systems designed for enterprise-grade facility protection.",
    image: "https://plus.unsplash.com/premium_photo-1729091229423-96b85c74a815?q=80&w=1332&auto=format&fit=crop",
    icon: ShieldCheck,
    buttonText: "Explore System",
    link: "/products/access-control"
  },
  {
    title: "Surveillance (CCTV)",
    desc: "High-definition IP cameras with AI analytics for real-time monitoring and threat detection.",
    image: "https://images.unsplash.com/photo-1665848383782-1ea74efde68f?q=80&w=1190&auto=format&fit=crop",
    icon: Video,
    buttonText: "View Cameras",
    link: "/services"
  },
  {
    title: "Integrated Systems",
    desc: "Unified control platforms connecting security, fire, and BMS for centralized facility management.",
    image: "https://plus.unsplash.com/premium_photo-1723914054622-5e11ec4d8b3f?q=80&w=1132&auto=format&fit=crop",
    icon: Settings,
    buttonText: "Learn More",
    link: "/services"
  },
  {
    title: "Building Management",
    desc: "Smart automation for HVAC, lighting, and energy efficiency to optimize operational costs.",
    image: "https://plus.unsplash.com/premium_photo-1663011633080-bc3b7ef0697e?q=80&w=1170&auto=format&fit=crop",
    icon: Cpu,
    buttonText: "Explore BMS",
    link: "/services"
  },
  {
    title: "Audio Visual",
    desc: "Immersive AV solutions for conference rooms, public address, and digital signage.",
    image: "https://plus.unsplash.com/premium_photo-1664699106229-1bc773380c35?q=80&w=1170&auto=format&fit=crop",
    icon: Speaker,
    buttonText: "View Solutions",
    link: "/services"
  },
  {
    title: "Fire Systems",
    desc: "Advanced fire detection and alarm integration ensuring compliance and maximum safety.",
    image: "https://images.unsplash.com/photo-1712640379137-6d2532f887a7?q=80&w=1170&auto=format&fit=crop",
    icon: Flame,
    buttonText: "Explore Safety",
    link: "/services"
  }
];

function Products() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#1A3263] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <div className="relative">

                <img
                  src={solutionImg}
                  alt="Intersys Solutions"
                  className="relative w-full h-auto rounded-2xl "
                />
              </div>
            </motion.div>

            {/* Right: Text Content */}
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-[2px] w-8 bg-[#9B0F06]" />
                <span className="text-[#9B0F06] font-bold uppercase tracking-widest text-[10px]">Quality Systems</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Our <span className="text-[#9B0F06]">Products</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-base md:text-md max-w-xl leading-relaxed"
              >
                Elevate your facility with our comprehensive range of safety, security, and building management technologies.
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-gray-50 text-[#9B0F06] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#1A3263] group-hover:text-white transition-all duration-300">
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A3263] group-hover:text-[#9B0F06] transition-colors leading-tight">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-gray-500 text-[13px] leading-relaxed mb-8 flex-grow">
                    {cat.desc}
                  </p>

                  <Link
                    to={cat.link}
                    className="inline-flex items-center justify-center w-full py-3 bg-gray-50 text-[#1A3263] font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-[#1A3263] hover:text-white transition-all shadow-sm"
                  >
                    {cat.buttonText}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}
