import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { ArrowLeft, Award, ShieldCheck, Wrench, X, ZoomIn, Download } from "lucide-react";

import cert1 from "../../assets/Certificates & Licenses/Certificates & Licenses/new/1.png";
import cert2 from "../../assets/Certificates & Licenses/Certificates & Licenses/new/2.png";
import eng1 from "../../assets/Certificates & Licenses/Certificates & Licenses/new/Khov Bunly.png";
import eng2 from "../../assets/Certificates & Licenses/Certificates & Licenses/new/Soeun Sol.png";
import new1 from "../../assets/Certificates & Licenses/Certificates & Licenses/new/new1.jpg";
import new2 from "../../assets/Certificates & Licenses/Certificates & Licenses/new/new2.jpg";

const categories = [
    {
        id: "authorise",
        icon: ShieldCheck,
        label: "Authorise Certificate",
        description:
            "Official partnership and distribution authorization from our global technology partners.",
        accent: "#1A3263",
        lightAccent: "#EEF2FF",
        certificates: [
            { src: cert1, title: "Official Authorised Distributor", issued: "2024", provider: "Global Security Systems" },
            { src: cert2, title: "Strategic Integration Partner", issued: "2023", provider: "Honeywell" },
        ],
    },
    {
        id: "engineering",
        icon: Wrench,
        label: "Engineer Certificate",
        description:
            "Professional certifications and technical excellence awards earned by our core engineering team.",
        accent: "#0A6B3E",
        lightAccent: "#F0FDF4",
        certificates: [
            { src: eng1, title: "Certified Professional Engineer", issued: "2024", provider: "Khov Bunly" },
            { src: eng2, title: "Advanced System Architect", issued: "2024", provider: "Soeun Sol" },
        ],
    },
    {
        id: "product",
        icon: Award,
        label: "Product Certificate",
        description:
            "Compliance and quality assurance certifications for our specialized smart building products.",
        accent: "#9B0F06",
        lightAccent: "#FEF2F2",
        certificates: [
            { src: new1, title: "Smart Building Compliance", issued: "2023", provider: "ISO Certified" },
            { src: new2, title: "Quality Management System", issued: "2022", provider: "Standard Board" },
        ],
    },
];

export function CredentialsPage() {
    const router = useRouter();
    const [selectedCert, setSelectedCert] = useState<any>(null);

    return (
        <div className="min-h-screen bg-white">
            {/* HERO */}
            <section className="relative bg-[#0A0F1A] pt-44 pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.1]"
                    style={{
                        backgroundImage: "radial-gradient(#ffffff 0.5px, transparent 0.5px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <button
                    onClick={() => router.history.back()}
                    className="absolute top-28 left-6 md:left-12 z-20 flex items-center gap-2 text-white/50 hover:text-white transition-all pt-17"
                >
                    <ArrowLeft size={14} />
                </button>

                <Container className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Excellence <span className="text-[#C3110C]">Certified.</span>
                    </h1>
                    <p className="text-white/40 mt-4 max-w-xl">
                        Our commitment to quality is backed by international certifications and global standards.
                    </p>
                </Container>
            </section>

            {/* CERTIFICATES */}
            <section className="py-24 bg-gray-50/50">
                <Container className="space-y-32">
                    {categories.map((cat) => (
                        <div key={cat.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="grid lg:grid-cols-12 gap-12 items-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="lg:col-span-4 self-center"
                                >
                                    <h2 className="text-3xl font-bold text-gray-900">{cat.label}</h2>
                                    <p className="text-gray-500 mt-4 text-sm leading-relaxed">{cat.description}</p>
                                    <div className="mt-8 flex items-center gap-2">
                                        <div className="h-[1px] w-8 bg-[#C3110C]/30" />
                                        <span className="text-[10px] font-bold text-[#C3110C]/60 uppercase tracking-widest">Verified Credentials</span>
                                    </div>
                                </motion.div>

                                <div className="lg:col-span-8 grid sm:grid-cols-2 gap-10">
                                    {cat.certificates.map((cert, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            onClick={() => setSelectedCert(cert)}
                                            className="cursor-pointer group relative"
                                        >
                                            {/* INK REVEAL CONTAINER */}
                                            <div className="aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-700 border border-gray-100 flex items-center justify-center p-6 relative">
                                                <motion.div
                                                    initial={{
                                                        clipPath: "circle(0% at 50% 50%)",
                                                        filter: "blur(20px)",
                                                        scale: 0.8
                                                    }}
                                                    whileInView={{
                                                        clipPath: "circle(100% at 50% 50%)",
                                                        filter: "blur(0px)",
                                                        scale: 1
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 1.5,
                                                        delay: i * 0.2,
                                                        ease: [0.16, 1, 0.3, 1] // Custom organic easing
                                                    }}
                                                    className="w-full h-full flex items-center justify-center"
                                                >
                                                    <img
                                                        src={cert.src}
                                                        alt={cert.title}
                                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000"
                                                    />
                                                </motion.div>

                                                {/* INK SPLASH OVERLAY (DECORATIVE) */}
                                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full scale-150 rotate-12"
                                                        style={{
                                                            backgroundImage: `radial-gradient(circle at center, #C3110C 0%, transparent 70%)`,
                                                            filter: 'url(#ink-bleed)'
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-5">
                                                <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-[#162E93] transition-colors duration-300">{cert.title}</h4>
                                                <p className="text-xs text-gray-400 mt-1 font-medium">Issued by {cert.provider}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </Container>
            </section>

            {/* SVG FILTERS FOR INK EFFECT */}
            <svg className="hidden">
                <defs>
                    <filter id="ink-bleed">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
                    </filter>
                </defs>
            </svg>
            {/* LIGHTBOX */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
                    >
                        <div
                            className="absolute inset-0 bg-[#0A0F1A]/95 backdrop-blur-md"
                            onClick={() => setSelectedCert(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative z-10 w-full max-w-5xl bg-white rounded-3xl flex flex-col md:flex-row overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.3)] h-auto max-h-[80vh]"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center z-20 transition-colors"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>

                            {/* IMAGE SIDE */}
                            <div className="md:w-2/3 bg-white flex items-center justify-center p-8 md:p-12 relative overflow-hidden min-h-[300px]">
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                                    style={{ backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />

                                <div className="w-full h-full flex items-center justify-center relative">
                                    <img
                                        src={selectedCert.src}
                                        alt={selectedCert.title}
                                        className="max-h-[60vh] max-w-full object-contain shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-sm"
                                        style={{ transform: 'scale(0.9)' }}
                                    />
                                </div>
                            </div>

                            {/* INFO SIDE */}
                            <div className="md:w-1/3 p-10 flex flex-col justify-between bg-white border-l border-gray-100">
                                <div className="space-y-6">
                                    <div>
                                        <div className="w-2 h-2 rounded-full bg-[#C3110C] mb-3" />
                                        <h3 className="text-2xl font-bold text-gray-900 leading-tight">{selectedCert.title}</h3>
                                        <p className="text-gray-500 mt-4 text-xs leading-relaxed">
                                            Official verification of partnership and expertise from <span className="font-bold text-gray-900">{selectedCert.provider}</span>.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 mb-1">Issue</p>
                                            <p className="text-xs font-bold text-gray-900">{selectedCert.issued}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 mb-1">Status</p>
                                            <p className="text-xs font-bold text-green-600">Active</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-8 w-full bg-[#162E93] text-white py-4 rounded-xl font-bold text-xs flex items-center justify-center gap-3 hover:bg-[#C3110C] transition-all active:scale-95 shadow-lg shadow-blue-900/10">
                                    <Download size={16} />
                                    Download PDF
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}