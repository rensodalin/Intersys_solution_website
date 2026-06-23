import { useState, useEffect, useRef } from "react";
import { Bell, RefreshCw } from "lucide-react";
import environment from "@/enviroment/enviroment";

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  description: string;
  section: string;
  createdAt: string;
}

interface NotificationData {
  totalUnread: number;
  unreadMessages: number;
  pendingQuotes: number;
  recentItems: NotificationItem[];
}

interface HeaderProps {
  userName: string;
  userRole?: string;
  avatar?: string;
  avatarUpdatedAt?: string;
  loading: boolean;
  onRefresh: () => void;
  onSectionChange?: (section: string) => void;
}

const baseUrl = environment;

export function Header({ userName, userRole = "Administrator", avatar, avatarUpdatedAt, loading, onRefresh, onSectionChange }: HeaderProps) {
  const cacheBuster = avatar?.startsWith("/") && avatarUpdatedAt ? `?t=${avatarUpdatedAt}` : "";
  const avatarSrc = avatar?.startsWith("/") ? `${baseUrl}${avatar}${cacheBuster}` : avatar;
  const [notifData, setNotifData] = useState<NotificationData | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/activity/notifications`, { credentials: "include" });
      const json = await res.json();
      if (json.success) setNotifData(json.data);
    } catch {}
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifCount = notifData?.totalUnread || 0;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contact": return "💬";
      case "quote": return "📋";
      default: return "🔔";
    }
  };

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

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative p-1 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
            {notifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C3110C] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {notifCount > 9 ? "9+" : notifCount}
              </span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-sm shadow-xl border border-gray-150 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-800">Notifications</p>
                {notifData && (
                  <p className="text-[9px] text-gray-400 mt-0.5">
                    {notifData.unreadMessages} unread messages · {notifData.pendingQuotes} pending quotes
                  </p>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifData?.recentItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-xs text-gray-400">No recent notifications</div>
                ) : (
                  notifData?.recentItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { onSectionChange?.(item.section); setShowDropdown(false); }}
                      className="w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xs mt-0.5">{getTypeIcon(item.type)}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-gray-800">{item.title}</p>
                          <p className="text-[10px] text-gray-500 truncate mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
              {notifData && notifData.recentItems.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-100 text-center">
                  <p className="text-[9px] text-gray-400">Auto-refreshes every 15s</p>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => onSectionChange?.("settings")}
          className="flex items-center gap-3 border-l border-gray-150 pl-6 cursor-pointer hover:bg-gray-50 -mr-2 pr-2 py-1 rounded-sm transition"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-800 leading-tight">{userName}</p>
            <p className="text-[9px] font-bold text-gray-400 tracking-wider mt-0.5">{userRole}</p>
          </div>
          <img
            src={avatarSrc || `https://ui-avatars.com/api/?name=${userName}`}
            alt={userName}
            className="w-8 h-8 rounded-full border border-gray-100 shadow-sm object-cover"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </header>
  );
}
