import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import {
    Shield, Bell, Zap, Cpu, Activity, Globe, CheckCircle2,
    Wifi, Smartphone, LayoutDashboard, Users, Radio,
    Flame, Droplets, Power, Network, ChevronRight
} from "lucide-react";

export const Route = createFileRoute("/services_/fire-alarm")({
    head: () => ({
        meta: [
            { title: "Intelligent Fire Safety Solutions — Intersys Solutions" },
            {
                name: "description",
                content:
                    "Protecting life and property with advanced fire detection, unified systems integration, and rapid response technology.",
            },
        ],
    }),
    component: FireAlarmPage,
});

function FireAlarmPage() {
    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* ─── HERO ─── */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center pt-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=2000&auto=format&fit=crop"
                        alt="Fire Safety"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                </div>

                <Container className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white font-display leading-[1.2] mb-6">
                            Intelligent <br />
                            <span className="text-red-500">Fire Safety</span> Solutions
                        </h1>
                        <p className="text-base text-white/70 max-w-2xl leading-relaxed">
                            At Intersys Solutions Co., Ltd, we specialize in delivering intelligent fire alarm systems
                            designed to protect lives, assets, and infrastructure. As an authorized Honeywell Engineering
                            System Distributor, we offer trusted global brands like NOTIFIER, ESSER, and System Sensor
                            by Honeywell — bringing proven global technology to your local projects.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            {["Early Detection", "Fast Response", "System Integration"].map((tag) => (
                                <span key={tag} className="px-4 py-1.5 border border-white/30 text-white/80 text-sm rounded-full backdrop-blur-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* ─── SECTOR OPTIMIZATION ─── */}
            <section className="py-28 bg-white">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl space-y-4">
                            <h2 className="text-4xl md:text-4xl font-bold text-[#1A3263]">Optimized for Diverse Sectors</h2>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                Every environment has a unique risk profile. Our fire alarm solutions are custom-engineered to
                                meet international safety standards for every architectural scale — providing fast response
                                times, real-time monitoring, and long-term peace of mind.
                            </p>
                        </div>
                        <span className="text-9xl font-bold text-gray-50 leading-none select-none hidden lg:block">02</span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Commercial",
                                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
                                desc: "Advanced fire safety systems for office buildings, retail spaces, and business complexes — integrated with BMS, PA systems, and access control."
                            },
                            {
                                title: "Residential",
                                img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
                                desc: "Reliable protection for apartments, condominiums, and residential developments with aesthetically discreet detectors and guest-room integration."
                            },
                            {
                                title: "Industrial",
                                img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
                                desc: "Heavy-duty fire detection and suppression for factories and industrial facilities — high-sensitivity smoke detection, gas monitoring, and explosion-proof devices."
                            }
                        ].map((sector, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group space-y-6"
                            >
                                <div className="h-64 overflow-hidden rounded-xl relative">
                                    <img src={sector.img} alt={sector.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-[#1A3263]">{sector.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{sector.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ─── UNIFIED SYSTEMS INTEGRATION ─── */}
            <section className="py-24 bg-[#0A0F1A] text-white overflow-hidden">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Unified Systems Integration</h2>
                            <p className="text-white/60 text-lg leading-relaxed font-light">
                                We integrate Honeywell's world-class fire safety technologies — NOTIFIER, ESSER, and
                                System Sensor — to deliver reliable protection fully compliant with international standards.
                                Our integrated approach connects fire detection with building management and security
                                ecosystems for holistic safety management.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { label: "BMS", title: "BMS Integration", desc: "Seamless BACnet & Modbus integration with your existing Building Management Systems." },
                                    { label: "Security", title: "Security Mesh", desc: "Unified intrusion & access control for comprehensive protection and real-time alerts." },
                                    { label: "Response", title: "Emergency Response", desc: "Coordinates with emergency response networks for rapid action during critical situations." },
                                    { label: "Control", title: "Intelligent Control", desc: "Programmable logic for multi-zone coordination and automated emergency response." },
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10">
                                        <h4 className="text-red-500 font-bold mb-2">{item.title}</h4>
                                        <p className="text-white/40 text-xs">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://static.wixstatic.com/media/3d5958_fb21055f1af54a9d80929c991e66f329~mv2.png/v1/fill/w_634,h_316,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
                                alt="Systems Integration"
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-red-600/10 blur-[100px] -z-10 rounded-full" />
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* ─── CORE STRENGTHS (images) ─── */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl font-bold text-[#1A3263]">Fire Alarm Systems</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Advanced protection for your safety — engineered to detect, respond, and integrate seamlessly.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Bell,
                                title: "Security",
                                img: "https://static.wixstatic.com/media/3d5958_7e97d8ddf2b14b55a2db23bca1d696e7~mv2.png/v1/fill/w_462,h_328,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
                            },
                            {
                                icon: Activity,
                                title: "Response",
                                img: "https://static.wixstatic.com/media/3d5958_87898566ce3b4b9cb73ef795082f167b~mv2.png/v1/fill/w_580,h_328,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/28_edited.png"
                            },
                            {
                                icon: Cpu,
                                title: "System Control",
                                img: "https://static.wixstatic.com/media/3d5958_cf1a4343d91447778f385a7eff7beb60~mv2.png/v1/fill/w_650,h_294,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
                            },
                            {
                                icon: Cpu,
                                title: "BMS",
                                img: "https://static.wixstatic.com/media/3d5958_fb21055f1af54a9d80929c991e66f329~mv2.png/v1/fill/w_634,h_316,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
                            }
                        ].map((strength, i) => (
                            <div key={i} className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <strength.icon className="text-red-600" size={24} />
                                    <h3 className="text-xl font-bold text-[#1A3263]">{strength.title}</h3>
                                </div>
                                <div className="h-48 rounded-lg overflow-hidden shadow-lg">
                                    <img src={strength.img} alt={strength.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ─── KEY CAPABILITIES GRID ─── */}
            <section className="py-20 bg-[#F8F9FA]">
                <Container>

                    {/* HEADER */}
                    <div className="text-center mb-14 space-y-4">
                        <h2 className="text-4xl font-bold text-[#1A3263]">
                            Advanced Fire Safety Systems
                        </h2>

                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Six pillars of protection engineered into every deployment.
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-3 gap-6">

                        {[
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/2431/2431670.png",
                                title: "Early Detection & Rapid Response",
                                desc: "Detects smoke, heat, and gases at the earliest stage of a fire using advanced sensors and intelligent algorithms — enabling quick alerts and minimizing damage or disruption."
                            },
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/7655/7655614.png",
                                title: "Systems Integration",
                                desc: "Works seamlessly with your BMS, security, and emergency systems. Supports BACnet & Modbus protocols for holistic, unified building safety management."
                            },
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/2857/2857314.png",
                                title: "Flexible Architecture",
                                desc: "Scalable for all buildings — from small offices to industrial zones and high-rise towers — with support for conventional, addressable, and hybrid network architectures."
                            },
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/1600/1600232.png",
                                title: "High Reliability",
                                desc: "Meets NFPA, EN54, and local regulations. Certified components from trusted brands with redundancy and fail-safe features for consistent detection and response."
                            },
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/2099/2099058.png",
                                title: "Smart Monitoring",
                                desc: "Remote monitoring, mobile alerts, and web/app control interfaces. 99.9% uptime with sub-1-second alert latency and 256-bit encrypted cloud access."
                            },
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/2889/2889676.png",
                                title: "Intelligent Control Panels",
                                desc: "Programmable logic for multi-zone coordination. VESDA (Very Early Smoke Detection Apparatus) for high-risk environments with pinpoint addressable accuracy."
                            }
                        ].map((cap, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-all duration-300"
                            >

                                {/* ICON */}
                                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center shadow-sm">
                                    <img
                                        src={cap.icon}
                                        alt={cap.title}
                                        className="w-8 h-8 object-contain"
                                    />
                                </div>

                                {/* TITLE */}
                                <h4 className="text-[15px] font-bold text-[#1A3263]">
                                    {cap.title}
                                </h4>

                                {/* DESCRIPTION */}
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {cap.desc}
                                </p>

                            </motion.div>
                        ))}

                    </div>
                </Container>
            </section>
            {/* ─── FLEXIBLE ARCHITECTURE ─── */}
            <section className="py-28 bg-white">
                <Container>

                    {/* HEADER */}
                    <div className="max-w-4xl mb-20 space-y-5">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263] tracking-tight">
                            Flexible Architecture
                        </h2>

                        <div className="w-16 h-1 bg-red-600" />

                        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
                            Scalable systems designed to adapt across environments — from compact offices to complex industrial infrastructures — ensuring consistent protection at every level.
                        </p>
                    </div>

                    {/* CONTENT GRID (more editorial layout) */}
                    <div className="grid lg:grid-cols-3 gap-10">

                        {[
                            {
                                title: "Small Offices",
                                desc: "Supports basic layouts with minimal zones and detection points. Ideal for startups or single-tenant offices that can scale later."
                            },
                            {
                                title: "High-Rise Buildings",
                                desc: "Manages multi-floor zoning, vertical integration, and structured safety coordination across elevators, stairwells, and fire zones."
                            },
                            {
                                title: "Industrial Facilities",
                                desc: "Designed for harsh environments with wide-area coverage, explosion-proof components, and advanced safety zoning."
                            }
                        ].map((item, i) => (
                            <div key={i} className="space-y-4">

                                {/* subtle line instead of badge */}
                                <div className="w-10 h-[2px] bg-red-600/80" />

                                <h3 className="text-xl font-semibold text-[#1A3263]">
                                    {item.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>

                                {/* bottom spacing rhythm */}
                                <div className="pt-6 border-b border-gray-100" />
                            </div>
                        ))}

                    </div>

                </Container>
            </section>
            {/* ─── SMART MONITORING ─── */}
            <section className="py-24 bg-[#EEEEEE] text-white overflow-hidden">
                <Container>
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl font-bold text-[#2C3947]">
                            Smart Monitoring
                        </h2>

                        <p className="text-black/70 max-w-2xl mx-auto">
                            Real-time visibility and control of fire safety systems across all sites.
                            Monitor performance, detect events instantly, and respond from anywhere.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-10 pt-6">
                            {[
                                { value: "99.9%", label: "System Uptime" },
                                { value: "<1s", label: "Alert Response" },
                                { value: "24/7", label: "Live Monitoring" },
                                { value: "256-bit", label: "Encrypted Data" },
                            ].map((s, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-3xl font-bold text-red-500">{s.value}</p>
                                    <p className="text-black/50 text-xs mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Wifi,
                                title: "Remote Access",
                                desc: "Securely view system status and device health from any location in real time.",
                                bullets: ["Live system status", "Device diagnostics", "Fault detection"],
                            },
                            {
                                icon: Smartphone,
                                title: "Instant Alerts",
                                desc: "Receive critical event notifications instantly via mobile, SMS, or email.",
                                bullets: ["Fire & gas events", "System faults", "Custom alert rules"],
                            },
                            {
                                icon: LayoutDashboard,
                                title: "System Dashboard",
                                desc: "Centralized interface for live monitoring, logs, and system analytics.",
                                bullets: ["Sensor visualization", "Event history", "Performance reports"],
                            },
                            {
                                icon: Users,
                                title: "Access Management",
                                desc: "Control user permissions for technicians, managers, and emergency teams.",
                                bullets: ["Role-based access", "Team control", "Audit tracking"],
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="p-6 bg-white text-[#0A0F1A] border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition"
                            >
                                {/* Icon */}
                                <card.icon size={20} className="text-[#0A0F1A] mb-4" />

                                {/* Title + Description */}
                                <div>
                                    <h4 className="font-semibold text-base mb-2">
                                        {card.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {card.desc}
                                    </p>
                                </div>

                                {/* Bullets */}
                                <ul className="mt-4 space-y-2">
                                    {card.bullets.map((b) => (
                                        <li
                                            key={b}
                                            className="flex items-center gap-2 text-gray-600 text-xs"
                                        >
                                            <CheckCircle2 size={14} className="text-gray-400 shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Role badges */}
                    <div className="mt-14 flex flex-wrap justify-center gap-4">
                        {[
                            { abbr: "AD", role: "Administrator", desc: "Full system control" },
                            { abbr: "FM", role: "Facility Manager", desc: "Monitoring and reporting access" },
                            { abbr: "TC", role: "Technician", desc: "Maintenance and diagnostics access" },
                        ].map((r, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 px-6 py-4 bg-white text-[#0A0F1A] border border-gray-100 rounded-lg"
                            >
                                <div className="w-9 h-9 bg-gray-100 text-[#0A0F1A] font-semibold rounded-md flex items-center justify-center text-sm">
                                    {r.abbr}
                                </div>

                                <div>
                                    <p className="font-semibold text-sm">{r.role}</p>
                                    <p className="text-gray-500 text-xs">{r.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
            {/* ─── UNRIVALED RELIABILITY ─── */}
            <section className="py-24 bg-[#F8F9FA]">
                <Container>
                    {/* Header */}
                    <div className="text-center mb-14 space-y-3">
                        <h2 className="text-3xl md:text-4xl font-semibold text-[#1A3263] tracking-tight">
                            High Reliability
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            Engineered to operate accurately, consistently, and safely under all conditions — especially
                            during critical emergencies — without failure or delay.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "24/7 Dedicated Support",
                                icon: Globe,
                                desc: "Emergency hotline, rapid response teams, and remote system monitoring to detect issues instantly. Planned maintenance prevents failures before they occur.",
                            },
                            {
                                title: "Regulatory Compliance",
                                icon: Shield,
                                desc: "Meeting and exceeding NFPA, EN54, and local building codes. Certified components from trusted brands with proven performance in harsh environments.",
                            },
                            {
                                title: "Intensive Testing",
                                icon: CheckCircle2,
                                desc: "Rigorous system validation before every deployment. Redundancy and fail-safe features ensure consistent detection and response with real-time monitoring.",
                            },
                        ].map((card, i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-100 p-6 md:p-7 rounded-lg hover:shadow-sm transition-shadow duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <card.icon size={20} className="text-[#1A3263] stroke-[1.5]" />
                                    <h4 className="text-base font-semibold text-[#1A3263]">
                                        {card.title}
                                    </h4>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Bullet List */}
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            "Compliant with Global Standards",
                            "Certified Components from Trusted Brands",
                            "Proven Performance in Harsh Environments",
                            "Consistent Detection & Response (Real Time)",
                            "Redundancy & Fail-Safe Features",
                            "Advanced Security Protection",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-md"
                            >

                                <span className="text-[#1A3263] text-sm font-medium">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ─── WHY CHOOSE US ─── */}
            <section className="relative py-24">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1608141468855-e5a1fc4e47b4?q=80&w=687&auto=format&fit=crop')",
                    }}
                />

                {/* Neutral overlay (no blue) */}
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70" />

                {/* Content */}
                <div className="relative z-10">
                    <Container>
                        {/* Header */}
                        <div className="text-center mb-14 space-y-3">
                            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                                Why Choose Us
                            </h2>
                            <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                                Comprehensive fire safety expertise backed by global technology and local service excellence.
                            </p>
                        </div>

                        {/* Cards */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Cpu,
                                    title: "Customized Services",
                                    items: [
                                        "Commercial buildings (integrated with BMS, PA systems, and access control)",
                                        "Industrial facilities (high-sensitivity smoke detection, gas monitoring)",
                                        "Hospitality and residential (aesthetically discreet detectors, guest-room integration)",
                                    ],
                                },
                                {
                                    icon: Globe,
                                    title: "24/7 Support",
                                    items: [
                                        "Emergency hotline and rapid response teams",
                                        "Remote system monitoring to detect issues instantly",
                                        "Planned maintenance to prevent failures before they occur",
                                    ],
                                },
                                {
                                    icon: Zap,
                                    title: "Innovative Solutions",
                                    items: [
                                        "VESDA (Very Early Smoke Detection Apparatus) for high-risk environments",
                                        "Addressable fire alarm systems for pinpoint accuracy",
                                        "Integration with HVAC and security systems for automated emergency response",
                                    ],
                                },
                            ].map((card, i) => (
                                <div
                                    key={i}
                                    className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 md:p-7 rounded-lg hover:bg-white/15 transition"
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <card.icon size={18} className="text-white" />
                                        <h3 className="text-lg font-semibold text-white">
                                            {card.title}
                                        </h3>
                                    </div>

                                    <div className="h-px bg-white/10 mb-5" />

                                    <ul className="space-y-3">
                                        {card.items.map((item, j) => (
                                            <li
                                                key={j}
                                                className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed"
                                            >
                                                <ChevronRight
                                                    size={14}
                                                    className="text-white/70 mt-0.5 shrink-0"
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            </section>
            {/* ─── PARTNERS ─── */}
            <section className="py-24 bg-[#F8F9FA]">
                <Container>
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold text-[#1A3263]">Trusted Partners</h2>
                        <p className="text-gray-500 text-sm max-w-xl mx-auto">
                            World-leading fire safety and intelligent detection systems for mission-critical environments.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                img: "https://static.wixstatic.com/media/3d5958_502d357df9fc414f9290ae1fa5a23328~mv2.png",
                                name: "NOTIFIER",
                                desc: "A global leader in intelligent fire alarm systems. Known for scalable, networked solutions ideal for large facilities like airports, hospitals, hotels, and campuses. Supports seamless integration with BMS and other life safety systems."
                            },
                            {
                                img: "https://static.wixstatic.com/media/3d5958_0a73cac931614d8c85a30f0a3d91d302~mv2.png",
                                name: "ESSER",
                                desc: "Engineered in Germany with a focus on precision. Custom logic and flexible architecture for complex requirements. Ideal for mission-critical environments: museums, high-tech manufacturing, data centers. EN54-certified."
                            },
                            {
                                img: "https://static.wixstatic.com/media/3d5958_8adc9e9f1c6e4e0a85933791f188f26e~mv2.png",
                                name: "System Sensor",
                                desc: "Recognized for high-sensitivity smoke, heat, gas, and multi-criteria detectors. Intelligent detection with reduced false alarms through advanced algorithms. Widely used in commercial buildings, retail centers, and residential towers."
                            }
                        ].map((partner, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6"
                            >
                                <img src={partner.img} alt={partner.name} className="h-10 w-auto object-contain" />
                                <div>
                                    <h4 className="font-bold text-[#1A3263] mb-3">{partner.name}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{partner.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Logo strip */}

                </Container>
            </section>

        </div>
    );
}