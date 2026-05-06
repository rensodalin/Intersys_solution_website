import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import {
    Zap,
    Target,
    ShieldCheck,
    Activity,
    Bell,
    Car,
    Volume2,
    LayoutGrid,
    Droplets,
    Flame,
    Cpu,
    Settings
} from "lucide-react";

export const Route = createFileRoute("/services_/custom-solution")({
    head: () => ({
        meta: [
            { title: "Custom Engineering Solutions — Intersys Solutions" },
            {
                name: "description",
                content:
                    "Empowering modern enterprises with resilient cloud solutions, airtight security protocols, and infrastructure that grows with your vision."
            }
        ]
    }),
    component: CustomSolutionPage
});

function CustomSolutionPage() {
    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* HERO */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center pt-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
                </div>

                {/* glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[600px] h-[600px] bg-red-500/10 blur-[120px] rounded-full" />
                </div>

                <Container className="relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto space-y-6"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Discover a New World
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 font-light">
                            Empowering modern enterprises with resilient cloud solutions, airtight security protocols, and scalable infrastructure.
                        </p>

                        <div className="flex gap-4 justify-center pt-4">

                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* ABOUT */}
            <section className="py-28 bg-white">
                <Container>
                    <div className="text-center max-w-4xl mx-auto space-y-6">
                        <h2 className="text-4xl font-bold text-[#1A3263]">
                            Comprehensive <span className="text-red-500">Building</span> Automation Solution
                        </h2>
                        <p className="text-gray-500 leading-relaxed">
                            Intersys Solutions Co., Ltd delivers integrated engineering systems and professional services that improve efficiency, reliability, and operational performance.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 mt-20">
                        {[
                            {
                                icon: Zap,
                                title: "Integrated Solutions",
                                desc: "End-to-end engineering and system integration tailored to client needs."
                            },
                            {
                                icon: Target,
                                title: "Client-Focused Design",
                                desc: "Custom-built solutions aligned with operational goals."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Reliable Support",
                                desc: "Long-term operational stability and technical support."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center space-y-4 p-6 rounded-2xl hover:-translate-y-1 transition"
                            >
                                <div className="w-14 h-14 mx-auto rounded-xl bg-gray-100 flex items-center justify-center text-[#1A3263] hover:bg-red-600 hover:text-white transition">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-[#1A3263]">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* TECH ECOSYSTEM */}
            <section className="py-28 bg-[#F8F9FA]">
                <Container>
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold text-[#1A3263] mb-4">
                            Technical Ecosystems
                        </h2>
                        <p className="text-gray-500 max-w-2xl">
                            Advanced systems engineered for safety, intelligence, and infrastructure efficiency.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Intrusion Alarm Systems",
                                desc: "Protect your property with advanced motion sensors, door/window contacts, and integrated alarm notifications.",
                                icon: Bell,
                                img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Car Parking Systems",
                                desc: "Streamlined vehicle access control, automated payment solutions, and real-time occupancy monitoring for seamless management.",
                                icon: Car,
                                img: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Public Address Systems",
                                desc: "Reliable audio solutions for announcements, background music, and emergency broadcasts across large facilities.",
                                icon: Volume2,
                                img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Room Control Unit",
                                desc: "Intelligent in-room control for lighting, HVAC, and access in hospitality and commercial environments.",
                                icon: LayoutGrid,
                                img: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Leak Detection System",
                                desc: "Early detection and alert systems to prevent costly damage and operational downtime from unforeseen leaks.",
                                icon: Droplets,
                                img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ec3?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "VESDA Systems",
                                desc: "Highly sensitive smoke detection technology for mission-critical environments where early warning is essential.",
                                icon: Flame,
                                img: "https://images.unsplash.com/photo-1585314062340-f1a5ad59b3f1?auto=format&fit=crop&q=80&w=800"
                            }
                        ].map((eco, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="h-52 relative overflow-hidden">
                                    <img
                                        src={eco.img}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <eco.icon className="text-red-600" size={20} />
                                        <h3 className="font-bold text-[#1A3263]">
                                            {eco.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-500 text-sm flex-grow">
                                        {eco.desc}
                                    </p>

                                    <button className="mt-6 w-full py-3 bg-[#1A3263] text-white text-xs font-bold tracking-widest rounded-lg hover:bg-red-600 transition">
                                        Start Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* SERVICES */}
            <section className="py-28 bg-gradient-to-b from-[#0A0F1A] to-[#0F172A] text-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-4">Services Integration</h2>
                            <p className="text-white/60 text-lg">
                                A holistic approach to building management
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: Cpu,
                                    title: "Software",
                                    desc: "Integrate System for better decision making and streamline building management."
                                },
                                {
                                    icon: Settings,
                                    title: "Hardware",
                                    desc: "Equip your building with assets and sensors designed to make operations more efficient and reliable."
                                },
                                {
                                    icon: Activity,
                                    title: "Services",
                                    desc: "Rely on our expertise to manage and operate your buildings day in and day out, floor after floor."
                                }
                            ].map((s, i) => (
                                <div
                                    key={i}
                                    className="flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:translate-x-1 transition"
                                >
                                    <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center text-red-500">
                                        <s.icon size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{s.title}</h4>
                                        <p className="text-white/40 text-sm">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}