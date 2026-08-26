import { AlertTriangle } from "lucide-react";
import { BlogItem } from "./types";

interface DeleteConfirmModalProps {
  blog: BlogItem | null;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export function DeleteConfirmModal({ blog, onConfirm, onClose }: DeleteConfirmModalProps) {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-sm max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <div className="w-10 h-10 rounded-sm bg-red-100 flex items-center justify-center">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-gray-900">Delete Blog Article</h4>
            <p className="text-xs text-gray-500">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mb-6">
          Are you sure you want to delete <strong className="text-gray-900 font-bold">"{blog.title}"</strong>?
        </p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-sm border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-sm bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-md shadow-red-600/20"
          >
            Delete Article
          </button>
        </div>
      </div>
    </div>
  );
}
