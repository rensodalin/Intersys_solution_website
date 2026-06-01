import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getTrajectoryData, type TrajectoryEntry } from "./utils";

interface VisitorTrajectoryChartProps {
  timeframe: "24h" | "7d" | "30d";
  onTimeframeChange: (t: "24h" | "7d" | "30d") => void;
}

export function VisitorTrajectoryChart({ timeframe, onTimeframeChange }: VisitorTrajectoryChartProps) {
  const data: TrajectoryEntry[] = getTrajectoryData(timeframe);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm lg:col-span-2 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Visitor Trajectory</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Net page views across all structural systems</p>
        </div>
        <div className="bg-gray-100 p-0.5 rounded-lg flex items-center text-[9px] font-black uppercase tracking-wider text-gray-500">
          {(["24h", "7d", "30d"] as const).map((t) => (
            <button
              key={t}
              onClick={() => onTimeframeChange(t)}
              className={`px-2.5 py-1 rounded-md transition duration-200 cursor-pointer ${timeframe === t ? "bg-white text-gray-900 shadow-sm font-black" : "hover:text-gray-800"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full relative">
        <div className="absolute top-[5%] left-[55%] -translate-x-1/2 z-10 hidden sm:block">
          <span className="bg-[#C3110C] text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase shadow">Peak</span>
          <div className="w-0.5 h-6 bg-[#C3110C] mx-auto mt-0.5 opacity-50"></div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 700 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 700 }} />
            <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ background: "#0F172A", border: "none", borderRadius: "8px", color: "#fff", fontSize: "11px", fontWeight: "bold" }} />
            <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={36}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isPeak ? "#C3110C" : "#E2E8F0"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
