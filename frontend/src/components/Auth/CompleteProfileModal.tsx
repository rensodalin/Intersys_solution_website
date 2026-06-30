import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { loginSuccess } from "@/store/authSlice";
import { Loader2, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import environment from "@/enviroment/enviroment";
import logoImg from "@/assets/logo.avif";

const ROLES = [
  { value: "", label: "Select your role" },
  { value: "engineer", label: "Engineer" },
  { value: "project manager", label: "Project Manager" },
  { value: "architect", label: "Architect" },
  { value: "technician", label: "Technician" },
  { value: "director", label: "Director" },
  { value: "procurement", label: "Procurement" },
  { value: "consultant", label: "Consultant" },
  { value: "other", label: "Other" },
];

export function CompleteProfileModal() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthChecking = useSelector((state: RootState) => state.auth.isAuthChecking);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    if (isAuthChecking) return;
    if (user && !user.profileCompleted) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setOpen(true);
    }
  }, [user, isAuthChecking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const baseUrl = environment;
      const res = await fetch(`${baseUrl}/auth/profile/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, role, newsletter }),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        dispatch(loginSuccess(data.user));
        setOpen(false);
        navigate({ to: "/my-account" });
        toast.custom((t) => (
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-4 flex items-center gap-4 min-w-[320px]">
            <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-full flex-shrink-0">
              <CheckCircle size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-sm">Welcome to INTERSYS!</h3>
              <p className="text-gray-400 text-xs mt-0.5">Your profile is complete.</p>
            </div>
          </div>
        ), { duration: 3000 });
      } else {
        toast.error(data.message || "Failed to save profile");
      }
    } catch {
      toast.error("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-[6px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-[10002]"
          >
            <div className="flex justify-center pt-10 pb-2">
              <img src={logoImg} alt="Intersys Logo" className="h-12 object-contain" />
            </div>

            <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Complete Your Profile</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} className="text-gray-400 hover:text-black" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-5 hide-scrollbar">
              <p className="text-sm text-gray-500">
                Just a few more details to get you started.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all bg-white"
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="mt-0.5 h-4 w-4 border-gray-300 rounded-sm text-black focus:ring-black"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600 leading-relaxed">
                  Subscribe to our newsletter for product updates, industry insights, and special offers.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !firstName.trim() || !role}
                className="w-full bg-black text-white font-medium py-3 rounded-md hover:bg-gray-800 transition-all text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Saving..." : "Complete Profile"}
              </button>
            </form>
          </motion.div>

          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
