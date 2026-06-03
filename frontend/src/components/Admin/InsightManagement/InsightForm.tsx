import { useState } from "react";
import { X, Tag, User, MapPin, Image, BookOpen, Palette, Loader2 } from "lucide-react";
import type { InsightFormData } from "./types";
import { CATEGORIES } from "./constants";

interface InsightFormProps {
  form: InsightFormData;
  editingId: string | null;
  saving: boolean;
  onFieldChange: (key: keyof InsightFormData, value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const TABS = [
  { key: "basic", label: "Basic Info", icon: Tag },
  { key: "project", label: "Project", icon: MapPin },
  { key: "section1", label: "Section 1", icon: Image },
  { key: "article", label: "Article", icon: BookOpen },
  { key: "gallery", label: "Gallery", icon: Palette },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function FieldInput({ label, value, onChange, placeholder, disabled, type, mono }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean; type?: string; mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-[12px] font-black text-gray-500  mb-1.5">{label}</label>
      <input type={type || "text"} value={value} onChange={e => onChange(e.target.value)} disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 ${disabled ? "bg-gray-50 opacity-60" : ""} ${mono ? "font-mono" : ""} transition`} />
    </div>
  );
}

function FieldTextarea({ label, value, onChange, placeholder, rows }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-[12px] font-black text-gray-500 mb-1.5">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows || 3}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm resize-none focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
    </div>
  );
}

export function InsightForm({ form, editingId, saving, onFieldChange, onClose, onSave }: InsightFormProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("basic");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-md shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-gray-900">
              {editingId ? "Edit Insight" : "Add New Insight"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {editingId ? `Editing: ${form.title}` : "Fill in the details to create a new insight article."}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition-all -mb-px whitespace-nowrap ${activeTab === tab.key
                ? "border-[#C3110C] text-[#C3110C]"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}>
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {activeTab === "basic" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <FieldInput label="Title *" value={form.title} onChange={v => { onFieldChange("title", v); if (!editingId) onFieldChange("slug", v.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")); }} placeholder="e.g. Smart Hospital Infrastructure" />
                <FieldInput label="Slug *" value={form.slug} onChange={v => onFieldChange("slug", v)} placeholder="smart-hospital-infrastructure" disabled={!!editingId} mono />
              </div>
              <FieldTextarea label="Description *" value={form.desc} onChange={v => onFieldChange("desc", v)} placeholder="Brief description of the insight..." />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-black text-gray-500 mb-1.5">Category *</label>
                  <select value={form.category} onChange={e => onFieldChange("category", e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition">
                    <option value="">Select...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <FieldInput label="Date *" value={form.date} onChange={v => onFieldChange("date", v)} placeholder="e.g. June 02, 2024" />
                <FieldInput label="Author" value={form.author} onChange={v => onFieldChange("author", v)} />
              </div>
              <FieldInput label="Main Image URL *" value={form.image} onChange={v => onFieldChange("image", v)} placeholder="https://..." />
              {form.image && (
                <div className="w-40 h-28 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                  <img src={form.image.split(",")[0].trim()} alt="preview" className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = ""; }} />
                </div>
              )}
            </>
          )}

          {activeTab === "project" && (
            <>
              <FieldInput label="Client" value={form.client} onChange={v => onFieldChange("client", v)} placeholder="e.g. Heritage Cambodia" />
              <FieldInput label="Location" value={form.location} onChange={v => onFieldChange("location", v)} placeholder="e.g. Siem Reap, Cambodia" />
              <FieldTextarea label="Scope (comma-separated)" value={form.scope} onChange={v => onFieldChange("scope", v)} placeholder="e.g. Building Management System, Fire Alarm System" />
            </>
          )}

          {activeTab === "section1" && (
            <>
              <FieldInput label="Section 1 Image URL" value={form.section1Image} onChange={v => onFieldChange("section1Image", v)} placeholder="https://..." />
              <FieldInput label="Section 1 Title" value={form.section1Title} onChange={v => onFieldChange("section1Title", v)} placeholder="e.g. Smart Building Technology" />
              <FieldTextarea label="Section 1 Description" value={form.section1Desc} onChange={v => onFieldChange("section1Desc", v)} />
              <FieldInput label="Section 1 Subtitle" value={form.section1SubTitle} onChange={v => onFieldChange("section1SubTitle", v)} />
              <FieldTextarea label="Section 1 Sub Description" value={form.section1SubDesc} onChange={v => onFieldChange("section1SubDesc", v)} />
              <FieldInput label="Section 1 Sub Image URL" value={form.section1SubImage} onChange={v => onFieldChange("section1SubImage", v)} placeholder="https://..." />
            </>
          )}

          {activeTab === "article" && (
            <>
              <FieldInput label="Article Title 1" value={form.articleTitle1} onChange={v => onFieldChange("articleTitle1", v)} />
              <FieldTextarea label="Article Content 1" value={form.articleContent1} onChange={v => onFieldChange("articleContent1", v)} rows={4} />
              <FieldInput label="Article Banner Image URL" value={form.articleBannerImage} onChange={v => onFieldChange("articleBannerImage", v)} placeholder="https://..." />
              <FieldInput label="PDF URL" value={form.pdfUrl} onChange={v => onFieldChange("pdfUrl", v)} placeholder="https://..." />
              <FieldInput label="Article Title 2" value={form.articleTitle2} onChange={v => onFieldChange("articleTitle2", v)} />
              <FieldTextarea label="Article Content 2" value={form.articleContent2} onChange={v => onFieldChange("articleContent2", v)} rows={4} />
            </>
          )}

          {activeTab === "gallery" && (
            <>
              <FieldInput label="Technical Title" value={form.technicalTitle} onChange={v => onFieldChange("technicalTitle", v)} />
              <FieldTextarea label="Gallery Images (comma-separated URLs)" value={form.galleryImages} onChange={v => onFieldChange("galleryImages", v)} placeholder="https://img1.jpg, https://img2.jpg, ..." />
              {form.galleryImages && (
                <div className="flex gap-2 flex-wrap">
                  {form.galleryImages.split(",").map((s, i) => s.trim() && (
                    <div key={i} className="w-20 h-20 rounded border border-gray-200 overflow-hidden bg-gray-50">
                      <img src={s.trim()} alt="" className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition">Cancel</button>
          <button onClick={onSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C3110C] text-white text-sm font-bold rounded-lg hover:bg-[#a80f0b] disabled:opacity-60 transition shadow-lg shadow-[#C3110C]/20">
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            {saving ? "Saving..." : editingId ? "Save Changes" : "Create Insight"}
          </button>
        </div>
      </div>
    </div>
  );
}
