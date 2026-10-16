import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { loginSuccess } from "@/store/authSlice";
import environment from "@/enviroment/enviroment";
import logoImg from "@/assets/logo.avif";
import { Lock, Mail, Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleOnly, setGoogleOnly] = useState("");

  const baseUrl = environment;

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/my-account" });
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGoogleOnly("");

    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success && data.user) {
        dispatch(loginSuccess(data.user));
        if (data.user.isAdmin) {
          navigate({ to: "/admin" });
        } else {
          navigate({ to: "/my-account" });
        }
      } else if (data.googleOnly) {
        setGoogleOnly(data.message || "This email is registered with Google Sign-In.");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch {
      setError("Failed to connect to the authentication server");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const currentUrl = window.location.origin + "/my-account";
    window.location.href = `${baseUrl}/auth/google?redirect=${encodeURIComponent(currentUrl)}`;
  };

  return (
    <div className="min-h-screen bg-[#081F3D] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Return to home link */}
      <div className="mb-6 z-10 w-full max-w-md flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
          <ShieldCheck size={14} className="text-emerald-400" /> Secure Portal
        </span>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden z-10 border border-white/10">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 text-center">
          <Link to="/" className="inline-block mb-3">
            <img src={logoImg} alt="Intersys Solutions" className="h-10 w-auto mx-auto" />
          </Link>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Sign in to your account</h2>
          <p className="text-xs text-gray-500 mt-1">
            Access your quote tracking, account dashboard, and administrative tools
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {googleOnly && (
            <div className="p-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md">
              {googleOnly}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:border-[#081F3D] focus:ring-1 focus:ring-[#081F3D] outline-none transition text-gray-900"
                />
                <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-md focus:border-[#081F3D] focus:ring-1 focus:ring-[#081F3D] outline-none transition text-gray-900"
                />
                <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-[#C3110C] hover:bg-[#a50e0a] text-white font-bold py-2.5 rounded-md transition shadow-md shadow-red-600/20 disabled:opacity-50 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Or continue with
            </span>
            <div className="border-t border-gray-200 w-full" />
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition cursor-pointer"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.29.81-.55z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
