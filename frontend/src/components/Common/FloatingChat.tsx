import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function FloatingChat() {
  return (
    <motion.a
      href="https://t.me/chun_sochet"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        boxShadow: [
          "0 10px 25px rgba(0,0,0,0.2)",
          "0 15px 35px rgba(5,51,156,0.35)",
          "0 10px 25px rgba(0,0,0,0.2)",
        ],
      }}
      transition={{
        duration: 0.6,
        boxShadow: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{ scale: 0.96 }}
      className="group fixed bottom-10 left-6 z-[9999] flex items-center gap-3 
                 bg-[#05339C] text-white px-4 py-3 rounded-md 
                 border border-white/10 backdrop-blur-md
                 overflow-hidden transition-all duration-300"
    >
      {/* Icon container */}
      <div className="relative flex items-center justify-center w-10 h-10 bg-white/10 rounded-md">
        <MessageCircle className="w-5 h-5" />

        {/* Notification ping */}
        <span className="absolute top-1 right-1 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#C3110C] opacity-70 animate-ping"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C3110C]"></span>
        </span>
      </div>

      {/* Text */}
      <span className="text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 group-hover:translate-x-1">
        Chat with us
      </span>

      {/* Tooltip */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 
                      opacity-0 group-hover:opacity-100 
                      transition-all duration-300 pointer-events-none"
      >
        <div className="bg-black text-white text-xs px-3 py-1 rounded shadow-md whitespace-nowrap">
          We reply instantly 🚀
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                        -translate-x-full group-hover:translate-x-full 
                        transition-transform duration-1000"
        />
      </div>
    </motion.a>
  );
}
