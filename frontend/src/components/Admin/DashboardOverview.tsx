import { useEffect, useState } from "react";
import { 
  Eye, 
  Users as UsersIcon, 
  FileText, 
  Clock, 
  CheckCircle, 
  Mail, 
  Download,
  AlertTriangle,
  ArrowRight,
  UserPlus,
  RefreshCw
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

interface DashboardStats {
  totalQuotes: number;
  pendingQuotes: number;
  inProgressQuotes: number;
  completedQuotes: number;
  totalVisitors: number;
  activeUsers: number;
  totalContacts: number;
  totalUsers: number;
  recentQuotes: any[];
  recentContacts: any[];
  recentUsers: any[];
  monthlyVelocity: { name: string; quotes: number }[];
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<"week" | "month">("week");

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/quotes/admin-stats`, {
        credentials: "include",
      });
      const resData = await response.json();
      if (resData.success) {
        setStats(resData.data);
      } else {
        throw new Error(resData.error || "Failed to fetch dashboard statistics");
      }
    } catch (err: any) {
      console.error("Dashboard stats fetch error:", err);
      setError(err.message || "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Format dynamic activity list from DB
  const getActivityLog = () => {
    const logItems: Array<{
      id: string;
      type: "success" | "warning" | "info" | "primary";
      title: string;
      description: string;
      time: string;
      timestamp: Date;
    }> = [];

    if (stats) {
      // 1. Map Completed quotes to Approved
      stats.recentQuotes.forEach((q) => {
        const date = new Date(q.createdAt);
        const name = q.name || "Client";
        const company = q.company || "Intersys Client";
        const isApproved = q.status === "Completed";
        
        logItems.push({
          id: `quote-${q._id}`,
          type: isApproved ? "success" : "info",
          title: isApproved ? `Quote #${q._id.substring(q._id.length - 4).toUpperCase()} Approved` : "New Quote Request",
          description: isApproved ? `${company} - Phase 1` : `${name} from ${company}`,
          time: getRelativeTime(date),
          timestamp: date
        });
      });

      // 2. Map Contacts to New Messages
      stats.recentContacts.forEach((c) => {
        const date = new Date(c.createdAt);
        logItems.push({
          id: `contact-${c._id}`,
          type: "primary",
          title: "New Client Message",
          description: `Inquiry regarding ${c.message.substring(0, 25)}...`,
          time: getRelativeTime(date),
          timestamp: date
        });
      });

      // 3. Map Users to Architect Onboarded / User Joined
      stats.recentUsers.forEach((u) => {
        const date = new Date(u.createdAt);
        const roleStr = u.role ? u.role.charAt(0).toUpperCase() + u.role.slice(1) : "Member";
        logItems.push({
          id: `user-${u._id}`,
          type: "warning",
          title: `${roleStr} Onboarded`,
          description: `${u.name} joined the project group`,
          time: getRelativeTime(date),
          timestamp: date
        });
      });
    }

    // Sort by date (descending)
    logItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return logItems.slice(0, 4);
  };

  const getRelativeTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "JUST NOW";
    if (minutes < 60) return `${minutes} MINS AGO`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${hours === 1 ? 'HOUR' : 'HOURS'} AGO`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  // Trajectory Chart Data (Weekly vs Monthly)
  const trajectoryDataWeek = [
    { name: "MON", visitors: 320 },
    { name: "TUE", visitors: 620 },
    { name: "WED: peak", visitors: 940 }, // Peak marker from image
    { name: "THU", visitors: 780 },
    { name: "FRI", visitors: 580 },
    { name: "SAT", visitors: 1240 },
    { name: "SUN", visitors: 980 }
  ];

  const trajectoryDataMonth = [
    { name: "W1", visitors: 1800 },
    { name: "W2", visitors: 3400 },
    { name: "W3", visitors: 4200 },
    { name: "W4", visitors: 3100 }
  ];

  const trajectoryData = timeframe === "week" ? trajectoryDataWeek : trajectoryDataMonth;

  // Velocity Bar Chart Data from API
  const velocityData = (() => {
    if (!stats?.monthlyVelocity?.length) return [{ name: "No Data", quotes: 0, highlight: false }];
    return stats.monthlyVelocity.map((item, index) => ({
      name: item.name,
      quotes: item.quotes,
      highlight: index === stats.monthlyVelocity.length - 1
    }));
  })();

  // Helper to get metric counts from real API data
  const getMetric = (type: "visitors" | "active" | "quotes" | "pending" | "completed" | "contacts") => {
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
  };

  const activityColors = {
    success: { bg: "bg-[#0D7C5E]/10", text: "text-[#0D7C5E]" },
    warning: { bg: "bg-[#C3110C]/10", text: "text-[#C3110C]" },
    info: { bg: "bg-gray-100", text: "text-gray-500" },
    primary: { bg: "bg-[#1B7B9E]/10", text: "text-[#1B7B9E]" }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header Title & Calendar Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Systems Overview.
          </h1>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 shadow-sm">
            <span>All Dates</span>
          </div>
        </div>
      </div>

      {/* Grid of 6 Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Card 1: Total Visitors */}
        <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-slate-100 text-slate-600 transition group-hover:scale-110 duration-300">
              <Eye size={16} />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-gray-900">{getMetric("visitors")}</h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Visitors</p>
          </div>
        </div>

        {/* Card 2: Active Users (logged in within 30 days) */}
        <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600 transition group-hover:scale-110 duration-300">
              <UsersIcon size={16} />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-gray-900">{getMetric("active")}</h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Active Users</p>
          </div>
        </div>

        {/* Card 3: Total Quotes */}
        <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-purple-50 text-purple-600 transition group-hover:scale-110 duration-300">
              <FileText size={16} />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-gray-900">{getMetric("quotes")}</h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Quotes</p>
          </div>
        </div>

        {/* Card 4: Pending */}
        <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-amber-50 text-amber-600 transition group-hover:scale-110 duration-300">
              <Clock size={16} />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-amber-600">{getMetric("pending")}</h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pending</p>
          </div>
        </div>

        {/* Card 5: Completed */}
        <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300 border-l-4 border-l-[#0D7C5E]">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-[#0D7C5E]/10 text-[#0D7C5E] transition group-hover:scale-110 duration-300">
              <CheckCircle size={16} />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-[#0D7C5E]">{getMetric("completed")}</h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Completed</p>
          </div>
        </div>

        {/* Card 6: Contact */}
        <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm relative overflow-hidden group hover:shadow-md transition duration-300 border-l-4 border-l-cyan-600">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-cyan-50 text-cyan-600 transition group-hover:scale-110 duration-300">
              <Mail size={16} />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-cyan-600">{getMetric("contacts")}</h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Contact</p>
          </div>
        </div>
      </div>

      {/* Middle row: Traffic Trajectory & Node Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Traffic Trajectory */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-gray-900 tracking-tight">Traffic Trajectory</h2>
              <p className="text-xs text-gray-400 mt-1 font-medium">Daily visitors analytics across global nodes</p>
            </div>
            
            {/* Week / Month segmented pills */}
            <div className="bg-gray-100 p-0.5 rounded-lg flex items-center text-[10px] font-black uppercase tracking-wider text-gray-500 shadow-inner">
              <button 
                onClick={() => setTimeframe("week")}
                className={`px-3 py-1.5 rounded-md transition duration-200 cursor-pointer ${timeframe === "week" ? "bg-white text-gray-900 shadow-sm font-black" : "hover:text-gray-800"}`}
              >
                Week
              </button>
              <button 
                onClick={() => setTimeframe("month")}
                className={`px-3 py-1.5 rounded-md transition duration-200 cursor-pointer ${timeframe === "month" ? "bg-white text-gray-900 shadow-sm font-black" : "hover:text-gray-800"}`}
              >
                Month
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trajectoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C3110C" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#C3110C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ background: '#0F172A', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                  labelStyle={{ color: '#94A3B8', fontSize: '9px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#C3110C" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorVisitors)" 
                  activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#C3110C' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Node Activity Log */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight mb-6">Node Activity</h2>
            
            <div className="space-y-5">
              {getActivityLog().map((activity) => {
                const colorConfig = activityColors[activity.type] || activityColors.info;
                return (
                  <div key={activity.id} className="flex items-start gap-4 text-xs group">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition duration-300 group-hover:scale-105 ${colorConfig.bg} ${colorConfig.text}`}>
                      {activity.type === "success" && <CheckCircle size={16} />}
                      {activity.type === "warning" && <AlertTriangle size={16} />}
                      {activity.type === "primary" && <Mail size={16} />}
                      {activity.type === "info" && <UserPlus size={16} />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 truncate">{activity.title}</p>
                      <p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">{activity.description}</p>
                      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button 
            onClick={() => fetchStats()}
            className="w-full mt-6 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            <span>View Full System Log</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Quote Velocity & Featured Node */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Quote Velocity */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight">Quote Velocity</h2>
            <p className="text-xs text-gray-400 mt-1 font-medium">Monthly generated quote requests overview</p>
          </div>

          <div className="h-48 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData} margin={{ top: 20, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ background: '#0F172A', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Bar dataKey="quotes" radius={[4, 4, 0, 0]} maxBarSize={32}>
                  {velocityData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.highlight ? "#C3110C" : "#E2E8F0"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Featured Node Premium Promotional Card */}
        <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-800 text-white min-h-[220px] flex flex-col justify-between p-8 bg-[#041527] group">
          {/* Blueprint/Architectural SVG geometric overlay */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none select-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#38BDF8" strokeWidth="0.5"/>
                </pattern>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0B213B" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#040D1A" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grad)" />
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Radial beam lines */}
              <circle cx="90%" cy="10%" r="200" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 6" className="animate-pulse" />
              <line x1="0" y1="100%" x2="100%" y2="0" stroke="#38BDF8" strokeWidth="0.75" strokeDasharray="5 5" />
            </svg>
          </div>

          <div className="relative z-10 space-y-1">
            <span className="text-[9px] font-black text-[#C3110C] tracking-widest uppercase block bg-[#C3110C]/10 w-fit px-2 py-0.5 rounded">
              Featured Node
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white mt-3 group-hover:text-[#38BDF8] transition duration-300">
              Skyline Apex Smart Integration
            </h2>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs font-bold text-sky-400">98%</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Efficiency</p>
              </div>
              <div className="w-px h-6 bg-slate-700"></div>
              <div>
                <p className="text-xs font-bold text-emerald-400">4.2ms</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Latency</p>
              </div>
            </div>

            <button className="flex items-center gap-2 bg-white hover:bg-sky-50 text-gray-900 px-4 py-2.5 text-xs font-bold rounded-full shadow hover:shadow-md transition duration-300 cursor-pointer">
              <span>Project Details</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
