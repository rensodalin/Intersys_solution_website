import { Search, Download } from "lucide-react";

interface FilterBarProps {
  selectedTab: "All" | "Pending" | "In Progress" | "Completed";
  onTabChange: (tab: "All" | "Pending" | "In Progress" | "Completed") => void;
  showSearch: boolean;
  searchTerm: string;
  onSearchToggle: () => void;
  onSearchChange: (value: string) => void;
  onExport: () => void;
}

export function FilterBar({
  selectedTab,
  onTabChange,
  showSearch,
  searchTerm,
  onSearchToggle,
  onSearchChange,
  onExport,
}: FilterBarProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-150 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-1.5">
        {(["All", "Pending", "In Progress", "Completed"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-sm transition cursor-pointer ${
              selectedTab === tab
                ? "bg-[#081F3D] text-white"
                : "bg-transparent text-gray-500 hover:text-black hover:bg-gray-100"
            }`}
          >
            {tab} Requests
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {showSearch && (
            <input
              type="text"
              placeholder="Search company, client, country..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border border-gray-200 px-3 py-1.5 text-xs rounded-sm outline-none focus:border-red-600 bg-white min-w-[180px] sm:min-w-[220px]"
              autoFocus
            />
          )}
          <button
            onClick={onSearchToggle}
            className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 px-4 py-2 text-xs font-bold rounded-sm cursor-pointer transition"
          >
            <Search size={14} />
            <span>Filter</span>
          </button>
        </div>

        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-[#081F3D] text-white hover:bg-red-700 px-4 py-2 text-xs font-bold rounded-sm cursor-pointer transition shadow-sm"
        >
          <Download size={14} />
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
}
