import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden z-10"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900">{title}</h3>
                  <p className="text-[12px] text-gray-500 mt-0.5">{message}</p>
                </div>
                <button
                  onClick={onCancel}
                  className="ml-auto p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onCancel}
                  className="px-5 py-2.5 text-[12px] font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className="px-5 py-2.5 text-[12px] font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition cursor-pointer"
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
