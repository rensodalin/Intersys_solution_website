import { useEffect, useState } from "react";
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Label
} from "recharts";
import { 
  Activity, 
  Wind, 
  Lightbulb, 
  ShieldAlert, 
  Wifi, 
  RefreshCw 
} from "lucide-react";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

interface AnalyticsStats {
  liveUsers: number;
  avgDepth: string;
  totalQuotes: number;
  totalContacts: number;
  totalUsers: number;
  recentQuotes: any[];
  recentContacts: any[];
  recentUsers: any[];
}

export function AnalyticsOverview() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/quotes/admin-analytics`, {
        credentials: "include",
      });
      const resData = await response.json();
      if (resData.success) {
        setStats(resData.data);
        const now = new Date();
        setLastUpdate(now.toUTCString().replace("GMT", "UTC"));
      } else {
        throw new Error(resData.error || "Failed to fetch analytics statistics");
      }
    } catch (err: any) {
      console.error("Analytics stats fetch error:", err);
      setError(err.message || "Failed to connect to backend");
      // Set current date even on fallback
      const now = new Date();
      setLastUpdate(now.toUTCString().replace("GMT", "UTC"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Format dynamic telemetry log list from DB + Fallbacks
  const getTelemetryLog = () => {
    const logItems: Array<{
      id: string;
      level: "danger" | "info";
      title: string;
      description: string;
      time: string;
      timestamp: Date;
    }> = [];

    if (stats) {
      // 1. Map Contacts to External Visitor viewed
      stats.recentContacts.forEach((c) => {
        const date = new Date(c.createdAt);
        logItems.push({
          id: `telemetry-contact-${c._id}`,
          level: "info",
          title: `External Visitor: ID #QR-${c._id.substring(c._id.length - 4).toUpperCase()}`,
          description: `Inquiry from ${c.name} (${c.country || 'Global'})`,
          time: getRelativeTime(date),
          timestamp: date
        });
      });

      // 2. Map Quotes to Quote Requested alert
      stats.recentQuotes.forEach((q) => {
        const date = new Date(q.createdAt);
        const city = q.city || "Zurich";
        logItems.push({
          id: `telemetry-quote-${q._id}`,
          level: "danger",
          title: `Quote Requested: ${q.company || "Tower B"}`,
          description: `New System Inquiry from ${city} Office`,
          time: getRelativeTime(date),
          timestamp: date
        });
      });
    }

    // Sort by date (descending)
    logItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Mock telemetry items matching mockup image exactly
    const mockTelemetry = [
      {
        id: "mock-tel-1",
        level: "danger" as const,
        title: "HVAC Threshold Triggered",
        description: "Sector 3D - Dubai Financial Center",
        time: "2 SEC AGO",
        timestamp: new Date(Date.now() - 2000)
      },
      {
        id: "mock-tel-2",
        level: "danger" as const,
        title: "External Visitor: ID #9022",
        description: "Viewed: Structural Integrity Report",
        time: "1 MIN AGO",
        timestamp: new Date(Date.now() - 60000)
      },
      {
        id: "mock-tel-3",
        level: "info" as const,
        title: "System Sync: Lighting Hub",
        description: "Automated optimization routine completed",
        time: "5 MIN AGO",
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: "mock-tel-4",
        level: "info" as const,
        title: "Quote Requested: Tower B",
        description: "New Lead from Zurich Office",
        time: "12 MIN AGO",
        timestamp: new Date(Date.now() - 720000)
      }
    ];

    // Combine: real telemetry on top, fill with mockup fallbacks to maintain 4 items
    const combined = [...logItems];
    mockTelemetry.forEach((mock) => {
      if (combined.length < 4 && !combined.some(item => item.title === mock.title)) {
        combined.push({
          id: mock.id,
          level: mock.level,
          title: mock.title,
          description: mock.description,
          time: mock.time,
          timestamp: mock.timestamp
        });
      }
    });

    return combined.slice(0, 4);
  };

  const getRelativeTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds === 0 ? 1 : seconds} SEC AGO`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} MIN AGO`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${hours === 1 ? 'HOUR' : 'HOURS'} AGO`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  // Trajectory Bar Chart Data (mockups with specific Peak element)
  const getTrajectoryData = () => {
    if (timeframe === "24h") {
      return [
        { name: "00:00", value: 120 },
        { name: "03:00", value: 90 },
        { name: "06:00", value: 210 },
        { name: "09:00", value: 290 },
        { name: "12:00", value: 310, isPeak: true }, // Peak Highlighted
        { name: "15:00", value: 260 },
        { name: "18:00", value: 280 },
        { name: "21:00", value: 190 }
      ];
    }
    if (timeframe === "7d") {
      return [
        { name: "MON", value: 1800 },
        { name: "TUE", value: 2200 },
        { name: "WED", value: 2400 },
        { name: "THU", value: 3200, isPeak: true }, // Peak Highlighted
        { name: "FRI", value: 2800 },
        { name: "SAT", value: 1500 },
        { name: "SUN", value: 1300 }
      ];
    }
    return [
      { name: "W1", value: 9800 },
      { name: "W2", value: 12400, isPeak: true }, // Peak Highlighted
      { name: "W3", value: 11200 },
      { name: "W4", value: 10500 }
    ];
  };

  const trajectoryData = getTrajectoryData();

  // Interface Dynamics Doughnut Data: Desktop (75%) vs Mobile (25%)
  const dynamicsData = [
    { name: "Desktop", value: 75, color: "#C3110C" },
    { name: "Mobile", value: 25, color: "#1E293B" }
  ];

  // Helper values
  const liveUsersCount = stats ? stats.liveUsers : 1402;
  const avgDepthVal = stats ? stats.avgDepth : "4.2m";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Top Right Metrics Cards */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Structural <span className="text-[#C3110C]">Insights</span>
          </h1>
          <p className="text-gray-500 text-xs mt-1 max-w-xl font-medium leading-relaxed">
            Real-time building system telemetry and digital visitor interaction metrics for global architectural assets.
          </p>
        </div>

        {/* Mini stats widgets (Live Users, Avg Depth) */}
        <div className="flex items-center gap-4">
          <div className="bg-white px-5 py-3 rounded-lg border border-gray-150 shadow-sm text-center min-w-[90px]">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Live Users</p>
            <p className="text-lg font-black text-gray-800 mt-1">{liveUsersCount.toLocaleString()}</p>
          </div>
          <div className="bg-white px-5 py-3 rounded-lg border border-gray-150 shadow-sm text-center min-w-[90px]">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Avg Depth</p>
            <p className="text-lg font-black text-gray-800 mt-1">{avgDepthVal}</p>
          </div>
        </div>
      </div>

      {/* Row 1: Visitor Trajectory & Global Presence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visitor Trajectory Column Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Visitor Trajectory</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Net page views across all structural systems</p>
            </div>

            {/* Timeframe pill selector */}
            <div className="bg-gray-100 p-0.5 rounded-lg flex items-center text-[9px] font-black uppercase tracking-wider text-gray-500">
              {(["24h", "7d", "30d"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 rounded-md transition duration-200 cursor-pointer ${timeframe === t ? "bg-white text-gray-900 shadow-sm font-black" : "hover:text-gray-800"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full relative">
            {/* Peak label indicator */}
            <div className="absolute top-[5%] left-[55%] -translate-x-1/2 z-10 hidden sm:block">
              <span className="bg-[#C3110C] text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase shadow">
                Peak
              </span>
              <div className="w-0.5 h-6 bg-[#C3110C] mx-auto mt-0.5 opacity-50"></div>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trajectoryData} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
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
                <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={36}>
                  {trajectoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isPeak ? "#C3110C" : "#E2E8F0"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Presence World Map Card */}
        <div className="bg-[#040D1A] text-white p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-wider text-white">Global Presence</h2>
              <span className="p-1.5 rounded-full bg-slate-800/80 text-gray-300">
                <Wifi size={14} className="animate-pulse" />
              </span>
            </div>
            <p className="text-[9px] font-black text-sky-400 tracking-wider uppercase mt-1">Active Connection Hubs</p>

            {/* Stylized geometric Map SVG */}
            <div className="w-full h-36 mt-4 relative flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                <path d="M 20,40 Q 30,35 45,45 T 70,50 T 90,40 T 110,48 T 130,42 T 160,35 T 180,48 T 195,40" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M 10,70 Q 25,60 40,75 T 70,65 T 100,78 T 120,68 T 150,72 T 180,60" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                {/* Outlines of continents in futuristic dots/lines */}
                <rect x="25" y="30" width="30" height="20" rx="5" fill="none" stroke="#334155" strokeWidth="0.5" />
                <rect x="75" y="25" width="40" height="30" rx="8" fill="none" stroke="#334155" strokeWidth="0.5" />
                <rect x="135" y="35" width="45" height="25" rx="6" fill="none" stroke="#334155" strokeWidth="0.5" />
                <rect x="40" y="65" width="25" height="25" rx="4" fill="none" stroke="#334155" strokeWidth="0.5" />
              </svg>
              {/* pulsing hub coordinates */}
              <span className="absolute top-[40%] left-[25%] w-2 h-2 bg-[#C3110C] rounded-full shadow-lg shadow-[#C3110C]/80 animate-ping"></span>
              <span className="absolute top-[40%] left-[25%] w-1.5 h-1.5 bg-[#C3110C] rounded-full"></span>

              <span className="absolute top-[35%] left-[52%] w-2 h-2 bg-[#C3110C] rounded-full shadow-lg shadow-[#C3110C]/80 animate-ping"></span>
              <span className="absolute top-[35%] left-[52%] w-1.5 h-1.5 bg-[#C3110C] rounded-full"></span>

              <span className="absolute top-[50%] left-[65%] w-2 h-2 bg-[#C3110C] rounded-full shadow-lg shadow-[#C3110C]/80 animate-ping"></span>
              <span className="absolute top-[50%] left-[65%] w-1.5 h-1.5 bg-[#C3110C] rounded-full"></span>
            </div>
          </div>

          {/* Regional indicators */}
          <div className="space-y-3 mt-4 text-[10px] font-bold">
            <div>
              <div className="flex items-center justify-between text-gray-400">
                <span>North America</span>
                <span className="text-white">42%</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-[#C3110C] rounded-full transition-all duration-1000" style={{ width: "42%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Europe</span>
                <span className="text-white">28%</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-[#C3110C] rounded-full transition-all duration-1000" style={{ width: "28%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Product Popularity, Interface Dynamics, Real-time Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Product Popularity */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-6">Product Popularity</h2>
            
            <div className="space-y-6">
              {/* Product 1: HVAC Smart Nodes */}
              <div className="flex items-center gap-4 text-xs">
                <span className="w-9 h-9 rounded-lg bg-red-50 text-[#C3110C] flex items-center justify-center shrink-0">
                  <Wind size={18} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 truncate">HVAC Smart Nodes</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">SYSTEMS/CLIMATE</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-gray-800">54.2k</p>
                  <p className="text-[9px] font-black text-emerald-600 mt-0.5">+12%</p>
                </div>
              </div>

              {/* Product 2: Luminous Grid */}
              <div className="flex items-center gap-4 text-xs">
                <span className="w-9 h-9 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Lightbulb size={18} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 truncate">Luminous Grid</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">SYSTEMS/LIGHTING</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-gray-800">52.1k</p>
                  <p className="text-[9px] font-black text-emerald-600 mt-0.5">+8%</p>
                </div>
              </div>

              {/* Product 3: Access Control */}
              <div className="flex items-center gap-4 text-xs">
                <span className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Activity size={18} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 truncate">Access Control</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">SYSTEMS/SECURITY</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-gray-800">41.8k</p>
                  <p className="text-[9px] font-black text-red-600 mt-0.5">-3%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Interface Dynamics Doughnut */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-6">Interface Dynamics</h2>
            
            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dynamicsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {dynamicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label 
                      value="2.4k" 
                      position="center" 
                      className="font-black text-gray-800 text-xl"
                      fill="#1E293B"
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-[57%] left-1/2 -translate-x-1/2 text-[9px] font-bold text-gray-400 uppercase tracking-widest block text-center">
                Total Unique
              </div>
            </div>
          </div>

          {/* Pie chart legends */}
          <div className="flex items-center justify-center gap-8 text-[10px] font-black tracking-wider text-gray-500 uppercase mt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C3110C]"></span>
              <span>Desktop 75%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B]"></span>
              <span>Mobile 25%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Real-time Telemetry alert feed */}
        <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-6">Real-time Telemetry</h2>
            
            <div className="space-y-4">
              {getTelemetryLog().map((item) => (
                <div key={item.id} className="flex gap-4 pl-3 border-l-2 relative" style={{ borderLeftColor: item.level === "danger" ? "#C3110C" : "#E2E8F0" }}>
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-bold text-gray-800 truncate">{item.title}</p>
                    <p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">{item.description}</p>
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => fetchAnalytics()}
            className="w-full mt-6 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            <span>Refresh Analytics</span>
          </button>
        </div>
      </div>

      {/* Footer Info section */}
      <footer className="pt-8 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-bold text-gray-300 uppercase tracking-wider">
        <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
          <span>Last Update: {lastUpdate || "Oct 24, 2023 - 14:22:01 UTC"}</span>
          <span className="hidden sm:inline w-1 h-1 bg-gray-200 rounded-full"></span>
          <span>Active Nodes: 12,402 Units</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-center sm:text-right">
          <span>© 2023 Structural Intel — Architectural Data Systems</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#C3110C]/20 border border-[#C3110C]/40 flex items-center justify-center shrink-0">
            <span className="w-1 h-1 bg-[#C3110C] rounded-full animate-ping"></span>
          </span>
        </div>
      </footer>
    </div>
  );
}
