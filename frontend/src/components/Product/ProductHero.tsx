import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

import heroImg1 from "@/assets/engineering_hero.png";
import heroImg2 from "@/assets/engineering_hero2.png";
import heroImg3 from "@/assets/engineering_hero3.png";

const heroImages = [heroImg1, heroImg2, heroImg3];

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface ProductHeroProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    categoryTag?: string;
}

export function ProductHero({
    title = "All Products",
    subtitle = "Discover our curated selection of high-quality essentials.",
    breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
    ],
    categoryTag = "STORE CATALOG",
}: ProductHeroProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, duration: 40 },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
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

    return (
        <section className="w-full bg-white pt-24 md:pt-28 pb-4">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative w-full overflow-hidden bg-white min-h-[280px] md:min-h-[340px] rounded-lg shadow-sm">
                    {/* Background Carousel */}
                    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden" ref={emblaRef}>
                        <div className="flex h-full w-full">
                            {heroImages.map((img, idx) => (
                                <div key={idx} className="relative h-full min-w-full overflow-hidden flex-[0_0_100%]">
                                    <motion.img
                                        initial={{ scale: 1.18 }}
                                        animate={{ scale: selectedIndex === idx ? 1.05 : 1.18 }}
                                        transition={{ duration: 5, ease: "easeOut" }}
                                        src={img}
                                        alt={`Engineering Banner ${idx + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover object-left md:object-[30%_center] origin-left brightness-95 contrast-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 via-45% to-transparent z-[1]" />

                    {/* Hero Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-10 max-w-2xl p-6 md:p-10 pl-8 md:pl-14 flex flex-col justify-center"
                    >
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 mb-4 flex-wrap">
                            {breadcrumbs.map((item, index) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <Link
                                        to={item.href}
                                        className={cn(
                                            "text-xs transition-colors",
                                            index === breadcrumbs.length - 1
                                                ? "text-[#C3110C] font-semibold pointer-events-none"
                                                : "text-gray-700 hover:text-[#C3110C]"
                                        )}
                                    >
                                        {item.name}
                                    </Link>

                                    {index < breadcrumbs.length - 1 && (
                                        <span className="text-gray-400 text-xs">/</span>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Main Title */}
                        <h1 className="text-xl md:text-3xl font-bold font-display tracking-tight text-gray-900 mb-3">
                            {title}
                        </h1>

                        {/* Subtitle Description */}
                        {subtitle && (
                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal max-w-xl">
                                {subtitle}
                            </p>
                        )}
                    </motion.div>

                    {/* Slider Navigation Dots */}
                    <div className="absolute bottom-4 right-6 z-10 flex items-center gap-1.5">
                        {heroImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => emblaApi?.scrollTo(idx)}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                                    selectedIndex === idx ? "w-6 bg-[#C3110C]" : "w-1.5 bg-gray-400/60 hover:bg-gray-600"
                                )}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

