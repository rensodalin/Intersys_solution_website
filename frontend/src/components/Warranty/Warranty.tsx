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
                        src="https://plus.unsplash.com/premium_photo-1661477840861-bfd75677881b?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Warranty Commitment"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/75" />
                </div>

                <Container className="relative z-10">
                    <div className="flex flex-col lg:flex-row items-stretch shadow-lg rounded-md overflow-hidden border border-black/5">

                        {/* warranty statement */}
                        <div className="flex-1 bg-[#F3F3F3] p-6 sm:p-8 lg:p-14">
                            <div className="flex justify-between items-start mb-6 sm:mb-8">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A0F1A] tracking-tight">
                                    Warranty statement
                                </h1>

                                <div className="text-red-600 shrink-0">
                                    <ShieldCheck size={28} strokeWidth={1.5} />
                                </div>
                            </div>

                            <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                                <p>
                                    Intersys Solutions Co., Ltd , as a system integrator and authorized distributor of global brands, believes that all technical information, specifications, and recommendations provided are accurate to the best of its knowledge.
                                </p>

                                <p>
                                    Intersys warrants that all systems supplied and/or installed by the company will be free from defects in materials and workmanship for a period of one (1) year from the date of installation or handover, under normal operating conditions.
                                </p>
                            </div>
                        </div>

                        {/* claim section */}
                        <div className="lg:w-[420px] bg-[#B91C1C] p-6 sm:p-8 lg:p-14 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
                            <div className="space-y-4 sm:space-y-6">
                                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                                    Submit a warranty claim
                                </h2>

                                <p className="text-white/75 text-xs sm:text-sm leading-relaxed">
                                    Our technical response team is ready to process your claim immediately. Have your system ID and purchase documentation ready.
                                </p>
                            </div>

                            <div className="border-t border-white/20 pt-5 sm:pt-6 mt-6">
                                <p className="text-xs text-white/60 font-medium">
                                    Authorized by
                                </p>
                                <p className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    Honeywell
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>


            {/* terms */}
            <section className="py-12 sm:py-16 md:py-24 bg-[#F1F1F1] border-t border-black/5">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20">

                        <div className="space-y-4 sm:space-y-6 lg:space-y-10">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0A0F1A]">
                                Terms of <br className="hidden sm:inline" />{" "}
                                <span className="text-red-600">assurance.</span>
                            </h2>

                            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm">
                                Intersys Solutions maintains a rigorous standard of accountability. Our warranty framework is designed to provide transparency and rapid resolution.
                            </p>
                        </div>

                        <div className="space-y-8 sm:space-y-12 lg:space-y-16">

                            <div className="flex gap-4 sm:gap-8 group border-b border-black/5 pb-6 sm:pb-10">
                                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-300 shrink-0">
                                    01
                                </span>

                                <div className="space-y-2 sm:space-y-3">
                                    <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                                        Warranty period
                                    </h4>

                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md">
                                        The one-year warranty takes effect from the date of system installation and handover, covering defects in materials and workmanship.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 sm:gap-8 group border-b border-black/5 pb-6 sm:pb-10">
                                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-300 shrink-0">
                                    02
                                </span>

                                <div className="space-y-2 sm:space-y-3">
                                    <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                                        Certified installation
                                    </h4>

                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md">
                                        Warranty coverage is limited to systems installed by Intersys-certified technicians or authorized Honeywell partners.
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