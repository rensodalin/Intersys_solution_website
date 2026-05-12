import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import {
    Zap,
    UserCheck,
    PiggyBank,
    Maximize,
    ShieldCheck,
    Wrench,
    ArrowRight,
    Search,
    CreditCard,
    LayoutDashboard,
    ParkingCircle,
    ArrowLeft
} from "lucide-react";

export const Route = createFileRoute("/services_/car-parking")({
    component: CarParkingPage,
});

function CarParkingPage() {
    const router = useRouter();

    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* ─── HERO SECTION ─── */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center pt-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1771931108186-bf121365e609?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Car Parking Systems Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                {/* ─── BACK BUTTON ─── */}
                <button
                    onClick={() => router.history.back()}
                    className="absolute top-50 left-23 z-20 flex items-center gap-2 text-black hover:text-black/60 transition-colors duration-200 group"
                >
                    <ArrowLeft
                        size={18}
                        className="group-hover:-translate-x-1 transition-transform duration-200"
                    />
                    <span className="text-sm font-medium">Back</span>
                </button>

                <Container className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white font-display leading-[1.2] mb-6">
                            Intelligent <br />
                            <span className="text-red-600">Car Parking Systems</span>
                        </h1>
                        <p className="text-base text-white/70 max-w-2xl leading-relaxed">
                            Streamlined vehicle access control, automated payment solutions, and real-time occupancy monitoring for seamless parking management.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* ─── WHY CHOOSE SECTION ─── */}
            <section className="py-28 bg-white">
                <Container>

                    {/* HEADER (LEFT ALIGNED) */}
                    <div className="mb-20 space-y-4 max-w-2xl">
                        <h2 className="text-4xl font-bold text-[#1A3263] tracking-tight">
                            Why Choose Car Parking Systems
                        </h2>
                        <div className="w-20 h-1 bg-red-600" />
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

                        {[
                            {
                                icon: Zap,
                                title: "Enhanced Efficiency",
                                desc: "Reduce delays with automated access and payment processes."
                            },
                            {
                                icon: UserCheck,
                                title: "Improved User Experience",
                                desc: "Provide visitors and staff with a smooth, hassle-free parking journey."
                            },
                            {
                                icon: PiggyBank,
                                title: "Cost Savings",
                                desc: "Lower operational costs through automation and optimized space usage."
                            },
                            {
                                icon: Maximize,
                                title: "Scalable Solutions",
                                desc: "Adaptable to small facilities or large multi-level parking complexes."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Integrated Security",
                                desc: "Works seamlessly with surveillance, access control, and BMS for complete safety."
                            },
                            {
                                icon: Wrench,
                                title: "Expert Support",
                                desc: "Backed by expert installation, maintenance, and after-sales service."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="group p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
                            >
                                <div className="w-12 h-12 flex items-center justify-center text-red-600 group-hover:scale-110 transition duration-300">
                                    <item.icon size={28} strokeWidth={1.5} />
                                </div>

                                <h3 className="text-lg font-semibold text-[#1A3263] mt-4">
                                    {item.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}

                    </div>

                </Container>
            </section>

            {/* ─── COMPREHENSIVE SOLUTIONS ─── */}
            <section className="py-28 bg-[#F8F9FA]">
                <Container>

                    {/* HEADER */}
                    <div className="mb-20 max-w-3xl space-y-4">
                        <h2 className="text-4xl font-bold text-[#1A3263] leading-tight">
                            Comprehensive Parking Solutions
                        </h2>

                        <p className="text-gray-500 leading-relaxed">
                            Designed to optimize parking efficiency and user experience with state-of-the-art technology.
                        </p>

                        <div className="w-20 h-1 bg-red-600" />
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                        {/* 1 */}
                        <div className="md:col-span-8 group bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col md:flex-row hover:shadow-2xl transition-all duration-500">
                            <div className="p-10 md:w-1/2 space-y-4">
                                <h4 className="text-xl font-bold text-[#1A3263]">
                                    Automated Vehicle Access Control
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Enable quick and secure entry and exit with ANPR, RFID, or card systems. These solutions reduce wait times and improve traffic flow.
                                </p>
                            </div>

                            <div className="md:w-1/2 h-72 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />
                            </div>
                        </div>

                        {/* 2 */}
                        <div className="md:col-span-4 bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
                            <div className="h-56 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />
                            </div>
                            <div className="p-8 space-y-3">
                                <h4 className="text-lg font-bold text-[#1A3263]">
                                    Integrated Payment Solutions
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Flexible cashless, ticket-based, and mobile payment systems for smooth transactions.
                                </p>
                            </div>
                        </div>

                        {/* 3 */}
                        <div className="md:col-span-4 bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
                            <div className="h-56 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />
                            </div>
                            <div className="p-8 space-y-3">
                                <h4 className="text-lg font-bold text-[#1A3263]">
                                    Real-Time Occupancy Monitoring
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Instantly track available parking spaces and guide drivers efficiently.
                                </p>
                            </div>
                        </div>

                        {/* 4 */}
                        <div className="md:col-span-8 group bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col md:flex-row-reverse hover:shadow-2xl transition-all duration-500">
                            <div className="p-10 md:w-1/2 space-y-4">
                                <h4 className="text-xl font-bold text-[#1A3263]">
                                    Advanced Data & Analytics
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Access detailed insights on parking usage, peak hours, and trends for smarter decision-making and revenue optimization.
                                </p>
                            </div>

                            <div className="md:w-1/2 h-72 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />
                            </div>
                        </div>

                        {/* 5 FULL WIDTH */}
                        <div className="md:col-span-12 bg-white rounded-3xl border border-gray-100 p-10 hover:shadow-xl transition-all duration-500 space-y-4">
                            <h4 className="text-xl font-bold text-[#1A3263]">
                                System Integration
                            </h4>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-3xl">
                                Seamlessly connect parking systems with Building Management Systems (BMS), security platforms, and access control for centralized monitoring and management.
                            </p>
                        </div>

                    </div>

                </Container>
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