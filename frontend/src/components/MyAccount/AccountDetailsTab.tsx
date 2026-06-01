import { User, Mail, Phone, Briefcase, Globe, Lock, Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import { countries } from "./countries";
import type { DetailsForm } from "./types";

interface AccountDetailsTabProps {
  form: DetailsForm;
  email: string;
  saving: boolean;
  saveSuccess: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  showCurrentPassword: boolean;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCheckboxChange: (name: "newsletter" | "receiveUpdates", value: boolean) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onToggleCurrentPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AccountDetailsTab({
  form,
  email,
  saving,
  saveSuccess,
  showPassword,
  showConfirmPassword,
  showCurrentPassword,
  onFieldChange,
  onCheckboxChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onToggleCurrentPassword,
  onSubmit,
}: AccountDetailsTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
        <div className="h-0.5 w-10 bg-red-600 mt-2" />
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {saveSuccess && (
          <div className="flex items-center gap-2.5 border border-green-200 bg-green-50 px-4 py-3 rounded-sm">
            <CheckCircle2 className="text-green-600 flex-shrink-0" size={16} />
            <p className="text-green-800 text-sm font-semibold">Account details changed successfully.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-400 mb-2">First Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" name="firstName" value={form.firstName} onChange={onFieldChange}
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                placeholder="First Name" required />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Last Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" name="lastName" value={form.lastName} onChange={onFieldChange}
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                placeholder="Last Name" required />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-400 mb-2">Email Address (Read-only)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="email" value={email} disabled
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm bg-gray-50 text-gray-400 cursor-not-allowed outline-none" />
            </div>
            <span className="text-[10px] text-gray-400 mt-1 block">Your email address is automatically verified via Google or Registration.</span>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" name="phone" value={form.phone} onChange={onFieldChange}
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                placeholder="Phone Number" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-400 mb-2">Professional Role</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 text-gray-400" size={16} />
              <select name="role" value={form.role} onChange={onFieldChange}
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm bg-white outline-none focus:border-red-600 transition">
                <option value="">Select Role</option>
                <option value="engineer">Engineer</option>
                <option value="project manager">Project Manager</option>
                <option value="architect">Architect</option>
                <option value="technician">Technician</option>
                <option value="director">Director</option>
                <option value="procurement">Procurement</option>
                <option value="consultant">Consultant</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Country</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 text-gray-400" size={16} />
              <select name="country" value={form.country} onChange={onFieldChange}
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition bg-white appearance-none cursor-pointer">
                <option value="">Select Country</option>
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <svg className="absolute right-3 top-3 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Password Change</h3>
          <p className="text-[10px] text-gray-400 mb-4">Leave all password fields blank to keep your current password.</p>

          <div className="mb-4">
            <label className="block text-xs text-gray-400 mb-2">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type={showCurrentPassword ? "text" : "password"} name="currentPassword"
                value={form.currentPassword} onChange={onFieldChange}
                autoComplete="off"
                className="pl-10 pr-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                placeholder="Enter your current password" />
              <button type="button" onClick={onToggleCurrentPassword}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-black cursor-pointer">
                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-400 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                <input type={showPassword ? "text" : "password"} name="password"
                  value={form.password} onChange={onFieldChange}
                  autoComplete="new-password"
                  className="pl-10 pr-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                  placeholder="Minimum 8 characters" />
                <button type="button" onClick={onTogglePassword}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-black cursor-pointer">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                  value={form.confirmPassword} onChange={onFieldChange}
                  className="pl-10 pr-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                  placeholder="Confirm New Password" />
                <button type="button" onClick={onToggleConfirmPassword}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-black cursor-pointer">
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Communication & Alert Settings</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3.5 cursor-pointer">
              <input type="checkbox" checked={form.newsletter}
                onChange={(e) => onCheckboxChange("newsletter", e.target.checked)}
                className="mt-1 accent-red-600" />
              <div>
                <span className="text-sm font-bold text-gray-800">Subscribe to our newsletter</span>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Receive occasional technical tips, new product launches, and general engineering articles.</p>
              </div>
            </label>
            <label className="flex items-start gap-3.5 cursor-pointer">
              <input type="checkbox" checked={!form.newsletter}
                onChange={(e) => onCheckboxChange("newsletter", !e.target.checked)}
                className="mt-1 accent-red-600" />
              <div>
                <span className="text-sm font-bold text-gray-800">Unsubscribe from our newsletter</span>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Mute newsletter alerts. You will only receive custom quote emails and order safety updates.</p>
              </div>
            </label>
            <label className="flex items-start gap-3.5 cursor-pointer">
              <input type="checkbox" checked={form.receiveUpdates}
                onChange={(e) => onCheckboxChange("receiveUpdates", e.target.checked)}
                className="mt-1 accent-red-600" />
              <div>
                <span className="text-sm font-bold text-gray-800">Receive Order & Poster Updates</span>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Get real-time browser alerts and notifications whenever we publish new posters, brochures, or architectural drawings.</p>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={saving}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-8 py-3.5 rounded-sm transition shadow-lg shadow-red-600/10 cursor-pointer flex items-center justify-center gap-2">
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
