import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo.avif";
import heroImg from "@/assets/Hero.png";

interface PromotionOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PromotionOverlay({ isOpen, onClose }: PromotionOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full h-full md:w-[95%] md:h-[85%] max-w-6xl bg-white rounded-none md:rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/10 hover:bg-black/20 text-gray-800 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left Side: Visual/Branding (Image Background) */}
                        <div className="relative w-full h-[40%] md:h-full md:w-[65%] overflow-hidden bg-[#f0f2f5]">
                            <div className="absolute inset-0 opacity-40">
                                <img src={heroImg} alt="Background" className="w-full h-full object-cover grayscale" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/40 to-transparent z-10" />

                            <div className="relative z-20 h-full p-12 flex flex-col justify-between">
                                <div>
                                    <img src={logoImg} alt="Logo" className="h-10 w-auto mb-12" />
                                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A3263] leading-tight max-w-md">
                                        Engineering <br />
                                        the Future <br />
                                        in Cambodia
                                    </h2>
                                </div>

                                <div className="flex gap-4">
                                    <div className="px-8 py-3 bg-white/50 backdrop-blur-md rounded-sm text-sm font-bold text-[#1A3263] border border-white">
                                        Since 2015
                                    </div>

                                </div>
                            </div>

                            {/* Tablet/Mobile Floating Visuals Style */}
                            <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] pointer-events-none">
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <div className="bg-white p-2 rounded-2xl shadow-2xl border border-gray-100 rotate-12">
                                        <img src="https://images.unsplash.com/photo-1503387762-592dea58ec41?q=80&w=2800&auto=format&fit=crop" className="rounded-xl w-full h-[300px] object-cover" alt="Project" />
                                    </div>
                                    <div className="absolute -bottom-10 -left-10 bg-white p-2 rounded-xl shadow-2xl border border-gray-100 -rotate-12 w-48">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="w-8 h-8 rounded-full bg-[#9B0F06]/10 flex items-center justify-center mb-3">
                                                <div className="w-2 h-2 rounded-full bg-[#9B0F06]" />
                                            </div>
                                            <div className="h-2 w-full bg-gray-200 rounded-full mb-2" />
                                            <div className="h-2 w-2/3 bg-gray-200 rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Side: Action/Content */}
                        <div className="w-full h-[60%] md:h-full md:w-[35%] bg-white p-12 flex flex-col justify-center relative">
                            {/* "NEW" Tag */}
                            <div className="absolute top-0 right-0 p-8">
                                <div className="bg-yellow-400 text-black font-black text-[10px] px-3 py-1 uppercase tracking-widest -rotate-2">
                                    EXPERT ADVICE
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h3 className="text-4xl font-bold text-[#1A3263] tracking-tighter leading-tight">
                                    Ready to transform <br /> your building?
                                </h3>
                                <p className="text-gray-500 text-base leading-relaxed">
                                    Join hundreds of businesses optimizing their operations with Intersys Solutions. Our engineers are ready to design your custom roadmap.
                                </p>

                                <button
                                    onClick={onClose}
                                    className="w-full bg-[#C3110C] text-white py-5 rounded-sm font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#1A3263] transition-all duration-500 group shadow-xl shadow-[#C3110C]/20"
                                >
                                    Get a Free Consultation
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>

                                <div className="pt-12 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                                        Your Trusted Engineering Partner in Cambodia
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
