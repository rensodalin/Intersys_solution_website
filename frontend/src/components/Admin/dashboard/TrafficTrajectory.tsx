import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TrendPoint {
  name: string;
  visitors: number;
}

interface VisitorTrend {
  weekly: TrendPoint[];
  monthly: TrendPoint[];
}

const baseUrl = `http://${window.location.hostname}:1000`;

export function TrafficTrajectory() {
  const [timeframe, setTimeframe] = useState<"week" | "month">("week");
  const [data, setData] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchTrend = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${baseUrl}/api/visitors/trend`);
        const json = await res.json();
        if (!cancelled) {
          if (json.success) {
            const trend: VisitorTrend = json.data;
            setData(timeframe === "week" ? trend.weekly : trend.monthly);
          } else {
            setError(json.message || "Failed to load visitor data");
          }
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Failed to connect");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchTrend();
    return () => { cancelled = true; };
  }, [timeframe]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm lg:col-span-2 flex items-center justify-center h-80">
        <div className="w-8 h-8 border-2 border-[#C3110C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm lg:col-span-2 flex items-center justify-center h-80">
        <p className="text-sm text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-md border border-gray-150 shadow-sm lg:col-span-2 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-black text-gray-900 tracking-tight">Traffic Trajectory</h2>
          <p className="text-xs text-gray-400 mt-1 font-medium">Daily visitors analytics across global nodes</p>
        </div>
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
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C3110C" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#C3110C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 700 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 700 }} />
            <Tooltip
              contentStyle={{ background: "#0F172A", border: "none", borderRadius: "8px", color: "#fff", fontSize: "11px", fontWeight: "bold" }}
              labelStyle={{ color: "#94A3B8", fontSize: "9px" }}
            />
            <Area type="monotone" dataKey="visitors" stroke="#C3110C" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2, fill: "#C3110C" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
