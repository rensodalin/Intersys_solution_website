import { useState } from "react";
import { X, Tag, Image, Settings, FileText, Plus, Trash2, Loader2, LinkIcon } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import type { FormState, ProductOption, ProductDocument } from "./types";

interface ProductFormProps {
  form: FormState;
  editingId: string | null;
  saving: boolean;
  onFieldChange: (key: keyof FormState, value: any) => void;
  onTitleChange: (val: string) => void;
  onSubCategoryChange: (val: string) => void;
  onClose: () => void;
  onSave: () => void;
  categories: string[];
  brands: Record<string, string[]>;
  subCategories: Record<string, Record<string, string[]>>;
}

export function ProductForm({ form, editingId, saving, onFieldChange, onTitleChange, onSubCategoryChange, onClose, onSave, categories, brands, subCategories }: ProductFormProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "media" | "options" | "documents">("basic");

  const availableBrands = brands[form.category] || [];
  const availableSubCategories = (subCategories[form.category]?.[form.brand]) || [];

  function addOption() {
    onFieldChange("options", [...form.options, { partCode: "", specification: "", price: 0, qty: 0 }]);
  }
  function updateOption(i: number, key: keyof ProductOption, value: any) {
    const opts = [...form.options];
    opts[i] = { ...opts[i], [key]: value };
    onFieldChange("options", opts);
  }
  function removeOption(i: number) {
    onFieldChange("options", form.options.filter((_, idx) => idx !== i));
  }

  function addDocument() {
    onFieldChange("documents", [...form.documents, { name: "", url: "" }]);
  }
  function updateDocument(i: number, key: keyof ProductDocument, value: string) {
    const docs = [...form.documents];
    docs[i] = { ...docs[i], [key]: value };
    onFieldChange("documents", docs);
  }
  function removeDocument(i: number) {
    onFieldChange("documents", form.documents.filter((_, idx) => idx !== i));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-gray-900">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {editingId ? `Editing: ${form.title}` : "Fill in the details to create a new product."}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-gray-100 px-6">
          {([
            { key: "basic", label: "Basic Info", icon: Tag },
            { key: "media", label: "Media", icon: Image },
            { key: "options", label: "Options", icon: Settings },
            { key: "documents", label: "Documents", icon: FileText },
          ] as const).map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition-all -mb-px ${activeTab === tab.key
                ? "border-[#C3110C] text-[#C3110C]"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}>
              <tab.icon size={12} />
              {tab.label}
              {tab.key === "options" && form.options.length > 0 && (
                <span className="bg-[#C3110C] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">{form.options.length}</span>
              )}
              {tab.key === "documents" && form.documents.length > 0 && (
                <span className="bg-[#C3110C] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">{form.documents.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-black text-gray-500  mb-1.5">Product ID *</label>
                  <input value={form.productId} onChange={e => onFieldChange("productId", e.target.value)} disabled={!!editingId}
                    placeholder="auto-generated-slug"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 font-mono focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 disabled:opacity-60 transition" />
                </div>
                <div>
                  <label className="block text-[12px] font-black text-gray-500  mb-1.5">Title *</label>
                  <input value={form.title} onChange={e => onTitleChange(e.target.value)}
                    placeholder="e.g. PW7000 Intelligent Control Panel"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-black text-gray-500  mb-1.5">Category *</label>
                  <select value={form.category} onChange={e => { onFieldChange("category", e.target.value); onFieldChange("brand", ""); onFieldChange("brandSubCategory", ""); }}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition">
                    <option value="">Select...</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-black text-gray-500  mb-1.5">
                    Brand {availableBrands.length > 0 ? '*' : ''}
                    {availableBrands.length === 0 && <span className="text-gray-400 font-normal normal-case"> (optional)</span>}
                  </label>
                  <Combobox
                    value={form.brand}
                    onChange={v => { onFieldChange("brand", v); onFieldChange("brandSubCategory", ""); }}
                    options={availableBrands}
                    placeholder={availableBrands.length > 0 ? "Select or type brand..." : "Optional — type a brand or leave empty"}
                    disabled={!form.category}
                    allowCustom={true}
                  />
                </div>
                {availableSubCategories.length > 0 && (
                <div>
                  <label className="block text-[12px] font-black text-gray-500  mb-1.5">Subcategory</label>
                  <select value={form.brandSubCategory} onChange={e => onSubCategoryChange(e.target.value)}
                    disabled={!form.brand}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 disabled:opacity-50 transition">
                    <option value="">None</option>
                    {availableSubCategories.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-black text-gray-500  mb-1.5 flex items-center gap-1">
                  <LinkIcon size={10} /> Subcategory Link
                </label>
                <input value={form.brandSubCategoryLink} onChange={e => onFieldChange("brandSubCategoryLink", e.target.value)}
                  placeholder="/products/access-control/honeywell/control-panels"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg font-mono text-xs focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
              </div>

              <div>
                <label className="block text-[12px] font-black text-gray-500  mb-1.5">Short Description</label>
                <textarea value={form.description} onChange={e => onFieldChange("description", e.target.value)} rows={2}
                  placeholder="Brief product description for catalog listings..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
              </div>

              <div>
                <label className="block text-[12px] font-black text-gray-500  mb-1.5">Long Description</label>
                <textarea value={form.longDescription} onChange={e => onFieldChange("longDescription", e.target.value)} rows={4}
                  placeholder="Full detailed description shown on the product detail page..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-black text-gray-500  mb-1.5">Main Image URL</label>
                <input value={form.mainImage} onChange={e => onFieldChange("mainImage", e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
                {form.mainImage && (
                  <div className="mt-3 w-32 h-32 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                    <img src={form.mainImage} alt="preview" className="w-full h-full object-contain p-2"
                      onError={e => { (e.target as HTMLImageElement).src = ""; }} />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[12px] font-black text-gray-500  mb-1.5">
                  Thumbnail URLs <span className="normal-case text-gray-400 font-normal">(comma-separated)</span>
                </label>
                <textarea value={form.thumbnails} onChange={e => onFieldChange("thumbnails", e.target.value)} rows={3}
                  placeholder="https://img1.jpg, https://img2.jpg, ..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
                {form.thumbnails && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {form.thumbnails.split(",").map((s, i) => s.trim() && (
                      <div key={i} className="w-16 h-16 rounded border border-gray-200 overflow-hidden bg-gray-50">
                        <img src={s.trim()} alt="" className="w-full h-full object-contain p-1"
                          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "options" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Part codes and specifications that appear in the quote form.</p>
                <button onClick={addOption}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#C3110C] border border-[#C3110C]/30 rounded-lg hover:bg-[#C3110C]/5 transition">
                  <Plus size={12} /> Add Option
                </button>
              </div>
              {form.options.length === 0 && (
                <div className="text-center py-10 text-gray-300 text-sm">
                  <Settings size={32} className="mx-auto mb-2 opacity-40" />
                  No options added. Click "Add Option" to begin.
                </div>
              )}
              {form.options.map((opt, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="col-span-3">
                    <label className="block text-[9px] font-black text-gray-400  mb-1">Part Code *</label>
                    <input value={opt.partCode} onChange={e => updateOption(i, "partCode", e.target.value)}
                      placeholder="PW7000" className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded font-mono focus:outline-none focus:border-[#C3110C]/50 transition" />
                  </div>
                  <div className="col-span-5">
                    <label className="block text-[9px] font-black text-gray-400  mb-1">Specification</label>
                    <input value={opt.specification} onChange={e => updateOption(i, "specification", e.target.value)}
                      placeholder="Standard Configuration" className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#C3110C]/50 transition" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[9px] font-black text-gray-400  mb-1">Price</label>
                    <input type="number" value={opt.price} onChange={e => updateOption(i, "price", parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#C3110C]/50 transition" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[9px] font-black text-gray-400  mb-1">Qty</label>
                    <input type="number" value={opt.qty} onChange={e => updateOption(i, "qty", parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#C3110C]/50 transition" />
                  </div>
                  <div className="col-span-2 flex justify-end pt-5">
                    <button onClick={() => removeOption(i)}
                      className="p-1.5 rounded text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Datasheets and manuals available for download on the product page.</p>
                <button onClick={addDocument}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#C3110C] border border-[#C3110C]/30 rounded-lg hover:bg-[#C3110C]/5 transition">
                  <Plus size={12} /> Add Document
                </button>
              </div>
              {form.documents.length === 0 && (
                <div className="text-center py-10 text-gray-300 text-sm">
                  <FileText size={32} className="mx-auto mb-2 opacity-40" />
                  No documents added.
                </div>
              )}
              {form.documents.map((doc, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="col-span-4">
                    <label className="block text-[12px] font-black text-gray-500 mb-1">Document Name *</label>
                    <input value={doc.name} onChange={e => updateDocument(i, "name", e.target.value)}
                      placeholder="Technical Datasheet" className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C3110C]/50 transition" />
                  </div>
                  <div className="col-span-7">
                    <label className="block text-[12px] font-black text-gray-500 mb-1">URL *</label>
                    <input value={doc.url} onChange={e => updateDocument(i, "url", e.target.value)}
                      placeholder="https://..." className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded font-mono focus:outline-none focus:border-[#C3110C]/50 transition" />
                  </div>
                  <div className="col-span-1 flex justify-end pt-5">
                    <button onClick={() => removeDocument(i)}
                      className="p-1.5 rounded text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition">Cancel</button>
          <button onClick={onSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C3110C] text-white text-sm font-bold rounded-lg hover:bg-[#a80f0b] disabled:opacity-60 transition shadow-lg shadow-[#C3110C]/20">
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            {saving ? "Saving..." : editingId ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
