import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, Mail, UserPlus, RefreshCw } from "lucide-react";

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

const baseUrl = `http://${window.location.hostname}:1000`;

const activityColors: Record<string, { bg: string; text: string }> = {
  success: { bg: "bg-[#0D7C5E]/10", text: "text-[#0D7C5E]" },
  warning: { bg: "bg-[#C3110C]/10", text: "text-[#C3110C]" },
  info: { bg: "bg-gray-100", text: "text-gray-500" },
  primary: { bg: "bg-[#1B7B9E]/10", text: "text-[#1B7B9E]" },
  engineer: { bg: "bg-blue-50", text: "text-blue-600" },
  technician: { bg: "bg-amber-50", text: "text-amber-600" },
  member: { bg: "bg-gray-100", text: "text-gray-500" },
  admin: { bg: "bg-purple-50", text: "text-purple-600" },
  manager: { bg: "bg-cyan-50", text: "text-cyan-600" },
};

function getRelativeTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "JUST NOW";
  if (minutes < 60) return `${minutes} MINS AGO`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "HOUR" : "HOURS"} AGO`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const iconMap: Record<string, React.ReactNode> = {
  success: <CheckCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  primary: <Mail size={16} />,
};

export function NodeActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const fetchActivities = async (all?: boolean) => {
    setLoading(true);
    try {
      const url = all ? `${baseUrl}/api/activity` : `${baseUrl}/api/activity?limit=4`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setActivities(json.data as ActivityItem[]);
      }
    } catch (err) {
      console.error("Failed to fetch activity:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(false);
  }, []);

  const handleToggle = () => {
    const next = !showAll;
    setShowAll(next);
    fetchActivities(next);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-black text-gray-900 mb-6">Node Activity</h2>
        <div className="space-y-5 max-h-80 overflow-y-auto pr-1">
          {activities.map((activity) => {
            const colorConfig = activityColors[activity.type] || activityColors.info;
            const date = new Date(activity.timestamp);
            return (
              <div key={activity.id} className="flex items-start gap-4 text-xs group">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition duration-300 group-hover:scale-105 ${colorConfig.bg} ${colorConfig.text}`}>
                  {iconMap[activity.type] ?? <UserPlus size={16} />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 truncate">{activity.title}</p>
                  <p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">{activity.description}</p>
                  <p className="text-[9px] font-bold text-blue-400 uppercase tracking-wider mt-1">{getRelativeTime(date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={handleToggle}
        className="w-full mt-6 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-bold text-xs rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
        <span>{showAll ? "Show Less" : "View More"}</span>
      </button>
    </div>
  );
}
