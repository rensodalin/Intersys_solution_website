import { useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { ArrowLeft, Award, ShieldCheck, Wrench } from "lucide-react";

// Import your certificate images
import certificate1 from "../../assets/certificate1.jpg";
import certificate2 from "../../assets/certificate2.jpg";

const categories = [
    {
        id: "authorise",
        icon: ShieldCheck,
        label: "Authorise Certificate",
        accent: "#1A3263",
        lightAccent: "#EEF2FF",
        certificates: [
            { src: certificate1, title: "Authorised Distributor Certificate", issued: "2023" },
            { src: certificate2, title: "Authorised Integration Partner", issued: "2023" },
        ],
    },
    {
        id: "product",
        icon: Award,
        label: "Product Certificate",
        accent: "#9B0F06",
        lightAccent: "#FEF2F2",
        certificates: [
            { src: certificate1, title: "Product Compliance Certificate", issued: "2023" },
            { src: certificate2, title: "Quality Assurance Certificate", issued: "2022" },
        ],
    },
    {
        id: "engineering",
        icon: Wrench,
        label: "Engineering Certificate",
        accent: "#0A6B3E",
        lightAccent: "#F0FDF4",
        certificates: [
            { src: certificate1, title: "Engineering Excellence Certificate", issued: "2023" },
            { src: certificate2, title: "System Installation Certification", issued: "2022" },
        ],
    },
];

export function CredentialsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#F8FAFC]">

            {/* ─── HERO BANNER ─── */}
            <section className="relative bg-[#0A0F1A] pt-40 pb-20 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#9B0F06]/20 via-transparent to-[#1A3263]/20" />

                {/* Back button */}
                <button
                    onClick={() => router.history.back()}
                    className="absolute top-24 left-6 md:left-10 z-20 flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
                    <span className="text-sm font-medium">Back</span>
                </button>

                <Container className="relative z-10 text-white text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="space-y-4 max-w-2xl mx-auto"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                            Intersys Solutions
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Our Credentials
                        </h1>
                        <p className="text-white/50 text-base leading-relaxed">
                            Certified across engineering, product compliance, and authorized partnerships — built on trust and international standards.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* ─── CERTIFICATE SECTIONS ─── */}
            <Container className="py-20 space-y-20">
                {categories.map((cat, catIdx) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                    >
                        {/* Category Header */}
                        <div className="flex items-center gap-4 mb-10">
                            <div
                                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: cat.lightAccent }}
                            >
                                <cat.icon size={20} style={{ color: cat.accent }} />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-[#0A0F1A]">
                                    {cat.label}
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {cat.certificates.length} certificate{cat.certificates.length > 1 ? "s" : ""}
                                </p>
                            </div>
                            <div className="flex-1 h-px bg-gray-200 ml-4" />
                        </div>

                        {/* Certificate Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cat.certificates.map((cert, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group"
                                >
                                    {/* Certificate image */}
                                    <div className="relative h-56 overflow-hidden bg-gray-50 flex items-center justify-center p-6">
                                        <img
                                            src={cert.src}
                                            alt={cert.title}
                                            className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Top accent bar */}
                                        <div
                                            className="absolute top-0 left-0 right-0 h-1"
                                            style={{ backgroundColor: cat.accent }}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="p-6 space-y-3">
                                        <h4 className="text-sm font-bold text-[#0A0F1A] leading-snug">
                                            {cert.title}
                                        </h4>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-400">
                                                Issued {cert.issued}
                                            </span>
                                            <span
                                                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: cat.lightAccent,
                                                    color: cat.accent
                                                }}
                                            >
                                                Verified
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </Container>

        </div>
    );
}
