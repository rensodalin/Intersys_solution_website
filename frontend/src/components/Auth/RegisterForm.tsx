import React, { useState } from "react";
import { Eye, EyeOff, Loader2, ChevronRight } from "lucide-react";

interface RegisterFormProps {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function RegisterForm({
  onSubmit,
  loading,
  formData,
  handleInputChange,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const countries = ["Cambodia", "South Korea", "Singapore", "Thailand", "Vietnam", "Japan", "USA"];

  const jobTitles = [
    "Engineer",
    "Project Manager",
    "Architect",
    "Technician",
    "Director",
    "Procurement",
    "Consultant",
    "Other",
  ];

  const roles = ["Admin", "User", "Manager", "Staff"];

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-6">

        {/* Gender */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">
            Gender (Required)
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleInputChange}
                className="accent-black w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                Male
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleInputChange}
                className="accent-black w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                Female
              </span>
            </label>
          </div>
        </div>

        {/* Role */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">
            Role <span className="text-gray-400">(Optional)</span>
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}

            className="w-full px-4 py-3.5 text-sm border border-gray-200 rounded-md bg-white focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all"
          >
            <option value="">Select role</option>
            {jobTitles.map((r) => (
              <option key={r} value={r.toLowerCase()}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Name Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2.5">
            <label className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              className="w-full px-4 py-3.5 text-sm border border-gray-200 rounded-md focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all"
            />
          </div>

          <div className="space-y-2.5">
            <label className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              className="w-full px-4 py-3.5 text-sm border border-gray-200 rounded-md focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all"
            />
          </div>
        </div>

        {/* Country & Phone */}
        <div className="space-y-3">
          <label className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">
            Country & Phone
          </label>

          <div className="flex gap-3">
            <div className="relative min-w-[120px]">
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-3.5 pr-9 text-sm border border-gray-200 rounded-md bg-white appearance-none focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight size={14} className="text-gray-400 rotate-90" />
              </div>
            </div>

            <input
              type="tel"
              name="mobileNumber"
              required
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="Phone number"
              className="flex-1 px-4 py-3.5 text-sm border border-gray-200 rounded-md focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            className="w-full px-4 py-3.5 text-sm border border-gray-200 rounded-md focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all"
          />
        </div>

        {/* Password */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Min 8 characters"
              className="w-full px-4 py-3.5 pr-10 text-sm border border-gray-200 rounded-md focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-medium py-3.5 rounded-md hover:bg-primary/90 transition-all text-sm tracking-wide flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Creating Account..." : "Register"}
      </button>
    </form>
  );
}