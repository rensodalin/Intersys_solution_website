import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import {
    ArrowLeft,
    Droplets,
    Flame,
    Server,
    Building2,
    FlaskConical,
    Truck,
    Crosshair,
    ShieldAlert,
    Clock,
    Activity,
    Cpu,
    Waves,
    Target,
    Maximize
} from "lucide-react";

export const Route = createFileRoute("/services_/leak-detection")({
    component: LeakDetectionPage,
});

function LeakDetectionPage() {
    const router = useRouter();

    const waterLeakIndustries = [
        {
            name: "Public and Commercial Buildings",
            img: "https://static.wixstatic.com/media/3d5958_a70abd23dd4b4212a6ab8b64c9dfd439~mv2.png/v1/fill/w_672,h_449,al_c,lg_1,q_85,enc_avif,quality_auto/3d5958_a70abd23dd4b4212a6ab8b64c9dfd439~mv2.png"
        },
        {
            name: "Technical Rooms",
            img: "https://static.wixstatic.com/media/3d5958_1c7ad75221f749359ee7c7ac9eaecb61~mv2.png/v1/fill/w_720,h_704,al_c,lg_1,q_90,enc_avif,quality_auto/3d5958_1c7ad75221f749359ee7c7ac9eaecb61~mv2.png"
        },
        {
            name: "Laboratories and Clean Rooms",
            img: "https://static.wixstatic.com/media/3d5958_87f8ddcff5684a468614319998d0d594~mv2.png/v1/fill/w_672,h_360,al_c,lg_1,q_85,enc_avif,quality_auto/3d5958_87f8ddcff5684a468614319998d0d594~mv2.png"
        },
        {
            name: "Chilled Water Pipes and Risers",
            img: "https://static.wixstatic.com/media/3d5958_0fe9093148a04cec8d0c0b802b643de2~mv2.png/v1/fill/w_388,h_612,al_c,lg_1,q_85,enc_avif,quality_auto/3d5958_0fe9093148a04cec8d0c0b802b643de2~mv2.png"
        },
        {
            name: "Transport Infrastructure",
            img: "https://static.wixstatic.com/media/3d5958_c75a1796b11d4d4ba27db0d50d0542d7~mv2.png/v1/fill/w_718,h_491,al_c,lg_1,q_85,enc_avif,quality_auto/3d5958_c75a1796b11d4d4ba27db0d50d0542d7~mv2.png"
        },
        {
            name: "Industrial Premises",
            img: "https://static.wixstatic.com/media/3d5958_d88bd5ca1528440dab6d6b20a7690e09~mv2.png/v1/fill/w_672,h_360,al_c,lg_1,q_85,enc_avif,quality_auto/3d5958_d88bd5ca1528440dab6d6b20a7690e09~mv2.png"
        },
        {
            name: "Liquid Cooled Data Centers",
            img: "https://static.wixstatic.com/media/3d5958_d5920da8476e4ded87118892c629192b~mv2.png/v1/fill/w_785,h_474,al_c,q_90,enc_avif,quality_auto/image_edited.png"
        },
        {
            name: "Air Cooled Data Centers",
            img: "https://static.wixstatic.com/media/3d5958_c3aa6f0703c549648ebf069cceb0aea3~mv2.png/v1/fill/w_752,h_569,al_c,lg_1,q_90,enc_avif,quality_auto/image_edited.png"
        }
    ];

    const fuelLeakIndustries = [
        {
            name: "Airports and Jet Fuel Systems",
            img: "https://static.wixstatic.com/media/3d5958_689f5d5fbd3e4310a0d0b15cd70166cf~mv2.png/v1/fill/w_720,h_568,al_c,lg_1,q_90,enc_avif,quality_auto/3d5958_689f5d5fbd3e4310a0d0b15cd70166cf~mv2.png"
        },
        {
            name: "Fuel Pipelines",
            img: "https://static.wixstatic.com/media/3d5958_657280aabbc6492abd0f48a2ca74d2e3~mv2.png/v1/fill/w_718,h_514,al_c,lg_1,q_90,enc_avif,quality_auto/3d5958_657280aabbc6492abd0f48a2ca74d2e3~mv2.png"
        },
        {
            name: "Immersion-cooled Data Centers",
            img: "https://static.wixstatic.com/media/3d5958_c1638df7cb0d471bb9a89c4a4c23a02b~mv2.png/v1/fill/w_960,h_539,al_c,lg_1,q_90,enc_avif,quality_auto/image_edited.png"
        },
        {
            name: "Power Generators",
            img: "https://static.wixstatic.com/media/3d5958_7f4aaef54b2b44a981124484c5ce6b35~mv2.png/v1/fill/w_811,h_569,al_c,lg_1,q_90,enc_avif,quality_auto/image_edited.png"
        },
        {
            name: "Oil Storage Facilities",
            img: "https://static.wixstatic.com/media/3d5958_c28d13de5af945bbb4493b6f9be0e038~mv2.png/v1/fill/w_719,h_509,al_c,lg_1,q_90,enc_avif,quality_auto/3d5958_c28d13de5af945bbb4493b6f9be0e038~mv2.png"
        }
    ];

    return (
        <div className="bg-[#FDFDFD] overflow-hidden scroll-smooth selection:bg-red-500 selection:text-white">

            {/* ─── HERO SECTION ─── */}
            <section className="relative min-h-[460px] sm:min-h-[540px] md:min-h-[550px] flex items-center pt-24 sm:pt-32 pb-12 overflow-hidden bg-[#0A0F1A]">

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1669920282670-d2e1f59e7aff?q=80&w=1142&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Leak Detection"
                        className="w-full h-full object-cover opacity-70"
                    />

                    {/* Softer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1A] via-[#0A0F1A]/80 to-[#0A0F1A]/40" />
                </div>

                {/* BACK BUTTON */}
                <button
                    onClick={() => router.history.back()}
                    className="absolute top-28 sm:top-32 md:top-36 left-4 sm:left-6 lg:left-8 z-30 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group cursor-pointer"
                >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:border-white/40 transition">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">Back</span>
                </button>

                {/* CONTENT */}
                <Container className="relative z-10">
                    <div className="max-w-2xl text-center sm:text-left">

                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >

                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-5">
                                Direct Liquid Cooling <br />
                                <span className="text-red-500">Leak Detection</span>
                            </h1>

                            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed px-2 sm:px-0">
                                Detect leaks early with precise sensing technology for water, oil, and chemical systems.
                                Built for data centers and industrial environments where reliability matters most.
                            </p>
                        </motion.div>

                    </div>
                </Container>

            </section>

            {/* ─── SPECIALIZED TECHNOLOGY ─── */}
            {/* ─── SPECIALIZED SENSING TECHNOLOGIES ─── */}
            <section className="py-28 bg-white">
                <Container>

                    {/* HEADER */}
                    <div className="grid lg:grid-cols-2 gap-16 items-end mb-16">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-semibold text-[#1A3263] leading-tight tracking-tight">
                                Specialized Sensing
                                <span className="block text-red-600 mt-1">
                                    Technologies
                                </span>
                            </h2>

                            <p className="text-gray-600 text-base leading-relaxed max-w-xl">
                                Sensing technologies engineered for coolant, hydrocarbon,
                                and water leak detection across mission-critical environments.
                            </p>
                        </div>

                        <div className="hidden lg:flex justify-end items-center">
                            <div className="w-20 h-[2px] bg-red-600" />
                        </div>
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-3 gap-10">

                        {[
                            {
                                icon: Cpu,
                                title: "Detect Liquid Cooling (DLC)",
                                desc: "Designed for Direct-to-Chip cooling systems with rapid PG25 coolant leak detection."
                            },
                            {
                                icon: Flame,
                                title: "Hydrocarbon Monitoring",
                                desc: "Detects crude oil, diesel, and refined hydrocarbons with reusable sensing cables."
                            },
                            {
                                icon: Droplets,
                                title: "Digital Water Detection",
                                desc: "Addressable sensing cables that pinpoint leaks under floors and CRAC environments."
                            }
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="border-t border-gray-200 pt-6 group"
                            >

                                {/* ICON */}
                                <div className="text-red-600 mb-4">
                                    <tech.icon size={22} strokeWidth={1.6} />
                                </div>

                                {/* TITLE */}
                                <h3 className="text-lg font-semibold text-[#1A3263] mb-3 group-hover:text-red-600 transition-colors">
                                    {tech.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {tech.desc}
                                </p>

                            </motion.div>
                        ))}

                    </div>

                </Container>
            </section>
            {/* ─── INFRASTRUCTURE SECURITY ─── */}
            <section className="py-28 bg-[#0A0F1A] relative overflow-hidden w-full">
                {/* background texture */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:22px_22px]" />

                {/* soft glow */}
                <div className="absolute top-[-250px] right-[-250px] w-[600px] h-[600px] bg-red-600/10 blur-[160px] rounded-full" />

                {/* FULL WIDTH WRAPPER (no max container feel) */}
                <div className="w-full px-6 md:px-16 lg:px-24">

                    {/* HEADER */}
                    <div className="max-w-3xl space-y-4 mb-20">
                        <h2 className="text-xl md:text-4xl font-semibold text-white tracking-tight">
                            Infrastructure Security
                        </h2>

                        <p className="text-white/50 text-base md:text-lg leading-relaxed">
                            Built for hospitals, data centers, and industrial environments where precision detection is critical.
                        </p>

                        <div className="w-16 h-[2px] bg-red-600" />
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-3 gap-14 relative">
                        {[
                            {
                                icon: Server,
                                title: "Detect Liquid Cooling (DLC)",
                                desc: "High-sensitivity leak detection for Direct Liquid Cooling systems. Optimized for PG25 and advanced coolant environments."
                            },
                            {
                                icon: Flame,
                                title: "Hydrocarbon Monitoring",
                                desc: "Detects crude oil, diesel, and industrial hydrocarbons with precise location tracking and stable long-term sensing."
                            },
                            {
                                icon: Droplets,
                                title: "Digital Water Detection",
                                desc: "Pinpoint water leak detection accurate to the meter under raised floors, ceilings, and CRAC zones."
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="relative pl-6 border-l border-white/10 group"
                            >
                                {/* animated left bar */}
                                <div className="absolute left-0 top-0 w-[2px] h-0 bg-red-600 group-hover:h-full transition-all duration-500" />

                                {/* icon (simple, not boxed) */}
                                <div className="text-red-500 mb-4">
                                    <item.icon size={22} strokeWidth={1.6} />
                                </div>

                                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-red-400 transition">
                                    {item.title}
                                </h3>

                                <p className="text-white/40 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ─── KEY FEATURES ─── */}
            <section className="py-20 bg-white">
                <Container>

                    {/* HEADER */}
                    <div className="mb-14 max-w-2xl space-y-3">
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#1A3263] tracking-tight">
                            Industrial Grade Leak Detection & Prevention
                        </h2>

                        <p className="text-gray-500 text-sm leading-relaxed">
                            Designed for mission-critical environments where early detection and reliability matter most.
                        </p>

                        <div className="w-14 h-[2px] bg-red-600" />
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
                        {[
                            {
                                icon: ShieldAlert,
                                title: "Early Detection",
                                desc: "Detects leaks before they escalate into system failures."
                            },
                            {
                                icon: Crosshair,
                                title: "High Accuracy",
                                desc: "Locates leaks within precise meter-level accuracy."
                            },
                            {
                                icon: Cpu,
                                title: "Integration Ready",
                                desc: "Seamless integration with BMS and automation systems."
                            },
                            {
                                icon: Maximize,
                                title: "Scalable Design",
                                desc: "Works across small rooms to large industrial facilities."
                            },
                            {
                                icon: Clock,
                                title: "24/7 Monitoring",
                                desc: "Continuous protection for critical infrastructure."
                            }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="relative pl-5 border-l border-gray-200 group"
                            >
                                {/* subtle active line */}
                                <div className="absolute left-0 top-0 w-[2px] h-0 bg-red-600 group-hover:h-full transition-all duration-500" />

                                {/* icon (no box, more technical) */}
                                <div className="text-red-600 mb-3">
                                    <feature.icon size={18} strokeWidth={1.6} />
                                </div>

                                {/* title */}
                                <h4 className="text-sm font-semibold text-[#1A3263] mb-1 group-hover:text-red-600 transition">
                                    {feature.title}
                                </h4>

                                {/* desc */}
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </Container>
            </section>

            {/* ─── INDUSTRIES WATER LEAK (AUTO-SCROLL) ─── */}
            <section className="relative overflow-hidden py-10 bg-red-600">
                <div className="flex items-center gap-8 px-10">
                    <h2 className="text-white font-semibold text-xl tracking-tight opacity-90">
                        Water Leak Solutions
                    </h2>

                    <div className="h-px flex-1 bg-white/20" />

                    <h2 className="text-white font-semibold text-xl tracking-tight opacity-70 italic">
                        Industries Overview
                    </h2>
                </div>
            </section>

            <section className="py-28 bg-white overflow-hidden">
                <div className="relative">

                    {/* SCROLL ROW */}
                    <motion.div
                        animate={{ x: [0, -2000] }}
                        transition={{
                            repeat: Infinity,
                            duration: 42,
                            ease: "linear"
                        }}
                        className="flex gap-8 whitespace-nowrap"
                    >
                        {[...waterLeakIndustries, ...waterLeakIndustries].map((item, i) => (
                            <div key={i} className="w-[420px] shrink-0 group">

                                {/* IMAGE (clean, no heavy rounding) */}
                                <div className="h-[280px] w-full overflow-hidden border border-gray-200 bg-gray-50">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* TEXT */}
                                <div className="mt-4 px-1">
                                    <h4 className="text-lg font-semibold text-[#1A3263] group-hover:text-red-600 transition-colors">
                                        {item.name}
                                    </h4>

                                    <div className="w-10 h-[2px] bg-red-600 mt-2 opacity-60 group-hover:opacity-100 transition" />
                                </div>

                            </div>
                        ))}
                    </motion.div>

                    {/* EDGE FADE */}
                    <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-white to-transparent z-10" />

                </div>
            </section>
            {/* ─── INDUSTRIES FUEL LEAK (AUTO-SCROLL) ─── */}
            <section className="relative overflow-hidden py-10 bg-[#0A0F1A]">
                <div className="flex items-center gap-8 px-10">
                    <h2 className="text-white font-semibold text-xl tracking-tight opacity-80">
                        Fuel Leak Prevention
                    </h2>

                    <div className="h-px flex-1 bg-white/10" />

                    <h2 className="text-white font-semibold text-xl tracking-tight opacity-60 italic">
                        Sector Protection
                    </h2>
                </div>
            </section>

            <section className="py-28 bg-gray-50 overflow-hidden relative">
                <div className="relative">

                    {/* SCROLL ROW */}
                    <motion.div
                        animate={{ x: [0, -2000] }}
                        transition={{
                            repeat: Infinity,
                            duration: 40,
                            ease: "linear"
                        }}
                        className="flex gap-8 whitespace-nowrap"
                    >
                        {[...fuelLeakIndustries, ...fuelLeakIndustries].map((item, i) => (
                            <div
                                key={i}
                                className="w-[420px] shrink-0 group"
                            >
                                {/* IMAGE CARD */}
                                <div className="h-[280px] w-full overflow-hidden border border-gray-200 bg-white">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* TEXT */}
                                <div className="mt-4 px-1">
                                    <h4 className="text-lg font-semibold text-[#1A3263] group-hover:text-red-600 transition-colors">
                                        {item.name}
                                    </h4>

                                    <div className="w-10 h-[2px] bg-red-600 mt-2 opacity-60 group-hover:opacity-100 transition" />
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* EDGE FADE */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-white text-center">
                <Container>
                    <div className="max-w-2xl mx-auto space-y-8">
                        <div className="w-16 h-1 bg-red-600 mx-auto" />
                        <h2 className="text-4xl font-bold text-[#1A3263]">Ready to secure your assets?</h2>
                        <p className="text-gray-500">Contact our engineering team for a comprehensive site assessment and customized leak detection strategy.</p>
                        <button
                            onClick={() => router.navigate({ to: "/contact" })}
                            className="px-12 py-4 bg-[#0A0F1A] text-white rounded-md font-bold hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-red-500/20"
                        >
                            Consult an Expert
                        </button>
                    </div>
                </Container>
            </section>
        </div>
    );
}
