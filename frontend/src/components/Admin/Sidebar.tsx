import { Link } from "@tanstack/react-router";
import logo from "../../assets/logo.avif";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Users,
  Package,
  ImageIcon,
  Newspaper,
  FileCheck,
  Settings,
} from "lucide-react";

const avatarColors = [
  "#1A3263", "#C3110C", "#0D7C5E", "#B85C1A",
  "#6C3483", "#1B7B9E", "#A04000", "#2E86C1",
  "#7D3C98", "#1E8449", "#D35400", "#2471A3",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

interface SidebarProps {
  userName: string;
  activeSection: "dashboard" | "quotes" | "analytics" | "customers" | "products" | "posters" | "insights" | "reports" | "settings";
  onSectionChange: (section: "dashboard" | "quotes" | "analytics" | "customers" | "products" | "posters" | "insights" | "reports" | "settings") => void;
}

export function Sidebar({ userName, activeSection, onSectionChange }: SidebarProps) {
  const getButtonClass = (section: "dashboard" | "quotes" | "analytics" | "customers" | "products" | "posters" | "insights" | "reports" | "settings") => {
    const baseClass = "w-full flex items-center gap-3 px-4 py-3 text-sm transition cursor-pointer rounded-sm";
    if (activeSection === section) {
      return `${baseClass} font-bold bg-[#C3110C] text-white shadow-lg shadow-[#C3110C]/20`;
    }
    return `${baseClass} font-semibold text-white/50 hover:bg-white/5 hover:text-white`;
  };

  return (
    <aside className="w-64 bg-[#081F3D] text-white flex flex-col justify-between flex-shrink-0 min-h-screen shadow-xl fixed left-0 top-0 bottom-0">
      <div>
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center justify-center gap-2">
            <img
              src={logo}
              alt="INTERSYS SOLUTIONS"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          <button 
            onClick={() => onSectionChange("dashboard")}
            className={getButtonClass("dashboard")}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => onSectionChange("quotes")}
            className={getButtonClass("quotes")}
          >
            <FileText size={18} />
            <span>Quote Requests</span>
          </button>

          <button 
            onClick={() => onSectionChange("analytics")}
            className={getButtonClass("analytics")}
          >
            <BarChart2 size={18} />
            <span>Analytics</span>
          </button>

          <button 
            onClick={() => onSectionChange("customers")}
            className={getButtonClass("customers")}
          >
            <Users size={18} />
            <span>Customer</span>
          </button>

          <button 
            onClick={() => onSectionChange("products")}
            className={getButtonClass("products")}
          >
            <Package size={18} />
            <span>Product Management</span>
          </button>

          <button 
            onClick={() => onSectionChange("posters")}
            className={getButtonClass("posters")}
          >
            <ImageIcon size={18} />
            <span>Posters</span>
          </button>

          <button 
            onClick={() => onSectionChange("insights")}
            className={getButtonClass("insights")}
          >
            <Newspaper size={18} />
            <span>Insights</span>
          </button>

          <button 
            onClick={() => onSectionChange("reports")}
            className={getButtonClass("reports")}
          >
            <FileCheck size={18} />
            <span>Reports</span>
          </button>

          <button 
            onClick={() => onSectionChange("settings")}
            className={getButtonClass("settings")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      <div className="p-4 border-t border-white/5 bg-black/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-sm" style={{ backgroundColor: getAvatarColor(userName) }}>
              {userName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{userName}</p>
              <p className="text-[10px] text-white/40 truncate">Administrator</p>
            </div>
          </div>
          <Link
            to="/my-account"
            className="text-[10px] font-bold text-red-500 hover:text-red-400"
          >
            Exit
          </Link>
        </div>
      </div>
    </aside>
  );
}
