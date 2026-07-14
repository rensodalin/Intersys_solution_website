import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import roomcontrol from "@/assets/roomcontrol/image.png"
import { Container } from "@/components/Common/Container";
import {
    Zap,
    Target,
    ShieldCheck,
    Activity,
    Bell,
    Car,
    Volume2,
    LayoutGrid,
    Droplets,
    Flame,
    Cpu,
    Settings
} from "lucide-react";

export const Route = createFileRoute("/services_/custom-solution")({
    head: () => ({
        meta: [
            { title: "Custom Engineering Solutions — Intersys Solutions" },
            {
                name: "description",
                content:
                    "Empowering modern enterprises with resilient cloud solutions, airtight security protocols, and infrastructure that grows with your vision."
            }
        ]
    }),
    component: CustomSolutionPage
});

function CustomSolutionPage() {
    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* ─── HERO ─── */}
            <section className="relative h-[65vh] min-h-[450px] flex items-center pt-24 md:pt-28">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://buildings.honeywell.com/content/dam/hbtbt/en/images/horizontal/centraline-hotel-lobby-2880x1440.jpg"
                        alt="Custom Engineering"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
                </div>

                <Container className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left"
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white font-display leading-[1.2] mb-6">
                            Discover{" "}
                            <span className="hidden lg:inline"><br /></span>
                            <span className="text-red-500">Custom Solutions</span>
                        </h1>
                        <p className="text-base text-white/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Empowering modern enterprises with resilient cloud solutions, airtight security protocols, and scalable infrastructure.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* ABOUT */}
            <section className="py-24 bg-white border-t border-gray-100">
                <Container>

                    {/* HEADER */}
                    <div className="max-w-3xl">

                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263] leading-tight">
                            Comprehensive Building
                            <span className="text-red-600"> Automation Solutions</span>
                        </h2>

                        <p className="text-gray-500 leading-relaxed mt-5 max-w-2xl">
                            Intersys Solutions Co., Ltd provides integrated engineering systems
                            and professional services designed to improve operational efficiency,
                            infrastructure reliability, and long-term building performance.
                        </p>
                    </div>

                    {/* FEATURES */}
                    <div className="grid md:grid-cols-3 mt-16 border border-gray-200">
                        {[
                            {
                                icon: Zap,
                                title: "Integrated Solutions",
                                desc: "Engineering and system integration services tailored for commercial and industrial environments.",
                            },
                            {
                                icon: Target,
                                title: "Client-Focused Design",
                                desc: "Solutions developed around operational requirements, scalability, and usability.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Reliable Support",
                                desc: "Ongoing technical assistance, maintenance, and system optimization support.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className={`bg-[#FAFAFA] p-6
        ${i !== 2 ? "border-r border-gray-200" : ""}
        hover:bg-white transition-all duration-300`}
                            >
                                {/* ICON */}
                                <div className="w-10 h-10 rounded-sm  flex items-center justify-center text-[#1A3263] mb-4">
                                    <item.icon size={18} strokeWidth={1.8} />
                                </div>

                                {/* CONTENT */}
                                <h3 className="text-base font-semibold text-[#1A3263] leading-snug">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-gray-500 leading-relaxed mt-2">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* TECH ECOSYSTEM */}
            <section className="py-24 bg-[#F8F9FA] overflow-hidden">
                <Container>

                    {/* HEADER */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-14 max-w-3xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263] leading-tight">
                            Technical Ecosystems
                        </h2>

                        <p className="text-gray-500 mt-4 leading-relaxed">
                            Advanced systems engineered for safety, intelligence, and infrastructure efficiency.
                        </p>
                    </motion.div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

                        {[
                            {
                                title: "Intrusion Alarm Systems",
                                desc: "Protect your property with advanced motion sensors, door/window contacts, and integrated alarm notifications.",
                                img: "https://tiimg.tistatic.com/fp/1/001/452/honeywell-intrusion-alarm-panel-790.jpg",
                                href: "/services/intrusion-system"
                            },
                            {
                                title: "Car Parking Systems",
                                desc: "Streamlined vehicle access control, automated payment solutions, and real-time occupancy monitoring.",
                                img: "https://www.honeywellbuildings.in/uploads/bms/category/1604003816pms_prdct.png",
                                href: "/services/car-parking"
                            },
                            {
                                title: "Public Address Systems",
                                desc: "Reliable audio solutions for announcements and emergency broadcasts across facilities.",
                                img: "https://www.honeywellbuildings.in/uploads/pava/category/1755959738voice_evacuationy.jpg",
                                href: "/services/public-address"
                            },
                            {
                                title: "Room Control Unit",
                                desc: "Intelligent in-room control for lighting, HVAC, and access management.",
                                img: roomcontrol,
                                href: "/services/room-control"
                            },
                            {
                                title: "Leak Detection System",
                                desc: "Early detection systems to prevent costly damage and operational downtime.",
                                img: "https://images.unsplash.com/photo-1669920282670-d2e1f59e7aff?q=80&w=1142&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                href: "/services/leak-detection"
                            },
                            {
                                title: "VESDA Systems",
                                desc: "Highly sensitive smoke detection technology for mission-critical environments.",
                                img: "https://buildings.honeywell.com/content/dam/hbtbt/en/images/horizontal/products-fire-xtralis-2880x1440.jpg",
                                href: "/services/vesda"
                            }
                        ].map((eco, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.08
                                }}
                                whileHover={{ y: -5 }}
                                className="group bg-white border border-gray-200 rounded-md overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col"
                            >

                                {/* IMAGE */}
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={eco.img}
                                        alt={eco.title}
                                        className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                </div>

                                {/* CONTENT */}
                                <div className="p-6 flex flex-col flex-grow">

                                    <h3 className="text-lg font-semibold text-[#1A3263] leading-snug">
                                        {eco.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 leading-relaxed mt-3 flex-grow">
                                        {eco.desc}
                                    </p>

                                    {/* BUTTON */}
                                    <Link
                                        to={eco.href || "#"}
                                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1A3263] hover:text-red-600 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>

                            </motion.div>
                        ))}

                    </div>
                </Container>
            </section>
            {/* SERVICES */}
            <section className="py-28 bg-[#0B1220] text-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT TEXT */}
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                                Services Integration
                            </h2>

                            <p className="text-white/50 text-base max-w-md leading-relaxed">
                                A practical, connected approach to building management systems that
                                unify software, hardware, and operational services.
                            </p>
                        </div>

                        {/* RIGHT LIST */}
                        <div className="space-y-4">

                            {[
                                {
                                    icon: Cpu,
                                    title: "Software",
                                    desc: "Integrate systems for better decision-making and streamlined building operations."
                                },
                                {
                                    icon: Settings,
                                    title: "Hardware",
                                    desc: "Deploy reliable sensors and infrastructure that support efficient building performance."
                                },
                                {
                                    icon: Activity,
                                    title: "Services",
                                    desc: "Operational support and maintenance to ensure consistent performance across all systems."
                                }
                            ].map((s, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 p-5 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
                                >
                                    {/* ICON */}
                                    <div className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/80">
                                        <s.icon size={18} />
                                    </div>

                                    {/* TEXT */}
                                    <div>
                                        <h4 className="text-base font-medium tracking-tight">
                                            {s.title}
                                        </h4>
                                        <p className="text-white/40 text-sm mt-1 leading-relaxed">
                                            {s.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}