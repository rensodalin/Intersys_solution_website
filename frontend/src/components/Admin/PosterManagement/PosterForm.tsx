import { X, Loader2, Download } from "lucide-react";
import { BASE_URL } from "./types";

interface PosterFormProps {
  formImage: string;
  formLink: string;
  formOrder: number;
  editingId: string | null;
  saving: boolean;
  savingImage: boolean;
  onImageChange: (val: string) => void;
  onLinkChange: (val: string) => void;
  onOrderChange: (val: number) => void;
  onSaveImageLocally: (url: string, callback: (localUrl: string) => void) => void;
  onClose: () => void;
  onSave: () => void;
}

export function PosterForm({
  formImage, formLink, formOrder, editingId, saving, savingImage,
  onImageChange, onLinkChange, onOrderChange,
  onSaveImageLocally, onClose, onSave,
}: PosterFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-gray-900">
              {editingId ? "Edit Poster" : "Add New Poster"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {editingId ? "Update the poster details." : "Enter the image URL and Facebook link."}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          <div>
            <label className="block text-[12px] font-black text-gray-500  mb-1.5">Image URL *</label>
            <div className="flex gap-2">
              <input value={formImage} onChange={e => onImageChange(e.target.value)}
                placeholder="https://scontent.fpnh..."
                className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
              <button
                onClick={() => onSaveImageLocally(formImage, (url) => onImageChange(url))}
                disabled={!formImage || savingImage}
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold text-[#C3110C] border border-[#C3110C]/30 rounded-lg hover:bg-[#C3110C]/5 disabled:opacity-50 transition flex-shrink-0"
                title="Download and serve locally (bypasses Facebook hotlink block)"
              >
                {savingImage ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                Local
              </button>
            </div>
            {formImage && (
              <div className="mt-3 w-32 h-32 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                <img src={formImage} alt="preview" className="w-full h-full object-contain p-2"
                  onError={e => { (e.target as HTMLImageElement).src = ""; }} />
              </div>
            )}
          </div>

          <div>
            <label className="block text-[12px] font-black text-gray-500  mb-1.5">Link *</label>
            <input value={formLink} onChange={e => onLinkChange(e.target.value)}
              placeholder="https://web.facebook.com/share/p/..."
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
          </div>

          <div>
            <label className="block text-[12px] font-black text-gray-500  mb-1.5">Order</label>
            <input type="number" value={formOrder} onChange={e => onOrderChange(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition">Cancel</button>
          <button onClick={onSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C3110C] text-white text-sm font-bold rounded-lg hover:bg-[#a80f0b] disabled:opacity-60 transition shadow-lg shadow-[#C3110C]/20">
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            {saving ? "Saving..." : editingId ? "Save Changes" : "Create Poster"}
          </button>
        </div>
      </div>
    </div>
  );
}
