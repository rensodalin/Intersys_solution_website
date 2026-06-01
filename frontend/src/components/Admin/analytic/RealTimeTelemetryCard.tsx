import { RefreshCw } from "lucide-react";
import type { AnalyticsStats } from "./types";
import { getTelemetryLog } from "./utils";

interface RealTimeTelemetryCardProps {
  stats: AnalyticsStats | null;
  loading: boolean;
  onRefresh: () => void;
}

export function RealTimeTelemetryCard({ stats, loading, onRefresh }: RealTimeTelemetryCardProps) {
  const telemetryLog = getTelemetryLog(stats);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-6">Real-time Telemetry</h2>

        <div className="space-y-4">
          {telemetryLog.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 pl-3 border-l-2 relative"
              style={{ borderLeftColor: item.level === "danger" ? "#C3110C" : "#E2E8F0" }}
            >
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
        onClick={onRefresh}
        className="w-full mt-6 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
        <span>Refresh Analytics</span>
      </button>
    </div>
  );
}
