import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export function ScrollControls() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-2"
          >
            {/* Scroll Up Button */}
            <button
              onClick={scrollToTop}
              className="w-12 h-12 bg-[#162E93] hover:bg-[#9B0F06] text-white flex items-center justify-center rounded shadow-2xl transition-all duration-300 group"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </button>

            {/* Scroll Down Button (Only visible if not at bottom) */}
            <button
              onClick={scrollToBottom}
              className="w-12 h-12 bg-[#162E93] hover:bg-[#9B0F06] text-white flex items-center justify-center rounded shadow-2xl transition-all duration-300 group opacity-40 hover:opacity-100"
              aria-label="Scroll to bottom"
            >
              <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
