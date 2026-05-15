import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Ghost } from "lucide-react";
import { Container } from "@/components/Common/Container";

export function Warranty() {
    return (
        <div className="min-h-screen bg-[#F7F7F7]">
            {/* hero section */}
            <section className="relative pt-72 pb-20 overflow-hidden bg-white">
                <div className="absolute top-0 inset-x-0 h-[580px] z-0">
                    <img
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
                        alt="Warranty Commitment"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                </div>

                <Container className="relative z-10">
                    <div className="flex flex-col lg:flex-row items-stretch shadow-lg rounded-md overflow-hidden border border-black/5">

                        {/* warranty statement */}
                        <div className="flex-1 bg-[#F3F3F3] p-10 lg:p-14">
                            <div className="flex justify-between items-start mb-8">
                                <h1 className="text-3xl lg:text-4xl font-bold text-[#0A0F1A] tracking-tight">
                                    Warranty statement
                                </h1>

                                <div className="text-red-600">
                                    <ShieldCheck size={30} strokeWidth={1.5} />
                                </div>
                            </div>

                            <div className="space-y-6 text-gray-700 leading-relaxed text-sm lg:text-base">
                                <p>
                                    Intersys Solutions Co., Ltd ("Intersys"), as a system integrator and authorized distributor of global brands, believes that all technical information, specifications, and recommendations provided are accurate to the best of its knowledge.
                                </p>

                                <p>
                                    Intersys warrants that all systems supplied and/or installed by the company will be free from defects in materials and workmanship for a period of two (2) years from the date of installation or handover, under normal operating conditions.
                                </p>
                            </div>
                        </div>

                        {/* claim section */}
                        <div className="lg:w-[420px] bg-[#B91C1C] p-10 lg:p-14 text-white flex flex-col justify-between border-l border-white/10">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold leading-tight">
                                    Initiate a warranty claim
                                </h2>

                                <p className="text-white/75 text-sm leading-relaxed">
                                    Our technical response team is ready to process your claim immediately. Have your system ID and purchase documentation ready.
                                </p>
                            </div>

                            <button className="bg-white text-red-600 w-full py-4 rounded font-semibold text-sm hover:bg-gray-100 transition-all mt-12 border border-white/20">
                                Download full policy
                            </button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* middle section */}
            <section className="py-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* documentation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-4 bg-[#0A0F1A] p-10 rounded-md text-white flex flex-col justify-between relative overflow-hidden min-h-[320px] border border-white/5"
                        >
                            <div>
                                <h3 className="text-2xl font-bold mb-5">
                                    Technical documentation
                                </h3>

                                <p className="text-white/55 text-sm leading-relaxed max-w-[250px]">
                                    Access schematic sets, installation logs, and maintenance requirements to keep your warranty valid.
                                </p>
                            </div>

                            <a
                                href="/document-center"
                                className="text-[11px] font-bold tracking-wider text-red-500 border-b border-red-500/30 pb-1 w-fit"
                            >
                                Visit document center
                            </a>

                            <Ghost
                                size={160}
                                className="absolute bottom-[-10%] right-[-5%] text-white/[0.04] -rotate-12"
                            />
                        </motion.div>

                        {/* lifecycle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-8 bg-[#E5E5E5] p-10 rounded-md flex flex-col lg:flex-row gap-10 items-center min-h-[320px] border border-black/5"
                        >
                            <div className="flex-1 space-y-5">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Extended lifecycle plans
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                                    Secure your investment for up to 10 years with our enterprise-tier lifecycle management programs.
                                </p>
                            </div>

                            <div className="lg:w-[340px] h-[220px] rounded-sm overflow-hidden shadow-md border border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=1000&auto=format&fit=crop"
                                    alt="Technical Maintenance"
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* terms */}
            <section className="py-24 bg-[#F1F1F1] border-t border-black/5">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                        <div className="space-y-10">
                            <h2 className="text-5xl font-bold leading-none tracking-tight text-[#0A0F1A]">
                                Terms of <br />
                                <span className="text-red-600">assurance.</span>
                            </h2>

                            <p className="text-gray-600 text-base leading-relaxed max-w-sm">
                                Intersys Solutions maintains a rigorous standard of accountability. Our warranty framework is designed to provide transparency and rapid resolution.
                            </p>
                        </div>

                        <div className="space-y-16">

                            <div className="flex gap-8 group border-b border-black/5 pb-10">
                                <span className="text-5xl font-bold text-gray-300">
                                    01
                                </span>

                                <div className="space-y-3">
                                    <h4 className="text-xl font-bold text-gray-900">
                                        Activation requirements
                                    </h4>

                                    <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                                        All products must be registered within 30 days of installation to activate the full warranty duration.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-8 group border-b border-black/5 pb-10">
                                <span className="text-5xl font-bold text-gray-300">
                                    02
                                </span>

                                <div className="space-y-3">
                                    <h4 className="text-xl font-bold text-gray-900">
                                        Professional installation
                                    </h4>

                                    <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                                        Warranty remains valid only if the system is installed by an Intersys-certified technician or authorized partner.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}