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
            <section className="py-28 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold text-[#1A3263]">Integrated AV Solutions</h2>
                                <div className="w-20 h-1 bg-red-600" />
                            </div>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                Whether it's for meeting rooms, classrooms, boardrooms, auditoriums, retail spaces, houses of worship, or control centers, we provide integrated AV systems that enhance communication, collaboration, and engagement.
                            </p>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    "Meeting Rooms", "Auditoriums",
                                    "Classrooms", "Retail Spaces",
                                    "Boardrooms", "Control Center"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-red-600/5 rounded-2xl -z-10 group-hover:bg-red-600/10 transition-colors" />
                            <img
                                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                                alt="Monitoring Center"
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </Container>
            </section>



            {/* ─── INNOVATION CARDS ─── */}
            <section className="py-28 bg-[#F8F9FA]">
                <Container>

                    {/* HEADER */}
                    <div className="max-w-3xl mb-16 space-y-5">

                        <h2 className="text-4xl font-bold text-[#1A3263]">
                            Future-Ready Innovation
                        </h2>

                        <div className="w-20 h-1 bg-red-600" />

                        <p className="text-gray-500 text-lg leading-relaxed">
                            As technology evolves, Intersys Solutions stays at the forefront by adopting the latest innovations in audio, video, and unified communications. Our goal is to deliver reliable performance, user-friendly systems, and long-term value for every client.
                        </p>

                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {[
                            {
                                title: "HD Displays",
                                desc: "Crystal clear 4K and 8K visual solutions for maximum impact."
                            },
                            {
                                title: "Professional Sound",
                                desc: "Acoustically tuned systems for high-fidelity audio distribution."
                            },
                            {
                                title: "Video Conferencing",
                                desc: "Seamless collaborative technology for hybrid workspaces."
                            },
                            {
                                title: "Smart Controls",
                                desc: "Intuitive automated design through central interfaces."
                            },
                            {
                                title: "Digital Signage",
                                desc: "Dynamic content distribution for modern retail and public spaces."
                            },
                            {
                                title: "Unified Communications",
                                desc: "Integrated platforms with seamless multi-channel connectivity."
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group p-8 bg-white border border-gray-100 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >

                                {/* subtle top line */}
                                <div className="w-10 h-[2px] bg-red-600 mb-6 group-hover:w-16 transition-all duration-300" />

                                <h4 className="text-lg font-bold text-[#1A3263] group-hover:text-red-600 transition-colors mb-3">
                                    {item.title}
                                </h4>

                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>

                            </div>
                        ))}

                    </div>

                </Container>
            </section>

            {/* ─── OUR CORE EXPERTISE ─── */}
            {/* ───── COMPREHENSIVE SERVICES ───── */}
            <section className="py-28 bg-white">
                <Container>

                    <div className="max-w-4xl space-y-6 mb-20">

                        <h2 className="text-4xl font-bold text-[#1A3263]">
                            Comprehensive Services
                        </h2>

                        <div className="w-16 h-1 bg-red-600" />

                        <p className="text-gray-500 leading-relaxed">
                            Comprehensive Services From high-definition displays, professional sound systems, and video conferencing tools to smart control systems and digital signage — we design, supply, install, and maintain solutions that are intuitive, scalable, and impactful.
                        </p>

                        <p className="text-gray-400 italic border-l-4 border-red-500 pl-4">
                            "We don't just install equipment — we create immersive environments where sound and visuals work in harmony."
                        </p>

                    </div>

                </Container>
            </section>


            {/* ───── CORE EXPERTISE ───── */}
            <section className="py-24 bg-gray-50">
                <Container>

                    {/* HEADER */}
                    <div className="max-w-3xl mb-16 space-y-4">
                        <h2 className="text-4xl font-bold text-[#1A3263]">
                            Our Core Expertise
                        </h2>

                        <div className="w-16 h-1 bg-red-600" />

                        <p className="text-gray-500">
                            Specialized engineering for complex signal environments.
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

                        {[
                            {
                                title: "Audio & Display",
                                desc: "High-fidelity sound and 4K+ visual infrastructure."
                            },
                            {
                                title: "Unified Conferencing",
                                desc: "Hybrid ecosystems for seamless global collaboration."
                            },
                            {
                                title: "Automation Control",
                                desc: "Intuitive command via bespoke automation software."
                            },
                            {
                                title: "Signal Management",
                                desc: "Zero-latency routing by industry leaders."
                            },
                            {
                                title: "Full Integration",
                                desc: "Bespoke implementations that vanish into architecture."
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group p-7 rounded-xl border border-gray-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >

                                {/* TITLE */}
                                <h4 className="font-bold text-[#1A3263] text-lg mb-3 group-hover:text-red-600 transition-colors">
                                    {item.title}
                                </h4>

                                {/* DESCRIPTION */}
                                <p className="text-gray-500 text-md leading-relaxed">
                                    {item.desc}
                                </p>

                                {/* ACCENT LINE */}
                                <div className="w-0 group-hover:w-10 h-[2px] bg-red-500 mt-4 transition-all duration-300" />

                            </div>
                        ))}

                    </div>

                </Container>
            </section>
            {/* ─── CONFERENCE SOLUTION ─── */}
            <section className="py-28 bg-gray-50">
                <Container>

                    {/* HEADER */}
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl font-bold text-[#1A3263]">
                            Conferencing Solutions
                        </h2>

                        <p className="text-gray-500 max-w-xl mx-auto">
                            Stay connected anywhere with integrated video and collaboration tools.
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-3 gap-8">

                        {[
                            {
                                title: "Hybrid Connectivity",
                                desc: "Seamless communication between local and remote teams.",
                                img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
                                tag: "Hybrid Meetings"
                            },
                            {
                                title: "Full Compatibility",
                                desc: "Optimized for Zoom, Microsoft Teams, and Google Meet.",
                                img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
                                tag: "Compatibility"
                            },
                            {
                                title: "Professional Hardware",
                                desc: "High-sensitivity microphones and AI-powered camera tracking.",
                                img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
                                tag: "Microphones"
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
                            >

                                {/* IMAGE */}
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="p-8 space-y-3">



                                    <h4 className="text-xl font-bold text-[#1A3263]">
                                        {item.title}
                                    </h4>

                                    <p className="text-gray-500 text-sm leading-relaxed">
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
                    <div className="text-center mb-20 space-y-5">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                            Signal Management
                        </h2>

                        <p className="text-md tracking-wide">
                            Zero-latency routing powered by Lightware and Kramer
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid lg:grid-cols-3 gap-10">

                        {/* CARD 1 */}
                        <div className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden
                            hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">

                            <div className="overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600"
                                    alt="Signal Wiring"
                                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
                                />
                            </div>

                            <div className="p-7 space-y-2">
                                <h4 className="text-lg font-medium tracking-tight">
                                    Routing
                                </h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    High-bandwidth matrix switching for complex AV environments ensuring seamless signal distribution.
                                </p>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden
                            hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">

                            <div className="relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent">

                                {/* glow */}
                                <div className="absolute inset-0 bg-blue-500/10 blur-2xl opacity-40 group-hover:opacity-60 transition" />

                                <img
                                    src="https://static.wixstatic.com/media/3d5958_eecc2f2ac2374cf4be9bc785dd16635d~mv2.png"
                                    alt="Signal Logic 1"
                                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
                                />
                            </div>

                            <div className="p-7 space-y-2">
                                <h4 className="text-lg font-medium tracking-tight">
                                    Extension
                                </h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Secure signal transmission over Fiber or CatX across large-scale facilities with zero loss.
                                </p>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden
                            hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">

                            <div className="relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent">

                                {/* glow */}
                                <div className="absolute inset-0 bg-purple-500/10 blur-2xl opacity-40 group-hover:opacity-60 transition" />

                                <img
                                    src="https://static.wixstatic.com/media/3d5958_5ff4c65272e14b26b5d1b465f857f9f1~mv2.png"
                                    alt="Signal Logic 2"
                                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
                                />
                            </div>

                            <div className="p-7 space-y-2">
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
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold text-[#1A3263]">Room Integration</h2>
                                <p className="text-gray-400">High-reliability design that blends seamlessly into your architectural vision.</p>
                            </div>
                            <div className="space-y-8">
                                {[
                                    { title: "Scalable Architecture", desc: "Technology that adapts to everything from huddle rooms to auditoriums." },
                                    { title: "Clean Aesthetics", desc: "Non-intrusive installations for a professional, clutter-free workspace." },
                                    { title: "Unified AV", desc: "A single, intelligent point of control for your entire environment." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">

                                        <div className="space-y-1">
                                            <h4 className="font-bold text-[#1A3263]">{item.title}</h4>
                                            <p className="text-gray-400 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop" className="rounded-xl shadow-xl" alt="Office 1" />
                                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" className="rounded-xl shadow-xl" alt="Office 2" />
                            </div>
                            <div className="">
                                <img src="https://plus.unsplash.com/premium_photo-1724753995771-8ee6954e78da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="rounded-xl shadow-xl h-full object-cover" alt="Large Meeting Room" />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>


        </div>
    );
}
