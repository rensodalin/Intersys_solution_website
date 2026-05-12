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
  "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1490096429152-340aafafc2d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Original text content
  const fullText = "Pioneering the next generation of architectural intelligence through integrated BMS, security, and fire safety systems.";
  const [typedText, setTypedText] = useState("");

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

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= fullText.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] bg-[#05080F] flex items-center justify-start overflow-hidden pt-20 pb-16">

      {/* Background Carousel */}
      <div className="absolute inset-0 z-0 h-full w-full" ref={emblaRef}>
        <div className="flex h-full w-full">
          {backgrounds.map((bg, idx) => (
            <div key={idx} className="relative h-full min-w-full overflow-hidden flex-[0_0_100%]">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: selectedIndex === idx ? 1.0 : 1.1 }}
                transition={{ duration: 6, ease: "easeOut" }}
                src={bg}
                className="absolute inset-0 h-full w-full object-cover"
                alt="Infrastructure"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      <Container className="relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >


            {/* Smaller, Clean Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.2] tracking-tight">
              Smart Building Solutions <br />
              with <span className="text-[#DB1A1A]">Safer Future.</span>
            </h1>

            {/* Smaller Subtitle Text */}
            <p className="max-w-xl text-sm md:text-base text-white/70 leading-relaxed font-normal min-h-[3em]">
              {typedText}
            </p>

            {/* Consistent Modern Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/"
                hash="solutions"
                className="bg-brand-red text-white px-8 py-3.5 rounded-sm font-semibold text-[13px] hover:bg-white hover:text-navy transition-all duration-300 shadow-lg"
              >
                Explore Us
              </Link>

              <Link
                to="/contact"
                className="border-[1.5px] border-white/20 text-white px-8 py-3.5 rounded-sm font-semibold text-[13px] hover:border-brand-red hover:bg-brand-red/5 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}


