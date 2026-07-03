import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { loginSuccess } from "@/store/authSlice";
import {
  User, Mail, Phone, Briefcase, Globe, Lock,
  Eye, EyeOff, CheckCircle2, Loader2, Camera, ChevronDown,
  ShieldCheck, AtSign, MapPin, KeyRound
} from "lucide-react";
import { toast } from "sonner";
import { countries } from "@/components/MyAccount/countries";
import environment from "@/enviroment/enviroment";

const baseUrl = environment;

export function AdminProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarVersion, setAvatarVersion] = useState(Date.now());

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
    console.log("Selected file for avatar upload:", {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.type
    });
    if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)) {
      return toast.error("Only JPG, PNG, GIF, or WebP images are allowed");
    }
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("File size must be under 2MB");
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      console.log("Uploading avatar to:", `${baseUrl}/auth/user/avatar`);
      const res = await fetch(`${baseUrl}/auth/user/avatar`, {
        method: "POST", body: formData, credentials: "include",
      });
      const data = await res.json();
      console.log("Avatar upload API response data:", data);
      if (data.success) {
        dispatch(loginSuccess(data.user));
        setAvatarVersion(Date.now());
        toast.success("Avatar updated successfully");
      } else {
        toast.error(data.message || "Failed to upload avatar");
      }
    } catch (err) {
      console.error("Avatar upload fetch failed:", err);
      toast.error("An error occurred while uploading");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      return toast.error("First name and last name are required");
    }
    if (newPassword) {
      if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
      if (
        newPassword.length < 8 || !/[A-Z]/.test(newPassword) ||
        !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword) ||
        !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)
      ) {
        return toast.error("Password must be at least 8 characters with uppercase, lowercase, number, and special character");
      }
    }
    setSaving(true);
    try {
      const res = await fetch(`${baseUrl}/auth/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(), lastName: lastName.trim(),
          phone: phone || undefined, role: role || undefined, country: country || undefined,
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
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
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

  const cacheBuster = user?.avatar?.startsWith("/") ? `?t=${avatarVersion}` : "";
  const avatarSrc = user?.avatar ? (user.avatar.startsWith("/") ? `${baseUrl}${user.avatar}${cacheBuster}` : user.avatar) : null;
  console.log("AdminProfile avatarSrc computed:", {
    rawAvatar: user?.avatar,
    cacheBuster,
    computedSrc: avatarSrc
  });
  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-xl font-black text-gray-900 tracking-tight">Admin Profile</h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">Manage your account information and security settings</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {saveSuccess && (
          <div className="flex items-center gap-2.5 border border-green-200 bg-green-50 px-4 py-3 rounded-sm">
            <CheckCircle2 className="text-green-600 flex-shrink-0" size={16} />
            <p className="text-green-800 text-sm font-semibold">Profile updated successfully.</p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-150 shadow-sm p-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              {avatarSrc ? (
                <img src={avatarSrc} alt={user?.name || "Admin"} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#081F3D] flex items-center justify-center text-white text-lg font-bold border-2 border-gray-100">
                  {initials}
                </div>
              )}
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-[#C3110C] text-white rounded-full flex items-center justify-center hover:bg-red-700 transition shadow cursor-pointer disabled:opacity-50"
              >
                {uploading ? <Loader2 size={10} className="animate-spin" /> : <Camera size={10} />}
              </button>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleAvatarUpload} className="hidden" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{user?.name || "Admin"}</p>
              <div className="flex items-center gap-1.5 mt-0.5">

                <span className="text-[10px] font-bold text-[#C3110C] tracking-wider">Administrator</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">Click the camera icon to change your avatar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-150 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
            <User size={14} className="text-[#C3110C]" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">First Name *</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                  className="pl-9 w-full text-sm border border-gray-200 px-3 py-2.5 rounded-sm outline-none focus:border-[#C3110C] focus:ring-1 focus:ring-[#C3110C]/20 transition"
                  placeholder="John" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Last Name *</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                  className="pl-9 w-full text-sm border border-gray-200 px-3 py-2.5 rounded-sm outline-none focus:border-[#C3110C] focus:ring-1 focus:ring-[#C3110C]/20 transition"
                  placeholder="Doe" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email (read-only)</label>
              <div className="relative">
                <AtSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={user?.email || ""} disabled
                  className="pl-9 w-full text-sm border border-gray-200 px-3 py-2.5 rounded-sm bg-gray-50 text-gray-400 cursor-not-allowed outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)}
                  className="pl-9 w-full text-sm border border-gray-200 px-3 py-2.5 rounded-sm outline-none focus:border-[#C3110C] focus:ring-1 focus:ring-[#C3110C]/20 transition"
                  placeholder="+855 12 345 678" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Role</label>
              <div className="relative">
                <Briefcase size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select value={role} onChange={e => setRole(e.target.value)}
                  className="pl-9 w-full text-sm border border-gray-200 px-3 py-2.5 rounded-sm bg-white outline-none focus:border-[#C3110C] focus:ring-1 focus:ring-[#C3110C]/20 transition appearance-none cursor-pointer"
                >
                  <option value="">Select role</option>
                  <option value="administrator">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="engineer">Engineer</option>
                  <option value="technician">Technician</option>
                  <option value="director">Director</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Country</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select value={country} onChange={e => setCountry(e.target.value)}
                  className="pl-9 w-full text-sm border border-gray-200 px-3 py-2.5 rounded-sm bg-white outline-none focus:border-[#C3110C] focus:ring-1 focus:ring-[#C3110C]/20 transition appearance-none cursor-pointer"
                >
                  <option value="">Select country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-150 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
            <KeyRound size={14} className="text-[#C3110C]" />
            Security
          </h3>
          <div className="mb-4 max-w-md">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Current password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showCurrent ? "text" : "password"} value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)} autoComplete="off"
                className="pl-9 pr-9 w-full text-sm border border-gray-200 px-3 py-2.5 rounded-sm outline-none focus:border-[#C3110C] focus:ring-1 focus:ring-[#C3110C]/20 transition"
                placeholder="Enter current password" />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">New password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showNew ? "text" : "password"} value={newPassword}
                  onChange={e => setNewPassword(e.target.value)} autoComplete="new-password"
                  className="pl-9 pr-9 w-full text-sm border border-gray-200 px-3 py-2.5 rounded-sm outline-none focus:border-[#C3110C] focus:ring-1 focus:ring-[#C3110C]/20 transition"
                  placeholder="Min. 8 characters" />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Confirm new password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showConfirm ? "text" : "password"} value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="pl-9 pr-9 w-full text-sm border border-gray-200 px-3 py-2.5 rounded-sm outline-none focus:border-[#C3110C] focus:ring-1 focus:ring-[#C3110C]/20 transition"
                  placeholder="Confirm new password" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-3">Leave password fields blank to keep your current password.</p>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="bg-[#C3110C] hover:bg-red-700 text-white font-bold text-sm px-8 py-2.5 rounded-sm transition shadow disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {saving ? <><Loader2 size={15} className="animate-spin" /><span>Saving...</span></>
              : <><CheckCircle2 size={15} /><span>Save Changes</span></>}
          </button>
          {saveSuccess && (
            <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
              <CheckCircle2 size={13} /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
