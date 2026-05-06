import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { Zap, Globe, Cpu, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services_/surveillance")({
    head: () => ({
        meta: [
            { title: "Intelligent Surveillance Solutions — Intersys Solutions" },
            {
                name: "description",
                content:
                    "Smarter business, safer environment with end-to-end intelligent surveillance and cloud integration.",
            },
        ],
    }),
    component: SurveillancePage,
});

function SurveillancePage() {
    return (
        <div className="bg-white overflow-hidden">

            {/* HERO SECTION */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center pt-40">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2000"
                        alt="Cityscape"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-white space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Smarter Business.<br />Safer Environments.
                        </h1>

                        <p className="text-md md:text-lg text-white/80 leading-relaxed font-light">
                            Intersys Solutions Co., Ltd delivers comprehensive cloud solutions and CCTV surveillance systems designed to meet the evolving needs of modern businesses.
                            <br /><br />
                            Our integrated approach combines virtual desktops with real-time intelligent monitoring to ensure round-the-clock security and peak productivity.
                        </p>

                        <div className="pt-4">
                            <button className="px-8 py-3 bg-[#9B0F06] text-white font-medium text-sm rounded-md hover:bg-white hover:text-[#9B0F06] transition-all duration-300 shadow-md">
                                Explore our solutions
                            </button>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* STRENGTHS */}
            <section className="py-24 bg-[#F8F9FA]">
                <Container>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Zap,
                                title: "Integrated Solutions",
                                desc: "Only manufacturer providing connected platforms for both SMB and Enterprise."
                            },
                            {
                                icon: Cpu,
                                title: "Deep Knowledge",
                                desc: "Expert capabilities in cloud infrastructure and IP surveillance."
                            },
                            {
                                icon: Globe,
                                title: "Global Reach",
                                desc: "Diverse customer base across 4 continents and 100+ countries."
                            }
                        ].map((item, i) => (
                            <div key={i} className="space-y-4">
                                <item.icon className="text-[#9B0F06]" size={32} />
                                <h3 className="text-xl font-bold text-[#1A3263]">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* FOCUS & WHY US */}
            <section className="py-24 bg-[#0A0F1A] text-white">
                <Container>
                    <div className="mb-14">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Focus & Why Us
                        </h2>

                        <p className="text-white/40 max-w-2xl text-sm leading-relaxed">
                            Whether you're managing a single office or multiple facilities, our team ensures reliable, scalable, and secure deployment of both cloud infrastructure and video surveillance systems.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "User Engagement",
                                desc: "We specialize in solving unique problems for our clients."
                            },
                            {
                                title: "Turnkey Systems",
                                desc: "Complete solutions from deployment to management."
                            },
                            {
                                title: "Future Proof",
                                desc: "Leading-edge technology that grows with your business."
                            }
                        ].map((item, i) => (
                            <div key={i} className="space-y-3">
                                <h4 className="text-[#9B0F06] font-semibold text-sm">
                                    {item.title}
                                </h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* OUR TECHNOLOGIES */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A3263]">
                            Our Technologies
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                img: "https://static.wixstatic.com/media/3d5958_7c6cff6b254b420e84fa4ad939e691cd~mv2.png",
                                title: "Access Control",
                                desc: "Access & Vindicator • Pull Through Enabler • Access and Vindicator Systems"
                            },
                            {
                                img: "https://static.wixstatic.com/media/3d5958_7b5214439c414e0eb2b465f7d88affca~mv2.png",
                                title: "Security",
                                desc: "Intrusion Systems • Higher Contributor in Europe • Intrusion Detection"
                            },
                            {
                                img: "https://static.wixstatic.com/media/3d5958_3916705dd4104bb7845c721191593720~mv2.png",
                                title: "Surveillance",
                                desc: "Video & Xtralis • 2019 Growth Initiative • Video Surveillance Xtralis"
                            }
                        ].map((tech, i) => (
                            <div key={i} className="space-y-4">
                                <div className="bg-[#F8F9FA] border border-gray-200 rounded-xl p-6">
                                    <img src={tech.img} alt={tech.title} />
                                </div>

                                <h3 className="text-lg font-bold text-[#1A3263]">
                                    {tech.title}
                                </h3>

                                <p className="text-gray-500 text-sm">
                                    {tech.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* SECURE BY DEFAULT (UPDATED IMAGE) */}
            <section className="py-24 bg-[#1A3263] text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto space-y-6">

                        <h2 className="text-4xl md:text-5xl font-bold">
                            Secure By Default
                        </h2>

                        <p className="text-white/60 text-sm leading-relaxed">
                            Honeywell surveillance solutions provide enterprise-grade cybersecurity for critical applications.
                        </p>

                        {/* IMAGE ADDED HERE */}
                        <div className="flex justify-center pt-6">
                            <img
                                src="https://static.wixstatic.com/media/3d5958_739e9fabb4154af5ad7b4c24ad21f51d~mv2.png/v1/fill/w_719,h_568,al_c,lg_1,q_90,enc_avif,quality_auto/3d5958_739e9fabb4154af5ad7b4c24ad21f51d~mv2.png"
                                alt="Secure By Default"
                                className="rounded-xl shadow-xl max-w-md w-full"
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 pt-4">
                            {[
                                "HTTPS / TLS1.2",
                                "AES128/256",
                                "NDAA Compliant",
                                "FIPS 140-2 Chipset",
                                "PCI-DSS",
                                "Security Certifications"
                            ].map(tag => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 border border-white/20 rounded-full text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* CAMERA POSITIONING (CENTERED IMAGE) */}
            {/* CAMERA POSITIONING (CENTERED IMAGE FIXED) */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="text-center space-y-6 mb-12">
                        <h2 className="text-4xl font-bold text-[#1A3263]">
                            Camera Positioning
                        </h2>

                        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                            Honeywell Camera Positioning and Integrated Security Solutions ensure optimized surveillance coverage and system efficiency.
                        </p>
                    </div>

                    {/* FULL CENTER IMAGE */}
                    <div className="flex justify-center">
                        <img
                            src="https://static.wixstatic.com/media/3d5958_5c02dfaeee9740e789fe032d64124c9c~mv2.png/v1/fill/w_674,h_344,al_c,lg_1,q_85,enc_avif,quality_auto/3d5958_5c02dfaeee9740e789fe032d64124c9c~mv2.png"
                            alt="Camera Positioning"
                            className="w-full max-w-2xl h-auto object-contain"
                        />
                    </div>
                </Container>
            </section>
            <CtaBand />
        </div>
    );
}