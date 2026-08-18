import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EventSidebar } from "./EventSidebar";

export type { CompanyEvent } from "./EventSidebar";

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EventPopup({ isOpen, onClose }: EventPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-y-0 right-0 left-auto z-[9999] pointer-events-none flex items-stretch justify-end p-0">
          {/* Subtle backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
            onClick={onClose}
          />

          {/* Right-side Drawer Popup Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative z-[10000] pointer-events-auto w-[85vw] sm:w-[360px] md:w-[400px] lg:w-[420px] h-full max-h-full bg-white shadow-2xl border-l border-gray-200 overflow-hidden flex flex-col p-0"
          >
            <div className="relative h-full flex flex-col">
              {/* Close Button overlay */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-5 right-5 z-20 p-2 rounded-md bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                aria-label="Close event overlay"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <EventSidebar
                onSelectEvent={onClose}
                className="h-full rounded-none border-0 shadow-none"
                maxHeightClass="h-[calc(100vh-140px)]"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

