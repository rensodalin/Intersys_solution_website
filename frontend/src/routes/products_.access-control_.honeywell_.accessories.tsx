import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

const accessoryProducts = [
  {
    title: "Programmers",
    desc: "Advanced flash programmers for Honeywell security modules and systems.",
    image: "https://cdn.webshopapp.com/shops/335010/files/472758643/700x700x2/honeywell-galaxy-flash-programmer-a221.jpg"
  },
  {
    title: "Interface Cards & Modules",
    desc: "High-performance interface cards for seamless system integration.",
    image: "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Fire-P1914944-primaryimage"
  },
  {
    title: "Converters",
    desc: "Signal and data conversion units for multi-protocol environments.",
    image: "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1917470-primaryimage"
  },
  {
    title: "Housings",
    desc: "Durable protective housings for indoor and outdoor installations.",
    image: "https://s7d1.scene7.com/is/image/Honeywell65/hbt-Security-P1920766-primaryimage"
  },
  {
    title: "Transmitters & Receivers",
    desc: "Reliable wireless transmission units for expansive security networks.",
    image: "https://i5.walmartimages.com/asr/a830500f-9be4-4a42-bad3-cd598852908b.34cfd057df724dbcdc0636173b9d9fe2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
  },
  {
    title: "Power Supplies",
    desc: "Industrial-grade 5Amp open-frame power units for consistent performance.",
    image: "https://ctcsolutions.co.ke/wp-content/uploads/2024/12/power_supply_5amps_open__1-1.jpg"
  },
  {
    title: "Enclosure",
    desc: "Secure metallic enclosures designed for centralized hardware protection.",
    image: "https://ctcsolutions.co.ke/wp-content/uploads/2024/12/power_supply_5amps_open__1-1.jpg"
  },
  {
    title: "Cables",
    desc: "Industrial RS232 and specialized communication cabling for secure data flow.",
    image: "https://cdn11.bigcommerce.com/s-ka7ofex/images/stencil/1280x1280/products/3415/15912/CBL-020-300-C00-02_Industrial-Grade_RS232_Cable__41651.1637159016.jpg?c=2"
  }
];

function HoneywellAccessoriesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#1A3263]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0A1629]/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Engineering Detail"
          />
        </div>

        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <Link
              to="/products/access-control/honeywell"
              className="group inline-flex items-center gap-2 text-white/40 hover:text-[#9B0F06] transition-all mb-8 text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              Back to Honeywell Systems
            </Link>

            <div className="h-[1px] w-16 bg-[#9B0F06] mb-6" />

            <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase italic">
              System <span className="text-[#9B0F06]">Accessories</span>
            </h1>

            <p className="text-white/60 text-sm md:text-base max-w-xl font-medium leading-relaxed">
              Every detail matters. Explore our range of industrial-grade peripherals and support components for Honeywell solutions.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Accessories Grid */}
      <section className="pb-24 -mt-12 relative z-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessoryProducts.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative bg-white border border-gray-100 p-1.5 rounded-3xl hover:border-[#9B0F06]/20 transition-all duration-500 shadow-[0_5px_20px_rgba(0,0,0,0.03)]"
              >
                {/* Image Area */}
                <div className="relative aspect-square overflow-hidden rounded-[1.4rem] bg-gray-50 flex items-center justify-center p-6">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain relative z-10 transition-all duration-500"
                  />
                </div>

                {/* Content Area */}
                <div className="p-5">
                  <h3 className="text-sm font-bold text-[#162E93] group-hover:text-[#9B0F06] transition-colors leading-tight mb-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-500 text-[11px] leading-relaxed mb-6 line-clamp-2 h-8">
                    {product.desc}
                  </p>

                  <Link
                    to="/contact"
                    className="flex items-center justify-between group/btn w-full py-3 px-4 bg-gray-50 rounded-xl text-[#1A3263] font-bold text-[8px] uppercase tracking-[0.2em] hover:bg-[#1A3263] hover:text-white transition-all duration-300"
                  >
                    <span>Request Part</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
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
