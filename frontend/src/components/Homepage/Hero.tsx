import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, Phone, Building2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import heroFireAlarmBanner from "@/assets/hero_fire_alarm_banner.webp";
import heroHealthyBuildingBanner from "@/assets/hero_healthy_building_banner.webp";

const slides = [
  {
    type: "banner",
    image: "https://files.intersys-solutions.com.kh/RandomIMG/536002327_1454480008930515_6599622678057847601_n.png",
    badgeIcon: ShieldCheck,
    title: "Notifier by Honeywell (NFS2-3030)",
    subtitle: "10 Loops / 3180 Addressable Devices Fire Safety Panel",
    link: "/services/fire-alarm",
    phone: "+855 77 602 334",
    ctaText: "Explore System",
    hideTopRightLogo: true,
  },
  {
    type: "banner",
    image: "https://files.intersys-solutions.com.kh/RandomIMG/473388230_1582596672425914_4930701967420063595_n.jpg",
    badgeIcon: Building2,
    title: "Healthy Building Solutions",
    subtitle: "Integrated BMS, Fire Safety, Security, CCTV, Access Control & RCU",
    link: "/services/building-management",
    phone: "+855 77 602 334",
    ctaText: "Explore Solutions",
    hideTopLeftLogo: true,
  },
  // {
  //   type: "banner",
  //   image: "https://files.intersys-solutions.com.kh/RandomIMG/BMS.png",
  //   badgeIcon: Building2,
  //   title: "Healthy Building Solutions",
  //   subtitle: "Integrated BMS, Fire Safety, Security, CCTV, Access Control & RCU",
  //   link: "/services/building-management",
  //   phone: "+855 77 602 334",
  //   ctaText: "Explore Solutions",
  // },

  // {
  //   type: "content",
  //   image: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?q=80&w=1170&auto=format&fit=crop",
  //   title: "Smart Building Solutions",
  //   highlight: "with Safer Future.",
  //   description: "Pioneering the next generation of architectural intelligence through integrated BMS, security, and fire safety systems.",
  // },
  // {
  //   type: "content",
  //   image: "https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=1170&auto=format&fit=crop",
  //   title: "Intelligent Security & BMS",
  //   highlight: "Integrated Systems.",
  //   description: "Empowering modern facilities with enterprise-grade access control, surveillance, and automated building management.",
  // },
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

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("heroBannerChange", { detail: { isBanner: true } }));
  }, []);

  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent("heroBannerChange", { detail: { isBanner: false } }));
    };
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="relative min-h-0 md:min-h-[85vh] py-2 md:py-0 flex flex-col justify-center overflow-hidden bg-[#F5F5F5]">
      {/* Global Architectural Grid Tile Pattern Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.07) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Carousel Container */}
      <div className="w-full overflow-hidden z-10" ref={emblaRef}>
        <div className="flex w-full">
          {slides.map((slide, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <div
                key={idx}
                className="relative min-w-full flex-[0_0_100%] w-full overflow-hidden flex items-center justify-center min-h-0 md:min-h-[85vh] py-2 md:py-0"
              >
                {slide.type === "banner" ? (
                  /* Banner Slide (Padded below navbar to fit poster image on #F5F5F5 background) */
                  <div className="w-full relative pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-12 px-3 sm:px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden bg-transparent">
                    <motion.div
                      initial={false}
                      animate={isSelected ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-6xl w-full mx-auto relative group"
                    >
                      {/* Soft ambient glow behind banner */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 rounded-lg blur-xl opacity-50 group-hover:opacity-80 transition duration-700" />

                      {/* Fitted Banner Frame with clean subtle rounded corners */}
                      <div className="relative rounded-lg overflow-hidden shadow-[0_10px_35px_-10px_rgba(0,0,0,0.12)] md:shadow-[0_15px_45px_-12px_rgba(0,0,0,0.15)] bg-white border border-gray-200/80 transition-shadow duration-500">
                        <Link to={slide.link || "/"} className="block w-full relative">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            loading="eager"
                            fetchPriority="high"
                            className="w-full h-auto object-contain max-h-[55vh] sm:max-h-[68vh] md:max-h-[75vh] mx-auto transition-transform duration-700 hover:scale-[1.01]"
                          />
                          {(slide.hideTopLeftLogo || idx === 1) && (
                            <div className="absolute top-0 left-0 w-[17%] h-[18%] bg-white z-10 pointer-events-none" />
                          )}
                          {(slide.hideTopRightLogo || idx === 0) && (
                            <div className="absolute top-0 right-0 w-[14%] h-[16%] bg-white z-10 pointer-events-none" />
                          )}
                        </Link>
                      </div>

                      {/* Interactive Overlay CTA Bar under banner (Mobile Responsive) */}
                      <motion.div
                        initial={false}
                        animate={isSelected ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                        className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-gray-200/90 p-3 sm:p-4 rounded-lg text-gray-900 shadow-md w-full relative z-30 pointer-events-auto"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">{slide.title}</p>
                            <p className="text-[11px] sm:text-xs text-gray-500 font-normal line-clamp-1 sm:line-clamp-none">{slide.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-stretch sm:justify-end pt-1 sm:pt-0 relative z-30">
                          {slide.phone && (
                            <a
                              href="https://t.me/chun_sochet"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] sm:text-xs font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-all border border-gray-200 shrink-0 cursor-pointer relative z-30"
                            >
                              <Phone size={13} className="text-red-600" />
                              <span>{slide.phone}</span>
                            </a>
                          )}
                          <Link
                            to={slide.link || "/"}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-[11px] sm:text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-all shadow-sm hover:shadow-red-600/20 shrink-0 cursor-pointer relative z-30"
                          >
                            <span>{slide.ctaText || "Explore"}</span>
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                ) : (
                  /* Light Theme Content Slide Card with Grid Tile Pattern Background */
                  <div className="w-full relative pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-12 px-3 sm:px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden bg-transparent">
                    <motion.div
                      initial={false}
                      animate={isSelected ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-6xl w-full mx-auto relative group z-10"
                    >
                      {/* Fitted Card Frame */}
                      <div className="relative rounded-lg overflow-hidden shadow-md sm:shadow-[0_15px_45px_-12px_rgba(0,0,0,0.12)] bg-white border border-gray-200/80 flex flex-col md:flex-row items-stretch min-h-0 md:min-h-[460px] lg:min-h-[500px]">

                        {/* Image Container: Top on mobile, Right on desktop */}
                        <div className="w-full md:w-5/12 relative h-44 sm:h-60 md:h-auto md:min-h-full overflow-hidden bg-gray-100 shrink-0 md:order-last">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            loading="eager"
                            fetchPriority="high"
                            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                          />
                          {/* Smooth Left-to-Right White Fade Gradient for Desktop */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent w-full md:w-1/2 pointer-events-none hidden md:block" />
                        </div>

                        {/* Content Text: Below image on mobile, Left on desktop */}
                        <div className="w-full md:w-7/12 p-5 sm:p-10 lg:p-14 z-20 flex flex-col justify-center items-start text-left bg-white md:order-first">
                          <motion.div
                            initial={false}
                            animate={isSelected ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                            transition={{ duration: 0.45, delay: 0.05 }}
                            className="space-y-3 sm:space-y-5 max-w-lg w-full"
                          >
                            {/* <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-gray-900 leading-tight tracking-tight">
                              {slide.title}{" "}
                              {slide.highlight && (
                                <span className="block mt-0.5 sm:mt-1 text-[#DB1A1A]">{slide.highlight}</span>
                              )}
                            </h2>

                            <p className="text-xs sm:text-base text-gray-600 leading-relaxed font-normal">
                              {slide.description}
                            </p> */}

                            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full">
                              <Link
                                to="/about"
                                className="inline-flex items-center justify-center gap-2 bg-[#DB1A1A] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-md font-semibold text-xs sm:text-sm hover:bg-red-700 transition-all duration-300 shadow-md shadow-red-600/20 group/btn"
                              >
                                <span>Explore Us</span>
                                <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
                              </Link>

                              <Link
                                to="/contact"
                                className="inline-flex items-center justify-center bg-[#1A3263] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-md font-semibold text-xs sm:text-sm hover:bg-[#122448] transition-all duration-300 shadow-md shadow-[#1A3263]/20"
                              >
                                Contact Us
                              </Link>
                            </div>
                          </motion.div>
                        </div>

                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows (Hidden on mobile phones to prevent blocking content; desktop hover enabled) */}
      <button
        onClick={scrollPrev}
        className="hidden sm:flex absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full transition-all cursor-pointer backdrop-blur-md hover:scale-110 active:scale-95 bg-white/90 hover:bg-white text-gray-800 border border-gray-200 shadow-xl hover:border-red-500/50"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={scrollNext}
        className="hidden sm:flex absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full transition-all cursor-pointer backdrop-blur-md hover:scale-110 active:scale-95 bg-white/90 hover:bg-white text-gray-800 border border-gray-200 shadow-xl hover:border-red-500/50"
        aria-label="Next Slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`h-1.5 sm:h-2 transition-all duration-500 rounded-full cursor-pointer ${selectedIndex === i
              ? "w-6 sm:w-8 bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.6)]"
              : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-500"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}



