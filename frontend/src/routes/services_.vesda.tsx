import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import {
    Wind,
    ShieldCheck,
    Gauge,
    Building2,
    Waves,
    ArrowLeft,
    Activity,
    ScanSearch,
    BellRing
} from "lucide-react";

export const Route = createFileRoute("/services_/vesda")({
    component: VesdaPage,
});

function VesdaPage() {
    const router = useRouter();

    return (
        <div className="bg-white overflow-hidden">

            {/* ───────────────── HERO ───────────────── */}
            {/* ───────────────── HERO ───────────────── */}
            <section className="relative min-h-[720px] flex items-center bg-[#0F1720]">

                {/* Background */}
                <div className="absolute inset-0">
                    <img
                        src="https://i.redd.it/gas-suppression-vesda-system-v0-9o5ooecpscvc1.jpg?width=4032&format=pjpg&auto=webp&s=a957025fc021d04dcfa42a0ca870d7897e0751fc"
                        alt="VESDA System"
                        className="w-full h-full object-cover opacity-55"
                    />

                    {/* lighter overlay so image is clearer */}
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F1720]/80 via-[#0F1720]/40 to-transparent" />
                </div>

                <button
                    onClick={() => router.history.back()}
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group pt-37 px-15"
                >
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition">
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-0.5 transition-transform duration-200"
                        />
                    </div>

                    <span className="text-sm font-medium">Back</span>
                </button>
                {/* Content */}
                <Container className="relative z-10 pt-28 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl"
                    >

                        {/* removed uppercase */}
                        <div className="mb-5">

                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                            <span className="text-red-600">
                                VESDA
                            </span>
                            <br />
                            Smoke Detection
                        </h1>

                        <p className="mt-7 text-white/80 text-[15px] leading-7 max-w-2xl">
                            VESDA (Very Early Smoke Detection Apparatus) continuously
                            samples air through a network of pipes and analyzes it
                            using laser-based detection technology. This enables smoke
                            detection long before visible signs appear, helping reduce
                            risk, downtime, and equipment damage.
                        </p>

                    </motion.div>
                </Container>
            </section>
            {/* ───────────────── INTRO ───────────────── */}
            <section className="py-24 bg-white border-b border-gray-100">
                <Container>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        <div>
                            <div className="mb-4">

                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263] leading-tight">
                                Precision Monitoring for Critical Facilities
                            </h2>
                        </div>

                        <div className="border-l border-gray-200 pl-8">
                            <p className="text-gray-600 leading-8 text-[15px]">
                                Unlike traditional smoke detectors, VESDA actively
                                draws air into a highly sensitive laser chamber,
                                allowing earlier detection in environments such as
                                data centers, clean rooms, telecom facilities,
                                hospitals, and industrial sites.
                            </p>
                        </div>

                    </div>

                </Container>
            </section>

            {/* ───────────────── FEATURES ───────────────── */}
            <section className="py-24 bg-[#F7F8FA]">
                <Container>

                    <div className="mb-14">
                        <h2 className="text-3xl font-bold text-[#1A3263]">
                            Why Choose VESDA
                        </h2>

                        <div className="w-16 h-[2px] bg-red-600 mt-5" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {[
                            {
                                icon: BellRing,
                                title: "Very Early Warning",
                                desc: "Detects smoke particles at pre-alarm stages before visible smoke develops."
                            },
                            {
                                icon: Gauge,
                                title: "High Sensitivity",
                                desc: "Configurable alarm thresholds to match operational and environmental requirements."
                            },
                            {
                                icon: Building2,
                                title: "Stable in Harsh Conditions",
                                desc: "Reliable operation in dusty, high-airflow, and high-ceiling environments."
                            },
                            {
                                icon: Activity,
                                title: "Continuous Monitoring",
                                desc: "24/7 active air sampling provides uninterrupted protection."
                            },
                            {
                                icon: ScanSearch,
                                title: "Wide Area Coverage",
                                desc: "Single systems can monitor large spaces efficiently using pipe networks."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Minimal Visual Impact",
                                desc: "Discrete sampling points preserve clean architectural aesthetics."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white border border-gray-200 p-7 hover:border-gray-300 transition-colors"
                            >

                                <div className="w-11 h-11 flex items-center justify-center border border-gray-200 text-red-600 mb-5">
                                    <item.icon size={20} strokeWidth={1.7} />
                                </div>

                                <h3 className="text-[17px] font-semibold text-[#1A3263] mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-gray-600 leading-7">
                                    {item.desc}
                                </p>

                            </motion.div>
                        ))}

                    </div>

                </Container>
            </section>

            {/* ───────────────── APPLICATIONS ───────────────── */}
            <section className="py-24 bg-white">
                <Container>

                    <div className="grid lg:grid-cols-12 gap-10">

                        {/* Left */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-28">



                                <h2 className="text-3xl font-bold text-[#1A3263] mt-4 leading-tight">
                                    Ideal for High-Risk Environments
                                </h2>

                                <p className="text-gray-600 mt-6 leading-7 text-sm">
                                    VESDA systems are designed for facilities where
                                    even minor smoke events can cause operational
                                    disruption or equipment damage.
                                </p>

                            </div>
                        </div>

                        {/* Right */}
                        <div className="lg:col-span-8 grid md:grid-cols-2 gap-5">

                            {[
                                {
                                    title: "Data Centers",
                                    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                                },
                                {
                                    title: "Telecommunication Rooms",
                                    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1200&auto=format&fit=crop"
                                },
                                {
                                    title: "Healthcare Facilities",
                                    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
                                },
                                {
                                    title: "Industrial Facilities",
                                    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
                                }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="border border-gray-200 bg-white overflow-hidden group"
                                >

                                    <div className="h-56 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h4 className="text-[#1A3263] font-semibold">
                                            {item.title}
                                        </h4>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </Container>
            </section>

            {/* ───────────────── FOOTER INFO ───────────────── */}
            <section className="py-20 bg-[#101826]">
                <Container>

                    <div className="max-w-4xl">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-[1px] bg-red-600" />

                        </div>

                        <p className="text-white/70 text-[15px] leading-8">
                            VESDA systems help organizations respond faster to potential
                            fire risks while minimizing downtime and protecting
                            mission-critical infrastructure. Integrated monitoring,
                            scalable configurations, and continuous air sampling make
                            them a preferred solution for modern facilities.
                        </p>

                    </div>

                </Container>
            </section>

        </div>
    );
}