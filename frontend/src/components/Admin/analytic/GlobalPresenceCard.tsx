import { Wifi } from "lucide-react";

export function GlobalPresenceCard() {
  return (
    <div className="bg-[#040D1A] text-white p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-between relative overflow-hidden group">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wider text-white">Global Presence</h2>
          <span className="p-1.5 rounded-full bg-slate-800/80 text-gray-300">
            <Wifi size={14} className="animate-pulse" />
          </span>
        </div>
        <p className="text-[9px] font-black text-sky-400 tracking-wider uppercase mt-1">Active Connection Hubs</p>

        <div className="w-full h-36 mt-4 relative flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
            <path d="M 20,40 Q 30,35 45,45 T 70,50 T 90,40 T 110,48 T 130,42 T 160,35 T 180,48 T 195,40" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
            <path d="M 10,70 Q 25,60 40,75 T 70,65 T 100,78 T 120,68 T 150,72 T 180,60" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
            <rect x="25" y="30" width="30" height="20" rx="5" fill="none" stroke="#334155" strokeWidth="0.5" />
            <rect x="75" y="25" width="40" height="30" rx="8" fill="none" stroke="#334155" strokeWidth="0.5" />
            <rect x="135" y="35" width="45" height="25" rx="6" fill="none" stroke="#334155" strokeWidth="0.5" />
            <rect x="40" y="65" width="25" height="25" rx="4" fill="none" stroke="#334155" strokeWidth="0.5" />
          </svg>
          <span className="absolute top-[40%] left-[25%] w-2 h-2 bg-[#C3110C] rounded-full shadow-lg shadow-[#C3110C]/80 animate-ping"></span>
          <span className="absolute top-[40%] left-[25%] w-1.5 h-1.5 bg-[#C3110C] rounded-full"></span>
          <span className="absolute top-[35%] left-[52%] w-2 h-2 bg-[#C3110C] rounded-full shadow-lg shadow-[#C3110C]/80 animate-ping"></span>
          <span className="absolute top-[35%] left-[52%] w-1.5 h-1.5 bg-[#C3110C] rounded-full"></span>
          <span className="absolute top-[50%] left-[65%] w-2 h-2 bg-[#C3110C] rounded-full shadow-lg shadow-[#C3110C]/80 animate-ping"></span>
          <span className="absolute top-[50%] left-[65%] w-1.5 h-1.5 bg-[#C3110C] rounded-full"></span>
        </div>
      </div>

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
  );
}
