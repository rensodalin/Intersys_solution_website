import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { loginSuccess } from "@/store/authSlice";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Globe,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  Camera,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { countries } from "@/components/MyAccount/countries";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

export function AdminProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhone(user.phone || "");
      setRole(user.role || "");
      setCountry(user.country || "");
    }
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)) {
      toast.error("Only JPG, PNG, GIF, or WebP images are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2MB");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${baseUrl}/auth/user/avatar`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        dispatch(loginSuccess(data.user));
        toast.success("Avatar updated successfully");
      } else {
        toast.error(data.message || "Failed to upload avatar");
      }
    } catch {
      toast.error("An error occurred while uploading");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First name and last name are required");
      return;
    }

    if (newPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (
        newPassword.length < 8 ||
        !/[A-Z]/.test(newPassword) ||
        !/[a-z]/.test(newPassword) ||
        !/[0-9]/.test(newPassword) ||
        !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)
      ) {
        toast.error("Password must be at least 8 characters with uppercase, lowercase, number, and special character");
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch(`${baseUrl}/auth/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone || undefined,
          role: role || undefined,
          country: country || undefined,
          currentPassword: newPassword ? currentPassword : undefined,
          password: newPassword || undefined,
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        dispatch(loginSuccess(data.user));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const avatarSrc = user?.avatar
    ? `${baseUrl}${user.avatar}`
    : null;
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">Admin Profile</h2>
        <div className="h-0.5 w-10 bg-red-600 mt-2" />
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {saveSuccess && (
          <div className="flex items-center gap-2.5 border border-green-200 bg-green-50 px-4 py-3 rounded-sm">
            <CheckCircle2 className="text-green-600 flex-shrink-0" size={16} />
            <p className="text-green-800 text-sm font-semibold">Profile updated successfully.</p>
          </div>
        )}

        {/* Avatar section */}
        <div className="flex items-center gap-6">
          <div className="relative">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={user?.name || "Admin"}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#081F3D] flex items-center justify-center text-white text-xl font-bold border-2 border-gray-200">
                {initials}
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition shadow cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Camera size={12} />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{user?.name || "Admin"}</p>
            <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">Click the camera icon to change your avatar</p>
          </div>
        </div>

        {/* Profile fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-400 mb-2">First Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                placeholder="First Name"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Last Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-400 mb-2">Email (read-only)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm bg-gray-50 text-gray-400 cursor-not-allowed outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                placeholder="Phone number"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-400 mb-2">Role</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 text-gray-400" size={16} />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm bg-white outline-none focus:border-red-600 transition appearance-none cursor-pointer"
              >
                <option value="">Select role</option>
                <option value="administrator">Administrator</option>
                <option value="manager">Manager</option>
                <option value="engineer">Engineer</option>
                <option value="technician">Technician</option>
                <option value="director">Director</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Country</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 text-gray-400" size={16} />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm bg-white outline-none focus:border-red-600 transition appearance-none cursor-pointer"
              >
                <option value="">Select country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Password change */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Password change</h3>
          <p className="text-[10px] text-gray-400 mb-4">
            Leave all password fields blank to keep your current password.
          </p>

          <div className="mb-4">
            <label className="block text-xs text-gray-400 mb-2">Current password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="off"
                className="pl-10 pr-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-black cursor-pointer"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-400 mb-2">New password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  className="pl-10 pr-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                  placeholder="Minimum 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-black cursor-pointer"
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Confirm new password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-black cursor-pointer"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#081F3D] hover:bg-[#0f2a4f] text-white font-bold text-sm px-8 py-3 rounded-sm transition shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
