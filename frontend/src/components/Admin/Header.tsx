import { Bell, RefreshCw, Search, HelpCircle } from "lucide-react";

interface HeaderProps {
  userName: string;
  userRole?: string;
  avatar?: string;
  loading: boolean;
  onRefresh: () => void;
}

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

export function Header({ userName, userRole = "Administrator", avatar, loading, onRefresh }: HeaderProps) {
  const avatarSrc = avatar?.startsWith("/") ? `${baseUrl}${avatar}` : avatar;
  return (
    <header className="h-16 bg-white border-b border-gray-150 flex items-center justify-between px-8 z-10 shadow-sm">
      <div className="flex items-center gap-8 flex-1">
        <span className="text-sm font-bold text-gray-800 tracking-tight whitespace-nowrap">Admin Console</span>


      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 text-gray-400 hover:text-gray-600 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100"
          title="Refresh Data"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer p-1 text-gray-400 hover:text-gray-600 transition">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
          </div>


        </div>

        <div className="flex items-center gap-3 border-l border-gray-150 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-800 leading-tight">{userName}</p>
            <p className="text-[9px] font-bold text-gray-400 tracking-wider mt-0.5">{userRole}</p>
          </div>
          <img
            src={avatarSrc || `https://ui-avatars.com/api/?name=${userName}`}
            alt={userName}
            className="w-8 h-8 rounded-full border border-gray-100 shadow-sm object-cover"
          />
        </div>
      </div>
    </header>
  );
}
