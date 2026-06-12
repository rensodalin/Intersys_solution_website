import { useState, useEffect } from "react";
import { X, Plus, Pencil, Trash2, ChevronRight, ChevronDown, FolderOpen, Layers, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { fetchTaxonomy, addCategory, renameCategory, deleteCategory, addSubCategory, renameSubCategory, deleteSubCategory } from "@/utils/taxonomyApi";
import type { TaxonomyCategory, TaxonomySubCategory } from "@/utils/taxonomyApi";
import { refreshTaxonomyCache } from "@/hooks/useTaxonomy";

interface TaxonomyManagerProps {
  open: boolean;
  onClose: () => void;
  onChanged: () => void;
}

type EditingItem = {
  type: "category" | "subcategory";
  category?: string;
  parentPath?: string;
  currentName: string;
  title?: string;
  description?: string;
  image?: string;
  heroImage?: string;
} | null;

function SubCategoryNode({
  items, category, parentPath,
  addingTo, setAddingTo, newName, setNewName,
  addDescription, setAddDescription, addImage, setAddImage,
  editing, setEditing, saving, handleAdd, handleDelete, handleRename,
  setEditName, setEditTitle, setEditDescription, setEditImage, setEditHeroImage
}: {
  items: TaxonomySubCategory[];
  category: string;
  parentPath: string;
  addingTo: { type: string; category?: string; parentPath?: string } | null;
  setAddingTo: (v: any) => void;
  newName: string;
  setNewName: (v: string) => void;
  addDescription: string;
  setAddDescription: (v: string) => void;
  addImage: string;
  setAddImage: (v: string) => void;
  editing: EditingItem;
  setEditing: (v: EditingItem) => void;
  saving: boolean;
  handleAdd: () => void;
  handleDelete: (type: "category" | "subcategory", category?: string, name?: string, parentPath?: string) => void;
  handleRename: () => void;
  setEditName: (v: string) => void;
  setEditTitle: (v: string) => void;
  setEditDescription: (v: string) => void;
  setEditImage: (v: string) => void;
  setEditHeroImage: (v: string) => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (name: string) => setExpanded(p => ({ ...p, [name]: !p[name] }));

  return (
    <div className="flex flex-col gap-1">
      {items.length === 0 && !parentPath && (
        <p className="text-[10px] text-gray-400 italic py-1">No subcategories yet.</p>
      )}
      {items.map(sc => {
        const currentPath = parentPath ? `${parentPath}/${sc.name}` : sc.name;
        const hasChildren = sc.children && sc.children.length > 0;
        const isAddingHere = addingTo?.type === "subcategory" &&
          addingTo.category === category &&
          addingTo.parentPath === currentPath;

        return (
          <div key={sc.name}>
            <div className="group flex items-center gap-1 bg-white border border-gray-200 rounded-md px-2 py-1">
              {hasChildren || sc.children?.length > 0 ? (
                <button onClick={() => toggle(sc.name)} className="p-0.5 cursor-pointer">
                  {expanded[sc.name] ? <ChevronDown size={10} className="text-gray-400" /> : <ChevronRight size={10} className="text-gray-400" />}
                </button>
              ) : (
                <span className="w-4" />
              )}
              <Layers size={10} className="text-gray-400 shrink-0" />
              <span className="text-[10px] text-gray-600 font-medium flex-1">{sc.name}</span>
              <div className="flex items-center gap-0.5 transition">
                <button onClick={() => setAddingTo({ type: "subcategory", category, parentPath: currentPath })}
                  className="p-0.5 rounded text-gray-300 hover:text-green-600 cursor-pointer" title="Add child">
                  <Plus size={8} />
                </button>
                <button onClick={() => { setEditing({ type: "subcategory", category, parentPath, currentName: sc.name, title: sc.title, description: sc.description, image: sc.image, heroImage: sc.heroImage }); setEditName(sc.name); setEditTitle(sc.title || ""); setEditDescription(sc.description || ""); setEditImage(sc.image || ""); setEditHeroImage(sc.heroImage || ""); }}
                  className="p-0.5 rounded text-gray-300 hover:text-blue-600 cursor-pointer" title="Edit subcategory">
                  <Pencil size={8} />
                </button>
                <button onClick={() => handleDelete("subcategory", category, sc.name, parentPath)}
                  className="p-0.5 rounded text-gray-300 hover:text-red-600 cursor-pointer" title="Delete">
                  <Trash2 size={8} />
                </button>
              </div>
            </div>

            {isAddingHere && (
              <div className="ml-4 mt-1 mb-1 p-2 bg-green-50 border border-green-200 rounded space-y-1.5">
                <input value={newName} onChange={e => setNewName(e.target.value)}
                  placeholder="Name *"
                  className="w-full px-1.5 py-1 text-[10px] border border-green-200 rounded focus:outline-none focus:border-green-500"
                  onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAddingTo(null); }}
                  autoFocus />
                <textarea value={addDescription} onChange={e => setAddDescription(e.target.value)}
                  placeholder="Description (optional)"
                  rows={1}
                  className="w-full px-1.5 py-1 text-[10px] border border-green-200 rounded focus:outline-none focus:border-green-500 resize-none" />
                <input value={addImage} onChange={e => setAddImage(e.target.value)}
                  placeholder="Card image URL (optional)"
                  className="w-full px-1.5 py-1 text-[10px] border border-green-200 rounded focus:outline-none focus:border-green-500" />
                <div className="flex items-center gap-1 pt-0.5">
                  <button onClick={handleAdd} disabled={saving || !newName.trim()}
                    className="px-2 py-0.5 text-[9px] font-bold bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer">Add</button>
                  <button onClick={() => { setAddingTo(null); setAddDescription(""); setAddImage(""); }}
                    className="px-2 py-0.5 text-[9px] font-medium text-gray-500 hover:text-gray-700 cursor-pointer">Cancel</button>
                </div>
              </div>
            )}

            {(expanded[sc.name] || isAddingHere) && (sc.children && sc.children.length > 0 ? (
              <div className="ml-4 mt-1 mb-1">
                <SubCategoryNode
                  items={sc.children}
                  category={category}
                  parentPath={currentPath}
                  addingTo={addingTo}
                  setAddingTo={setAddingTo}
                  newName={newName}
                  setNewName={setNewName}
                  addDescription={addDescription}
                  setAddDescription={setAddDescription}
                  addImage={addImage}
                  setAddImage={setAddImage}
                  editing={editing}
                  setEditing={setEditing}
                  saving={saving}
                  handleAdd={handleAdd}
                  handleDelete={handleDelete}
                  handleRename={handleRename}
                  setEditName={setEditName}
                  setEditTitle={setEditTitle}
                  setEditDescription={setEditDescription}
                  setEditImage={setEditImage}
                  setEditHeroImage={setEditHeroImage}
                />
              </div>
            ) : (
              expanded[sc.name] && (
                <div className="ml-4 mt-1 mb-1">
                  <p className="text-[9px] text-gray-400 italic">No children yet.</p>
                </div>
              )
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function TaxonomyManager({ open, onClose, onChanged }: TaxonomyManagerProps) {
  const [data, setData] = useState<TaxonomyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [addingTo, setAddingTo] = useState<{ type: "category" | "subcategory"; category?: string; parentPath?: string } | null>(null);
  const [newName, setNewName] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addImage, setAddImage] = useState("");
  const [addCategoryImage, setAddCategoryImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<EditingItem>(null);
  const [editName, setEditName] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editHeroImage, setEditHeroImage] = useState("");

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
        await addCategory(newName.trim(), addCategoryImage);
      } else if (addingTo?.type === "subcategory" && addingTo.category) {
        await addSubCategory(addingTo.category, newName.trim(), addingTo.parentPath || "", "", addDescription, addImage, "");
      }
      setNewName("");
      setAddDescription("");
      setAddImage("");
      setAddCategoryImage("");
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
        await renameCategory(editing.currentName, editName.trim(), editImage || undefined);
      } else if (editing.type === "subcategory" && editing.category) {
        await renameSubCategory(editing.category, editing.currentName, editName.trim(), editing.parentPath || "", editTitle, editDescription, editImage, editHeroImage);
      }
      setEditing(null);
      setEditName("");
      setEditTitle("");
      setEditDescription("");
      setEditImage("");
      setEditHeroImage("");
      await load();
      onChanged();
      toast.success("Saved successfully");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (type: "category" | "subcategory", category?: string, name?: string, parentPath?: string) => {
    const label = type === "category" ? "category" : "subcategory";
    if (!confirm(`Delete ${label} "${name}"? This cannot be undone.`)) return;
    setSaving(true);
    try {
      if (type === "category" && name) {
        await deleteCategory(name);
      } else if (type === "subcategory" && category && name) {
        await deleteSubCategory(category, name, parentPath || "");
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
            <p className="text-xs text-gray-400 mt-0.5">Add, rename, or remove categories and subcategories.</p>
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
                      <span className="text-[10px] text-gray-400 font-medium">({cat.subCategories.length} subcategories)</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setAddingTo({ type: "subcategory", category: cat.category, parentPath: "" })}
                        className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-green-600 transition cursor-pointer" title="Add subcategory">
                        <Plus size={12} />
                      </button>
                      <button onClick={() => { setEditing({ type: "category", currentName: cat.category, image: cat.image }); setEditName(cat.category); setEditTitle(""); setEditDescription(""); setEditImage(cat.image || ""); setEditHeroImage(""); }}
                        className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-blue-600 transition cursor-pointer" title="Edit">
                        <Pencil size={12} />
                      </button>
                      <button onClick={() => handleDelete("category", undefined, cat.category)}
                        className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-red-600 transition cursor-pointer" title="Delete">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  {expanded[cat.category] && (
                    <div className="border-t border-gray-100">
                      {addingTo?.type === "subcategory" && addingTo.category === cat.category && addingTo.parentPath === "" && (
                        <div className="p-3 bg-green-50 border-b border-green-100 space-y-2">
                          <input value={newName} onChange={e => setNewName(e.target.value)}
                            placeholder="Subcategory name *"
                            className="w-full px-2 py-1.5 text-xs border border-green-200 rounded focus:outline-none focus:border-green-500"
                            onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAddingTo(null); }}
                            autoFocus />
                          <textarea value={addDescription} onChange={e => setAddDescription(e.target.value)}
                            placeholder="Description (optional)"
                            rows={2}
                            className="w-full px-2 py-1.5 text-xs border border-green-200 rounded focus:outline-none focus:border-green-500 resize-none" />
                          <input value={addImage} onChange={e => setAddImage(e.target.value)}
                            placeholder="Card image URL (optional)"
                            className="w-full px-2 py-1.5 text-xs border border-green-200 rounded focus:outline-none focus:border-green-500" />
                          <div className="flex items-center gap-2 pt-1">
                            <button onClick={handleAdd} disabled={saving || !newName.trim()}
                              className="px-3 py-1.5 text-[10px] font-bold bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer">Add Subcategory</button>
                            <button onClick={() => { setAddingTo(null); setAddDescription(""); setAddImage(""); }}
                              className="px-3 py-1.5 text-[10px] font-medium text-gray-500 hover:text-gray-700 cursor-pointer">Cancel</button>
                          </div>
                        </div>
                      )}

                      {cat.subCategories.length === 0 ? (
                        <div className="px-6 py-4 text-xs text-gray-400 italic">No subcategories yet.</div>
                      ) : (
                        <div className="bg-gray-50/50 px-10 py-2">
                          <SubCategoryNode
                            items={cat.subCategories}
                            category={cat.category}
                            parentPath=""
                            addingTo={addingTo}
                            setAddingTo={setAddingTo}
                            newName={newName}
                            setNewName={setNewName}
                            addDescription={addDescription}
                            setAddDescription={setAddDescription}
                            addImage={addImage}
                            setAddImage={setAddImage}
                            editing={editing}
                            setEditing={setEditing}
                            saving={saving}
                            handleAdd={handleAdd}
                            handleDelete={handleDelete}
                            handleRename={handleRename}
                            setEditName={setEditName}
                            setEditTitle={setEditTitle}
                            setEditDescription={setEditDescription}
                            setEditImage={setEditImage}
                            setEditHeroImage={setEditHeroImage}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {addingTo?.type === "category" && (
                <div className="border border-dashed border-green-300 rounded-xl p-3 bg-green-50 space-y-2">
                  <input value={newName} onChange={e => setNewName(e.target.value)}
                    placeholder="Category name..."
                    className="w-full px-2 py-1.5 text-sm border border-green-200 rounded focus:outline-none focus:border-green-500"
                    onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAddingTo(null); }}
                    autoFocus />
                  <input value={addCategoryImage} onChange={e => setAddCategoryImage(e.target.value)}
                    placeholder="Image URL (optional)"
                    className="w-full px-2 py-1.5 text-sm border border-green-200 rounded focus:outline-none focus:border-green-500" />
                  {addCategoryImage && (
                    <div className="h-16 rounded border border-green-200 overflow-hidden bg-white">
                      <img src={addCategoryImage} alt="" className="w-full h-full object-contain"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button onClick={handleAdd} disabled={saving || !newName.trim()}
                      className="px-3 py-1.5 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 cursor-pointer">Add</button>
                    <button onClick={() => { setAddingTo(null); setNewName(""); setAddCategoryImage(""); }}
                      className="p-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"><X size={14} /></button>
                  </div>
                </div>
              )}

              <button onClick={() => setAddingTo({ type: "category" })}
                className="w-full py-2.5 border border-dashed border-gray-300 rounded-xl text-xs font-bold text-gray-400 hover:text-[#C3110C] hover:border-[#C3110C]/30 transition flex items-center justify-center gap-1.5 cursor-pointer">
                <Plus size={14} /> Add Category
              </button>
            </div>
          )}
        </div>

        {editing && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 rounded-2xl">
            <div className="bg-white rounded-xl shadow-2xl p-5 w-96 max-h-[80vh] overflow-y-auto">
              <h3 className="text-sm font-bold text-gray-900 mb-1 capitalize">
                {editing.type === "subcategory" ? "Edit" : "Rename"} {editing.type}
              </h3>
              <p className="text-[11px] text-gray-500 mb-3">Current: <span className="font-medium text-gray-700">{editing.currentName}</span></p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">Name</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)}
                    placeholder="New name..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50"
                    onKeyDown={e => { if (e.key === "Enter") handleRename(); if (e.key === "Escape") setEditing(null); }}
                    autoFocus />
                </div>

                {editing.type === "category" && (
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Image URL</label>
                    <input value={editImage} onChange={e => setEditImage(e.target.value)}
                      placeholder="https://example.com/category.jpg"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50" />
                    {editImage && (
                      <div className="mt-1.5 h-16 rounded border border-gray-200 overflow-hidden bg-gray-50">
                        <img src={editImage} alt="" className="w-full h-full object-contain"
                          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                    )}
                  </div>
                )}

                {editing.type === "subcategory" && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Hero Title (overrides name)</label>
                      <input value={editTitle} onChange={e => setEditTitle(e.target.value)}
                        placeholder="Page title"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Description</label>
                      <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)}
                        placeholder="Page description"
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 resize-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Card Image URL</label>
                      <input value={editImage} onChange={e => setEditImage(e.target.value)}
                        placeholder="https://example.com/thumbnail.jpg"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50" />
                      {editImage && (
                        <div className="mt-1.5 h-16 rounded border border-gray-200 overflow-hidden bg-gray-50">
                          <img src={editImage} alt="" className="w-full h-full object-cover"
                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Hero Banner URL</label>
                      <input value={editHeroImage} onChange={e => setEditHeroImage(e.target.value)}
                        placeholder="https://example.com/banner.jpg"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50" />
                      {editHeroImage && (
                        <div className="mt-1.5 h-16 rounded border border-gray-200 overflow-hidden bg-gray-50">
                          <img src={editHeroImage} alt="" className="w-full h-full object-cover"
                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                <button onClick={() => { setEditing(null); setEditTitle(""); setEditDescription(""); setEditImage(""); setEditHeroImage(""); }}
                  className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition cursor-pointer">Cancel</button>
                <button onClick={handleRename} disabled={saving || !editName.trim()}
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
