import { Loader2 } from "lucide-react";

interface MetricsCardsProps {
  totalOutstanding: number;
  inProgressCount: number;
  completedCount: number;
  loading: boolean;
  selectedTab: "All" | "Pending" | "In Progress" | "Completed";
  onTabChange: (tab: "All" | "Pending" | "In Progress" | "Completed") => void;
}

export function MetricsCards({ totalOutstanding, inProgressCount, completedCount, loading, selectedTab, onTabChange }: MetricsCardsProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onTabChange("Pending")}
        className={`bg-white px-6 py-4 rounded-sm border shadow-sm flex items-center gap-4 min-w-[160px] cursor-pointer transition ${
          selectedTab === "Pending"
            ? "border-[#C3110C] ring-1 ring-[#C3110C]/30"
            : "border-gray-150 hover:border-gray-300"
        }`}
      >
        <div>
          <span className="text-[11px] font-bold text-gray-400 block">Total Outstanding</span>
          <span className="text-3xl font-black text-[#081F3D] mt-1 block">
            {loading ? (
              <Loader2 size={24} className="animate-spin text-gray-400 mt-1" />
            ) : (
              totalOutstanding
            )}
          </span>
        </div>
      </button>

      <button
        onClick={() => onTabChange("In Progress")}
        className={`bg-white px-6 py-4 rounded-sm border shadow-sm flex items-center gap-4 min-w-[160px] cursor-pointer transition ${
          selectedTab === "In Progress"
            ? "border-[#C3110C] ring-1 ring-[#C3110C]/30"
            : "border-gray-150 hover:border-gray-300"
        }`}
      >
        <div>
          <span className="text-[11px] font-bold text-gray-400 block">In Progress</span>
          <span className="text-3xl font-black text-[#C3110C] mt-1 block">
            {loading ? (
              <Loader2 size={24} className="animate-spin text-gray-400 mt-1" />
            ) : (
              inProgressCount
            )}
          </span>
        </div>
      </button>

      <button
        onClick={() => onTabChange("Completed")}
        className={`bg-white px-6 py-4 rounded-sm border shadow-sm flex items-center gap-4 min-w-[160px] cursor-pointer transition ${
          selectedTab === "Completed"
            ? "border-[#C3110C] ring-1 ring-[#C3110C]/30"
            : "border-gray-150 hover:border-gray-300"
        }`}
      >
        <div>
          <span className="text-[11px] font-bold text-gray-400 block">Completed</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">
            {loading ? (
              <Loader2 size={24} className="animate-spin text-gray-400 mt-1" />
            ) : (
              completedCount
            )}
          </span>
        </div>
      </button>
    </div>
  );
}
