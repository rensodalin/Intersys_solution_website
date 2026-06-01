import { User, FileText, Download, Settings, LogOut, ChevronRight } from "lucide-react";
import type { TabType } from "./types";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
}

const tabs: { key: TabType; label: string; icon: typeof User }[] = [
  { key: "dashboard", label: "Dashboard", icon: User },
  { key: "quotes", label: "Quotes", icon: FileText },
  { key: "downloads", label: "Downloads", icon: Download },
  { key: "account-details", label: "Account Details", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange, onLogout }: SidebarProps) {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100 space-y-2">
      {tabs.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-sm font-bold tracking-tight transition-all cursor-pointer ${
            activeTab === key
              ? "bg-[#1A3263] text-white shadow-md shadow-[#1A3263]/10"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon size={16} />
            <span>{label}</span>
          </div>
          <ChevronRight size={14} className={activeTab === key ? "opacity-100" : "opacity-30"} />
        </button>
      ))}
      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
