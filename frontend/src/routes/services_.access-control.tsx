import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import {
    Shield,
    Zap,
    Settings,
    Activity,
    Globe,
    Layout,
    Database,
    Cloud,
    Lock,
    Cpu,
    Smartphone,
    CheckCircle2,
    ArrowRight,
    Server,
    Building2,
    Network,
    RefreshCw,
    ShieldCheck,
    Link as LinkIcon,
    Users,
    Waves
} from "lucide-react";

export const Route = createFileRoute("/services_/access-control")({
    component: AccessControlPage,
});

function AccessControlPage() {
    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* ─── HERO SECTION ─── */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2070&auto=format&fit=crop"
                        alt="Access Control Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                </div>

                <Container className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white font-display leading-[1.2] mb-6">
                            Access Control <br />
                            <span className="text-red-500">Systems</span>
                        </h1>
                        <p className="text-base text-white/70 max-w-2xl leading-relaxed">
                            Protect your business with advanced security solutions that safeguard both digital assets and physical spaces
                        </p>
                        <div className="pt-4">

                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* ─── COMPREHENSIVE PROTECTION ─── */}
            <section className="py-28 bg-white relative overflow-hidden">

                {/* subtle background accent */}
                <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full" />

                <Container>

                    {/* TOP CONTENT */}
                    <div className="grid lg:grid-cols-2 gap-24 items-start">

                        {/* LEFT */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263] leading-tight tracking-tight">
                                Comprehensive Protection <br />
                                <span className="text-red-600 font-extrabold">
                                    for Your Business
                                </span>
                            </h2>

                            <div className="w-20 h-[3px] bg-red-600 rounded-full" />

                            <p className="text-gray-500 leading-relaxed text-md max-w-md">
                                Strong security foundation combining digital resilience and physical access control systems.
                            </p>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-6">
                            <p className="text-gray-600 leading-relaxed text-md">
                                Intersys Solutions Co., Ltd provides robust IT disaster recovery and access control solutions to help businesses protect critical data, systems, and physical spaces from unexpected threats.
                            </p>

                            <p className="text-gray-600 leading-relaxed text-md">
                                Through advanced Access Control Systems powered by Honeywell, we enable secure and flexible control over who enters, exits, or accesses sensitive areas.
                            </p>

                            <div className="border-l-2 border-red-500 pl-4">
                                <p className="text-gray-500 italic">
                                    From data backup to physical access monitoring, we ensure business continuity with minimal downtime.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* CARDS */}
                    <div className="grid md:grid-cols-4 gap-6 mt-24">
                        {[
                            {
                                title: "Physical Access Control",
                                desc: "Secure entry points with biometric, card, and PIN-based authentication",
                            },
                            {
                                title: "IT Disaster Recovery",
                                desc: "Automated backup and rapid system restoration capabilities",
                            },
                            {
                                title: "Compliance Support",
                                desc: "Meet regulatory requirements with detailed audit trails",
                            },
                            {
                                title: "Smart Integration",
                                desc: "Seamless connectivity with existing building management systems",
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="group relative p-7 bg-white border border-gray-100 rounded-md
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                {/* hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-red-500/5 to-transparent" />

                                {/* number */}
                                <div className="text-sm font-semibold text-red-600 mb-5 tracking-wide">
                                    {`0${i + 1}`}
                                </div>

                                <h4 className="font-semibold text-[#1A3263] text-lg mb-3 leading-snug group-hover:text-red-600 transition-colors">
                                    {card.title}
                                </h4>

                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {card.desc}
                                </p>

                                {/* bottom line */}
                                <div className="mt-6 h-[2px] w-10 bg-red-600 group-hover:w-full transition-all duration-300" />
                            </motion.div>
                        ))}
                    </div>

                </Container>
            </section>
            {/* ─── POWERED BY HONEYWELL ─── */}
            <section className="py-24 bg-[#0A0F1A] text-white relative overflow-hidden">

                {/* background glow */}
                <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-red-600/10 blur-[140px] -translate-y-1/2" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.08),transparent_60%)]" />

                <Container className="relative z-10">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-16">

                        {/* LEFT CONTENT */}
                        <div className="space-y-5 max-w-2xl">

                            <div className="inline-flex items-center gap-3">
                                <div className="w-10 h-[2px] bg-red-600" />

                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Powered by Honeywell
                            </h2>

                            <p className="text-white/50 text-sm md:text-base leading-relaxed">
                                As an authorized Honeywell Engineering System Distributor, we deliver end-to-end access solutions tailored to meet the highest organizational requirements. INTERSYS SOLUTIONS CO., LTD ensures your infrastructure is future-proof.
                            </p>

                        </div>

                        {/* RIGHT LOGO */}
                        <div className="relative">

                            {/* glow behind logo */}
                            <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-150 opacity-60" />

                            <div className="relative  px-12 py-10 rounded-lg 
                    hover:bg-white/10 transition-all duration-300">

                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Honeywell_logo.svg/1280px-Honeywell_logo.svg.png"
                                    alt="Honeywell"
                                    className="h-8 w-auto brightness-0 invert"
                                />

                            </div>

                        </div>

                    </div>

                </Container>
            </section>
            {/* ─── SOLUTIONS HUB ─── */}
            <section className="py-28 bg-[#F8F9FA]">
                <Container>

                    {/* HEADER */}
                    <div className="text-center mb-16 space-y-3">
                        <h2 className="text-4xl font-bold text-[#1A3263]">
                            Security Solutions Hub
                        </h2>

                        <p className="text-gray-500 max-w-xl mx-auto text-sm">
                            Advanced protection tailored for every scale of business
                        </p>

                        <div className="w-12 h-[2px] bg-red-600 mx-auto mt-3" />
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-4 gap-6">

                        {[
                            {
                                title: "Small to Medium",
                                desc: "Focused security measures optimized for growing businesses and essential data protection.",
                                tech: "Access & Security Integration",
                                techDesc: "End-to-end protection using Honeywell technologies to safeguard people and assets."
                            },
                            {
                                title: "Multiple Sites",
                                desc: "Unified security management for distributed locations and remote branches.",
                                tech: "Network Solutions",
                                techDesc: "Secure LAN/WAN integration with centralized monitoring across all connected sites."
                            },
                            {
                                title: "High Density",
                                desc: "Robust security for high-traffic environments and commercial hubs.",
                                tech: "Cybersecurity",
                                techDesc: "Enterprise-grade protection against cyber threats with advanced monitoring systems."
                            },
                            {
                                title: "Large Enterprise",
                                desc: "Advanced infrastructure protection for complex global operations.",
                                tech: "Cloud Services",
                                techDesc: "Cloud-enabled access, real-time alerts, and remote system management."
                            }
                        ].map((hub, i) => (
                            <div
                                key={i}
                                className="group bg-white p-7 rounded-lg border border-gray-100 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >

                                {/* NUMBER (replaces emoji) */}
                                <div className="text-xs font-semibold text-red-600 mb-4">
                                    {`0${i + 1}`}
                                </div>

                                {/* TITLE */}
                                <h4 className="text-lg font-bold text-[#1A3263] mb-3 leading-snug">
                                    {hub.title}
                                </h4>

                                {/* DESCRIPTION */}
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    {hub.desc}
                                </p>

                                {/* BOTTOM SECTION */}
                                <div className="mt-auto pt-5 border-t border-gray-100 space-y-3">

                                    <p className="text-[11px] font-semibold text-red-600 tracking-wide">
                                        {hub.tech}
                                    </p>

                                    <p className="text-gray-500 text-xs leading-relaxed">
                                        {hub.techDesc}
                                    </p>


                                </div>

                            </div>
                        ))}

                    </div>

                </Container>
            </section>

            {/* ─── REAL ESTATE TIERS ─── */}
            <section className="py-28 bg-white">
                <Container>

                    {/* HEADER */}
                    <div className="max-w-2xl mb-16 space-y-4">
                        <h2 className="text-4xl font-bold text-[#1A3263]">
                            Commercial Real Estate Tiers
                        </h2>
                        <p className="text-gray-500">
                            Optimized infrastructure solutions tailored for different building requirements and density levels.
                        </p>
                    </div>

                    {/* TIERS */}
                    <div className="space-y-20">

                        {[
                            {
                                category: "Small to Medium",
                                items: [
                                    { title: "Small commercial buildings", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Retail shops", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Clinics", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" }
                                ]
                            },
                            {
                                category: "Single to Multiple Small Sites",
                                items: [
                                    { title: "School campuses", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Healthcare facilities", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Multi-site offices", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" }
                                ]
                            },
                            {
                                category: "High Density",
                                items: [
                                    { title: "Universities", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Office towers", img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Hotels & hospitals", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop" }
                                ]
                            },
                            {
                                category: "Large Enterprise",
                                items: [
                                    { title: "Airports & data centers", img: "https://images.unsplash.com/photo-1542382257-80dedb725088?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Industrial parks", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Smart cities", img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" }
                                ]
                            }
                        ].map((tier, i) => (
                            <div key={i} className="grid lg:grid-cols-[300px_1fr] gap-10 items-start">

                                {/* LEFT TITLE */}
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold text-[#1A3263]">
                                        {tier.category}
                                    </h3>
                                    <div className="w-12 h-[2px] bg-red-600" />
                                </div>

                                {/* RIGHT CARDS */}
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

                                    {tier.items.map((item, j) => (
                                        <div
                                            key={j}
                                            className="group rounded-lg overflow-hidden bg-gray-50 hover:bg-[#1A3263] transition-all duration-300 shadow-sm hover:shadow-xl"
                                        >
                                            <div className="h-48 overflow-hidden relative">
                                                <img
                                                    src={item.img}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                                            </div>

                                            <div className="p-5">
                                                <h4 className="font-semibold text-sm text-[#1A3263] group-hover:text-white transition">
                                                    {item.title}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        ))}

                    </div>

                </Container>
            </section>
            {/* ─── MPA2 SPOTLIGHT ─── */}
            <section className="py-28 bg-[#0A0F1A] text-white relative overflow-hidden">

                {/* BACKGROUND GLOW */}
                <div className="absolute -left-20 -top-20 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />

                <Container className="relative z-10">

                    {/* HEADER */}
                    <div className="max-w-3xl mb-16 space-y-5">


                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            The New MPA2 Panel
                        </h2>

                        <p className="text-white/60 text-lg">
                            Smart edge access control built for scalable, secure, and intelligent building environments.
                        </p>
                    </div>

                    {/* FEATURES GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {[
                            {
                                title: "Smart Power & Networking",
                                desc: "IP-based hardware with PoE+ simplifies deployment and eliminates extra wiring."
                            },
                            {
                                title: "Scalable Versatility",
                                desc: "Flexible architecture supporting 2 to 62 doors across multiple configurations."
                            },
                            {
                                title: "Enterprise Security",
                                desc: "AES encryption ensures secure communication between panels and systems."
                            },
                            {
                                title: "Unified Integration",
                                desc: "Works seamlessly with MAXPRO Cloud, WINPAK, and web-based platforms."
                            }
                        ].map((feat, i) => (
                            <div
                                key={i}
                                className="group p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[180px]"
                            >

                                {/* TOP ACCENT LINE */}
                                <div className="w-8 h-[2px] bg-red-500 mb-4 group-hover:w-12 transition-all duration-300" />

                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold group-hover:text-red-500 transition">
                                        {feat.title}
                                    </h4>

                                    <p className="text-white/50 text-xs leading-relaxed">
                                        {feat.desc}
                                    </p>
                                </div>

                                {/* subtle bottom animation */}
                                <div className="mt-5 h-[2px] w-0 bg-red-500 group-hover:w-full transition-all duration-300" />

                            </div>
                        ))}

                    </div>

                    {/* CTA */}


                </Container>
            </section>

            {/* ─── SECURITY ARCHITECTURE ─── */}
            <section className="py-28 bg-white">
                <Container>

                    {/* TOP SECTION */}
                    <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">

                        {/* LEFT */}
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-[#1A3263]">
                                Security Architecture
                            </h2>

                            <p className="text-red-600 font-semibold text-sm">
                                High-Performance Panel Communication Standards
                            </p>

                            <div className="w-16 h-[2px] bg-red-600" />
                        </div>

                        {/* RIGHT (SPEC GRID IMPROVED) */}
                        <div className="grid sm:grid-cols-2 gap-6">

                            {[
                                {
                                    title: "128-bit AES Encryption",
                                    desc: "Bi-directional reader-panel communication with OSDP v2 prevents replay and interception attacks."
                                },
                                {
                                    title: "256-bit AES Encryption",
                                    desc: "Secure communication between panels and hosts including MAXPRO Cloud and WIN-PAK."
                                },
                                {
                                    title: "Security Certificate",
                                    desc: "Ensures trusted connections through advanced SSL authentication layers."
                                },
                                {
                                    title: "Hardware Integrity",
                                    desc: "Built-in tamper detection ensures physical protection of control panels."
                                }
                            ].map((spec, i) => (
                                <div
                                    key={i}
                                    className="p-5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300"
                                >
                                    <h5 className="font-semibold text-[#1A3263] text-sm mb-2">
                                        {spec.title}
                                    </h5>

                                    <p className="text-gray-500 text-xs leading-relaxed">
                                        {spec.desc}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* DIAGRAMS */}
                    <div className="space-y-16">

                        {/* BLUEPRINT */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-gray-100 p-8 md:p-12 bg-gray-50 hover:shadow-xl transition-all duration-500"
                        >
                            <div className="mb-8 text-center">

                            </div>

                            <img
                                src="https://static.wixstatic.com/media/3d5958_65858de62beb4084be4a0a817e6c75f4~mv2.png/v1/fill/w_838,h_169,al_c,lg_1,q_85,enc_avif,quality_auto/3d5958_65858de62beb4084be4a0a817e6c75f4~mv2.png"
                                alt="Security Blueprint"
                                className="w-full max-w-xl mx-auto h-auto rounded-lg transition-transform duration-700 hover:scale-[1.02]"
                            />
                        </motion.div>

                        {/* FLOW DIAGRAM */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="rounded-xl border border-gray-100 p-8 md:p-12 bg-white hover:shadow-xl transition-all duration-500"
                        >
                            <div className="mb-10 text-center">

                            </div>

                            <img
                                src="https://static.wixstatic.com/media/3d5958_69af764f08ad458bb0a00fe45a688899~mv2.png/v1/fill/w_717,h_331,al_c,lg_1,q_85,enc_avif,quality_auto/3d5958_69af764f08ad458bb0a00fe45a688899~mv2.png"
                                alt="Access Control Flow"
                                className="w-full max-w-2xl mx-auto h-auto transition-transform duration-700 hover:scale-[1.02]"
                            />
                        </motion.div>

                    </div>

                </Container>
            </section>

        </div>
    );
}
