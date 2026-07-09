import { Loader2 } from "lucide-react";

interface SystemPopularityProps {
  sortedPopularity: { name: string; percentage: number }[];
  loading: boolean;
}

export function SystemPopularity({ sortedPopularity, loading }: SystemPopularityProps) {
  return (
    <div className="bg-white p-6 rounded-sm border border-gray-150 shadow-sm flex flex-col lg:col-span-1">
      <span className="text-[13px] font-bold text-gray-400 block mb-4">System Categories</span>
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-gray-400 w-8 h-8" />
        </div>
      ) : sortedPopularity.length === 0 ? (
        <p className="text-xs text-gray-400 py-10 text-center">No popularity data available.</p>
      ) : (
        <div className="space-y-4">
          {sortedPopularity.map((sys, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-800">{sys.name}</span>
                <span className="font-bold text-gray-400">{sys.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C3110C] rounded-full transition-all duration-500"
                  style={{ width: `${sys.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}