import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import {
    ArrowLeft,
    Shield,
    ShieldCheck,
    Bell,
    Grid3X3,
    GlobeLock,
    Radar
} from "lucide-react";

export const Route = createFileRoute("/services_/intrusion-system")({
    component: IntrusionSystemPage,
});

function IntrusionSystemPage() {
    const router = useRouter();

    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* ─── HERO ─── */}
            <section className="relative min-h-[460px] sm:min-h-[540px] md:min-h-[600px] flex items-center pt-24 sm:pt-32 pb-12 overflow-hidden bg-[#0A0F1A]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1627817471035-3333a9ece240?q=80&w=1418&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Security Background"
                        className="w-full h-full object-cover opacity-70 sm:opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/85 to-[#0A0F1A]/60 lg:bg-gradient-to-r lg:from-[#0A0F1A] lg:via-[#0A0F1A]/80 lg:to-transparent" />
                </div>

                {/* BACK BUTTON - Clean responsive absolute positioning */}
                <button
                    onClick={() => router.history.back()}
                    className="absolute top-28 sm:top-32 md:top-36 left-4 sm:left-6 lg:left-8 z-30 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group cursor-pointer"
                >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:border-white/40 transition">
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-0.5 transition-transform duration-200"
                        />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">Back</span>
                </button>

                {/* CONTENT */}
                <Container className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl text-center sm:text-left"
                    >
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display leading-[1.2] mb-4 sm:mb-6">
                            Intelligent <br />
                            <span className="text-red-600">Intrusion Systems</span>
                        </h1>

                        <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed px-2 sm:px-0">
                            Protect your property with our fully integrated intrusion alarm solutions,
                            designed to detect and deter unauthorized access before it becomes a threat.
                            We combine advanced motion sensors, door and window contact detectors, and
                            glass break sensors with intelligent control panels for instant, reliable response.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* ─── INTRO ─── */}
            <section className="py-14 sm:py-20 lg:py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-14 lg:gap-20 items-center">
                        <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A3263] leading-tight">
                                Advanced Threat Detection for Modern Infrastructure
                            </h2>
                        </div>

                        <div className="border-l-4 border-red-500 pl-4 sm:pl-8">
                            <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed">
                                Intrusion systems combining motion sensors, door/window contacts, and glass break detectors with intelligent control panels for fast response.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="py-14 sm:py-20 lg:py-28 bg-[#F8F9FA]">
                <Container>

                    <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A3263]">
                            Why Choose Intrusion Systems?
                        </h2>
                        <div className="w-16 sm:w-20 h-1 bg-red-600 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

                        {[
                            {
                                icon: Shield,
                                title: "Proactive Protection",
                                desc: "Stops threats before they escalate.",
                                img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                icon: ShieldCheck,
                                title: "Cutting-edge Security",
                                desc: "Reliable intrusion detection with verified systems.",
                                img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                icon: Bell,
                                title: "Real-time Alerts",
                                desc: "Instant notifications across mobile and monitoring systems.",
                                img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                icon: Grid3X3,
                                title: "Flexible Configuration",
                                desc: "Fully customizable for any building layout.",
                                img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                icon: GlobeLock,
                                title: "Connected Security",
                                desc: "Secure remote access and cloud integration.",
                                img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                icon: Radar,
                                title: "24/7 Monitoring",
                                desc: "Continuous detection with zero downtime coverage.",
                                img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                            >
                                <div className="h-44 sm:h-56 overflow-hidden relative">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    <div className="absolute top-4 sm:top-5 left-4 sm:left-5 p-2 sm:p-2.5 bg-[#0A0F1A] text-white rounded-lg">
                                        <item.icon size={18} />
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6 space-y-2">
                                    <h5 className="text-[#1A3263] font-bold text-sm sm:text-base">
                                        {item.title}
                                    </h5>
                                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>

                </Container>
            </section>

            {/* ─── FOOTER ─── */}
            <section className="py-14 sm:py-20 lg:py-24 bg-[#0A0F1A] text-white text-center">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
                        <p className="text-xs sm:text-base md:text-lg font-light leading-relaxed text-white/80 px-2 sm:px-0">
                            Receive real-time alerts via mobile notifications, sirens, or direct links to security monitoring centers ensuring you stay informed and in control anytime, anywhere. Scalable to fit small offices, large facilities, or multi-site operations, our systems deliver 24/7 protection and complete peace of mind.
                        </p>

                        <div className="h-px w-20 sm:w-24 bg-red-600 mx-auto" />
                    </div>
                </Container>
            </section>

        </div>
    );
}