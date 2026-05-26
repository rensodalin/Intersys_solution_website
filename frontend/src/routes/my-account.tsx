import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { loginSuccess, logoutSuccess } from "@/store/authSlice";
import { Container } from "@/components/Common/Container";
import { toast } from "sonner";
import {
  User,
  Lock,
  Mail,
  FileText,
  Download,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Loader2,
  Globe,
  Briefcase,
  Phone
} from "lucide-react";
import { AuthModal } from "@/components/Auth/AuthModal";

export const Route = createFileRoute("/my-account")({
  head: () => ({
    meta: [
      { title: "My Account — Intersys Solutions" },
      { name: "description", content: "Manage your Intersys Solutions profile, view submitted quote requests, and access your downloaded technical catalog documents." }
    ],
  }),
  component: MyAccountPage,
});

type TabType = "dashboard" | "quotes" | "downloads" | "account-details";

interface QuoteItem {
  _id: string;
  solutionCategories: string[];
  products: Array<{ qty: string; productNo: string; description: string; application: string }>;
  name: string;
  company: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
}

function MyAccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [savingDetails, setSavingDetails] = useState(false);

  // Account Details form states
  const [detailsForm, setDetailsForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "Cambodia",
    role: "",
    newsletter: false,
    receiveUpdates: false,
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

  // Fetch complete profile on mount/when user logs in
  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const response = await fetch(`${baseUrl}/auth/user`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success && data.user) {
        dispatch(loginSuccess(data.user));
        // Pre-populate form
        setDetailsForm({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          phone: data.user.phone || "",
          country: data.user.country || "Cambodia",
          role: data.user.role || "",
          newsletter: data.user.newsletter || false,
          receiveUpdates: data.user.receiveUpdates || false,
          password: "",
          confirmPassword: ""
        });
      } else {
        dispatch(logoutSuccess());
      }
    } catch (err) {
      console.error("Failed to load user profile:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  // Fetch user's quotes
  const fetchQuotes = async () => {
    setLoadingQuotes(true);
    try {
      const response = await fetch(`${baseUrl}/api/quotes`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        setQuotes(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load quotes:", err);
      toast.error("Failed to load quote history.");
    } finally {
      setLoadingQuotes(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch quotes whenever quotes tab is selected
  useEffect(() => {
    if (activeTab === "quotes" && user) {
      fetchQuotes();
    }
  }, [activeTab, user]);

  const handleLogout = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        dispatch(logoutSuccess());
        toast.success("Logged out successfully");
        navigate({ to: "/" });
      }
    } catch (err) {
      console.error("Logout failed:", err);
      dispatch(logoutSuccess());
      navigate({ to: "/" });
    }
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDetailsForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: "newsletter" | "receiveUpdates", value: boolean) => {
    setDetailsForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detailsForm.firstName.trim()) return toast.error("First name is required");
    if (!detailsForm.lastName.trim()) return toast.error("Last name is required");

    if (detailsForm.password) {
      if (detailsForm.password !== detailsForm.confirmPassword) {
        return toast.error("Passwords do not match");
      }
      // Password strength validation
      const pw = detailsForm.password;
      const isStrong =
        pw.length >= 8 &&
        /[A-Z]/.test(pw) &&
        /[a-z]/.test(pw) &&
        /[0-9]/.test(pw) &&
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw);
      if (!isStrong) {
        return toast.error("Password must be at least 8 characters and contain uppercase, lowercase, number, and a special character.");
      }
    }

    setSavingDetails(true);
    try {
      const response = await fetch(`${baseUrl}/auth/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: detailsForm.firstName,
          lastName: detailsForm.lastName,
          phone: detailsForm.phone,
          country: detailsForm.country,
          role: detailsForm.role,
          newsletter: detailsForm.newsletter,
          receiveUpdates: detailsForm.receiveUpdates,
          password: detailsForm.password || undefined
        }),
        credentials: "include"
      });
      const data = await response.json();
      if (data.success && data.user) {
        dispatch(loginSuccess(data.user));
        toast.success("Account details updated successfully");
        setDetailsForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSavingDetails(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#081F3D]">
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="w-10 h-10 animate-spin text-red-500" />
          <span className="text-sm font-medium tracking-wide">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  // Not logged in UI
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#081F3D]/5 pt-20 px-6">
        <Container className="max-w-md bg-white p-10 rounded-sm shadow-2xl border border-gray-100 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={30} />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">Access Denied</h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Please log in or create an account to view your personalized dashboard, track quote requests, and access technical documents.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full bg-[#C3110C] text-white py-3 rounded-sm font-bold text-sm hover:bg-red-700 transition shadow-lg shadow-red-600/10 cursor-pointer"
            >
              Sign In / Register
            </button>
            <Link
              to="/"
              className="block w-full text-center text-xs text-gray-500 hover:text-black font-semibold transition"
            >
              Back to Homepage
            </Link>
          </div>
          <AuthModal isOpen={isAuthOpen} onClose={() => { setIsAuthOpen(false); fetchProfile(); }} />
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-20">
      <Container>
        <div className="mb-10">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900">My Account</h1>
          <div className="h-1 w-20 bg-red-600 mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          {/* ─── SIDEBAR NAVIGATION ─── */}
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100 space-y-2">

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-sm font-bold tracking-tight transition-all cursor-pointer ${activeTab === "dashboard"
                ? "bg-[#1A3263] text-white shadow-md shadow-[#1A3263]/10"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
            >
              <div className="flex items-center gap-3">
                <User size={16} />
                <span>Dashboard</span>
              </div>
              <ChevronRight size={14} className={activeTab === "dashboard" ? "opacity-100" : "opacity-30"} />
            </button>

            <button
              onClick={() => setActiveTab("quotes")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-sm font-bold tracking-tight transition-all cursor-pointer ${activeTab === "quotes"
                ? "bg-[#1A3263] text-white shadow-md shadow-[#1A3263]/10"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
            >
              <div className="flex items-center gap-3">
                <FileText size={16} />
                <span>Quotes</span>
              </div>
              <ChevronRight size={14} className={activeTab === "quotes" ? "opacity-100" : "opacity-30"} />
            </button>

            <button
              onClick={() => setActiveTab("downloads")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-sm font-bold tracking-tight transition-all cursor-pointer ${activeTab === "downloads"
                ? "bg-[#1A3263] text-white shadow-md shadow-[#1A3263]/10"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
            >
              <div className="flex items-center gap-3">
                <Download size={16} />
                <span>Downloads</span>
              </div>
              <ChevronRight size={14} className={activeTab === "downloads" ? "opacity-100" : "opacity-30"} />
            </button>

            <button
              onClick={() => setActiveTab("account-details")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-sm font-bold tracking-tight transition-all cursor-pointer ${activeTab === "account-details"
                ? "bg-[#1A3263] text-white shadow-md shadow-[#1A3263]/10"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
            >
              <div className="flex items-center gap-3">
                <Settings size={16} />
                <span>Account Details</span>
              </div>
              <ChevronRight size={14} className={activeTab === "account-details" ? "opacity-100" : "opacity-30"} />
            </button>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => handleLogout()}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* ─── MAIN CONTENT DISPLAY ─── */}
          <div className="lg:col-span-3 bg-white p-8 rounded-md shadow-sm border border-gray-100 min-h-[400px]">

            {/* TABS CONTROLLER */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">

                {/* Woo-style Temporary Password or Secure Alert Box */}
                <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-sm flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-emerald-800 text-xs font-semibold">
                    Your account is secure and active. All quote records and technical document downloads will automatically synchronize with your profile.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Hello <span className="text-[#C3110C] font-extrabold">{user.firstName || user.name}</span>{" "}
                    <span className="text-xs text-gray-500 font-normal">
                      (not {user.firstName || user.name}?{" "}
                      <button onClick={() => handleLogout()} className="text-[#C3110C] font-bold hover:underline bg-transparent border-0 cursor-pointer">
                        Log out
                      </button>
                      )
                    </span>
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                    From your account dashboard, you can view your <span className="font-semibold text-gray-900">recent quotes</span>,
                    manage your <span className="font-semibold text-gray-900">downloaded documents</span>, and edit your{" "}
                    <span className="font-semibold text-[#C3110C] hover:underline cursor-pointer" onClick={() => setActiveTab("account-details")}>
                      password and account details
                    </span>.
                  </p>
                </div>

                {/* Micro metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                  <div className="bg-gray-50 p-5 rounded-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs text-gray-400 ">Total Quotes</span>
                    <span className="text-3xl font-extrabold text-[#1A3263] mt-2">{quotes.length || 0}</span>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs text-gray-400 ">Document Downloads</span>
                    <span className="text-3xl font-extrabold text-[#1A3263] mt-2">{user.downloadedPdfs?.length || 0}</span>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs  text-gray-400 ">Country Location</span>
                    <span className="text-lg font-bold text-[#1A3263] mt-2 truncate">{user.country || "Cambodia"}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "quotes" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Submitted Quotes</h2>
                <div className="h-0.5 w-10 bg-red-600" />

                {loadingQuotes ? (
                  <div className="flex flex-col items-center py-12 gap-3">
                    <Loader2 className="animate-spin text-red-600 w-8 h-8" />
                    <span className="text-xs text-gray-500">Retrieving quotes...</span>
                  </div>
                ) : quotes.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-lg">
                    <FileText className="mx-auto text-gray-300 mb-3" size={40} />
                    <p className="text-gray-500 text-sm font-semibold">No quotes requested yet</p>
                    <p className="text-gray-400 text-xs mt-1">Submit a quote request to see it appear here.</p>
                    <Link to="/request-quote" className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-sm transition">
                      Request a Quote
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quotes.map((quote) => (
                      <div key={quote._id} className="border border-gray-150 rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition">
                        <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between border-b border-gray-150 gap-4">
                          <div>
                            <span className="text-[10px] font-bold text-gray-400">Date</span>
                            <p className="text-xs font-bold text-gray-800">{new Date(quote.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-gray-400">Company</span>
                            <p className="text-xs font-bold text-gray-800 truncate max-w-[150px]">{quote.company}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-gray-400">Title / Role</span>
                            <p className="text-xs font-bold text-gray-800">{quote.title}</p>
                          </div>
                          <span className="bg-[#1A3263]/10 text-[#1A3263] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full">
                            {quote.products?.length || 0} Products
                          </span>
                        </div>

                        <div className="p-6">
                          <h4 className="text-xs font-bold text-gray-500 mb-3">Requested Categories</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {quote.solutionCategories?.map((cat, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-sm border border-gray-200">
                                {cat}
                              </span>
                            ))}
                          </div>

                          <h4 className="text-xs font-bold text-gray-500 mb-2">Requested Products ({quote.products?.length || 0})</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                              <thead>
                                <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-bold">
                                  <th className="py-2 w-12 text-center">Qty</th>
                                  <th className="py-2 pl-4">Product No</th>
                                  <th className="py-2">Description</th>
                                  <th className="py-2">Application</th>
                                </tr>
                              </thead>
                              <tbody>
                                {quote.products?.map((prod, idx) => (
                                  <tr key={idx} className="border-b border-gray-50 last:border-0 text-xs text-gray-700 hover:bg-gray-50/50">
                                    <td className="py-2 text-center font-bold text-gray-900 bg-gray-50 rounded-sm">{prod.qty}x</td>
                                    <td className="py-2 pl-4 font-mono font-semibold text-red-600">{prod.productNo}</td>
                                    <td className="py-2 truncate max-w-[200px]" title={prod.description}>{prod.description}</td>
                                    <td className="py-2 text-gray-500">{prod.application}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "downloads" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Downloaded Documents</h2>
                <div className="h-0.5 w-10 bg-red-600" />

                {!user.downloadedPdfs || user.downloadedPdfs.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-lg">
                    <Download className="mx-auto text-gray-300 mb-3" size={40} />
                    <p className="text-gray-500 text-sm font-semibold">No downloaded documents yet</p>
                    <p className="text-gray-400 text-xs mt-1">Explore our product lines or Document Center to fetch technical guides.</p>
                    <Link to="/document-center" className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-sm transition">
                      Visit Document Center
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.downloadedPdfs.map((pdf, idx) => (
                      <div key={idx} className="p-4 border border-gray-150 rounded-sm hover:border-[#1A3263] transition flex items-center justify-between bg-white group gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-sm flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-extrabold">PDF</span>
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-gray-800 truncate group-hover:text-[#1A3263] transition" title={pdf.title}>
                              {pdf.title}
                            </h4>
                            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                              Downloaded {new Date(pdf.downloadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <a
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 transition flex-shrink-0"
                          title="Redownload File"
                        >
                          <Download size={16} />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "account-details" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
                  <div className="h-0.5 w-10 bg-red-600 mt-2" />
                </div>

                <form onSubmit={handleSaveDetails} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs  text-gray-400  mb-2">First Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="firstName"
                          value={detailsForm.firstName}
                          onChange={handleDetailsChange}
                          className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                          placeholder="First Name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs  text-gray-400  mb-2">Last Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="lastName"
                          value={detailsForm.lastName}
                          onChange={handleDetailsChange}
                          className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs  text-gray-400  mb-2">Email Address (Read-only)</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm bg-gray-50 text-gray-400 cursor-not-allowed outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 block">Your email address is automatically verified via Google or Registration.</span>
                    </div>

                    <div>
                      <label className="block text-xs  text-gray-400  mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="phone"
                          value={detailsForm.phone}
                          onChange={handleDetailsChange}
                          className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs  text-gray-400  mb-2">Professional Role</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 text-gray-400" size={16} />
                        <select
                          name="role"
                          value={detailsForm.role}
                          onChange={handleDetailsChange}
                          className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm bg-white outline-none focus:border-red-600 transition"
                        >
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
                        <select
                          name="country"
                          value={detailsForm.country}
                          onChange={handleDetailsChange}
                          className="pl-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition bg-white appearance-none cursor-pointer"
                        >
                          <option value="">Select Country</option>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Australia">Australia</option>
                          <option value="Austria">Austria</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                          <option value="Brazil">Brazil</option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Canada">Canada</option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Czech Republic">Czech Republic</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Dominican Republic">Dominican Republic</option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Egypt">Egypt</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Greece">Greece</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Hong Kong">Hong Kong</option>
                          <option value="Hungary">Hungary</option>
                          <option value="India">India</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Iran">Iran</option>
                          <option value="Iraq">Iraq</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Israel">Israel</option>
                          <option value="Italy">Italy</option>
                          <option value="Japan">Japan</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Laos">Laos</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Libya">Libya</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="North Korea">North Korea</option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Panama">Panama</option>
                          <option value="Peru">Peru</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Romania">Romania</option>
                          <option value="Russia">Russia</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Serbia">Serbia</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Slovakia">Slovakia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="South Korea">South Korea</option>
                          <option value="Spain">Spain</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Syria">Syria</option>
                          <option value="Taiwan">Taiwan</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Vietnam">Vietnam</option>
                          <option value="Yemen">Yemen</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        <svg className="absolute right-3 top-3 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Password Change (Leave blank to keep current)</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs  text-gray-400  mb-2">New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={detailsForm.password}
                            onChange={handleDetailsChange}
                            className="pl-10 pr-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                            placeholder="Minimum 8 characters"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-black cursor-pointer"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs  text-gray-400  mb-2">Confirm New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={detailsForm.confirmPassword}
                            onChange={handleDetailsChange}
                            className="pl-10 pr-10 w-full text-sm border border-gray-200 px-4 py-2.5 rounded-sm outline-none focus:border-red-600 transition"
                            placeholder="Confirm New Password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-black cursor-pointer"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-4">
                    <h3 className="text-sm font-bold text-gray-900">Communication & Alert Settings</h3>

                    {/* Checkbox Options */}
                    <div className="space-y-3">
                      <label className="flex items-start gap-3.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={detailsForm.newsletter}
                          onChange={(e) => handleCheckboxChange("newsletter", e.target.checked)}
                          className="mt-1 accent-red-600"
                        />
                        <div>
                          <span className="text-sm font-bold text-gray-800">Subscribe to our newsletter</span>
                          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Receive occasional technical tips, new product launches, and general engineering articles.</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!detailsForm.newsletter}
                          onChange={(e) => handleCheckboxChange("newsletter", !e.target.checked)}
                          className="mt-1 accent-red-600"
                        />
                        <div>
                          <span className="text-sm font-bold text-gray-800">Unsubscribe from our newsletter</span>
                          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Mute newsletter alerts. You will only receive custom quote emails and order safety updates.</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={detailsForm.receiveUpdates}
                          onChange={(e) => handleCheckboxChange("receiveUpdates", e.target.checked)}
                          className="mt-1 accent-red-600"
                        />
                        <div>
                          <span className="text-sm font-bold text-gray-800">Receive Order & Poster Updates</span>
                          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                            Get real-time browser alerts and notifications whenever we publish new posters, brochures, or architectural drawings.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={savingDetails}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-8 py-3.5 rounded-sm transition shadow-lg shadow-red-600/10 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {savingDetails ? (
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
            )}

          </div>

        </div>
      </Container>
    </div>
  );
}
