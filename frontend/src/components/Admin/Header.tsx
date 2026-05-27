import { Bell, RefreshCw } from "lucide-react";

interface HeaderProps {
  userName: string;
  avatar?: string;
  loading: boolean;
  onRefresh: () => void;
}

export function Header({ userName, avatar, loading, onRefresh }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-150 flex items-center justify-between px-8 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-gray-400">Admin Panel</span>
        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
        <span className="text-xs font-semibold text-gray-600">Live Status Feed</span>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 text-gray-400 hover:text-gray-600 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100"
          title="Refresh Quotes"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>

        <div className="relative">
          <Bell className="text-gray-400 hover:text-gray-600 cursor-pointer" size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
        </div>

        <div className="flex items-center gap-3 border-l border-gray-150 pl-6">
          <img
            src={avatar || `https://ui-avatars.com/api/?name=${userName}`}
            alt={userName}
            className="w-8 h-8 rounded-full border border-gray-100 shadow-sm"
          />
          <span className="text-sm font-bold text-gray-800">{userName.split(" ")[0]}</span>
        </div>
      </div>
    </header>
  );
}
