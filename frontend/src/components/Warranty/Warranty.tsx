import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    FileText,
    ArrowRight,
    Search,
    Wrench,
    Clock,
    AlertCircle
} from "lucide-react";
import { Container } from "@/components/Common/Container";
import { Link } from "@tanstack/react-router";

export function Warranty() {
    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            {/* HERO / BACKGROUND SECTION */}
            <section className="relative h-[500px] overflow-hidden flex items-center pt-60">
                <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                    alt="Engineering Documentation"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#FDFDFD]/0 to-[#FDFDFD]" />

                <Container className="relative z-10 -mb-20">
                    <div className="flex flex-col lg:flex-row gap-8 items-stretch">

                        {/* MAIN STATEMENT CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1 bg-white p-12 lg:p-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <h1 className="text-3xl lg:text-4xl font-bold text-[#0A0F1A] tracking-tight lowercase">
                                    warranty statement
                                </h1>
                                <ShieldCheck className="text-red-500 w-8 h-8" />
                            </div>

                            <div className="space-y-6 text-gray-500 leading-relaxed text-sm lg:text-base max-w-2xl">
                                <p>
                                    Intersys Solutions Co., Ltd (“Intersys”) warrants that all systems supplied and installed
                                    will be free from defects for a period of <span className="font-bold text-gray-900 border-b-2 border-red-500">two (2) years</span>.
                                </p>
                                <p>
                                    As an authorized Honeywell ESD, we guarantee our technical specifications are accurate.
                                    Warranty coverage applies under normal operating conditions from the date of final handover.
                                </p>
                            </div>
                        </motion.div>

                        {/* INITIATE CLAIM CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:w-96 bg-[#D62828] p-12 lg:p-16 rounded-[2rem] text-white flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-bold leading-tight mb-8">
                                    Initiate a Warranty Claim
                                </h2>
                                <p className="text-white/70 text-sm leading-relaxed mb-12">
                                    Our technical response team is ready to process your claim immediately. Have your system ID and purchase documentation ready.
                                </p>
                            </div>

                            <button className="bg-white text-red-600 w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#0A0F1A] hover:text-white transition-all">
                                Download full policy
                            </button>
                        </motion.div>

                    </div>
                </Container>
            </section>

            {/* MIDDLE CARDS SECTION */}
            <section className="py-32">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Technical Documentation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-4 bg-[#0A0F1A] p-12 rounded-[2rem] text-white flex flex-col justify-between relative overflow-hidden group min-h-[400px]"
                        >
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-6">Technical Documentation</h3>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Access full schematic sets, installation logs, and maintenance requirements to keep your warranty valid.
                                </p>
                            </div>

                            <a href="/document-center" className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-red-500 flex items-center gap-2 group-hover:gap-4 transition-all mt-12">
                                Visit Doc Center <ArrowRight size={14} />
                            </a>

                            {/* Background decoration */}
                            <Wrench size={256} className="absolute bottom-[-20%] right-[-10%] w-64 h-64 text-white/[0.03] rotate-12" />
                        </motion.div>

                        {/* Extended Lifecycle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-8 bg-[#F5F5F5] p-12 rounded-[2rem] flex flex-col lg:flex-row gap-12 items-center min-h-[400px]"
                        >
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Extended Lifecycle Plans</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Secure your investment for up to 10 years with our enterprise-tier lifecycle management programs and preventive maintenance contracts.
                                </p>
                            </div>
                            <div className="lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1000&auto=format&fit=crop"
                                    alt="Technical Work"
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>
                        </motion.div>

                    </div>
                </Container>
            </section>

            {/* TERMS OF ASSURANCE SECTION */}
            <section className="pb-32 bg-[#F9F9F9] py-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-5xl font-bold leading-none tracking-tighter mb-4">
                                Terms of <br />
                                <span className="text-red-500">Assurance.</span>
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-md mt-12 font-light">
                                Intersys Solutions maintains a rigorous standard of accountability. Our warranty framework is designed to provide transparency and rapid resolution.
                            </p>
                        </div>

                        <div className="space-y-16">
                            {/* Activation */}
                            <div className="flex gap-8 group">
                                <span className="text-6xl font-black text-gray-100 group-hover:text-red-500/10 transition-colors duration-500">01</span>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">Activation Requirements</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        All products must be registered within 30 days of installation. Failure to follow maintenance schedules or unauthorized service via third-parties may affect coverage.
                                    </p>
                                </div>
                            </div>

                            {/* Service */}
                            <div className="flex gap-8 group">
                                <span className="text-6xl font-black text-gray-100 group-hover:text-red-500/10 transition-colors duration-500">02</span>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">Professional Installation</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        Warranty remains valid only if the system is installed and maintained by Intersys-certified technicians. Proof of certified service is required for all claims.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CALL TO ACTION */}
            <section className="pb-32">
                <Container>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-[#0A0F1A] rounded-[3rem] py-24 px-12 lg:px-24 text-center relative overflow-hidden group shadow-2xl"
                    >
                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-10 tracking-tight leading-none">
                                Need specialized warranty support?
                            </h2>
                            <p className="text-white/40 text-lg lg:text-xl font-light max-w-2xl mx-auto mb-16">
                                Our enterprise partners receive dedicated account managers and immediate onsite diagnostic support. Contact our team for priority service.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-block bg-white/5 border border-white/20 text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-black transition-all"
                            >
                                Contact Support Team
                            </Link>
                        </div>

                        {/* Mesh decoration */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    </motion.div>
                </Container>
            </section>
        </div>
    );
}

