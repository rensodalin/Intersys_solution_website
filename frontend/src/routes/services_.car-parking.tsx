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
            {/* ─── HERO SECTION ─── */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center pt-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1771931108186-bf121365e609?q=80&w=735&auto=format&fit=crop"
                        alt="Car Parking Systems Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
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

                <Container className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.2] mb-6">
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
                        <h2 className="text-3xl font-bold text-[#1A3263] tracking-tight">
                            Why Choose Car Parking Systems
                        </h2>
                        <div className="w-20 h-1 bg-red-600" />
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

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
                                desc: "Works seamlessly with surveillance, access control, and BMS systems."
                            },
                            {
                                icon: Wrench,
                                title: "Expert Support",
                                desc: "Professional installation, maintenance, and long-term service support."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className="p-5 border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200"
                            >
                                {/* ICON */}
                                <div className="w-10 h-10 flex items-center justify-start text-gray-800 mb-3">
                                    <item.icon size={22} strokeWidth={1.5} />
                                </div>

                                {/* TITLE */}
                                <h3 className="text-[15px] font-semibold text-[#1A3263]">
                                    {item.title}
                                </h3>

                                {/* DESC */}
                                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}

                    </div>

                </Container>
            </section>

            {/* ─── COMPREHENSIVE SOLUTIONS ─── */}
            <section className="py-24 bg-[#F8F9FA]">
                <Container>

                    {/* HEADER */}
                    <div className="mb-16 max-w-3xl space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1A3263] leading-tight">
                            Comprehensive Parking Solutions
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Designed to improve parking flow, reduce manual operations, and support
                            modern facility management with reliable automation.
                        </p>

                        <div className="w-16 h-[2px] bg-red-600" />
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                        {/* 1 */}
                        <div className="md:col-span-8 flex flex-col md:flex-row bg-white border border-gray-200 overflow-hidden rounded-lg hover:border-gray-300 transition-colors">
                            <div className="p-8 md:w-1/2 space-y-3">
                                <h4 className="text-lg font-semibold text-[#1A3263]">
                                    Automated Vehicle Access Control
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    ANPR, RFID, and card-based entry systems designed to reduce congestion
                                    and improve traffic movement.
                                </p>
                            </div>

                            <div className="md:w-1/2 h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* 2 */}
                        <div className="md:col-span-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="h-52">
                                <img
                                    src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 space-y-2">
                                <h4 className="text-base font-semibold text-[#1A3263]">
                                    Integrated Payments
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Cashless, ticket, and mobile payment systems.
                                </p>
                            </div>
                        </div>

                        {/* 3 */}
                        <div className="md:col-span-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="h-52">
                                <img
                                    src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 space-y-2">
                                <h4 className="text-base font-semibold text-[#1A3263]">
                                    Real-Time Monitoring
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Live tracking of available parking spaces.
                                </p>
                            </div>
                        </div>

                        {/* 4 */}
                        <div className="md:col-span-8 flex flex-col md:flex-row-reverse bg-white border border-gray-200 overflow-hidden rounded-lg">
                            <div className="p-8 md:w-1/2 space-y-3">
                                <h4 className="text-lg font-semibold text-[#1A3263]">
                                    Data & Analytics
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Usage insights, peak hours, and reporting tools to optimize operations
                                    and revenue.
                                </p>
                            </div>

                            <div className="md:w-1/2 h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* 5 */}
                        <div className="md:col-span-12 bg-white border border-gray-200 rounded-lg p-8">
                            <h4 className="text-lg font-semibold text-[#1A3263] mb-2">
                                System Integration
                            </h4>
                            <p className="text-gray-600 text-sm max-w-3xl">
                                Parking systems integrated with BMS, access control, and security platforms
                                for centralized management and monitoring.
                            </p>
                        </div>

                    </div>
                </Container>
            </section>
        </div>
    );
}