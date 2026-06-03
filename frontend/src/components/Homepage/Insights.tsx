import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

export function Insights() {
  const [dynamicInsights, setDynamicInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const baseUrl = `http://${window.location.hostname}:1000`;
        const res = await fetch(`${baseUrl}/api/insights`);
        const data = await res.json();
        if (data.success) {
          setDynamicInsights(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch insights:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      dragFree: false,
      containScroll: false,
    },
    [
      AutoScroll({
        speed: 0.7,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (loading || dynamicInsights.length === 0) {
    return null; // Or a skeleton loader
  }

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-10 md:py-14">
      {/* Background Elements */}
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#F8FAFC]/75 via-[#F8FAFC]/20 to-transparent"></div>

      {/* Header */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-10 mb-15 mt-10 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-[0.95] tracking-tight">
              Project Latest <span className="text-[#C3110C]">Insights</span>
            </h2>

            <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
              Explore the latest project updates, development progress, key milestones,
              and insights that highlight ongoing achievements and improvements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Right-side content */}
          </motion.div>

        </div>
      </div>
      {/* Carousel */}
      <div className="relative">
        {/* Side Fades */}
        <div className="absolute left-0 top-0 bottom-0 z-20 w-20 md:w-48 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/70 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 z-20 w-20 md:w-48 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/70 to-transparent pointer-events-none"></div>

        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex">
            {[...dynamicInsights, ...dynamicInsights, ...dynamicInsights].map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={idx}
                  className="
                    flex-[0_0_65%]
                    md:flex-[0_0_35%]
                    lg:flex-[0_0_22%]
                    px-3
                    min-w-0
                  "
                >
                  <Link
                    to="/insights/$slug"
                    params={{ slug: item.slug }}
                    className="block"
                  >
                    <motion.div
                      animate={{
                        scale: isSelected ? 1 : 0.8,
                        opacity: isSelected ? 1 : 0.6,
                        y: isSelected ? 0 : 20,
                      }}
                      whileHover={{
                        scale: 1.01,
                        y: -4,
                        rotateX: 1,
                        rotateY: -1,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        group/card
                        relative
                        aspect-[4/5]
                        overflow-hidden
                        rounded-[2px]
                        bg-[#0A1628]
                        overflow-hidden
                      "
                    >
                      {/* Image */}
                      <img
                        src={item.image && item.image[0]}
                        alt={item.title}
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-cover
                          brightness-100
                          contrast-100
                          saturate-100
                          transition-transform
                          duration-[4000ms]
                          ease-out
                          group-hover/card:scale-105
                        "
                      />

                      {/* Overlay - Localized at bottom for legibility */}
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                      {/* Top Light */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_45%)]"></div>

                      {/* Content */}
                      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                        <div className="mb-2">
                          <span
                            className="
                              inline-flex
                              items-center
                              text-[11px]
                              font-bold
                            
                              text-[#EED9B9]
                            "
                          >
                            {item.category}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold leading-[1.1] tracking-tight text-white mb-2">
                          {item.title}
                        </h3>

                        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover/card:max-h-[300px] group-hover/card:opacity-100">
                          <p className="text-sm text-white/60 leading-relaxed mb-6 mt-4">
                            {item.desc}
                          </p>

                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF4400] hover:text-white transition-colors">
                            <span>Explore More</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>

                      {/* Border Glow */}
                      <div className="absolute inset-0 rounded-[5px] ring-1 ring-inset ring-black/5"></div>
                    </motion.div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-30 max-w-[1400px] mx-auto px-6 md:px-10 mt-6 flex items-center justify-between">
          {/* Progress */}
          <div className="hidden md:flex items-center gap-2">
            {dynamicInsights.map((_, i) => (
              <div
                key={i}
                className={`h-[2px] rounded-full transition-all duration-500 ${selectedIndex % dynamicInsights.length === i
                  ? "w-12 bg-[#FF6B00]"
                  : "w-5 bg-white/10"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}