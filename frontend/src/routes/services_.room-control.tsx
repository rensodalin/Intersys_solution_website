import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import roomcontrol1 from "@/assets/roomcontrol/image copy 9.png"
import { Container } from "@/components/Common/Container";
import {
    ArrowLeft,
    LayoutGrid,
    Zap,
    Thermometer,
    UserCheck,
    Settings,
    Activity,
    BarChart3,
    CheckCircle2,
    XCircle,
    Check,
    Smartphone,
    Lightbulb,
    Hotel,
    ShieldCheck,
    Clock,
    Cpu
} from "lucide-react";

export const Route = createFileRoute("/services_/room-control")({
    component: RoomControlPage,
});

function RoomControlPage() {
    const router = useRouter();

    return (
        <div className="bg-[#FDFDFD] overflow-hidden scroll-smooth selection:bg-red-500 selection:text-white">

            {/* ─── HERO SECTION ─── */}
            <section className="relative h-[80vh] min-h-[550px] flex items-center pt-24 overflow-hidden bg-[#0A0F1A]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://honeywell.scene7.com/is/image/honeywell/ba-hospitality-in-ems-tstat-hero-2880x1440-overlay:5-2-hero"
                        alt="Room Control Unit Hero"
                        className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1A] via-[#0A0F1A]/30 to-transparent" />
                </div>

                {/* ─── BACK BUTTON (FIXED) ─── */}
                <button
                    onClick={() => router.history.back()}
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group pt-37 px-15"
                >
                    <div className="w-9 h-9  flex items-center justify-center group-hover:border-white/40 transition">
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-0.5 transition-transform duration-200"
                        />
                    </div>

                    <span className="text-sm font-medium">Back</span>
                </button>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white font-display leading-[1.1] mb-6">
                            Intelligent <br />
                            <span className="text-red-600">Room Control Units</span>
                        </h1>
                        <p className="text-base text-white/70 max-w-2xl leading-relaxed">
                            Intelligent in-room control for lighting, HVAC, and access in hospitality and commercial environments.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* ─── WHY CHOOSE RCU ─── */}
            <section className="py-24 bg-white">
                <Container>

                    {/* HEADER */}
                    <div className="text-center mb-18">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263] tracking-tight">
                            Why Choose Room Control Unit Systems
                        </h2>

                        <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
                            Intelligent room automation designed to enhance comfort, efficiency,
                            and centralized control for modern smart environments.
                        </p>

                        <div className="w-14 h-[3px] bg-red-600 mx-auto mt-5 rounded-full" />
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {[
                            {
                                icon: UserCheck,
                                title: "Integration",
                                desc: "Connects seamlessly with HVAC, lighting, access control, and BMS for a unified smart room experience."
                            },
                            {
                                icon: Thermometer,
                                title: "Modern Aesthetics",
                                desc: "Minimal and elegant wall panels designed to blend naturally into contemporary interiors."
                            },
                            {
                                icon: Smartphone,
                                title: "Lighting Control",
                                desc: "Fine-tune brightness, scenes, and ambience with responsive smart lighting management."
                            },
                            {
                                icon: Settings,
                                title: "Smart Automation",
                                desc: "Activate multiple room functions instantly using predefined scenes and automation logic."
                            },
                            {
                                icon: Zap,
                                title: "Energy Efficiency",
                                desc: "Reduce unnecessary power consumption with occupancy-based automation and scheduling."
                            },
                            {
                                icon: BarChart3,
                                title: "Usage Analytics",
                                desc: "Monitor system usage and room performance through insightful real-time reporting."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -4 }}
                                className="group relative p-7 border border-gray-200 rounded-lg bg-white 
                               hover:border-red-100 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] 
                               transition-all duration-300"
                            >

                                {/* ICON */}
                                <div className="w-12 h-12 rounded-md bg-[#232F72] border border-red-100 
                                    flex items-center justify-center text-white mb-5
                                    group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                    <item.icon size={22} />
                                </div>

                                {/* TITLE */}
                                <h3 className="text-lg font-semibold text-[#1A3263] mb-3 tracking-tight">
                                    {item.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {item.desc}
                                </p>

                                {/* SUBTLE CORNER ACCENT */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-red-50/40 rounded-bl-[40px] opacity-0 
                                    group-hover:opacity-100 transition duration-300" />
                            </motion.div>
                        ))}

                    </div>
                </Container>
            </section>

            {/* ─── GUEST EXPERIENCE ─── */}
            <section className="py-20 bg-gray-50">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 space-y-4"
                    >
                        <h2 className="text-3xl font-bold text-[#1A3263]">
                            Guest Experience with INNCOM
                        </h2>
                        <div className="w-16 h-1 bg-red-600 mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Check-in Comfort",
                                desc: "Guest room heats/cools to a comfortable temperature immediately upon check-in.",
                                note: "( PMS – 20+ Brands )",
                                img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Welcome Scene",
                                desc: "Welcome scene activates when guests enter the room including TV welcome message, dimmed lighting, and curtains opening automatically.",
                                note: "( 10+ Years Door Lock Integration )",
                                img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Tablet Integration",
                                desc: "Control smart devices in the guestroom via tablet with integrations across 100+ recognized partners.",
                                note: "( Pioneer – Integration Ecosystem )",
                                img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Personalized Lighting",
                                desc: "Create personalized lighting scenes like Movie, Night, or Romantic with advanced white tone control.",
                                note: "( INNCONTROL 3 – Powerful Software )",
                                img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -6 }}
                                className="group space-y-4 transition-all duration-300"
                            >
                                <div className="aspect-[4/3] rounded-md overflow-hidden shadow-md">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-bold text-[#1A3263] text-lg">
                                        {item.title}
                                    </h4>

                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>

                                    <p className="text-red-600 text-xs font-semibold tracking-wide uppercase">
                                        {item.note}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ─── ROOM STATUS MODES ─── */}
            <section className="py-20 bg-[#0A0F1A] text-white">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 space-y-4"
                    >
                        <h2 className="text-3xl font-bold">
                            Room Status Modes & Energy Management
                        </h2>
                        <div className="w-16 h-1 bg-red-600 mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                title: "Rented Occupied",
                                desc: "Room is rented and occupied. System maintains full guest comfort settings.",
                                note: "Full Comfort Mode",
                                img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Rented Unoccupied",
                                desc: "Room is rented but unoccupied. Temperature maintained within 2°C (4°F) of guest target.",
                                note: "15% – 20% Energy Savings",
                                img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Staff Occupied",
                                desc: "Room is not rented but occupied by housekeeping or maintenance staff.",
                                note: "Networked EMS ONLY",
                                img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Unrented Unoccupied",
                                desc: "Room is not rented and unoccupied. Deep setback activated upon check-out (18°C / 26°C).",
                                note: "10% – 15% Energy Savings",
                                img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -6 }}
                                className="relative aspect-[3/4] rounded-md overflow-hidden group shadow-xl transition-all duration-300"
                            >
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/60 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-6 space-y-3">
                                    <h4 className="font-bold text-lg leading-tight">
                                        {item.title}
                                    </h4>

                                    <p className="text-white/75 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>

                                    <p className="text-red-500 text-xs font-semibold uppercase tracking-wider">
                                        {item.note}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ─── ENERGY SAVINGS ─── */}
            <section className="py-20 bg-white">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 space-y-4"
                    >
                        <h2 className="text-3xl font-bold text-[#1A3263]">Energy Savings & ROI</h2>
                        <div className="w-16 h-1 bg-red-600 mx-auto" />
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        {[
                            { val: "25% - 35%", label: "Total Energy Savings" },
                            { val: "8% - 10%", label: "Property Wide Savings" },
                            { val: "2-3 Year", label: "Expected Payback period" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                                className="space-y-2"
                            >
                                <div className="text-4xl md:text-5xl font-black text-red-600 tracking-tighter">{item.val}</div>
                                <div className="text-xs font-bold text-[#1A3263] uppercase tracking-widest">{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ─── COMPARISON TABLE ─── */}
            <section className="py-20 bg-gray-50">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl mx-auto bg-white rounded-md shadow-xl overflow-hidden"
                    >
                        <div className="bg-[#1A3263] p-6 text-white text-center">
                            <h3 className="text-2xl font-bold">
                                INNCOM vs Industry
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="p-6 text-sm font-semibold text-[#1A3263]">
                                            Feature
                                        </th>

                                        <th className="p-6 text-sm font-semibold text-red-600 text-center">
                                            INNCOM
                                        </th>

                                        <th className="p-6 text-sm font-semibold text-gray-500 text-center">
                                            Industry
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {[
                                        {
                                            f: "Wireless lock integration at room level – 10+ years proven solution",
                                            i: "Yes",
                                            s: "No"
                                        },
                                        {
                                            f: "Single backbone for CELS and GRMS",
                                            i: "Yes",
                                            s: "No"
                                        },
                                        {
                                            f: "Modular controller for easy maintenance",
                                            i: "Yes",
                                            s: "No"
                                        },
                                        {
                                            f: "Occupancy check from outside corridor panel",
                                            i: "Yes",
                                            s: "No"
                                        },
                                        {
                                            f: "PMS integration with more than 20+ protocols/vendors",
                                            i: "Yes",
                                            s: "No"
                                        },
                                        {
                                            f: "30+ years of experience in GRMS",
                                            i: "Yes",
                                            s: "No"
                                        },
                                        {
                                            f: "Room-level protocol acting as a firewall to the system",
                                            i: "Yes",
                                            s: "No"
                                        },
                                        {
                                            f: "Multiple finish availability",
                                            i: "Yes",
                                            s: "No"
                                        },
                                        {
                                            f: "Electrical products matching GRMS switch panels",
                                            i: "Yes",
                                            s: "No"
                                        },
                                        {
                                            f: "Easy upgrade with modular-based solution",
                                            i: "Yes",
                                            s: "No"
                                        }
                                    ].map((row, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition"
                                        >
                                            <td className="p-6 text-sm text-[#1A3263] leading-relaxed">
                                                {row.f}
                                            </td>

                                            <td className="p-6">
                                                <div className="flex items-center justify-center gap-2 text-green-600 font-medium text-sm">
                                                    <CheckCircle2
                                                        size={18}
                                                        className="shrink-0"
                                                    />
                                                    {row.i}
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <div className="flex items-center justify-center gap-2 text-gray-400 font-medium text-sm">
                                                    <XCircle
                                                        size={18}
                                                        className="shrink-0"
                                                    />
                                                    {row.s}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* ─── SOFTWARE OPTIONS (INFINITE SCROLL) ─── */}
            <section className="py-20 bg-white overflow-hidden">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 space-y-4"
                    >
                        <h2 className="text-3xl font-bold text-[#1A3263]">Software Options</h2>
                        <div className="w-16 h-1 bg-red-600 mx-auto" />
                    </motion.div>
                </Container>

                <div className="relative">
                    <motion.div
                        animate={{ x: [0, -1800] }}
                        transition={{
                            repeat: Infinity,
                            duration: 35,
                            ease: "linear"
                        }}
                        className="flex gap-8 whitespace-nowrap px-10"
                    >
                        {[
                            "https://static.wixstatic.com/media/3d5958_bfa6b213b3714bca8c0d7f897489b9dd~mv2.png/v1/fill/w_634,h_354,al_c,q_80,usm_0.66_1.00_0.01/3d5958_bfa6b213b3714bca8c0d7f897489b9dd~mv2.png",
                            "https://static.wixstatic.com/media/3d5958_324aa4528f304910bfe3f579e279a221~mv2.png/v1/fill/w_634,h_350,al_c,q_80,usm_0.66_1.00_0.01/3d5958_324aa4528f304910bfe3f579e279a221~mv2.png",
                            "https://static.wixstatic.com/media/3d5958_15e31618980645c9a708cdf897d352d4~mv2.png/v1/fill/w_634,h_352,al_c,q_80,usm_0.66_1.00_0.01/3d5958_15e31618980645c9a708cdf897d352d4~mv2.png",
                            "https://static.wixstatic.com/media/3d5958_f4004b0fd8b34ecab4df2763af60a879~mv2.png/v1/fill/w_634,h_338,al_c,q_80,usm_0.66_1.00_0.01/3d5958_f4004b0fd8b34ecab4df2763af60a879~mv2.png",
                            "https://static.wixstatic.com/media/3d5958_afe476ada17842be8f7991a6fdcb93a9~mv2.png/v1/fill/w_634,h_374,al_c,q_80,usm_0.66_1.00_0.01/3d5958_afe476ada17842be8f7991a6fdcb93a9~mv2.png",
                            "https://static.wixstatic.com/media/3d5958_34f7b296b18b4eb9bc21d482bf1cf1cb~mv2.png/v1/fill/w_634,h_352,al_c,q_80,usm_0.66_1.00_0.01/3d5958_34f7b296b18b4eb9bc21d482bf1cf1cb~mv2.png",
                            "https://static.wixstatic.com/media/3d5958_bfa6b213b3714bca8c0d7f897489b9dd~mv2.png/v1/fill/w_634,h_354,al_c,q_80,usm_0.66_1.00_0.01/3d5958_bfa6b213b3714bca8c0d7f897489b9dd~mv2.png",
                            "https://static.wixstatic.com/media/3d5958_324aa4528f304910bfe3f579e279a221~mv2.png/v1/fill/w_634,h_350,al_c,q_80,usm_0.66_1.00_0.01/3d5958_324aa4528f304910bfe3f579e279a221~mv2.png",
                            "https://static.wixstatic.com/media/3d5958_15e31618980645c9a708cdf897d352d4~mv2.png/v1/fill/w_634,h_352,al_c,q_80,usm_0.66_1.00_0.01/3d5958_15e31618980645c9a708cdf897d352d4~mv2.png"
                        ].map((img, i) => (
                            <div key={i} className="inline-block w-[450px] shrink-0 rounded-md overflow-hidden shadow-lg border border-gray-100">
                                <img src={img} alt={`Software Option ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </motion.div>
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
                </div>
            </section>

            {/* ─── INNCONTROL 5 (INFINITE SCROLL) ─── */}
            <section className="py-20 bg-gray-50 overflow-hidden">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 space-y-4"
                    >
                        <h2 className="text-3xl font-bold text-[#1A3263]">INNControl 5 – Powered by Niagara</h2>
                        <div className="w-16 h-1 bg-red-600 mx-auto" />
                    </motion.div>
                </Container>

                <div className="relative">
                    <motion.div
                        animate={{ x: [-1800, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 35,
                            ease: "linear"
                        }}
                        className="flex gap-8 whitespace-nowrap px-10"
                    >
                        {[
                            "https://uploads.onecompiler.io/4478e2a8t/448b49fby/3d5958_96c70c4981bc4b88a0c5d564bd47bfb1~mv2.avif",
                            "https://uploads.onecompiler.io/4478e2a8t/448b49fby/3d5958_b4161bd122e6432ca277ff8a417646dc~mv2.avif",
                            "https://uploads.onecompiler.io/4478e2a8t/448b49fby/3d5958_a72ae7d6d3ab46d2bc15130c02c9f8b1~mv2.avif",
                            "https://uploads.onecompiler.io/4478e2a8t/448b49fby/3d5958_b4161bd122e6432ca277ff8a417646dc~mv2.avif",
                            "https://uploads.onecompiler.io/4478e2a8t/448b49fby/3d5958_1f8629b45a8b487c91aff955df5b5fcf~mv2.avif",
                            "https://uploads.onecompiler.io/4478e2a8t/448b49fby/3d5958_96c70c4981bc4b88a0c5d564bd47bfb1~mv2.avif",
                            "https://uploads.onecompiler.io/4478e2a8t/448b49fby/3d5958_b4161bd122e6432ca277ff8a417646dc~mv2.avif",
                            "https://uploads.onecompiler.io/4478e2a8t/448b49fby/3d5958_a72ae7d6d3ab46d2bc15130c02c9f8b1~mv2.avif"
                        ].map((img, i) => (
                            <div key={i} className="inline-block w-[450px] shrink-0 rounded-md overflow-hidden shadow-lg bg-white border border-gray-100">
                                <img src={img} alt={`INNControl Feature ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </motion.div>
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-24 bg-white text-center">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-2xl mx-auto space-y-6"
                    >
                        <div className="w-12 h-1 bg-red-600 mx-auto" />
                        <h2 className="text-3xl font-bold text-[#1A3263]">Modernize your property today</h2>
                        <p className="text-gray-500 text-sm">Our engineering team can design a customized room control strategy that enhances guest satisfaction while cutting operational costs.</p>
                        <button
                            onClick={() => router.navigate({ to: "/contact" })}
                            className="px-10 py-3 bg-[#0A0F1A] text-white rounded-md font-bold hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-red-500/20 text-sm"
                        >
                            Consult an Expert
                        </button>
                    </motion.div>
                </Container>
            </section>
        </div>
    );
}
