import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="px-6 py-4 border-t border-gray-150 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <span className="text-xs text-gray-500 font-medium">
        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}{" "}
        requests
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-sm border border-gray-200 bg-white text-gray-500 hover:bg-gray-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition"
        >
          <ChevronLeft size={14} />
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPageChange(idx + 1)}
            className={`w-8 h-8 text-xs font-bold rounded-sm border transition cursor-pointer ${
              currentPage === idx + 1
                ? "bg-[#C3110C] border-[#C3110C] text-white"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-sm border border-gray-200 bg-white text-gray-500 hover:bg-gray-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
