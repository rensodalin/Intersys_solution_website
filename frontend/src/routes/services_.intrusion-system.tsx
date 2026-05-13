import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import {
    Eye,
    Cpu,
    Smartphone,
    Layout,
    Globe,
    Activity,
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
            <section className="relative h-[85vh] min-h-[600px] flex items-center pt-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
                        alt="Security Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1A] via-[#0A0F1A]/80 to-transparent" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* ─── BACK BUTTON (FIXED) ─── */}
                <button
                    onClick={() => router.history.back()}
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group pt-37 px-15"
                >
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition">
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-0.5 transition-transform duration-200"
                        />
                    </div>

                    <span className="text-sm font-medium">Back</span>
                </button>

                <Container className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white font-display leading-[1.2] mb-6 text-center">
                            Intelligent <br />
                            <span className="text-red-600">Intrusion Systems</span>
                        </h1>

                        <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
                            Protect your property with our fully integrated intrusion alarm solutions, designed to detect and deter unauthorized access before it becomes a threat. We combine advanced motion sensors, door and window contact detectors, and glass break sensors with intelligent control panels for instant, reliable response.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* ─── INTRO ─── */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263] leading-tight">
                                Advanced Threat Detection for Modern Infrastructure
                            </h2>
                        </div>

                        <div className="border-l-4 border-red-500 pl-8">
                            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                                Intrusion systems combining motion sensors, door/window contacts, and glass break detectors with intelligent control panels for fast response.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="py-28 bg-[#F8F9FA]">
                <Container>

                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263]">
                            Why Choose Intrusion Systems?
                        </h2>
                        <div className="w-20 h-1 bg-red-600 mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {[
                            {
                                icon: Shield,
                                title: "Proactive Protection",
                                desc: "Stops threats before they escalate."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Cutting-edge Security",
                                desc: "Reliable intrusion detection with verified systems."
                            },
                            {
                                icon: Bell,
                                title: "Real-time Alerts",
                                desc: "Instant notifications across mobile and monitoring systems."
                            },
                            {
                                icon: Grid3X3,
                                title: "Flexible Configuration",
                                desc: "Fully customizable for any building layout."
                            },
                            {
                                icon: GlobeLock,
                                title: "Connected Security",
                                desc: "Secure remote access and cloud integration."
                            },
                            {
                                icon: Radar,
                                title: "24/7 Monitoring",
                                desc: "Continuous detection with zero downtime coverage."
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                            >
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop"
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                    />

                                    <div className="absolute top-5 left-5 p-2.5 bg-[#0A0F1A] text-white rounded-lg">
                                        <item.icon size={18} />
                                    </div>
                                </div>

                                <div className="p-6 space-y-2">
                                    <h5 className="text-[#1A3263] font-bold text-base">
                                        {item.title}
                                    </h5>
                                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>

                </Container>
            </section>

            {/* ─── FOOTER ─── */}
            <section className="py-24 bg-[#0A0F1A] text-white text-center">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-8">
                        <p className="text-base md:text-lg font-light leading-relaxed text-white/80">
                            Receive real-time alerts via mobile notifications, sirens, or direct links to security monitoring centers ensuring you stay informed and in control anytime, anywhere. Scalable to fit small offices, large facilities, or multi-site operations, our systems deliver 24/7 protection and complete peace of mind.
                        </p>

                        <div className="h-px w-24 bg-red-600 mx-auto" />
                    </div>
                </Container>
            </section>

        </div>
    );
}