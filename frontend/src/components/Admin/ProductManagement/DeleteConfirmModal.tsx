import { AlertTriangle, Trash2, Loader2 } from "lucide-react";
import type { ApiProduct } from "./types";

interface DeleteConfirmModalProps {
  target: ApiProduct;
  deleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ target, deleting, onConfirm, onCancel }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={18} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900">Delete Product</h3>
            <p className="text-xs text-gray-400 mt-0.5">This action cannot be undone.</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete <strong className="text-gray-900">"{target.title}"</strong>? 
          It will be permanently removed from the catalog.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 disabled:opacity-60 transition">
            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
