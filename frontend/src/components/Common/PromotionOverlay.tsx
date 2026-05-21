import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo.avif";
import heroImg from "@/assets/Hero.png";
import { Link } from "@tanstack/react-router";

interface PromotionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromotionOverlay({
  isOpen,
  onClose,
}: PromotionOverlayProps) {
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
              className="absolute top-6 right-6 z-50 p-2 rounded-md bg-black/10 hover:bg-black/20 text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Side */}
            <div className="relative w-full h-[40%] md:h-full md:w-[65%] overflow-hidden bg-[#f0f2f5]">
              <div className="absolute inset-0 opacity-40">
                <img
                  src={heroImg}
                  alt="Background"
                  className="w-full h-full object-cover grayscale"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/40 to-transparent z-10" />

              <div className="relative z-20 h-full p-12 flex flex-col justify-between">
                <div>
                  <img
                    src={logoImg}
                    alt="Logo"
                    className="h-10 w-auto mb-12"
                  />

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

              {/* Floating Image */}
              <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] pointer-events-none">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <div className="bg-white p-2 rounded-md shadow-2xl border border-gray-100 rotate-12">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1685148902867-0d917a4d2a67?q=80&w=1332&auto=format&fit=crop"
                      alt="Building"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full h-[60%] md:h-full md:w-[35%] bg-white p-12 flex flex-col justify-center relative">
              <div className="space-y-8">
                <h3 className="text-4xl font-bold text-[#1A3263] tracking-tighter leading-tight">
                  Ready to transform <br /> your building?
                </h3>

                <p className="text-gray-500 text-base leading-relaxed">
                  Join hundreds of businesses optimizing their operations with
                  Intersys Solutions. Our engineers are ready to design your
                  custom roadmap.
                </p>

                <Link
                  to="/contact"
                  onClick={onClose}
                  className="w-full bg-[#C3110C] text-white py-5 rounded-sm font-bold text-sm normal-case flex items-center justify-center gap-3 hover:bg-[#1A3263] transition-all duration-500 group shadow-xl shadow-[#C3110C]/20"
                >
                  Get a Free Consultation

                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}