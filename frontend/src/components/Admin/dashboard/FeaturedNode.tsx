import { ArrowRight } from "lucide-react";

export function FeaturedNode() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-800 text-white min-h-[220px] flex flex-col justify-between p-8 bg-[#041527] group">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B213B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#040D1A" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
          <rect width="100%" height="100%" fill="url(#grid)" />
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
          <div className="w-px h-6 bg-slate-700" />
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
  );
}
