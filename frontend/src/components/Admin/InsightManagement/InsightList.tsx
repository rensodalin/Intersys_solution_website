import { Pencil, Trash2, Loader2, FileText } from "lucide-react";
import type { Insight } from "./types";

interface InsightListProps {
  insights: Insight[];
  loading: boolean;
  onEdit: (i: Insight) => void;
  onDelete: (i: Insight) => void;
}

export function InsightList({ insights, loading, onEdit, onDelete }: InsightListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-sm border border-gray-150 shadow-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 size={32} className="text-[#C3110C] animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (insights.length === 0) {
    return (
      <div className="bg-white rounded-sm border border-gray-150 shadow-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <FileText size={40} className="text-gray-200" />
          <p className="text-sm text-gray-400 font-medium">No insights yet. Click "Add New Insight" to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm border border-gray-150 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left text-[12px] font-black text-gray-400  px-4 py-3">Title</th>
              <th className="text-left text-[12px] font-black text-gray-400  px-4 py-3">Category</th>
              <th className="text-left text-[12px] font-black text-gray-400  px-4 py-3">Date</th>
              <th className="text-left text-[12px] font-black text-gray-400  px-4 py-3">Author</th>
              <th className="text-right text-[12px] font-black text-gray-400  px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {insights.map(i => (
              <tr key={i._id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-4 py-3">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 truncate max-w-[300px]">{i.title}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{i.slug}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                    {i.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{i.date}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{i.author}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(i)}
                      className="p-1.5 rounded-sm bg-blue-50 text-gray-500 hover:bg-blue-100 transition" title="Edit">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => onDelete(i)}
                      className="p-1.5 rounded-sm bg-red-50 text-gray-500 hover:bg-red-100 transition" title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
