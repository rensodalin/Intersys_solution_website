import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LoginForm({
  onSubmit,
  loading,
  formData,
  handleInputChange,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleCaptchaClick = () => {
    if (isHuman) return;
    setChecking(true);
    setCaptchaError(false);
    setTimeout(() => {
      setChecking(false);
      setIsHuman(true);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!isHuman) {
      e.preventDefault();
      setCaptchaError(true);
      return;
    }
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm text-neutral-600 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="
              w-full h-12 px-4
              bg-neutral-50
              border border-neutral-200
              rounded-md
              text-sm text-neutral-900
              placeholder:text-neutral-400
              transition-all duration-200
              focus:bg-white
              focus:border-black
              focus:ring-4 focus:ring-black/5
              outline-none
            "
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm text-neutral-600 font-medium">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="
                w-full h-12 px-4 pr-11
                bg-neutral-50
                border border-neutral-200
                rounded-md
                text-sm text-neutral-900
                placeholder:text-neutral-400
                transition-all duration-200
                focus:bg-white
                focus:border-black
                focus:ring-4 focus:ring-black/5
                outline-none
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-neutral-400 hover:text-neutral-700
                transition-colors
              "
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Google reCAPTCHA Widget */}
      <div
        style={{
          border: captchaError ? "1px solid #f87171" : "1px solid #d3d3d3",
          borderRadius: "3px",
          backgroundColor: captchaError ? "#fff5f5" : "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          height: "74px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          userSelect: "none",
          transition: "border-color 0.2s",
        }}
      >
        {/* Left: Checkbox + Label */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Checkbox */}
          <div
            onClick={handleCaptchaClick}
            style={{
              width: "24px",
              height: "24px",
              border: checking
                ? "2px solid #4a90d9"
                : isHuman
                ? "2px solid #1a73e8"
                : "2px solid #c1c1c1",
              borderRadius: "2px",
              backgroundColor: isHuman ? "#1a73e8" : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isHuman ? "default" : "pointer",
              flexShrink: 0,
              transition: "all 0.25s ease",
              boxShadow: checking ? "0 0 0 3px rgba(74,144,217,0.2)" : "none",
            }}
          >
            {checking && (
              <svg
                style={{ animation: "rcSpin 0.8s linear infinite", width: "14px", height: "14px" }}
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="9" stroke="#4a90d9" strokeWidth="2.5" strokeDasharray="28" strokeDashoffset="10" />
              </svg>
            )}
            {isHuman && !checking && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "14px", height: "14px", animation: "rcCheck 0.25s ease forwards" }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>

          <span
            style={{
              fontSize: "14px",
              color: captchaError ? "#dc2626" : "#333",
              fontFamily: "Roboto, Arial, sans-serif",
              fontWeight: 400,
            }}
          >
            {captchaError ? "Please verify you're not a robot" : "I'm not a robot"}
          </span>
        </div>

        {/* Right: reCAPTCHA Branding */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
            minWidth: "60px",
          }}
        >
          {/* Real reCAPTCHA recycling-arrows logo */}
          <svg
            viewBox="0 0 64 64"
            style={{ width: "32px", height: "32px" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32 4 L44 24 L38 24 C38 36 46 44 56 44 L56 52 C42 52 30 42 30 24 L24 24 Z"
              fill="#4A90D9"
            />
            <path
              d="M56 44 L44 56 L44 50 C32 50 24 42 24 30 L32 30 C32 38 38 44 44 44 Z"
              fill="#4A90D9"
              opacity="0.75"
            />
            <path
              d="M8 44 C8 32 18 24 30 24 L30 30 C22 30 16 36 16 44 L10 44 L20 56 L8 56 Z"
              fill="#4A90D9"
              opacity="0.5"
            />
          </svg>

          <span
            style={{
              fontSize: "8px",
              color: "#555",
              fontFamily: "Roboto, Arial, sans-serif",
              fontWeight: 700,
              letterSpacing: "0.5px",
              lineHeight: 1,
            }}
          >
            reCAPTCHA
          </span>
          <span
            style={{
              fontSize: "7px",
              color: "#999",
              fontFamily: "Roboto, Arial, sans-serif",
              lineHeight: 1,
            }}
          >
            Privacy - Terms
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-neutral-500 hover:text-black transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <style>{`
        @keyframes rcCheck {
          from { stroke-dashoffset: 30; opacity: 0; }
          to   { stroke-dashoffset: 0;  opacity: 1; }
        }
        @keyframes rcSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        svg polyline { stroke-dasharray: 30; }
      `}</style>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full h-12
          rounded-md
          bg-primary
          text-white text-sm font-medium
          transition-all duration-200
          hover:opacity-90
          active:scale-[0.99]
          disabled:opacity-70
          flex items-center justify-center gap-2
        "
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}