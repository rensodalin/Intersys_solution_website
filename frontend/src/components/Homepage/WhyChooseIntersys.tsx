import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Link } from "@tanstack/react-router";
import bgImg from "@/assets/Hero.png";

const testimonials = [
    {
        text: "70+ Projects Delivered with excellence and precision across high-tier infrastructure in Cambodia.",
        author: "Proven Track Record",
    },
    {
        text: "Over 70 certified Engineers specialized in BMS & ELV systems, providing unmatched technical expertise.",
        author: "Expert Engineering Team",
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
        <section className="relative h-[420px] md:h-[360px] flex items-center overflow-hidden bg-white group">

            {/* Background */}
            <div
                className="absolute inset-0 z-0 opacity-[0.08]"
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%) contrast(120%)",
                }}
            />

            {/* Accent line */}
            <div className="absolute top-8 left-8 md:left-20 w-28 h-[2px] bg-[#9B0F06]" />

            <Container className="relative z-10">
                <div className="max-w-3xl mx-auto px-6">

                    <div className="relative">
                        <Quote
                            className="absolute -top-8 -left-5 text-[#9B0F06] w-9 h-9 opacity-70"
                            fill="currentColor"
                        />

                        <div className="min-h-[130px] flex flex-col justify-center">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={index}
                                    custom={direction}
                                    initial={{ opacity: 0, x: direction * 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -direction * 30 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="space-y-3"
                                >
                                    <h3 className="text-lg md:text-2xl font-semibold text-[#1A3263] leading-relaxed tracking-tight">
                                        {testimonials[index].text}
                                    </h3>

                                    <span className="text-[#9B0F06] font-medium text-xs md:text-sm tracking-wide">
                                        {testimonials[index].author}
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="mt-8 flex items-center gap-5">
                            <div className="flex gap-2">
                                <button
                                    onClick={prev}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#9B0F06] hover:border-[#9B0F06] transition"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={next}
                                    className="w-8 h-8 rounded-full border border-[#9B0F06] flex items-center justify-center text-[#9B0F06] hover:bg-[#9B0F06] hover:text-white transition"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <Link
                                to="/about"
                                className="text-xs font-medium tracking-wide text-[#1A3263] hover:text-[#9B0F06] transition border-b border-transparent hover:border-[#9B0F06] pb-0.5"
                            >
                                Explore story
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}