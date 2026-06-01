import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";
import { dynamicsData } from "./utils";

export function InterfaceDynamicsCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-6">Interface Dynamics</h2>

        <div className="h-44 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dynamicsData} cx="50%" cy="50%" innerRadius={60} outerRadius={75} paddingAngle={3} dataKey="value">
                {dynamicsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Label value="2.4k" position="center" className="font-black text-gray-800 text-xl" fill="#1E293B" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-[57%] left-1/2 -translate-x-1/2 text-[9px] font-bold text-gray-400 uppercase tracking-widest block text-center">
            Total Unique
          </div>
        </div>
      </div>

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
  );
}
