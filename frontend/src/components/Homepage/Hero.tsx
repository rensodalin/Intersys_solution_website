import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, Phone, Building2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import heroFireAlarmBanner from "@/assets/hero_fire_alarm_banner.png";
import heroHealthyBuildingBanner from "@/assets/hero_healthy_building_banner.png";

const slides = [
  {
    type: "banner",
    image: heroFireAlarmBanner,
    badgeIcon: ShieldCheck,
    title: "NOTIFIER BY HONEYWELL (NFS2-3030)",
    subtitle: "10 Loops / 3180 Addressable Devices Fire Safety Panel",
    link: "/services/fire-alarm",
    phone: "+855 77 602 334",
    ctaText: "Explore System",
  },
  {
    type: "banner",
    image: heroHealthyBuildingBanner,
    badgeIcon: Building2,
    title: "HEALTHY BUILDING SOLUTIONS",
    subtitle: "Integrated BMS, Fire Safety, Security, CCTV, Access Control & RCU",
    link: "/services/building-management",
    phone: "+855 77 602 334",
    ctaText: "Explore Solutions",
  },
  {
    type: "content",
    image: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?q=80&w=1170&auto=format&fit=crop",
    title: "Smart Building Solutions",
    highlight: "with Safer Future.",
    description: "Pioneering the next generation of architectural intelligence through integrated BMS, security, and fire safety systems.",
  },
  {
    type: "content",
    image: "https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=1170&auto=format&fit=crop",
    title: "Intelligent Security & BMS",
    highlight: "Integrated Systems.",
    description: "Empowering modern facilities with enterprise-grade access control, surveillance, and automated building management.",
  },
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 35 },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

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

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="relative bg-[#05080F] min-h-[85vh] flex flex-col justify-center overflow-hidden">
      {/* Carousel Container */}
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex w-full">
          {slides.map((slide, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <div
                key={idx}
                className="relative min-w-full flex-[0_0_100%] w-full overflow-hidden flex items-center justify-center min-h-[85vh]"
              >
                {slide.type === "banner" ? (
                  /* Banner Slide (Padded below navbar to fit poster image with smooth float transition) */
                  <div className="w-full relative pt-20 md:pt-24 pb-12 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 15 }}
                      animate={isSelected ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-6xl w-full mx-auto relative group"
                    >
                      {/* Glowing effect behind banner */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-white/10 to-blue-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000" />

                      {/* Fitted Banner Frame */}
                      <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white border border-white/10">
                        <Link to={slide.link || "/"} className="block w-full">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-auto object-contain max-h-[68vh] md:max-h-[75vh] mx-auto transition-transform duration-700 hover:scale-[1.01]"
                          />
                        </Link>
                      </div>

                      {/* Interactive Overlay CTA Bar under banner */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isSelected ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-[#0A0F1A]/80 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-lg text-white"
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-white">{slide.title}</p>
                            <p className="text-[11px] sm:text-xs text-white/60">{slide.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                          {slide.phone && (
                            <a
                              href={`tel:${slide.phone.replace(/\s+/g, "")}`}
                              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-sm transition-all"
                            >
                              <Phone size={13} className="text-red-500" />
                              <span>{slide.phone}</span>
                            </a>
                          )}
                          <Link
                            to={slide.link || "/"}
                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-sm transition-all shadow-md hover:shadow-red-600/30"
                          >
                            <span>{slide.ctaText || "Explore"}</span>
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                ) : (
                  /* Standard Content Hero Slide (Full bleed with strict overflow clipping) */
                  <div className="relative w-full min-h-[85vh] flex items-center justify-start pt-24 md:pt-28 pb-16 overflow-hidden">
                    {/* Background image covering top-to-bottom behind navbar strictly clipped inside slide container */}
                    <motion.img
                      initial={{ scale: 1.08, opacity: 0.6 }}
                      animate={isSelected ? { scale: 1.0, opacity: 1 } : { scale: 1.08, opacity: 0.6 }}
                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                      src={slide.image}
                      className="absolute inset-0 h-full w-full object-cover"
                      alt={slide.title}
                    />

                    {/* Dark Gradients spanning to top edge */}
                    <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

                    <Container className="relative z-20">
                      <div className="max-w-3xl mx-auto min-[1301px]:mx-0">
                        <motion.div
                          initial={{ opacity: 0, y: 25 }}
                          animate={isSelected ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-6 text-center min-[1301px]:text-left"
                        >
                          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.5rem] font-bold text-white leading-[1.2] tracking-tight">
                            {slide.title}{" "}
                            {slide.highlight && (
                              <>
                                <span className="hidden lg:inline"><br /></span>
                                <span className="text-[#DB1A1A]">{slide.highlight}</span>
                              </>
                            )}
                          </h1>

                          <p className="max-w-xl mx-auto min-[1301px]:mx-0 text-sm md:text-base text-white/70 leading-relaxed font-normal">
                            {slide.description}
                          </p>

                          <div className="flex flex-wrap items-center justify-center min-[1301px]:justify-start gap-4 pt-4">
                            <Link
                              to="/services/building-management"
                              className="bg-brand-red text-white px-8 py-3.5 rounded-sm font-semibold text-[13px] hover:bg-white hover:text-navy transition-all duration-300 shadow-lg"
                            >
                              Explore Solutions
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
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border border-white/10 hover:border-red-500/50 transition-all cursor-pointer backdrop-blur-sm hover:scale-110 active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border border-white/10 hover:border-red-500/50 transition-all cursor-pointer backdrop-blur-sm hover:scale-110 active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`h-2 transition-all duration-500 rounded-full cursor-pointer ${
              selectedIndex === i
                ? "w-8 bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.6)]"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}



