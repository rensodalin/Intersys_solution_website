import { Loader2 } from "lucide-react";

interface MetricsCardsProps {
  totalOutstanding: number;
  inProgressCount: number;
  loading: boolean;
}

export function MetricsCards({ totalOutstanding, inProgressCount, loading }: MetricsCardsProps) {
  return (
    <div className="flex gap-4">
      <div className="bg-white px-6 py-4 rounded-sm border border-gray-150 shadow-sm flex items-center gap-4 min-w-[160px]">
        <div>
          <span className="text-[10px] font-bold text-gray-400 block">Total Outstanding</span>
          <span className="text-3xl font-black text-[#081F3D] mt-1 block">
            {loading ? (
              <Loader2 size={24} className="animate-spin text-gray-400 mt-1" />
            ) : (
              totalOutstanding
            )}
          </span>
        </div>
      </div>

      <div className="bg-white px-6 py-4 rounded-sm border border-gray-150 shadow-sm flex items-center gap-4 min-w-[160px]">
        <div>
          <span className="text-[10px] font-bold text-gray-400 block">In Progress</span>
          <span className="text-3xl font-black text-[#C3110C] mt-1 block">
            {loading ? (
              <Loader2 size={24} className="animate-spin text-gray-400 mt-1" />
            ) : (
              inProgressCount
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
