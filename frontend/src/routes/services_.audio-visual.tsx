import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import {
    Tv,
    Volume2,
    Video,
    Smartphone,
    Monitor,
    Link,
    Settings,
    ArrowRight,
    Mic,
    Zap,
    Layers,
    Maximize,
    Globe,
    Cpu,
    CheckCircle2
} from "lucide-react";

export const Route = createFileRoute("/services_/audio-visual")({
    component: AudioVisualPage,
});

function AudioVisualPage() {
    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* ─── HERO SECTION ─── */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center pt-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop"
                        alt="AV Solutions Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                <Container className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white font-display leading-[1.2] mb-6">
                            Delivering Advanced <br />
                            <span className="text-red-600">Audio Visual</span> Solutions
                        </h1>
                        <p className="text-base text-white/70 max-w-2xl leading-relaxed">
                            Transform your spaces with cutting-edge technology that enhances communication, collaboration, and engagement.
                        </p>

                    </motion.div>
                </Container>
            </section>

            {/* ─── INTEGRATED AV SOLUTIONS ─── */}
            <section className="py-24 bg-white">
                <Container>

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        {/* LEFT CONTENT */}
                        <div>

                            <div className="mb-8">


                                <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263] leading-tight">
                                    Integrated AV Solutions
                                </h2>
                            </div>

                            <p className="text-gray-600 leading-relaxed max-w-xl">
                                We deliver integrated audio visual systems for meeting rooms,
                                classrooms, auditoriums, retail environments, and control centers —
                                designed to improve communication, presentation quality, and collaboration.
                            </p>

                            {/* LIST */}
                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-10">

                                {[
                                    "Meeting Rooms",
                                    "Auditoriums",
                                    "Classrooms",
                                    "Retail Spaces",
                                    "Boardrooms",
                                    "Control Centers"
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 text-sm text-gray-700"
                                    >
                                        <div className="w-2 h-2 bg-red-600" />
                                        <span>{item}</span>
                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative">

                            <div className="absolute -top-5 -left-5 w-full h-full border border-gray-200 z-0" />

                            <img
                                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                                alt="Integrated AV Solutions"
                                className="relative z-10 w-full h-[500px] object-cover shadow-lg"
                            />

                        </div>

                    </div>

                </Container>
            </section>

            {/* ─── INNOVATION CARDS ─── */}
            <section className="relative py-24 overflow-hidden">

                {/* BACKGROUND IMAGE */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1664699106229-1bc773380c35?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxwaGF0by1yYWxlfGVufDB8fHx8fA%3D%3D"
                        alt="background"
                        className="w-full h-full object-cover scale-105"
                    />

                    {/* overlay (keep image visible) */}
                    <div className="absolute inset-0 bg-[#F8F9FA]/80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
                </div>

                {/* CONTENT */}
                <Container className="relative z-10">

                    {/* HEADER */}
                    <div className="max-w-3xl mb-14">
                        <h2 className="text-3xl md:text-4xl font-semibold text-[#1A3263] tracking-tight">
                            Future-Ready Innovation
                        </h2>

                        <div className="w-16 h-[2px] bg-red-600 mt-4 mb-5" />

                        <p className="text-gray-600 leading-relaxed">
                            As technology evolves, Intersys Solutions stays ahead by integrating modern AV and communication technologies.
                            We focus on performance, simplicity, and long-term reliability for every solution we deliver.
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {[
                            {
                                title: "HD Displays",
                                desc: "4K/8K display systems designed for clarity and impact."
                            },
                            {
                                title: "Professional Audio",
                                desc: "Balanced, high-quality sound systems for all environments."
                            },
                            {
                                title: "Video Conferencing",
                                desc: "Reliable collaboration tools for hybrid communication."
                            },
                            {
                                title: "Smart Control",
                                desc: "Simple, centralized control for AV and building systems."
                            },
                            {
                                title: "Digital Signage",
                                desc: "Flexible content display for retail and corporate spaces."
                            },
                            {
                                title: "Unified Communication",
                                desc: "Connected platforms for seamless communication flow."
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group border border-gray-200 bg-white/85 backdrop-blur-sm
                    rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                            >

                                <div className="w-8 h-8 mb-5 border border-gray-200 rounded-md flex items-center justify-center group-hover:border-red-600 transition">
                                    <div className="w-2 h-2 bg-red-600" />
                                </div>

                                <h4 className="text-base font-semibold text-[#1A3263] group-hover:text-red-600 transition-colors">
                                    {item.title}
                                </h4>

                                <p className="text-sm text-gray-500 leading-relaxed mt-2">
                                    {item.desc}
                                </p>

                            </div>
                        ))}

                    </div>

                </Container>

            </section>
            {/* ───── COMPREHENSIVE SERVICES ───── */}
            <section className="py-24 bg-white">
                <Container>

                    <div className="max-w-3xl space-y-5 mb-16">

                        <h2 className="text-3xl md:text-4xl font-semibold text-[#1A3263] tracking-tight">
                            Comprehensive Services
                        </h2>

                        <div className="w-14 h-[2px] bg-red-600" />

                        <p className="text-gray-600 leading-relaxed">
                            From high-definition displays and professional sound systems to video conferencing,
                            smart control, and digital signage — we design and deliver complete solutions that are
                            intuitive, scalable, and built for real environments.
                        </p>

                        <p className="text-gray-500 border-l-2 border-red-500 pl-4 italic leading-relaxed">
                            “We don’t just install equipment — we design environments where technology feels invisible but powerful.”
                        </p>

                    </div>

                </Container>
            </section>


            {/* ───── CORE EXPERTISE ───── */}
            <section className="py-24 bg-gray-50">
                <Container>

                    {/* HEADER */}
                    <div className="max-w-3xl mb-14 space-y-4">

                        <h2 className="text-3xl md:text-4xl font-semibold text-[#1A3263] tracking-tight">
                            Our Core Expertise
                        </h2>

                        <div className="w-14 h-[2px] bg-red-600" />

                        <p className="text-gray-600">
                            Specialized engineering for complex audio, video, and control environments.
                        </p>

                    </div>

                    {/* GRID */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

                        {[
                            {
                                title: "Audio & Display",
                                desc: "High-quality sound and modern visual systems."
                            },
                            {
                                title: "Unified Conferencing",
                                desc: "Seamless hybrid communication platforms."
                            },
                            {
                                title: "Automation Control",
                                desc: "Smart centralized control systems."
                            },
                            {
                                title: "Signal Management",
                                desc: "Stable, low-latency signal distribution."
                            },
                            {
                                title: "Full Integration",
                                desc: "Systems designed to blend into architecture."
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                            >

                                <h4 className="text-base font-semibold text-[#1A3263] group-hover:text-red-600 transition-colors">
                                    {item.title}
                                </h4>

                                <p className="text-sm text-gray-500 leading-relaxed mt-2">
                                    {item.desc}
                                </p>

                                <div className="w-0 h-[2px] bg-red-600 mt-4 group-hover:w-10 transition-all duration-300" />

                            </div>
                        ))}

                    </div>

                </Container>
            </section>
            {/* ─── CONFERENCE SOLUTION ─── */}
            <section className="py-24 bg-gray-50">
                <Container>

                    {/* HEADER */}
                    <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">

                        <h2 className="text-3xl md:text-4xl font-semibold text-[#1A3263] tracking-tight">
                            Conferencing Solutions
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Stay connected anywhere with integrated video conferencing and collaboration tools
                            built for modern hybrid work environments.
                        </p>

                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-3 gap-6">

                        {[
                            {
                                title: "Hybrid Connectivity",
                                desc: "Seamless communication between in-office and remote teams.",
                                img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                title: "Platform Integration",
                                desc: "Optimized for Zoom, Microsoft Teams, and Google Meet environments.",
                                img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                title: "Smart Hardware",
                                desc: "AI-assisted cameras and professional-grade audio systems.",
                                img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop"
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300"
                            >

                                {/* IMAGE */}
                                <div className="h-52 overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-500"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="p-6 space-y-3">

                                    <h4 className="text-lg font-semibold text-[#1A3263] group-hover:text-red-600 transition-colors">
                                        {item.title}
                                    </h4>

                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {item.desc}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                </Container>
            </section>
            {/* ─── AV CONTROL SYSTEMS ─── */}
            <section className="py-28 bg-white overflow-hidden">
                <Container>

                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* LEFT CONTENT */}
                        <div className="space-y-10 order-2 lg:order-1">

                            <div className="flex items-center gap-4 text-red-600">
                                <Smartphone size={32} />

                                <h2 className="text-4xl font-bold text-[#1A3263]">
                                    AV Control Systems
                                </h2>
                            </div>

                            <p className="text-gray-500 text-lg leading-relaxed">
                                Centralized room automation for non-technical users.
                            </p>

                            <div className="space-y-4">

                                {[
                                    "One-Touch Start",
                                    "Centralized Monitoring",
                                    "Energy Efficient Automation"
                                ].map((bullet, i) => (
                                    <div key={i} className="flex items-center gap-4 group">

                                        <div className="w-2 h-2 rounded-full bg-red-600 group-hover:scale-125 transition-transform" />

                                        <span className="font-semibold text-[#1A3263]">
                                            {bullet}
                                        </span>

                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* RIGHT IMAGE STACK (IMPROVED PROPORTION + LESS CHAOS) */}
                        <div className="relative h-[520px] order-1 lg:order-2">

                            {/* BACK */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="absolute top-6 right-0 w-[60%] z-10"
                            >
                                <img
                                    src="https://static.wixstatic.com/media/3d5958_a6d3328aaa8746199fc7f724a1b3f56a~mv2.png"
                                    alt="Control UI"
                                    className="w-full"
                                />
                            </motion.div>

                            {/* LEFT */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                                className="absolute bottom-14 left-0 w-[52%] z-20"
                            >
                                <img
                                    src="https://static.wixstatic.com/media/3d5958_54289234ca7b41cfadbf00febe6062b3~mv2.png"
                                    alt="Control Panel"
                                    className="w-full"
                                />
                            </motion.div>

                            {/* CENTER FOCUS */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.25 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] z-30"
                            >
                                <img
                                    src="https://static.wixstatic.com/media/3d5958_851a4d48191e40efa210cc48b2ee2a00~mv2.png"
                                    alt="Interface"
                                    className="w-full"
                                />
                            </motion.div>

                            {/* FRONT */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                className="absolute bottom-0 right-8 w-[35%] z-40"
                            >
                                <img
                                    src="https://static.wixstatic.com/media/3d5958_f86f36bb65154e92b0053607453bc657~mv2.png"
                                    alt="Tablet Control"
                                    className="w-full"
                                />
                            </motion.div>

                        </div>

                    </div>

                </Container>
            </section>
            {/* ─── SIGNAL MANAGEMENT ─── */}
            <section className="py-28 bg-[#0A0F1A] text-white">
                <Container>

                    {/* HEADER */}
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                            Signal Management
                        </h2>

                        <p className="text-white/70 text-base">
                            Zero-latency routing powered by Lightware and Kramer
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* CARD 1 */}
                        <div className="group bg-white/5 border border-white/10 overflow-hidden
                hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">

                            <div className="overflow-hidden h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600"
                                    alt="Signal Wiring"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                />
                            </div>

                            <div className="p-6 space-y-2">
                                <h4 className="text-lg font-medium tracking-tight">
                                    Routing
                                </h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    High-bandwidth matrix switching for complex AV environments ensuring seamless signal distribution.
                                </p>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="group bg-white/5 border border-white/10 overflow-hidden
                hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">

                            <div className="overflow-hidden h-64">
                                <img
                                    src="https://static.wixstatic.com/media/3d5958_eecc2f2ac2374cf4be9bc785dd16635d~mv2.png"
                                    alt="Signal Extension"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                />
                            </div>

                            <div className="p-6 space-y-2">
                                <h4 className="text-lg font-medium tracking-tight">
                                    Extension
                                </h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Secure signal transmission over Fiber or CatX across large-scale facilities with zero loss.
                                </p>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="group bg-white/5 border border-white/10 overflow-hidden
                hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">

                            <div className="overflow-hidden h-64">
                                <img
                                    src="https://static.wixstatic.com/media/3d5958_5ff4c65272e14b26b5d1b465f857f9f1~mv2.png"
                                    alt="Signal Hardware"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                />
                            </div>

                            <div className="p-6 space-y-2">
                                <h4 className="text-lg font-medium tracking-tight">
                                    Hardware
                                </h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Certified integration with global AV standards ensuring reliability and long-term stability.
                                </p>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>
            {/* ─── ROOM INTEGRATION ─── */}
            <section className="py-28 bg-white">
                <Container>

                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* LEFT CONTENT */}
                        <div className="space-y-12">

                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold text-[#1A3263] tracking-tight">
                                    Room Integration
                                </h2>

                                <p className="text-gray-500 leading-relaxed max-w-md">
                                    High-reliability design that blends seamlessly into your architectural vision.
                                </p>
                            </div>

                            <div className="space-y-8">

                                {[
                                    {
                                        title: "Scalable Architecture",
                                        desc: "Technology that adapts from huddle rooms to large auditoriums."
                                    },
                                    {
                                        title: "Clean Aesthetics",
                                        desc: "Non-intrusive installations for a clutter-free workspace."
                                    },
                                    {
                                        title: "Unified AV Control",
                                        desc: "A single intelligent interface for managing the entire environment."
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5">

                                        {/* subtle indicator */}
                                        <div className="mt-2 w-2 h-2 bg-red-600 shrink-0" />

                                        <div className="space-y-1">
                                            <h4 className="font-semibold text-[#1A3263]">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-500 text-sm leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* RIGHT IMAGE GRID */}
                        <div className="grid grid-cols-2 gap-4">

                            <div className="space-y-4">
                                <img
                                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop"
                                    className="w-full h-44 object-cover"
                                    alt="Office 1"
                                />

                                <img
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                                    className="w-full h-44 object-cover"
                                    alt="Office 2"
                                />
                            </div>

                            <div className="h-full">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1724753995771-8ee6954e78da?q=80&w=1171&auto=format&fit=crop"
                                    className="w-full h-full object-cover"
                                    alt="Meeting Room"
                                />
                            </div>

                        </div>

                    </div>

                </Container>
            </section>


        </div>
    );
}
