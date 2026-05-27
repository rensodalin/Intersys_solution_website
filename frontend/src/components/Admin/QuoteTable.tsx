import { Eye, Check, Trash2, FileText, Loader2 } from "lucide-react";
import { QuoteRequest } from "./types";

interface QuoteTableProps {
  quotes: QuoteRequest[];
  loading: boolean;
  onViewDetails: (quote: QuoteRequest) => void;
  onCycleStatus: (quote: QuoteRequest) => void;
  onDelete: (id: string) => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function QuoteTable({ quotes, loading, onViewDetails, onCycleStatus, onDelete }: QuoteTableProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center py-20 gap-3">
        <Loader2 className="animate-spin text-red-600 w-10 h-10" />
        <span className="text-xs text-gray-500 font-medium">Retrieving quote requests...</span>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="text-center py-20">
        <FileText className="mx-auto text-gray-300 mb-4" size={48} />
        <p className="text-gray-500 font-semibold text-sm">No quote requests found</p>
        <p className="text-gray-400 text-xs mt-1">
          There are no records matching your selected tab or search query.
        </p>
      </div>
    );
  }

  return (
    <table className="w-full text-left border-collapse min-w-[1200px]">
      <thead>
        <tr className="border-b border-gray-150 text-[10px] text-gray-400 font-bold bg-gray-50/50">
          <th className="px-6 py-4">ID & Date</th>
          <th className="px-6 py-4">Customer & Company</th>
          <th className="px-6 py-4">Contact Info</th>
          <th className="px-6 py-4">Location</th>
          <th className="px-6 py-4">Selected Systems</th>
          <th className="px-6 py-4">Products & Categories</th>
          <th className="px-6 py-4">Platform</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {quotes.map((quote) => {
          const idShort = `QR-${quote._id.substring(quote._id.length - 5).toUpperCase()}`;
          const firstProduct = quote.products[0];
          const totalProductsCount = quote.products.reduce(
            (acc, p) => acc + parseInt(p.qty || "0"),
            0
          );

          return (
            <tr
              key={quote._id}
              className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 text-xs text-gray-700 transition"
            >
              <td className="px-6 py-4">
                <span className="font-bold text-gray-900 block">{idShort}</span>
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  {formatDate(quote.createdAt)}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1A3263]/10 text-[#1A3263] flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {getInitials(quote.name)}
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-gray-900 block truncate" title={quote.name}>
                      {quote.name}
                    </span>
                    <span
                      className="text-[10px] text-gray-400 block truncate"
                      title={`${quote.title} | ${quote.company}`}
                    >
                      {quote.title}
                    </span>
                    <span
                      className="text-[10px] font-semibold text-[#1A3263] block truncate"
                      title={quote.company}
                    >
                      {quote.company}
                    </span>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <span
                  className="block font-medium text-gray-800 truncate max-w-[150px]"
                  title={quote.email}
                >
                  {quote.email}
                </span>
                <span className="text-[10px] text-gray-400 block mt-0.5">{quote.phone}</span>
              </td>

              <td className="px-6 py-4">
                <span className="font-medium text-gray-900 block">{quote.city || "N/A"}</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  {quote.country || "Cambodia"}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {quote.solutionCategories.map((sys, idx) => (
                    <span
                      key={idx}
                      className="bg-[#081F3D]/5 text-[#081F3D] text-[9px] font-bold px-2 py-0.5 rounded-sm"
                    >
                      {sys.replace("System", "").trim()}
                    </span>
                  ))}
                </div>
              </td>

              <td className="px-6 py-4">
                {firstProduct ? (
                  <div className="min-w-0 max-w-[200px]">
                    <span className="font-bold text-red-600 bg-red-50 text-[9px] px-1 py-0.5 rounded-sm">
                      {firstProduct.qty}x
                    </span>{" "}
                    <span className="font-bold text-[#081F3D]">{firstProduct.productNo}</span>{" "}
                    <span
                      className="text-gray-500 block truncate mt-0.5"
                      title={firstProduct.description}
                    >
                      {firstProduct.description}
                    </span>
                    {quote.products.length > 1 && (
                      <span
                        className="text-[10px] text-gray-400 font-semibold mt-0.5 block hover:underline cursor-pointer"
                        onClick={() => onViewDetails(quote)}
                      >
                        + {quote.products.length - 1} more items (Total: {totalProductsCount})
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">None</span>
                )}
              </td>

              <td className="px-6 py-4">
                <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-1 rounded-sm">
                  {quote.bmsSystem}
                </span>
              </td>

              <td className="px-6 py-4">
                <span
                  onClick={() => onCycleStatus(quote)}
                  title="Click to cycle status"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition select-none ${
                    quote.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : quote.status === "In Progress"
                        ? "bg-blue-50 text-blue-700 border border-blue-100"
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      quote.status === "Completed"
                        ? "bg-emerald-500"
                        : quote.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-amber-500"
                    }`}
                  ></span>
                  <span>{quote.status}</span>
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => onViewDetails(quote)}
                    className="p-2 text-gray-400 hover:text-[#081F3D] hover:bg-gray-100 rounded-sm cursor-pointer transition"
                    title="View Details"
                  >
                    <Eye size={15} />
                  </button>

                  <button
                    onClick={() => onCycleStatus(quote)}
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-sm cursor-pointer transition"
                    title="Cycle Status"
                  >
                    <Check size={15} />
                  </button>

                  <button
                    onClick={() => onDelete(quote._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm cursor-pointer transition"
                    title="Delete Quote Request"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
