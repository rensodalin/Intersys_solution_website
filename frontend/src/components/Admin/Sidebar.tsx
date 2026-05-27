import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Users,
  Package,
  FileCheck,
  Settings,
} from "lucide-react";

interface SidebarProps {
  userName: string;
}

export function Sidebar({ userName }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#081F3D] text-white flex flex-col justify-between flex-shrink-0 min-h-screen shadow-xl">
      <div>
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display font-black text-xl tracking-tight">
              <span className="text-[#C3110C]">INTERSYS</span> SOLUTIONS
            </span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md text-white/50 hover:bg-white/5 hover:text-white transition">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-md bg-[#C3110C] text-white shadow-lg shadow-[#C3110C]/20 transition">
            <FileText size={18} />
            <span>Quote Requests</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md text-white/50 hover:bg-white/5 hover:text-white transition">
            <BarChart2 size={18} />
            <span>Analytics</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md text-white/50 hover:bg-white/5 hover:text-white transition">
            <Users size={18} />
            <span>Customer</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md text-white/50 hover:bg-white/5 hover:text-white transition">
            <Package size={18} />
            <span>Product Management</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md text-white/50 hover:bg-white/5 hover:text-white transition">
            <FileCheck size={18} />
            <span>Reports</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md text-white/50 hover:bg-white/5 hover:text-white transition">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      <div className="p-4 border-t border-white/5 bg-black/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
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
