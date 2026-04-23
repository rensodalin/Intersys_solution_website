import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MoveRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import heroImg2 from "@/assets/Hero.png";
import heroImg3 from "@/assets/Hero1.png";

// Using high-quality Unsplash fallbacks combined with the local hero image to create a rich swipe effect
const backgrounds = [
  heroImg2,
  heroImg3,
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2834&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1681412504848-bf25a7198829?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative min-h-[90vh] bg-[#0c1827] flex items-center justify-start overflow-hidden pt-20">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0 h-full w-full" ref={emblaRef}>
        <div className="flex h-full w-full touch-pan-y">
          {backgrounds.map((bg, idx) => (
            <div key={idx} className="relative h-full min-w-full overflow-hidden flex-[0_0_100%]">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: selectedIndex === idx ? 1.0 : 1.1 }}
                transition={{ duration: 6, ease: "easeOut" }}
                src={bg}
                alt={`Hero ${idx + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navy gradient overlay over the swiping images */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#162E93]/95 via-[#162E93]/80 to-[#162E93]/40 mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Main Text Content */}
      <Container className="relative z-30 pt-16 pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8aa1bf]"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-[#9B0F06]" />
            Leading Smart Building Integrator
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-10 font-display text-[4rem] md:text-[5.5rem] lg:text-[4.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-white"
            >
              Smart Building <br />
              Solutions for a <span className="text-[#9B0F06]">Safer</span> <br />
              <span className="text-[#9B0F06]">Future.</span>
            </motion.h1>
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 max-w-xl text-lg font-light leading-relaxed text-[#8aa1bf]"
          >
            Pioneering the next generation of architectural intelligence through integrated BMS,
            security, and fire safety systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <Link
              to="/contact"
              className="group inline-flex h-12 md:h-[52px] items-center gap-2 rounded-sm bg-gradient-to-r from-[#9B0F06] to-[#9B0F06] px-8 text-sm font-semibold text-white shadow-lg shadow-[#9B0F06]/30 transition-all hover:from-[#9B0F06] hover:to-[#fa5c2e]"
            >
              Contact Us{" "}
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#solutions"
              className="inline-flex h-12 md:h-[52px] items-center justify-center rounded-sm border border-white/20 bg-transparent px-8 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/5"
            >
              Explore Solutions
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
