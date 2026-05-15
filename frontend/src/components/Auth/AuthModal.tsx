import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthTab = "login" | "register";

import logoImg from "@/assets/logo.avif";

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    gender: "",
    country: "Cambodia",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = activeTab === "login" ? "/auth/login" : "/auth/register";
    const payload = activeTab === "login" 
      ? { email: formData.email, password: formData.password }
      : { 
          firstName: formData.firstName, 
          lastName: formData.lastName, 
          email: formData.email, 
          password: formData.password,
          phone: formData.mobileNumber,
          gender: formData.gender,
          country: formData.country 
        };

    try {
      const baseUrl = `http://${window.location.hostname}:5000`;
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        if (activeTab === "register") {
          setActiveTab("login");
          setError("Registration successful! Please login.");
        } else {
          window.location.reload(); 
        }
      } else {
        setError(data.message || data.error || "An error occurred");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    window.location.href = `http://${window.location.hostname}:5000/auth/${provider}`;
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-[6px] cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-[10000]"
          >
            <div className="flex justify-center pt-10 pb-2">
              <img src={logoImg} alt="Intersys Logo" className="h-12 object-contain" />
            </div>

            <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b border-gray-100">
              <div className="flex gap-10">
                {(["login", "register"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setError(null); }}
                    className={cn(
                      "relative pb-2 text-sm font-medium tracking-wide transition-all capitalize",
                      activeTab === tab ? "text-black" : "text-gray-400 hover:text-gray-600"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="auth-tab" className="absolute left-0 right-0 bottom-0 h-[2px] bg-black" />
                    )}
                  </button>
                ))}
              </div>

              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                <X size={20} className="text-gray-400 hover:text-black" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8 hide-scrollbar">
              {error && (
                <div className={cn(
                  "mb-6 p-3 rounded-md text-xs font-medium text-center",
                  error.includes("successful") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {error}
                </div>
              )}

              {activeTab === "login" ? (
                <LoginForm 
                  onSubmit={handleSubmit} 
                  loading={loading} 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                />
              ) : (
                <RegisterForm 
                  onSubmit={handleSubmit} 
                  loading={loading} 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                />
              )}

              <div className="mt-8 space-y-6">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-x-0 h-[1px] bg-gray-100" />
                  <span className="relative px-4 bg-white text-xs font-bold text-gray-400">OR</span>
                </div>
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-sm hover:bg-gray-50 transition-all group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.29.81-.55z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="text-sm font-medium">Continue with Google</span>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  {activeTab === "login" ? "New to INTERSYS? " : "Already have an account? "}
                  <button
                    onClick={() => { setActiveTab(activeTab === "login" ? "register" : "login"); setError(null); }}
                    className="text-black font-bold hover:underline"
                  >
                    {activeTab === "login" ? "Register" : "Login"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>

          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
