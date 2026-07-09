import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import logoImg from "@/assets/logo.avif";
import { Link } from "@tanstack/react-router";
import heroImg from '@/assets/roomcontrol/pic.png';

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
        <div className="fixed inset-0 z-[9998] overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/45"
            onClick={onClose}
          />

          {/* Slide-in Panel from left */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-[9999] w-full max-w-[420px] h-full bg-[#F8F6F0] shadow-xl overflow-hidden flex flex-col"
          >
            {/* Close button - Top Left to avoid ribbon conflict */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-[99] p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black border border-black/[0.05] shadow-sm backdrop-blur-md transition-all duration-200"
              aria-label="Close promotion"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Ribbon at very top */}
            <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none z-20">
              <div className="bg-[#D4FF00] text-black text-[10px] font-black tracking-widest py-1.5 w-40 text-center absolute top-5 -right-9 rotate-45 uppercase shadow-sm">
                SINCE 2015
              </div>
            </div>

            {/* Logo at the very top */}
            <div className="px-8 pt-6 pb-2">
              <img
                src={logoImg}
                alt="Intersys Solutions"
                className="h-8 w-auto"
              />
            </div>

            {/* Top section - Mockup Image with lime circle */}
            <div className="relative w-full h-[280px] flex items-center justify-center overflow-hidden">
              {/* Lime Circle */}
              <div
                className="absolute w-[220px] h-[220px] bg-[#D4FF00] rounded-full top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{ animationDuration: '8s' }}
              />

              {/* Devices mockup */}
              <img
                src={heroImg}
                alt="Mockup devices"
                className="relative z-10 w-[80%] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500 ease-out"
              />

            </div>

            {/* Bottom section - Content */}
            <div className="p-8 pt-4 pb-8 flex flex-col">
              {/* Title */}
              <h2 className="text-[34px] md:text-[38px] font-extrabold text-[#1A3263] leading-[1.1] tracking-tight">
                Engineering <br />
                the Future
              </h2>

              {/* Subheading */}
              <p className="text-[#1A3263] text-sm font-semibold mt-2.5">
                Intersys's custom building solutions, engineering Cambodia's future.
              </p>

              {/* Description */}
              <p className="text-gray-500 text-xs md:text-sm mt-3 leading-relaxed">
                Ready to transform your building? Join hundreds of businesses optimizing their operations with Intersys Solutions. Our engineers are ready to design your custom roadmap.
              </p>

              {/* CTA Button */}
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[#C3110C] hover:bg-[#1A3263] text-white px-7 py-3 mt-6 text-xs font-bold transition-all duration-300 shadow-md shadow-[#C3110C]/20 hover:shadow-lg self-start"
              >
                Get a Free Consultation &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
