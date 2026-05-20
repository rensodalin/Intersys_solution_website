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

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-neutral-500 hover:text-black transition-colors"
        >
          Forgot password?
        </button>
      </div>

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