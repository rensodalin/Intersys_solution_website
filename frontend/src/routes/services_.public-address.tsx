import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import {
    ArrowRight,
    ArrowLeft
} from "lucide-react";

export const Route = createFileRoute("/services_/public-address")({
    component: PublicAddressPage,
});

function PublicAddressPage() {
    const router = useRouter();

    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* ─── HERO SECTION ─── */}
            <section className="relative min-h-[460px] sm:min-h-[540px] md:min-h-[600px] flex items-center pt-36 sm:pt-40 lg:pt-44 pb-12 sm:pb-16 overflow-hidden bg-[#0A0F1A]">

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0A0F1A] pointer-events-none z-0" />

                {/* ─── BACK BUTTON ─── */}
                <button
                    onClick={() => router.history.back()}
                    className="absolute top-28 sm:top-32 md:top-36 left-4 sm:left-6 lg:left-8 z-30 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group cursor-pointer"
                >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:border-white/40 transition">
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-0.5 transition-transform duration-200"
                        />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">Back</span>
                </button>

                <Container className="relative z-10 text-white">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

                        {/* HERO TEXT */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-xl text-center lg:text-left mx-auto lg:mx-0 pt-4 sm:pt-0"
                        >

                            {/* TITLE */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-[1.2] mb-3 sm:mb-6">
                                    Public Address <br />
                                    <span className="text-red-600">Systems (PA)</span>
                                </h1>
                            </motion.div>

                            {/* DESCRIPTION */}
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-xs sm:text-sm md:text-base text-white/70 max-w-xl leading-relaxed px-2 sm:px-0"
                            >
                                Reliable audio solutions for announcements, background music, and emergency broadcasts across large or multi-zone facilities.
                            </motion.p>
                        </motion.div>

                        {/* HERO IMAGE */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative flex items-center justify-center w-full max-w-xs sm:max-w-md lg:max-w-none mx-auto mt-2 lg:mt-0"
                        >
                            <img
                                src="https://static.wixstatic.com/media/3d5958_b44c4fdc6fed4aa9aa7fa06b40bfa137~mv2.png/v1/fill/w_884,h_558,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
                                alt="PA System Components"
                                className="w-full h-auto max-h-[220px] sm:max-h-[320px] lg:max-h-none object-contain drop-shadow-2xl"
                                loading="lazy"
                                decoding="async"
                            />
                        </motion.div>

                    </div>
                </Container>
            </section>

            {/* ─── WHY CHOOSE SECTION ─── */}
            <section className="py-14 sm:py-20 lg:py-28 bg-white">
                <Container>

                    {/* SECTION TITLE */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4 text-center lg:text-left"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3263] inline-block border-b-4 border-red-600 pb-2">
                            Why Choose Public Address Systems
                        </h2>
                    </motion.div>

                    {/* GRID */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                    >
                        {[
                            {
                                title: "Clear & Consistent Communication",
                                desc: "High-quality audio delivery ensures announcements are understood in noisy or large spaces, reducing confusion and enhancing efficiency.",
                                img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                title: "Real-Time Emergency Alerts",
                                desc: "Integrated with fire alarms, security systems, or evacuation protocols, PA systems enable rapid dissemination of critical instructions during emergencies.",
                                img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                title: "Scalable for Any Facility",
                                desc: "Flexible designs allow deployment in small offices, multi-floor buildings, stadiums, factories, and public transport hubs.",
                                img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                title: "System Integration",
                                desc: "Seamlessly connect with Building Management Systems (BMS), security networks, and event management platforms for smarter facility control.",
                                img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop"
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
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.1
                                }}
                                whileHover={{ y: -6 }}
                                className="group bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                            >
                                {/* IMAGE */}
                                <div className="h-44 sm:h-56 overflow-hidden relative">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-500" />
                                </div>

                                {/* CONTENT */}
                                <div className="p-5 sm:p-7 space-y-3 sm:space-y-4">
                                    <h4 className="text-base sm:text-xl font-bold text-[#1A3263] leading-snug group-hover:text-red-600 transition-colors duration-300">
                                        {item.title}
                                    </h4>

                                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                                        {item.desc}
                                    </p>

                                    {/* CTA */}
                                    <div className="pt-2">
                                        <button className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 transition cursor-pointer">
                                            Learn More
                                            <ArrowRight size={15} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </Container>
            </section>

        </div>
    );
}