import { Loader2, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { QuoteItem } from "./types";

interface QuotesTabProps {
  quotes: QuoteItem[];
  loading: boolean;
}

export function QuotesTab({ quotes, loading }: QuotesTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Submitted Quotes</h2>
      <div className="h-0.5 w-10 bg-red-600" />

      {loading ? (
        <div className="flex flex-col items-center py-12 gap-3">
          <Loader2 className="animate-spin text-red-600 w-8 h-8" />
          <span className="text-xs text-gray-500">Retrieving quotes...</span>
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-lg">
          <FileText className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-gray-500 text-sm font-semibold">No quotes requested yet</p>
          <p className="text-gray-400 text-xs mt-1">Submit a quote request to see it appear here.</p>
          <Link to="/request-quote" className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-sm transition">
            Request a Quote
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {quotes.map((quote) => (
            <div key={quote._id} className="border border-gray-150 rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition">
              <div className="bg-gray-50 px-6 py-4 grid grid-cols-4 gap-4 items-center border-b border-gray-150">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-gray-400">Date</span>
                  <p className="text-xs font-bold text-gray-800 mt-0.5">
                    {new Date(quote.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-gray-400">Company</span>
                  <p className="text-xs font-bold text-gray-800 truncate mt-0.5">{quote.company}</p>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-gray-400">Title / Role</span>
                  <p className="text-xs font-bold text-gray-800 truncate mt-0.5">{quote.title}</p>
                </div>
                <div className="text-right">
                  <span className="bg-[#1A3263]/10 text-[#1A3263] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full">
                    {quote.products?.length || 0} Products
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {quote.solutionCategories && quote.solutionCategories.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 mb-2">Requested Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {quote.solutionCategories.map((cat, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-sm border border-gray-200">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-gray-500 mb-2">Requested Products ({quote.products?.length || 0})</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-bold">
                          <th className="py-3 px-4 text-center w-14">Qty</th>
                          <th className="py-3 px-4">Product No</th>
                          <th className="py-3 px-4">Description</th>
                          <th className="py-3 px-4">Application</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quote.products?.map((prod, idx) => (
                          <tr key={idx} className="border-b border-gray-50 last:border-0 text-xs text-gray-700 hover:bg-gray-50/50">
                            <td className="py-3 px-4 text-center font-bold text-gray-900 bg-gray-50 rounded-sm w-14">{prod.qty}x</td>
                            <td className="py-3 px-4 font-mono font-semibold text-red-600">{prod.productNo}</td>
                            <td className="py-3 px-4 truncate max-w-[200px]" title={prod.description}>{prod.description}</td>
                            <td className="py-3 px-4 text-gray-500">{prod.application}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
