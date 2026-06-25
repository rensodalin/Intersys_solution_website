import { Package, Pencil, Trash2, ChevronLeft, ChevronRight, Loader2, Layers } from "lucide-react";
import type { ApiProduct } from "./types";
import { ITEMS_PER_PAGE } from "./constants";

interface ProductTableProps {
  loading: boolean;
  paged: ApiProduct[];
  filtered: ApiProduct[];
  page: number;
  totalPages: number;
  search: string;
  onPageChange: (page: number) => void;
  onEdit: (p: ApiProduct) => void;
  onDelete: (p: ApiProduct) => void;
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-0.5">{part}</mark>
      : part
  );
}

export function ProductTable({ loading, paged, filtered, page, totalPages, search, onPageChange, onEdit, onDelete }: ProductTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 size={32} className="text-[#C3110C] animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (paged.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Package size={40} className="text-gray-200" />
          <p className="text-sm text-gray-400 font-medium">
            {search ? "No products match your search." : "No products found. Click 'Add New Product' to get started."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left text-[11px] font-black text-gray-400  px-4 py-3">Product</th>
              <th className="text-left text-[11px] font-black text-gray-400  px-4 py-3">Category</th>
              <th className="text-left text-[11px] font-black text-gray-400  px-4 py-3">Subcategory</th>
              <th className="text-left text-[11px] font-black text-gray-400  px-4 py-3">Options</th>
              <th className="text-right text-[11px] font-black text-gray-400  px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paged.map(p => (
              <tr key={p.productId} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {p.mainImage
                        ? <img src={p.mainImage} alt={p.title} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        : <Package size={16} className="text-gray-300" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 truncate max-w-[200px]">{highlight(p.title, search)}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{highlight(p.productId, search)}</p>
                      {search && (p.options || []).some(o => o.partCode.toLowerCase().includes(search.toLowerCase())) && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {p.options!.filter(o => o.partCode.toLowerCase().includes(search.toLowerCase())).map(o => (
                            <span key={o.partCode} className="text-[10px] font-mono bg-yellow-100 text-gray-700 px-1.5 py-0.5 rounded">
                              {highlight(o.partCode, search)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                    <Layers size={10} />
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-gray-500">{p.brandSubCategory || <span className="text-gray-300 italic">—</span>}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-bold text-gray-500">{(p as any).optionsCount ?? (p.options?.length ?? 0)}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(p)}
                      className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(p)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>{(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-1">
            <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}
              className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition">
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pg = page <= 3 ? i + 1 : page + i - 2;
              if (pg > totalPages) return null;
              return (
                <button key={pg} onClick={() => onPageChange(pg)}
                  className={`w-7 h-7 rounded font-bold transition ${pg === page ? "bg-[#C3110C] text-white" : "hover:bg-gray-100 text-gray-600"}`}>
                  {pg}
                </button>
              );
            })}
            <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}
              className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
