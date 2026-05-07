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
            <section className="relative h-[90vh] min-h-[700px] flex items-center pt-32 overflow-hidden bg-[#0A0F1A]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=2000"
                        alt="Leak Detection Technology"
                        className="w-full h-full object-cover opacity-40 scale-110 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1A] via-[#0A0F1A]/70 to-transparent" />
                </div>

                {/* ─── BACK BUTTON ─── */}
                <button
                    onClick={() => router.history.back()}
                    className="absolute top-50 left-23 z-20 flex items-center gap-2 text-white hover:text-white/60 transition-colors duration-200 group"
                >
                    <ArrowLeft
                        size={18}
                        className="group-hover:-translate-x-1 transition-transform duration-200"
                    />
                    <span className="text-sm font-medium">Back</span>
                </button>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-4xl space-y-8"
                    >
                        <div className="space-y-4">

                            <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1]">
                                Direct Liquid Cooling <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                                    Leak Detection
                                </span>
                            </h1>
                        </div>
                        <p className="text-lg md:text-lg text-white/50 leading-relaxed font-light max-w-2xl">
                            Mitigate risks with meter-precise sensing technologies for water, hydrocarbons, and chemicals. Engineered for mission-critical reliability in data centers and industrial hubs.
                        </p>
                    </motion.div>
                </Container>

                {/* Background Decoration */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFDFD] to-transparent z-10" />
            </section>

            {/* ─── SPECIALIZED TECHNOLOGY ─── */}
            <section className="py-32 bg-white relative">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-20 items-end mb-20">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#1A3263] leading-tight tracking-tight">
                                Specialized Sensing <br />
                                <span className="text-red-600">Technologies</span>
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                                We deploy diverse sensing architectures tailored to the specific fluid dynamics and environmental risks of your facility.
                            </p>
                        </div>
                        <div className="hidden lg:flex justify-end">
                            <div className="w-24 h-1 bg-red-600" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Server,
                                title: "Detect Liquid Cooling (DLC)",
                                desc: "High-sensitivity leak detection for Direct Liquid Cooling. Purpose-built for Direct-to-Chip systems, the FG-DLC sensor ensures fast, effective detection of all coolant leaks including PG25."
                            },
                            {
                                icon: Flame,
                                title: "Hydrocarbon Monitoring & Oil sensing ",
                                desc: "The first reusable oil sense cables on the market. Specifically designed to detect and locate leaks of crude oil, diesel, and other refined hydrocarbons with precision."
                            },
                            {
                                icon: Droplets,
                                title: "Digital Water Detection",
                                desc: "Fully addressable digital sensing cables for mission-critical facilities. Pinpoints water leaks to the nearest meter under raised floors and around CRAC units."
                            }
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-10 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 text-gray-100 group-hover:text-red-50 transition-colors">
                                    <tech.icon size={80} strokeWidth={1} />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                        <tech.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#1A3263]">{tech.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">{tech.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ─── INFRASTRUCTURE SECURITY ─── */}
            <section className="py-28 bg-[#0A0F1A] relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

                <Container>
                    <div className="max-w-4xl mx-auto text-center space-y-16">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Infrastructure Security</h2>
                            <p className="text-white/40 text-lg max-w-2xl mx-auto">
                                Sophisticated technology designed for hospitals, data centers, and industrial environments.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-16 relative">
                            {/* Connector Line */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 z-0" />

                            {[
                                {
                                    icon: Crosshair,
                                    title: "Precision Localization",
                                    desc: "Pinpoints exact leak location down to the meter for quick and targeted repairs."
                                },
                                {
                                    icon: ShieldAlert,
                                    title: "Active Protection",
                                    desc: "Automated response systems that can shut off valves the moment a leak is detected."
                                },
                                {
                                    icon: Clock,
                                    title: "NA-NO Sensing",
                                    desc: "High-sensitivity sensors capable of detecting single drops of fluid before damage occurrs."
                                }
                            ].map((item, i) => (
                                <div key={i} className="relative z-10 space-y-6 group">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                        <item.icon size={32} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                        <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* ─── KEY FEATURES ─── */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="mb-12 space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1A3263]">Industrial Grade Leak Detection & Prevention</h2>
                        <p className="text-gray-500 text-sm max-w-lg">Advanced engineering for mission-critical environmental safety.</p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-6">
                        {[
                            {
                                icon: ShieldAlert,
                                title: "Early Detection",
                                desc: "Detects leaks at the earliest stage before they cause major damage."
                            },
                            {
                                icon: Crosshair,
                                title: "High Accuracy",
                                desc: "Pinpoints leak location within meters, allowing quick repair."
                            },
                            {
                                icon: Cpu,
                                title: "Integration Ready",
                                desc: "Works seamlessly with Honeywell BMS and other automation platforms for centralized control."
                            },
                            {
                                icon: Maximize,
                                title: "Scalable Solutions",
                                desc: "From small server rooms to large industrial fuel storage facilities."
                            },
                            {
                                icon: Clock,
                                title: "24/7 Monitoring",
                                desc: "Continuous operation for critical environments like data centers, hospitals, airports, and refineries."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-4 transition hover:bg-white hover:shadow-xl group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                    <feature.icon size={20} />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-[#1A3263] leading-tight">{feature.title}</h4>
                                    <p className="text-gray-500 text-[10px] leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ─── INDUSTRIES WATER LEAK (AUTO-SCROLL) ─── */}
            <section className="relative overflow-hidden py-10 bg-red-600">
                <div className="flex items-center gap-10 whitespace-nowrap px-10">
                    <h2 className="text-white font-black text-2xl tracking-tighter opacity-80">Water Leak Solutions</h2>
                    <div className="h-px flex-grow bg-white/20" />
                    <h2 className="text-white font-black text-2xl tracking-tighter opacity-80 italic">Industries Overview</h2>
                </div>
            </section>

            <section className="py-32 bg-white overflow-hidden">
                <div className="relative">
                    {/* Infinite Scroll Wrapper */}
                    <motion.div
                        animate={{ x: [0, -2000] }}
                        transition={{
                            repeat: Infinity,
                            duration: 40,
                            ease: "linear"
                        }}
                        className="flex gap-10 whitespace-nowrap"
                    >
                        {[...waterLeakIndustries, ...waterLeakIndustries].map((item, i) => (
                            <div
                                key={i}
                                className="inline-block w-[450px] space-y-6 group"
                            >
                                <div className="h-[300px] w-full rounded-3xl overflow-hidden shadow-lg bg-gray-100 border border-gray-100">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="px-4">
                                    <h4 className="text-xl font-bold text-[#1A3263] group-hover:text-red-600 transition-colors">{item.name}</h4>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradient Overlays for smooth edges */}
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />
                </div>
            </section>

            {/* ─── INDUSTRIES FUEL LEAK (AUTO-SCROLL) ─── */}
            <section className="relative overflow-hidden py-10 bg-[#0A0F1A]">
                <div className="flex items-center gap-10 whitespace-nowrap px-10">
                    <h2 className="text-white font-black text-2xl tracking-tighter opacity-80">Fuel Leak Prevention</h2>
                    <div className="h-px flex-grow bg-white/10" />
                    <h2 className="text-white font-black text-2xl tracking-tighter opacity-80 italic">Sector Protection</h2>
                </div>
            </section>

            <section className="py-32 bg-gray-50 overflow-hidden">
                <div className="relative">
                    {/* Infinite Scroll Wrapper (Moving Right to Left, appearing Left to Right) */}
                    <motion.div
                        animate={{ x: [-2000, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 35,
                            ease: "linear"
                        }}
                        className="flex gap-10 whitespace-nowrap"
                    >
                        {[...fuelLeakIndustries, ...fuelLeakIndustries].map((item, i) => (
                            <div
                                key={i}
                                className="inline-block w-[450px] space-y-6 group"
                            >
                                <div className="h-[300px] w-full rounded-3xl overflow-hidden shadow-lg bg-gray-200 border border-gray-100">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="px-4">
                                    <h4 className="text-xl font-bold text-[#1A3263] group-hover:text-red-600 transition-colors">{item.name}</h4>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradient Overlays */}
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-gray-50 to-transparent z-10" />
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
                            className="px-12 py-4 bg-[#0A0F1A] text-white rounded-full font-bold hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-red-500/20"
                        >
                            Consult an Expert
                        </button>
                    </div>
                </Container>
            </section>
        </div>
    );
}
