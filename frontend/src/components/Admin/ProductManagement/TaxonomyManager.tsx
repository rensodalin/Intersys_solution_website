import { useState, useEffect } from "react";
import { X, Plus, Pencil, Trash2, ChevronRight, ChevronDown, FolderOpen, Tag, Layers, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { fetchTaxonomy, addCategory, renameCategory, deleteCategory, addBrand, renameBrand, deleteBrand, addSubCategory, renameSubCategory, deleteSubCategory } from "@/utils/taxonomyApi";
import { refreshTaxonomyCache } from "@/hooks/useTaxonomy";
import type { TaxonomyCategory, TaxonomyBrand } from "@/utils/taxonomyApi";

interface TaxonomyManagerProps {
  open: boolean;
  onClose: () => void;
  onChanged: () => void;
}

type EditingItem = {
  type: "category" | "brand" | "subcategory";
  category?: string;
  brand?: string;
  currentName: string;
} | null;

export function TaxonomyManager({ open, onClose, onChanged }: TaxonomyManagerProps) {
  const [data, setData] = useState<TaxonomyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [addingTo, setAddingTo] = useState<{ type: "category" | "brand" | "subcategory"; category?: string; brand?: string } | null>(null);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<EditingItem>(null);
  const [editName, setEditName] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const d = await fetchTaxonomy();
      setData(d);
      refreshTaxonomyCache();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (open) load(); }, [open]);

  const toggleExpand = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      if (addingTo?.type === "category") {
        await addCategory(newName.trim());
      } else if (addingTo?.type === "brand" && addingTo.category) {
        await addBrand(addingTo.category, newName.trim());
      } else if (addingTo?.type === "subcategory" && addingTo.category && addingTo.brand) {
        await addSubCategory(addingTo.category, addingTo.brand, newName.trim());
      }
      setNewName("");
      setAddingTo(null);
      await load();
      onChanged();
      toast.success("Added successfully");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRename = async () => {
    if (!editName.trim() || !editing) return;
    setSaving(true);
    try {
      if (editing.type === "category") {
        await renameCategory(editing.currentName, editName.trim());
      } else if (editing.type === "brand" && editing.category) {
        await renameBrand(editing.category, editing.currentName, editName.trim());
      } else if (editing.type === "subcategory" && editing.category && editing.brand) {
        await renameSubCategory(editing.category, editing.brand, editing.currentName, editName.trim());
      }
      setEditing(null);
      setEditName("");
      await load();
      onChanged();
      toast.success("Renamed successfully");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (type: "category" | "brand" | "subcategory", category?: string, brand?: string, name?: string) => {
    const label = type === "category" ? "category" : type === "brand" ? "brand" : "subcategory";
    if (!confirm(`Delete ${label} "${name}"? This cannot be undone.`)) return;
    setSaving(true);
    try {
      if (type === "category" && name) {
        await deleteCategory(name);
      } else if (type === "brand" && category && name) {
        await deleteBrand(category, name);
      } else if (type === "subcategory" && category && brand && name) {
        await deleteSubCategory(category, brand, name);
      }
      await load();
      onChanged();
      toast.success("Deleted successfully");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-gray-900">Manage Categories</h2>
            <p className="text-xs text-gray-400 mt-0.5">Add, rename, or remove categories, brands, and subcategories.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin text-[#C3110C]" />
            </div>
          ) : (
            <div className="space-y-2">
              {data.map(cat => (
                <div key={cat.category} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <button onClick={() => toggleExpand(cat.category)} className="flex items-center gap-2 flex-1 text-left cursor-pointer">
                      {expanded[cat.category] ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                      <FolderOpen size={14} className="text-[#C3110C]" />
                      <span className="text-sm font-bold text-gray-800">{cat.category}</span>
                      <span className="text-[10px] text-gray-400 font-medium">({cat.brands.length} brands)</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditing({ type: "category", currentName: cat.category }); setEditName(cat.category); }}
                        className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-blue-600 transition cursor-pointer" title="Rename">
                        <Pencil size={12} />
                      </button>
                      <button onClick={() => setAddingTo({ type: "brand", category: cat.category })}
                        className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-green-600 transition cursor-pointer" title="Add brand">
                        <Plus size={12} />
                      </button>
                      <button onClick={() => handleDelete("category", undefined, undefined, cat.category)}
                        className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-red-600 transition cursor-pointer" title="Delete">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  {expanded[cat.category] && (
                    <div className="border-t border-gray-100">
                      {addingTo?.type === "brand" && addingTo.category === cat.category && (
                        <div className="px-6 py-2 bg-green-50 border-b border-green-100 flex items-center gap-2">
                          <input value={newName} onChange={e => setNewName(e.target.value)}
                            placeholder="Brand name..."
                            className="flex-1 px-2 py-1 text-xs border border-green-200 rounded focus:outline-none focus:border-green-500"
                            onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAddingTo(null); }}
                            autoFocus />
                          <button onClick={handleAdd} disabled={saving || !newName.trim()}
                            className="px-2 py-1 text-[10px] font-bold bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer">Add</button>
                          <button onClick={() => { setAddingTo(null); setNewName(""); }}
                            className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"><X size={12} /></button>
                        </div>
                      )}

                      {cat.brands.length === 0 ? (
                        <div className="px-6 py-4 text-xs text-gray-400 italic">No brands yet.</div>
                      ) : (
                        cat.brands.map(br => (
                          <div key={br.name}>
                            <div className="flex items-center justify-between px-6 py-2.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0">
                              <button onClick={() => toggleExpand(`${cat.category}:${br.name}`)} className="flex items-center gap-2 flex-1 text-left cursor-pointer">
                                {expanded[`${cat.category}:${br.name}`] ? <ChevronDown size={12} className="text-gray-400" /> : <ChevronRight size={12} className="text-gray-400" />}
                                <Tag size={12} className="text-[#0D7C5E]" />
                                <span className="text-xs font-semibold text-gray-700">{br.name}</span>
                                <span className="text-[9px] text-gray-400">({br.subCategories.length} subcategories)</span>
                              </button>
                              <div className="flex items-center gap-1">
                                <button onClick={() => setAddingTo({ type: "subcategory", category: cat.category, brand: br.name })}
                                  className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-green-600 transition cursor-pointer" title="Add subcategory">
                                  <Plus size={10} />
                                </button>
                                <button onClick={() => { setEditing({ type: "brand", category: cat.category, currentName: br.name }); setEditName(br.name); }}
                                  className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-blue-600 transition cursor-pointer" title="Rename">
                                  <Pencil size={10} />
                                </button>
                                <button onClick={() => handleDelete("brand", cat.category, undefined, br.name)}
                                  className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-red-600 transition cursor-pointer" title="Delete">
                                  <Trash2 size={10} />
                                </button>
                              </div>
                            </div>

                            {expanded[`${cat.category}:${br.name}`] && (
                              <div className="bg-gray-50/50 px-10 py-2">
                                {addingTo?.type === "subcategory" && addingTo.category === cat.category && addingTo.brand === br.name && (
                                  <div className="mb-2 flex items-center gap-2">
                                    <input value={newName} onChange={e => setNewName(e.target.value)}
                                      placeholder="Subcategory name..."
                                      className="flex-1 px-2 py-1 text-xs border border-green-200 rounded focus:outline-none focus:border-green-500"
                                      onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAddingTo(null); }}
                                      autoFocus />
                                    <button onClick={handleAdd} disabled={saving || !newName.trim()}
                                      className="px-2 py-1 text-[10px] font-bold bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer">Add</button>
                                    <button onClick={() => { setAddingTo(null); setNewName(""); }}
                                      className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"><X size={12} /></button>
                                  </div>
                                )}

                                {br.subCategories.length === 0 ? (
                                  <p className="text-[10px] text-gray-400 italic py-1">No subcategories yet.</p>
                                ) : (
                                  <div className="flex flex-wrap gap-1.5">
                                    {br.subCategories.map(sc => (
                                      <div key={sc} className="group flex items-center gap-1 bg-white border border-gray-200 rounded-md px-2 py-1">
                                        <Layers size={10} className="text-gray-400" />
                                        <span className="text-[10px] text-gray-600 font-medium">{sc}</span>
                                        <button onClick={() => { setEditing({ type: "subcategory", category: cat.category, brand: br.name, currentName: sc }); setEditName(sc); }}
                                          className="p-0.5 rounded text-gray-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition cursor-pointer">
                                          <Pencil size={8} />
                                        </button>
                                        <button onClick={() => handleDelete("subcategory", cat.category, br.name, sc)}
                                          className="p-0.5 rounded text-gray-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition cursor-pointer">
                                          <Trash2 size={8} />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}

              {addingTo?.type === "category" && (
                <div className="border border-dashed border-green-300 rounded-xl p-3 bg-green-50 flex items-center gap-2">
                  <input value={newName} onChange={e => setNewName(e.target.value)}
                    placeholder="Category name..."
                    className="flex-1 px-2 py-1.5 text-sm border border-green-200 rounded focus:outline-none focus:border-green-500"
                    onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAddingTo(null); }}
                    autoFocus />
                  <button onClick={handleAdd} disabled={saving || !newName.trim()}
                    className="px-3 py-1.5 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 cursor-pointer">Add</button>
                  <button onClick={() => { setAddingTo(null); setNewName(""); }}
                    className="p-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"><X size={14} /></button>
                </div>
              )}

              <button onClick={() => setAddingTo({ type: "category" })}
                className="w-full py-2.5 border border-dashed border-gray-300 rounded-xl text-xs font-bold text-gray-400 hover:text-[#C3110C] hover:border-[#C3110C]/30 transition flex items-center justify-center gap-1.5 cursor-pointer">
                <Plus size={14} /> Add Category
              </button>
            </div>
          )}
        </div>

        {/* Inline rename modal */}
        {editing && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 rounded-2xl">
            <div className="bg-white rounded-xl shadow-2xl p-5 w-80">
              <h3 className="text-sm font-bold text-gray-900 mb-1 capitalize">Rename {editing.type}</h3>
              <p className="text-[11px] text-gray-500 mb-3">Current: <span className="font-medium text-gray-700">{editing.currentName}</span></p>
              <input value={editName} onChange={e => setEditName(e.target.value)}
                placeholder="New name..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 mb-3"
                onKeyDown={e => { if (e.key === "Enter") handleRename(); if (e.key === "Escape") { setEditing(null); } }}
                autoFocus />
              <div className="flex justify-end gap-2">
                <button onClick={() => setEditing(null)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition cursor-pointer">Cancel</button>
                <button onClick={handleRename} disabled={saving || !editName.trim() || editName === editing.currentName}
                  className="px-4 py-1.5 text-xs font-bold bg-[#C3110C] text-white rounded-lg hover:bg-red-700 disabled:opacity-50 cursor-pointer">
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  );
}
