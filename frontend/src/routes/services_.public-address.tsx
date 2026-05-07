import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import {
    Volume2,
    AlertTriangle,
    Maximize,
    Link as LinkIcon,
    Activity,
    Layers,
    ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/services_/public-address")({
    component: PublicAddressPage,
});

function PublicAddressPage() {
    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* ─── HERO SECTION ─── */}
            <section className="relative min-h-[60vh] flex items-center pt-50 pb-20 bg-gray-50">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h1 className="text-3xl md:text-5xl font-bold text-[#1A3263] leading-tight">
                                Public Address Systems (PA)
                            </h1>
                            <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
                                Reliable audio solutions for announcements, background music, and emergency broadcasts across large or multi-zone facilities.
                            </p>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <img
                                src="https://static.wixstatic.com/media/3d5958_b44c4fdc6fed4aa9aa7fa06b40bfa137~mv2.png/v1/fill/w_884,h_558,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
                                alt="PA System Components"
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* ─── WHY CHOOSE SECTION ─── */}
            <section className="py-28 bg-white">
                <Container>
                    <div className="mb-20 space-y-4">
                        <h2 className="text-4xl font-bold text-[#1A3263] inline-block border-b-4 border-red-600 pb-2">
                            Why Choose Public Address Systems
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Clear & Consistent Communication",
                                desc: "High-quality audio delivery ensures announcements are understood in noisy or large spaces, reducing confusion and enhancing efficiency.",
                                img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                title: "Real-Time Emergency Alerts",
                                desc: "Integrated with fire alarms, security systems, or evacuation protocols, PA systems enable rapid dissemination of critical instructions during emergencies.",
                                img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                title: "Scalable for Any Facility",
                                desc: "Flexible designs allow deployment in small offices, multi-floor buildings, stadiums, factories, and public transport hubs.",
                                img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                title: "System Integration",
                                desc: "Seamlessly connect with Building Management Systems (BMS), security networks, and event management platforms for smarter facility control.",
                                img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                title: "Reliable Performance",
                                desc: "Engineered for continuous operation, with redundancy and backup options to ensure uninterrupted communication.",
                                img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                title: "Zonal Messaging Control",
                                desc: "Send targeted announcements to specific zones or areas without disrupting other sections of the building.",
                                img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop"
                            }
                        ].map((item, i) => (
                            <div key={i} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="h-56 overflow-hidden relative">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500" />
                                </div>
                                <div className="p-8 space-y-4">
                                    <h4 className="text-xl font-bold text-[#1A3263] leading-snug group-hover:text-red-600 transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>



        </div>
    );
}
