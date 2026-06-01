import { Wind, Lightbulb, Activity } from "lucide-react";

export function ProductPopularityCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-6">Product Popularity</h2>

        <div className="space-y-6">
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
  );
}
