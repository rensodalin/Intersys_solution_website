import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Container } from "@/components/Common/Container";
import { AuthModal } from "@/components/Auth/AuthModal";
import { Loader2, Lock } from "lucide-react";
import { Sidebar } from "@/components/MyAccount/Sidebar";
import { DashboardTab } from "@/components/MyAccount/DashboardTab";
import { QuotesTab } from "@/components/MyAccount/QuotesTab";
import { DownloadsTab } from "@/components/MyAccount/DownloadsTab";
import { AccountDetailsTab } from "@/components/MyAccount/AccountDetailsTab";
import { fetchProfile, fetchQuotes, logoutUser, saveProfile } from "@/components/MyAccount/api";
import type { TabType, QuoteItem, DetailsForm } from "@/components/MyAccount/types";

export const Route = createFileRoute("/my-account")({
  head: () => ({
    meta: [
      { title: "My Account — Intersys Solutions" },
      { name: "description", content: "Manage your Intersys Solutions profile, view submitted quote requests, and access your downloaded technical catalog documents." }
    ],
  }),
  component: MyAccountPage,
});

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
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [detailsForm, setDetailsForm] = useState<DetailsForm>({
    firstName: "", lastName: "", phone: "", country: "Cambodia", role: "",
    newsletter: false, receiveUpdates: false,
    currentPassword: "", password: "", confirmPassword: "",
  });

  const loadProfile = async () => {
    setLoadingProfile(true);
    const u = await fetchProfile(dispatch);
    if (u) {
      setDetailsForm({
        firstName: u.firstName || "", lastName: u.lastName || "",
        phone: u.phone || "", country: u.country || "Cambodia",
        role: u.role || "", newsletter: u.newsletter || false,
        receiveUpdates: u.receiveUpdates || false,
        currentPassword: "", password: "", confirmPassword: "",
      });
    }
    setLoadingProfile(false);
  };

  const loadQuotes = async () => {
    setLoadingQuotes(true);
    try {
      const data = await fetchQuotes();
      setQuotes(data);
    } catch {
      // handled in api
    }
    setLoadingQuotes(false);
  };

  useEffect(() => { loadProfile(); }, []);
  useEffect(() => { if (user) loadQuotes(); }, [user]);

  const handleLogout = () => logoutUser(dispatch, navigate);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDetailsForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: "newsletter" | "receiveUpdates", value: boolean) => {
    setDetailsForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingDetails(true);
    const ok = await saveProfile(dispatch, detailsForm);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
      setDetailsForm(prev => ({ ...prev, currentPassword: "", password: "", confirmPassword: "" }));
    }
    setSavingDetails(false);
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
            <Link to="/" className="block w-full text-center text-xs text-gray-500 hover:text-black font-semibold transition">
              Back to Homepage
            </Link>
          </div>
          <AuthModal isOpen={isAuthOpen} onClose={() => { setIsAuthOpen(false); loadProfile(); }} />
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-20">
      <Container>
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 pt-25">My Account</h1>
          <div className="h-1 w-20 bg-red-600 mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />

          <div className="lg:col-span-3 bg-white p-8 rounded-md shadow-sm border border-gray-100 min-h-[400px]">
            {activeTab === "dashboard" && (
              <DashboardTab user={user} quoteCount={quotes.length} onLogout={handleLogout} onGoToAccountDetails={() => setActiveTab("account-details")} />
            )}
            {activeTab === "quotes" && (
              <QuotesTab quotes={quotes} loading={loadingQuotes} />
            )}
            {activeTab === "downloads" && (
              <DownloadsTab downloadedPdfs={user.downloadedPdfs} />
            )}
            {activeTab === "account-details" && (
              <AccountDetailsTab
                form={detailsForm}
                email={user.email}
                saving={savingDetails}
                saveSuccess={saveSuccess}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                showCurrentPassword={showCurrentPassword}
                onFieldChange={handleFieldChange}
                onCheckboxChange={handleCheckboxChange}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                onToggleCurrentPassword={() => setShowCurrentPassword(!showCurrentPassword)}
                onSubmit={handleSave}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
