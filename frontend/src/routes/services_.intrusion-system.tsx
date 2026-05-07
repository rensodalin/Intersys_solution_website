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
    ArrowLeft
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

                {/* ─── BACK BUTTON ─── */}
                <button
                    onClick={() => router.history.back()}
                    className="absolute top-50 left-23 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group"
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
                        className="max-w-3xl mx-auto text-center space-y-6"
                    >
                        <h1 className="text-2xl md:text-4xl font-bold leading-tight">
                            Intrusion Systems
                        </h1>

                        <p className="text-base md:text-lg text-white/80 leading-relaxed font-light">
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
                                icon: Eye,
                                title: "Proactive Protection",
                                desc: "Stops threats before they escalate."
                            },
                            {
                                icon: Cpu,
                                title: "Cutting-edge Technology",
                                desc: "Reliable sensors and control systems from trusted brands."
                            },
                            {
                                icon: Smartphone,
                                title: "Real-time Awareness",
                                desc: "Instant alerts anytime, anywhere."
                            },
                            {
                                icon: Layout,
                                title: "Customizable Design",
                                desc: "Tailored to facility size and security needs."
                            },
                            {
                                icon: Globe,
                                title: "Scalable Solutions",
                                desc: "Expand easily as your business grows."
                            },
                            {
                                icon: Activity,
                                title: "24/7 Reliability",
                                desc: "Continuous monitoring with minimal downtime."
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