import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

const whyChooseItems = [
    {
        id: 1,
        tag: "Proven Track Record",
        title: "Project Excellence",
        description: "70+ Projects delivered with engineering excellence and precision across high-tier commercial, residential, and industrial developments in Cambodia.",
        image: "https://files.intersys-solutions.com.kh/RandomIMG/772726245_1747029863008860_976472377558814630_n.jpg",
        detail: "Delivered On Time & Within Budget",
    },
    {
        id: 2,
        tag: "Engineering Expertise",
        title: "70+ Certified Engineers",
        description: "Over 70 certified Engineers specialized in BMS, Fire Safety, and ELV systems, providing unmatched technical integration and field supervision.",
        image: "https://files.intersys-solutions.com.kh/RandomIMG/772773636_1747714452940401_3216883704336750666_n.jpg",
        detail: "Certified International Standards",
    },
    {
        id: 3,
        tag: "Unified Integration",
        title: "System Integration",
        description: "Seamless integration of building management systems, access control, thermal mapping, and emergency evacuation for optimal facility efficiency.",
        image: "https://files.intersys-solutions.com.kh/RandomIMG/589882367_1537152177329964_1593064049300712231_n.jpg",
        detail: "24/7 Support & Maintenance Available",
    },
    {
        id: 4,
        tag: "Building Automation",
        title: "Intelligent BMS Controls",
        description: "Real-time energy optimization, HVAC control, and automated monitoring for corporate headquarters and high-rise commercial towers.",
        image: "https://files.intersys-solutions.com.kh/RandomIMG/IMG_20260713_142815_1.jpg",
        detail: "Energy Efficiency Guarantee",
    },
    {
        id: 5,
        tag: "Technical Advisory",
        title: "Local Support & Training",
        description: "Dedicated Intersys technical response team providing immediate on-site support, operator training, and system performance audits.",
        image: "https://files.intersys-solutions.com.kh/RandomIMG/Screenshot%202026-08-20%20145754.png",
        detail: "Dedicated Account Managers",
    },
];

export function WhyChooseIntersys() {
    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const next = () => {
        setDirection(1);
        setStartIndex((prev) => (prev + 1) % whyChooseItems.length);
    };

    const prev = () => {
        setDirection(-1);
        setStartIndex((prev) => (prev - 1 + whyChooseItems.length) % whyChooseItems.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(timer);
    }, [startIndex]);

    // Extract 3 items for desktop, 1 item for mobile
    const visibleDesktopItems = [
        whyChooseItems[startIndex],
        whyChooseItems[(startIndex + 1) % whyChooseItems.length],
        whyChooseItems[(startIndex + 2) % whyChooseItems.length],
    ];

    const visibleMobileItem = whyChooseItems[startIndex];

    return (
        <section className="py-12 sm:py-14 md:py-18 bg-[#0B2135] text-white relative overflow-hidden">
            <div className="w-full px-6 sm:px-10 md:pl-32 lg:pl-48 xl:pl-64 2xl:pl-80 md:pr-0">
                {/* Section Header with Next/Prev Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5 md:pr-20 lg:pr-28">
                    <div className="text-left max-w-2xl">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Why Choose <span className="text-[#D62828]">Intersys</span>
                        </h2>
                        <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-1.5">
                            Engineering Expertise at Every Level, Dedicated to Your Success
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                        <button
                            onClick={prev}
                            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition cursor-pointer"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={17} />
                        </button>
                        <button
                            onClick={next}
                            className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition cursor-pointer shadow-md"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={17} />
                        </button>
                    </div>
                </div>

                {/* Mobile View: 1 Card Slider */}
                <div className="block md:hidden relative overflow-hidden">
                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.div
                            key={startIndex}
                            custom={direction}
                            initial={{ opacity: 0, x: direction * 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -direction * 60 }}
                            transition={{ duration: 0.45, ease: "easeInOut" }}
                            className="w-full"
                        >
                            <Link
                                to="/about"
                                className="group flex flex-col text-left transition-all duration-300"
                            >
                                {/* Image Box */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 rounded-none mb-3.5 border border-white/10">
                                    <img
                                        src={visibleMobileItem.image}
                                        alt={visibleMobileItem.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Tag / Category */}
                                <span className="text-[11px] font-semibold text-slate-300 mb-1">
                                    {visibleMobileItem.tag}
                                </span>

                                {/* Card Title */}
                                <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-red-400 transition-colors">
                                    {visibleMobileItem.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-slate-300 leading-relaxed font-normal mb-2.5 line-clamp-3">
                                    {visibleMobileItem.description}
                                </p>

                                {/* Footer / Subtitle */}
                                <span className="text-[11px] text-slate-400 font-medium mt-auto">
                                    {visibleMobileItem.detail}
                                </span>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Desktop View: 3 Card Slider */}
                <div className="hidden md:block relative overflow-hidden pr-0">
                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.div
                            key={startIndex}
                            custom={direction}
                            initial={{ opacity: 0, x: direction * 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -direction * 60 }}
                            transition={{ duration: 0.45, ease: "easeInOut" }}
                            className="grid md:grid-cols-3 gap-5 lg:gap-7"
                        >
                            {visibleDesktopItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to="/about"
                                    className="group flex flex-col text-left transition-all duration-300"
                                >
                                    {/* Image Box */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 rounded-none mb-3.5 border border-white/10">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Tag / Category */}
                                    <span className="text-[11px] font-semibold text-slate-300 mb-1">
                                        {item.tag}
                                    </span>

                                    {/* Card Title */}
                                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-2 group-hover:text-red-400 transition-colors">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-2.5 line-clamp-3">
                                        {item.description}
                                    </p>

                                    {/* Footer / Subtitle */}
                                    <span className="text-[11px] text-slate-400 font-medium mt-auto">
                                        {item.detail}
                                    </span>
                                </Link>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}