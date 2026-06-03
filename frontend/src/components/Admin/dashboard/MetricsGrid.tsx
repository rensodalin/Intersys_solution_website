import { Eye, Users as UsersIcon, FileText, Clock, CheckCircle, Mail } from "lucide-react";
import { DashboardStats } from "./types";

function getMetric(stats: DashboardStats | null, type: "visitors" | "active" | "quotes" | "pending" | "completed" | "contacts") {
  if (!stats) return "0";
  const val = (() => {
    if (type === "visitors") return stats.totalVisitors;
    if (type === "active") return stats.activeUsers;
    if (type === "quotes") return stats.totalQuotes;
    if (type === "pending") return stats.pendingQuotes;
    if (type === "completed") return stats.completedQuotes;
    if (type === "contacts") return stats.totalContacts;
    return undefined;
  })();
  return val != null ? val.toLocaleString() : "0";
}

interface Props {
  stats: DashboardStats | null;
}

export function MetricsGrid({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="bg-white p-5 rounded-sm border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300">
        <div className="flex items-center justify-between">
          <span className="p-2 rounded-sm bg-slate-100 text-slate-600 transition group-hover:scale-110 duration-300">
            <Eye size={16} />
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-black text-gray-900">{getMetric(stats, "visitors")}</h3>
          <p className="text-[12px] font-bold text-gray-400  mt-1">Total Visitors</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-sm border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300">
        <div className="flex items-center justify-between">
          <span className="p-2 rounded-sm bg-blue-50 text-blue-600 transition group-hover:scale-110 duration-300">
            <UsersIcon size={16} />
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-black text-gray-900">{getMetric(stats, "active")}</h3>
          <p className="text-[12px] font-bold text-gray-400  mt-1">Active Users</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-sm border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300">
        <div className="flex items-center justify-between">
          <span className="p-2 rounded-sm bg-purple-50 text-purple-600 transition group-hover:scale-110 duration-300">
            <FileText size={16} />
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-black text-gray-900">{getMetric(stats, "quotes")}</h3>
          <p className="text-[12px] font-bold text-gray-400  mt-1">Total Quotes</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-sm border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300 border-l-4 border-l-amber-500">
        <div className="flex items-center justify-between">
          <span className="p-2 rounded-sm bg-amber-50 text-amber-600 transition group-hover:scale-110 duration-300">
            <Clock size={16} />
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-black text-amber-600">{getMetric(stats, "pending")}</h3>
          <p className="text-[12px] font-bold text-gray-400  mt-1">Pending</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-sm border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300 border-l-4 border-l-[#0D7C5E]">
        <div className="flex items-center justify-between">
          <span className="p-2 rounded-sm bg-[#0D7C5E]/10 text-[#0D7C5E] transition group-hover:scale-110 duration-300">
            <CheckCircle size={16} />
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-black text-[#0D7C5E]">{getMetric(stats, "completed")}</h3>
          <p className="text-[12px] font-bold text-gray-400  mt-1">Completed</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-sm border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300 border-l-4 border-l-cyan-600">
        <div className="flex items-center justify-between">
          <span className="p-2 rounded-sm bg-cyan-50 text-cyan-600 transition group-hover:scale-110 duration-300">
            <Mail size={16} />
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-black text-cyan-600">{getMetric(stats, "contacts")}</h3>
          <p className="text-[12px] font-bold text-gray-400  mt-1">Contact</p>
        </div>
      </div>
    </div>
  );
}
