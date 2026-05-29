import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const trajectoryDataWeek = [
  { name: "MON", visitors: 320 },
  { name: "TUE", visitors: 620 },
  { name: "WED: peak", visitors: 940 },
  { name: "THU", visitors: 780 },
  { name: "FRI", visitors: 580 },
  { name: "SAT", visitors: 1240 },
  { name: "SUN", visitors: 980 },
];

const trajectoryDataMonth = [
  { name: "W1", visitors: 1800 },
  { name: "W2", visitors: 3400 },
  { name: "W3", visitors: 4200 },
  { name: "W4", visitors: 3100 },
];

interface Props {
  timeframe: "week" | "month";
  onTimeframeChange: (t: "week" | "month") => void;
}

export function TrafficTrajectory({ timeframe, onTimeframeChange }: Props) {
  const data = timeframe === "week" ? trajectoryDataWeek : trajectoryDataMonth;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm lg:col-span-2 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-black text-gray-900 tracking-tight">Traffic Trajectory</h2>
          <p className="text-xs text-gray-400 mt-1 font-medium">Daily visitors analytics across global nodes</p>
        </div>
        <div className="bg-gray-100 p-0.5 rounded-lg flex items-center text-[10px] font-black uppercase tracking-wider text-gray-500 shadow-inner">
          <button
            onClick={() => onTimeframeChange("week")}
            className={`px-3 py-1.5 rounded-md transition duration-200 cursor-pointer ${timeframe === "week" ? "bg-white text-gray-900 shadow-sm font-black" : "hover:text-gray-800"}`}
          >
            Week
          </button>
          <button
            onClick={() => onTimeframeChange("month")}
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
