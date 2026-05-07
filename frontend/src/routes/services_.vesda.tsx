import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import {
    Wind,
    Zap,
    Settings,
    ShieldAlert,
    Activity,
    EyeOff,
    ArrowRight,
    ArrowLeft
} from "lucide-react";

export const Route = createFileRoute("/services_/vesda")({
    component: VesdaPage,
});

function VesdaPage() {
    const router = useRouter();
    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* ─── HERO SECTION ─── */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center pt-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://i.redd.it/gas-suppression-vesda-system-v0-9o5ooecpscvc1.jpg?width=4032&format=pjpg&auto=webp&s=a957025fc021d04dcfa42a0ca870d7897e0751fc"
                        alt="VESDA Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                </div>

                {/* ─── BACK BUTTON ─── */}
                <button
                    onClick={() => router.history.back()}
                    className="absolute top-45 left-23 z-20 flex items-center gap-2 text-white hover:text-white/60 transition-colors duration-200 group"
                >
                    <ArrowLeft
                        size={18}
                        className="group-hover:-translate-x-1 transition-transform duration-200"
                    />
                    <span className="text-sm font-medium">Back</span>
                </button>

                <Container className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl space-y-8 text-center md:text-left"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                            VESDA (Very Early Smoke Detection Apparatus)
                        </h1>
                        <p className="text-base md:text-lg text-white/80 leading-relaxed font-light max-w-2xl">
                            VESDA is a highly sensitive aspirating smoke detection system that draws air through pipes into a laser detection chamber, enabling it to identify smoke particles much earlier than conventional detectors often before smoke is visible allowing faster response and damage prevention.
                        </p>

                    </motion.div>
                </Container>
            </section>

            {/* ─── PRECISION MONITORING ─── */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-4xl font-bold text-[#1A3263] leading-tight">
                                Precision Monitoring Through Active Sampling
                            </h2>
                            <p className="text-gray-500 text-md leading-relaxed">
                                VESDA is a highly sensitive smoke detection system that continuously draws air through a network of pipes into a laser detection chamber. This allows it to detect even the smallest smoke particles early, enabling faster response and preventing damage.
                            </p>
                        </div>
                        <div className="bg-gray-100 rounded-3xl p-20 flex items-center justify-center group hover:bg-red-50 transition-colors duration-500">
                            <Wind size={120} strokeWidth={1} className="text-gray-400 group-hover:text-red-600 transition-colors duration-500" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* ─── WHY CHOOSE SECTION ─── */}
            <section className="py-28 bg-[#F8F9FA]">
                <Container>
                    <div className="mb-20 space-y-4">
                        <h2 className="text-3xl font-bold text-[#1A3263] border-l-4 border-red-600 pl-6">
                            Why Choose VESDA System
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8">

                        {/* 1. Very Early Warning */}
                        <div className="md:col-span-4 group relative h-[450px] rounded-2xl overflow-hidden bg-[#0A0F1A]">
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-1000"
                            />
                            <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                                <h4 className="text-xl font-bold text-white mb-4">Very Early Warning</h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Detects at the earliest stages (pre-alarm), enabling investigation before an emergency.
                                </p>
                            </div>
                        </div>

                        {/* 2. High Sensitivity */}
                        <div className="md:col-span-4 group relative h-[450px] rounded-2xl overflow-hidden bg-[#0A0F1A]">
                            <img
                                src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-1000"
                            />
                            <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                                <h4 className="text-xl font-bold text-white mb-4">High Sensitivity</h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Adjustable alarm thresholds (e.g., Alert, Action, Fire 1, Fire 2) to match your risk profile.
                                </p>
                            </div>
                        </div>

                        {/* 3. Stable in Harsh Environments */}
                        <div className="md:col-span-4 group relative h-[450px] rounded-2xl overflow-hidden bg-[#0A0F1A]">
                            <img
                                src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-1000"
                            />
                            <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                                <h4 className="text-xl font-bold text-white mb-4">Stable in Harsh Environments</h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Performs well in high airflow, dusty, or high-ceiling areas where spot detectors struggle.
                                </p>
                            </div>
                        </div>

                        {/* 4. Continuous Sampling (Wide) */}
                        <div className="md:col-span-8 group relative h-[400px] rounded-2xl overflow-hidden bg-[#0A0F1A]">
                            <img
                                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
                                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-1000"
                            />
                            <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                                <div className="max-w-lg">
                                    <h4 className="text-2xl font-bold text-white mb-4">Continuous Sampling</h4>
                                    <p className="text-white/60 text-base leading-relaxed">
                                        24/7 active air sampling for consistent protection.

                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 5. Low Visual Impact */}
                        <div className="md:col-span-4 group relative h-[400px] rounded-2xl overflow-hidden bg-[#0A0F1A]">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-1000"
                            />
                            <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                                <h4 className="text-xl font-bold text-white mb-4">Low Visual Impact</h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Discreet capillaries and sampling points maintain clean aesthetics
                                </p>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>


        </div>
    );
}
