import { CheckCircle2 } from "lucide-react";
import type { UserState } from "@/store/authSlice";

interface DashboardTabProps {
  user: UserState;
  quoteCount: number;
  onLogout: () => void;
  onGoToAccountDetails: () => void;
}

export function DashboardTab({ user, quoteCount, onLogout, onGoToAccountDetails }: DashboardTabProps) {
  return (
    <div className="space-y-6">
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
            <button onClick={onLogout} className="text-[#C3110C] font-bold hover:underline bg-transparent border-0 cursor-pointer">
              Log out
            </button>
            )
          </span>
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
          From your account dashboard, you can view your <span className="font-semibold text-gray-900">recent quotes</span>,
          manage your <span className="font-semibold text-gray-900">downloaded documents</span>, and edit your{" "}
          <span className="font-semibold text-[#C3110C] hover:underline cursor-pointer" onClick={onGoToAccountDetails}>
            password and account details
          </span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
        <div className="bg-gray-50 p-5 rounded-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-xs text-gray-400">Total Quotes</span>
          <span className="text-3xl font-extrabold text-[#1A3263] mt-2">{quoteCount || 0}</span>
        </div>
        <div className="bg-gray-50 p-5 rounded-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-xs text-gray-400">Document Downloads</span>
          <span className="text-3xl font-extrabold text-[#1A3263] mt-2">{user.downloadedPdfs?.length || 0}</span>
        </div>
        <div className="bg-gray-50 p-5 rounded-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-xs text-gray-400">Country Location</span>
          <span className="text-lg font-bold text-[#1A3263] mt-2 truncate">{user.country || "Cambodia"}</span>
        </div>
      </div>
    </div>
  );
}
