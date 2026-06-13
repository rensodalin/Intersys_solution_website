import { X, Loader2 } from "lucide-react";
import type { TechnicalTipFormData } from "./types";
import { CATEGORIES } from "./types";

interface TechnicalTipsFormProps {
  form: TechnicalTipFormData;
  editingId: string | null;
  saving: boolean;
  onFieldChange: (key: keyof TechnicalTipFormData, value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

function FieldInput({ label, value, onChange, placeholder, disabled, mono }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean; mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-[12px] font-black text-gray-500 mb-1.5">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 ${disabled ? "bg-gray-50 opacity-60" : ""} ${mono ? "font-mono" : ""} transition`} />
    </div>
  );
}

function FieldTextarea({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[12px] font-black text-gray-500 mb-1.5">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm resize-none focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
    </div>
  );
}

export function TechnicalTipsForm({ form, editingId, saving, onFieldChange, onClose, onSave }: TechnicalTipsFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-md shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-gray-900">
              {editingId ? "Edit Technical Tip" : "Add New Technical Tip"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {editingId ? `Editing: ${form.title}` : "Add a PDF guide for a technical category."}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          <FieldInput label="Title *" value={form.title} onChange={v => onFieldChange("title", v)} placeholder="e.g. Optimizing HVAC for unusual solar loading" />

          <div>
            <label className="block text-[12px] font-black text-gray-500 mb-1.5">Category *</label>
            <select value={form.category} onChange={e => onFieldChange("category", e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition">
              <option value="">Select...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <FieldInput label="PDF URL *" value={form.pdfUrl} onChange={v => onFieldChange("pdfUrl", v)} placeholder="https://example.com/guide.pdf" mono />

          <FieldTextarea label="Description" value={form.description} onChange={v => onFieldChange("description", v)} placeholder="Brief description of the guide..." />

          <FieldInput label="Order" value={form.order} onChange={v => onFieldChange("order", v)} placeholder="0" />
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition">Cancel</button>
          <button onClick={onSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C3110C] text-white text-sm font-bold rounded-lg hover:bg-[#a80f0b] disabled:opacity-60 transition shadow-lg shadow-[#C3110C]/20">
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            {saving ? "Saving..." : editingId ? "Save Changes" : "Create Tip"}
          </button>
        </div>
      </div>
    </div>
  );
}
