import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    ArrowRight,
    Wrench,
    Ghost
} from "lucide-react";
import { Container } from "@/components/Common/Container";
import { Link } from "@tanstack/react-router";

export function Warranty() {
    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            {/* HERO SECTION */}
            <section className="relative pt-75 pb-20 overflow-hidden bg-white">
                <div className="absolute top-0 inset-x-0 h-[600px] z-0">
                    <img
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
                        alt="Warranty Commitment"
                        className="w-full h-full object-cover"
                    />
                </div>

                <Container className="relative z-10">
                    <div className="flex flex-col lg:flex-row items-stretch shadow-2xl rounded-2xl overflow-hidden">
                        {/* WARRANTY STATEMENT CARD */}
                        <div className="flex-1 bg-[#F5F5F5] p-12 lg:p-16">
                            <div className="flex justify-between items-start mb-8">
                                <h1 className="text-3xl lg:text-4xl font-bold text-[#0A0F1A] tracking-tight">
                                    warranty stantment
                                </h1>
                                <div className="text-blue-600">
                                    <ShieldCheck size={32} strokeWidth={1.5} />
                                </div>
                            </div>

                            <div className="space-y-6 text-gray-700 leading-relaxed text-sm lg:text-base">
                                <p>
                                    Intersys Solutions Co., Ltd ("Intersys"), as a system integrator and authorized distributor of global brands, believes that all technical information, specifications, and recommendations provided are accurate to the best of its knowledge; however, Intersys does not guarantee their completeness or absolute accuracy. Intersys warrants that all systems supplied and/or installed by the company will be free from defects in materials and workmanship for a period of two (2) years from the date of installation or handover, under normal operating conditions.
                                </p>
                            </div>
                        </div>

                        {/* INITIATE CLAIM CARD */}
                        <div className="lg:w-[450px] bg-gradient-to-br from-[#B91C1C] to-[#EF4444] p-12 lg:p-16 text-white flex flex-col justify-between">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold leading-tight">
                                    Initiate a Warranty Claim
                                </h2>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    Our technical response team is ready to process your claim immediately. Have your system ID and purchase documentation ready.
                                </p>
                            </div>

                            <button className="bg-white text-red-600 w-full py-4 rounded-lg font-bold text-sm hover:bg-gray-100 transition-all mt-12 shadow-md">
                                Download full policy
                            </button>
                        </div>
                    </div>
                </Container>
            </section>


            {/* MIDDLE GRID SECTION */}
            <section className="py-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Technical Documentation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-4 bg-[#0A0F1A] p-12 rounded-2xl text-white flex flex-col justify-between relative overflow-hidden group min-h-[350px]"
                        >
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-6">Technical Documentation</h3>
                                <p className="text-white/50 text-sm leading-relaxed max-w-[250px]">
                                    Access full schematic sets, installation logs, and maintenance requirements to keep your warranty valid.
                                </p>
                            </div>

                            <a href="/document-center" className="relative z-10 text-[11px] font-bold uppercase tracking-widest text-red-500 border-b border-red-500/30 pb-1 w-fit hover:border-red-500 transition-all">
                                VISIT DOC CENTER
                            </a>

                            {/* Background icon decoration */}
                            <Ghost size={180} className="absolute bottom-[-10%] right-[-5%] w-48 h-48 text-white/[0.05] -rotate-12" />
                        </motion.div>

                        {/* Extended Lifecycle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-8 bg-[#E0E0E0] p-12 rounded-2xl flex flex-col lg:flex-row gap-12 items-center min-h-[350px]"
                        >
                            <div className="flex-1 space-y-6">
                                <h3 className="text-2xl font-bold text-gray-900">Extended Lifecycle Plans</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Secure your investment for up to 10 years with our enterprise-tier lifecycle management programs.
                                </p>
                            </div>
                            <div className="lg:w-[350px] h-[220px] rounded-xl overflow-hidden shadow-xl border-4 border-white">
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

            {/* TERMS OF ASSURANCE SECTION */}
            <section className="py-24 bg-[#F5F5F5]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div className="space-y-12">
                            <h2 className="text-5xl font-bold leading-none tracking-tighter">
                                Terms of <br />
                                <span className="text-red-600">Assurance.</span>
                            </h2>
                            <p className="text-gray-500 text-base leading-relaxed max-w-sm font-light">
                                Intersys Solutions maintains a rigorous standard of accountability. Our warranty framework is designed to provide transparency and rapid resolution.
                            </p>
                        </div>

                        <div className="space-y-20">
                            {/* Activation Requirement */}
                            <div className="flex gap-10 group">
                                <span className="text-6xl font-bold text-gray-200 group-hover:text-red-600/20 transition-colors duration-500">01</span>
                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold text-gray-900">Activation Requirements</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                                        All products must be registered within 30 days of installation to activate the full warranty duration. Failure to register may limit coverage to standard legal minimums.
                                    </p>
                                </div>
                            </div>

                            {/* Professional Installation */}
                            <div className="flex gap-10 group">
                                <span className="text-6xl font-bold text-gray-200 group-hover:text-red-600/20 transition-colors duration-500">02</span>
                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold text-gray-900">Professional Installation</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                                        Warranty remains valid only if the system is installed by an Intersys-certified technician or an authorized tier-1 partner. Proof of certified installation is required for all claims.
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

