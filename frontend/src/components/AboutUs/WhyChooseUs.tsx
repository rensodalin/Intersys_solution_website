import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from "@/components/Common/Container";
import {
    Building2,
    Music,
    Flame,
    Lock,
    Video,
    Volume2,
    Car,
    Droplets,
    Wind,
    Bell,
    Cpu,
    ChevronDown,
    ChevronUp,
    Settings,
    ShieldCheck,
    Clock,
    Zap
} from 'lucide-react';
import teamWorking from '@/assets/team_working_intersys.png';

const solutions = [
    {
        icon: Building2,
        title: "Building Management",
        desc: "Centralized control of HVAC, lighting, and energy systems.",
        sub: "ComfortPoint® Open / Niagara",
        details: [
            "Unified monitoring of HVAC, lighting, and energy.",
            "Algorithms adjust consumption based on occupancy.",
            "Cloud-based mobile apps for anywhere monitoring."
        ]
    },
    {
        icon: Flame,
        title: "Fire Alarm Systems",
        desc: "Intelligent sensing and addressable loop technology.",
        sub: "NOTIFIER® / ESSER",
        details: [
            "Distinguishes real smoke from steam/dust.",
            "Pinpoints exact fire location via addressable loops.",
            "Digital voice commands guide safety evacuation."
        ]
    },
    {
        icon: Video,
        title: "Surveillance (CCTV)",
        desc: "AI-driven analytics and high-level encryption.",
        sub: "MAXPRO® VMS / AI Cameras",
        details: [
            "Smart Motion Detection and intrusion alerts.",
            "Clear images in total darkness (WDR/IR).",
            "Secure boot and high-level encryption."
        ]
    },
    {
        icon: Lock,
        title: "Access Control",
        desc: "Role-based clearance and biometric authentication.",
        sub: "Pro-Watch® / LenelS2",
        details: [
            "Granular control based on time and clearance.",
            "Support for smart cards, mobile, and biometrics.",
            "Real-time employee tracking during emergencies."
        ]
    },
    {
        icon: Music,
        title: "Audio Visual Systems",
        desc: "High-fidelity sound and zone management.",
        sub: "X-618 / Variodyn D1",
        details: [
            "High-fidelity sound for music and paging.",
            "Emergency override for evacuation announcements.",
            "Matrix switching for multi-room audio."
        ]
    },
    {
        icon: Wind,
        title: "VESDA (Smoke)",
        desc: "Aspirating smoke detection for early warning.",
        sub: "VESDA-E Series",
        details: [
            "Actively samples air for earliest possible detection.",
            "Advanced particle analysis prevents false alarms.",
            "Ideal for high-sensitivity environments (Data Centers)."
        ]
    },
    {
        icon: Volume2,
        title: "Public Address",
        desc: "Digital processing and intelligent zone selection.",
        sub: "X-618 / Variodyn",
        details: [
            "High intelligibility in noisy industrial areas.",
            "Easy touch-control zone selection.",
            "Standardized Honeywell protocol compliance."
        ]
    },
    {
        icon: Car,
        title: "Car Parking",
        desc: "ANPR and automated guidance systems.",
        sub: "Video Analytics & Sensors",
        details: [
            "License plate recognition for automated entry.",
            "LED signage directs drivers to empty spots.",
            "Integrated payment and occupancy tracking."
        ]
    },
    {
        icon: Droplets,
        title: "Leakage Detection",
        desc: "Pinpoint accuracy for liquid and gas leaks.",
        sub: "Searchline / WD3",
        details: [
            "Identifies exact distance to liquid leaks.",
            "Triggers automated valves for rapid shut-off.",
            "Essential for industrial and data center safety."
        ]
    },
    {
        icon: Bell,
        title: "Intrusion Alarm",
        desc: "Perimeter protection and dual-tech motion sensors.",
        sub: "Galaxy® Dimension",
        details: [
            "Glass-break and vibration sensors for perimeters.",
            "PIR + Microwave tech prevents false alarms.",
            "Fully integrated with Access Control systems."
        ]
    },
    {
        icon: Cpu,
        title: "Room Control",
        desc: "Hospitality focused smart presence and logic.",
        sub: "INNCOM (Hospitality)",
        details: [
            "Adjusts AC/Lights based on occupancy.",
            "Auto-signals 'Do Not Disturb' to staff.",
            "Energy usage reporting and remote management."
        ]
    }
];

export function WhyChooseUs() {
    const [showAll, setShowAll] = React.useState(false);
    const [expandedItem, setExpandedItem] = React.useState<number | null>(null);

    const visibleSolutions = showAll ? solutions : solutions.slice(0, 6);

    return (
        <section className="py-16 bg-white overflow-hidden text-sm">
            <Container>
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Left Side: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gray-50 z-0" />
                        <img
                            src={teamWorking}
                            alt="Intersys Team Working"
                            className="relative z-10 w-full h-auto rounded-lg shadow-2xl border-4 border-white"
                        />
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-red-50 -z-10 rounded-full blur-3xl opacity-50" />
                    </motion.div>

                    {/* Right Side: content */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold font-display text-[#0A0F1A] mb-4 tracking-tight">
                                Why Choose Us
                            </h2>
                            <p className="text-gray-500 mb-10 leading-relaxed max-w-xl text-[13px]">
                                With over a decade of experience as Cambodia's premier technology integrator, we provide
                                international-standard engineering solutions tailored to the specific needs of modern infrastructure.
                            </p>

                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
                                {visibleSolutions.map((item, i) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group"
                                    >
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                                                <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <h4 className="text-[13px] font-bold text-[#0A0F1A]  tracking-wide mb-1 transition-colors group-hover:text-red-600">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[11px] text-gray-400 leading-normal mb-2">
                                                    {item.desc}
                                                </p>
                                                <button
                                                    onClick={() => setExpandedItem(expandedItem === i ? null : i)}
                                                    className="text-[10px] font-bold text-red-600 hover:underline  tracking-widest"
                                                >
                                                    {expandedItem === i ? "Hide Detail" : "View Detail"}
                                                </button>

                                                <AnimatePresence>
                                                    {expandedItem === i && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <ul className="mt-3 space-y-1.5 border-l-2 border-red-100 pl-3">
                                                                {item.details.map((detail, di) => (
                                                                    <li key={di} className="text-[10px] text-gray-500 leading-tight italic">
                                                                        • {detail}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                onClick={() => setShowAll(!showAll)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-12 px-8 py-3 bg-[#0A0F1A] text-white text-[11px] font-bold tracking-[0.2em] rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            >
                                {showAll ? "Show Less" : "View More Solutions"}
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

// Keep export of old name to avoid breaking things, but inside we call WhyChooseUs
export function SolutionsExpandableGrid() {
    return <WhyChooseUs />;
}
