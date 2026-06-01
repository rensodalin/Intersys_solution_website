import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { DashboardStats } from "./types";

interface Props {
  stats: DashboardStats | null;
}

export function QuoteVelocity({ stats }: Props) {
  const velocityData = (() => {
    if (!stats?.monthlyVelocity?.length) return [{ name: "No Data", quotes: 0, highlight: false }];
    return stats.monthlyVelocity.map((item, index) => ({
      name: item.name,
      quotes: item.quotes,
      highlight: index === stats.monthlyVelocity.length - 1,
    }));
  })();

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-black text-gray-900 tracking-tight">Quote Velocity</h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">Monthly generated quote requests overview</p>
      </div>
      <div className="h-48 w-full mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={velocityData} margin={{ top: 20, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 700 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 700 }} />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{ background: "#8d9199ff", border: "none", borderRadius: "8px", color: "#fff", fontSize: "11px", fontWeight: "bold" }}
            />
            <Bar dataKey="quotes" radius={[4, 4, 0, 0]} maxBarSize={32}>
              {velocityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.highlight ? "#C3110C" : "#E2E8F0"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
