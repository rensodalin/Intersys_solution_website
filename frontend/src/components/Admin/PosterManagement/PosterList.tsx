import { Pencil, Trash2, MoveUp, MoveDown, Loader2, ImageIcon } from "lucide-react";
import type { Poster } from "./types";

interface PosterListProps {
  posters: Poster[];
  loading: boolean;
  onEdit: (p: Poster) => void;
  onDelete: (p: Poster) => void;
  onMoveOrder: (index: number, direction: "up" | "down") => void;
  onAddNew: () => void;
}

export function PosterList({ posters, loading, onEdit, onDelete, onMoveOrder, onAddNew }: PosterListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 size={32} className="text-[#C3110C] animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading posters...</p>
        </div>
      </div>
    );
  }

  if (posters.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <ImageIcon size={40} className="text-gray-200" />
          <p className="text-sm text-gray-400 font-medium">No posters yet. Click "Add New Poster" to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md border border-gray-150 shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-100">
        {posters.map((poster, index) => (
          <div key={poster._id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/80 transition-colors group">
            {/* Order controls */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => onMoveOrder(index, "up")}
                disabled={index === 0}
                className="p-0.5 rounded text-gray-300 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed transition"
              >
                <MoveUp size={12} />
              </button>
              <span className="text-[10px] font-bold text-gray-400 text-center">{poster.order + 1}</span>
              <button
                onClick={() => onMoveOrder(index, "down")}
                disabled={index === posters.length - 1}
                className="p-0.5 rounded text-gray-300 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed transition"
              >
                <MoveDown size={12} />
              </button>
            </div>

            {/* Thumbnail */}
            <div className="w-20 h-20 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex-shrink-0">
              <img
                src={poster.image}
                alt={`Poster ${index + 1}`}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-gray-400 truncate">{poster.image}</p>
              <a href={poster.link} target="_blank" rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline truncate block mt-0.5">
                {poster.link}
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button onClick={() => onEdit(poster)}
                className="p-1.5 rounded-sm bg-blue-50 text-gray-600 hover:bg-blue-100 transition" title="Edit">
                <Pencil size={13} />
              </button>
              <button onClick={() => onDelete(poster)}
                className="p-1.5 rounded-sm bg-red-50 text-gray-600 hover:bg-red-100 transition" title="Delete">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
