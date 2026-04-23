import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Link } from "@tanstack/react-router";
import bgImg from "@/assets/Hero.png"; // Using an existing architectural asset or the new one

const testimonials = [
    {
        text: "70+ Projects Delivered with excellence and precision across high-tier infrastructure in Cambodia.",
        author: "Proven Track Record",
    },
    {
        text: "Over 70 certified Engineers specialized in BMS & ELV systems, providing unmatched technical expertise.",
        author: "Expertise & Engineering",
    },
    {
        text: "Seamless integration of building management and ELV systems for optimal performance and efficiency.",
        author: "System Integration",
    },
    {
        text: "Dedicated local support team providing 24/7 assistance and professional training for all clients.",
        author: "Local Support & Training",
    },
];

export function WhyChooseIntersys() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 6000);
        return () => clearInterval(timer);
    }, [index]);

    const next = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="relative h-[450px] md:h-[380px] flex items-center overflow-hidden bg-white group">
            {/* Background with parallax-like feel */}
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%) contrast(120%)'
                }}
            />

            {/* Decorative top red line like the screenshot */}
            <div className="absolute top-8 left-10 md:left-24 w-32 h-[2px] bg-[#9B0F06]" />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="relative">
                        {/* Big Red Quote Mark */}
                        <Quote
                            className="absolute -top-10 -left-6 md:-left-12 text-[#9B0F06] w-10 h-10 opacity-80"
                            fill="currentColor"
                        />

                        <div className="min-h-[140px] flex flex-col justify-center">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={index}
                                    custom={direction}
                                    initial={{ opacity: 0, x: direction * 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -direction * 40 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-xl md:text-3xl font-bold text-[#1A3263] leading-snug font-display tracking-tight">
                                        {testimonials[index].text}
                                    </h3>

                                    <div className="flex flex-col">
                                        <span className="text-[#9B0F06] font-bold text-[11px] md:text-xs uppercase tracking-[0.2em]">
                                            {testimonials[index].author}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="mt-10 flex items-center gap-6">
                            <div className="flex gap-3">
                                <button
                                    onClick={prev}
                                    className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center text-gray-300 hover:text-[#9B0F06] hover:border-[#9B0F06] transition-all"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={next}
                                    className="w-8 h-8 border border-[#9B0F06] rounded-full flex items-center justify-center text-[#9B0F06] hover:bg-[#9B0F06] hover:text-white transition-all shadow-lg shadow-red-500/10"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <Link
                                to="/why-choose"
                                className="text-[10px] font-bold uppercase tracking-widest text-[#1A3263] hover:text-[#9B0F06] transition-all border-b border-transparent hover:border-[#9B0F06] pb-1"
                            >
                                Explore Story
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Decorative vertical lines like the screenshot */}
            <div className="absolute right-0 top-0 h-full w-[15%] border-l border-gray-50 flex">
                <div className="w-1/2 h-full border-r border-gray-50 opacity-30" />
            </div>
        </section>
    );
}
