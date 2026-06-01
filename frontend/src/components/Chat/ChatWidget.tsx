import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const isProductPage = location.pathname.startsWith("/products");
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

  // Auto-fill if user is logged in
  React.useEffect(() => {
    if (user && !formData.name) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          contactMethod: "Chat Widget",
          city: "N/A",
          country: "N/A"
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setIsOpen(false);
      } else {
        toast.error(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error("Chat Widget Submit Error:", err);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("fixed bottom-6 z-50", isProductPage ? "left-[312px]" : "left-6")}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 w-[340px] bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#081F3D] text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Contact Support</h3>
                <p className="text-xs text-gray-400 mt-0.5">Leave us a message</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 bg-white">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Name <span className="text-[#C3110C]">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm outline-none focus:border-[#C3110C] transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Email <span className="text-[#C3110C]">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm outline-none focus:border-[#C3110C] transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Message <span className="text-[#C3110C]">*</span></label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you today?"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm outline-none focus:border-[#C3110C] transition-colors resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C3110C] text-white font-bold text-sm py-2.5 rounded-sm hover:bg-red-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={14} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#111FA2] hover:bg-[#D62828] text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
