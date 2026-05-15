import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LoginForm({ onSubmit, loading, formData, handleInputChange }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">
            EMAIL
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            className="w-full px-4 py-3.5 text-sm bg-white border border-gray-200 rounded-md
                     focus:border-black focus:ring-2 focus:ring-black/5
                     outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">
            PASSWORD
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="w-full px-4 py-3.5 text-sm bg-white border border-gray-200 rounded-md
                       focus:border-black focus:ring-2 focus:ring-black/5
                       outline-none transition-all placeholder:text-gray-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                       text-gray-400 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-medium py-3.5 rounded-md
                 hover:bg-primary/90 transition-all text-sm tracking-wide flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-center">
        <button type="button" className="text-xs text-gray-500 hover:text-black transition-colors font-medium">
          Forgot your password?
        </button>
      </div>
    </form>
  );
}
