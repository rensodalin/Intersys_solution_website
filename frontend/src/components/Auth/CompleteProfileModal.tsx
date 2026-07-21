import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { loginSuccess } from "@/store/authSlice";
import { Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthChecking) return;
    if (user && !user.profileCompleted && !user.isAdmin) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setOpen(true);
    }
  }, [user, isAuthChecking]);

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First and last name are required");
      return;
    }
    if (!role) {
      toast.error("Please select your role");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const baseUrl = environment;
      const res = await fetch(`${baseUrl}/auth/profile/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, role, newsletter, password }),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        const storedPdf = localStorage.getItem("pending_pdf_url");
        if (storedPdf) {
          localStorage.removeItem("pending_pdf_url");
        }
        dispatch(loginSuccess(data.user));
        setOpen(false);
        if (storedPdf) {
          window.open(storedPdf, "_blank");
        } else {
          navigate({ to: "/my-account" });
        }
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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-[6px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
                <div className="flex-1" />
                <div className="flex flex-col items-center gap-1">
                  <img src={logoImg} alt="Intersys" className="h-10 w-auto" />
                  <p className="text-xs font-semibold text-gray-500 tracking-wide">COMPLETE YOUR PROFILE</p>
                  <p className="text-[11px] text-gray-400">Fill in your details to get started</p>
                </div>
                <div className="flex-1" />
              </div>

              <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600">First Name *</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm focus:border-black focus:ring-1 focus:ring-black/10 outline-none transition-all"
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600">Last Name *</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm focus:border-black focus:ring-1 focus:ring-black/10 outline-none transition-all"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600">Role *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm focus:border-black focus:ring-1 focus:ring-black/10 outline-none transition-all bg-white"
                  >
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm focus:border-black focus:ring-1 focus:ring-black/10 outline-none transition-all pr-10"
                      placeholder="At least 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(""); }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm focus:border-black focus:ring-1 focus:ring-black/10 outline-none transition-all pr-10 mt-2"
                      placeholder="Re-enter password"
                    />
                  </div>
                  {passwordError && <p className="text-[11px] text-red-600">{passwordError}</p>}
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="mt-0.5 h-4 w-4 border-gray-300 rounded-sm text-black focus:ring-black"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-500 leading-relaxed">
                    Subscribe to our newsletter for product updates, industry insights, and special offers.
                  </label>
                </div>
              </div>

              <div className="px-6 pb-5">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-black text-white text-sm font-medium py-2.5 rounded-sm hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={14} className="animate-spin" />}
                  {loading ? "Saving..." : "Complete Profile"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
