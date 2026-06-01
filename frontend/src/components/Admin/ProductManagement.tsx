import { useEffect, useState, useCallback } from "react";
import {
  Plus, Search, Pencil, Trash2, X, ChevronLeft, ChevronRight,
  Package, Image, FileText, Settings, AlertTriangle, Loader2,
  Tag, Building2, Layers, Link as LinkIcon,
} from "lucide-react";
import { fetchProducts, addProduct, updateProduct, deleteProduct, type ApiProduct } from "@/utils/productApi";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ["Access Control", "Surveillance (CCTV)", "Building Management"];
const BRANDS: Record<string, string[]> = {
  "Access Control": ["Honeywell", "SALTO"],
  "Surveillance (CCTV)": ["Intersys", "Hikvision", "Dahua", "Axis"],
  "Building Management": ["Schneider Electric", "Siemens", "Johnson Controls", "Other"],
};
const SUBCATEGORIES: Record<string, Record<string, string[]>> = {
  "Access Control": {
    Honeywell: [
      "Control Panels", "Control Panel Kits", "Readers", "Credentials",
      "Software", "Accessories", "Lobby Kiosks", "System Agreements & Upgrades", "Door Hardware",
    ],
    SALTO: ["Electronic Locks", "Online Systems", "Offline Systems", "Mobile & Cloud"],
  },
  "Surveillance (CCTV)": {
    Intersys: ["IP Cameras", "Analog Cameras", "NVR/DVR", "Accessories"],
    Hikvision: ["IP Cameras", "NVR/DVR", "Accessories"],
    Dahua: ["IP Cameras", "NVR/DVR", "Accessories"],
    Axis: ["IP Cameras", "Accessories"],
  },
  "Building Management": {
    "Schneider Electric": ["Field Devices", "Controllers", "Software", "Networking"],
    Siemens: ["Field Devices", "Controllers", "Software"],
    "Johnson Controls": ["Field Devices", "Controllers"],
    Other: ["General"],
  },
};

const ITEMS_PER_PAGE = 8;

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ProductOption { partCode: string; specification: string; price: number; qty: number; }
interface ProductDocument { name: string; url: string; }

interface FormState {
  productId: string;
  title: string;
  category: string;
  brand: string;
  brandSubCategory: string;
  brandSubCategoryLink: string;
  description: string;
  longDescription: string;
  mainImage: string;
  thumbnails: string;
  options: ProductOption[];
  documents: ProductDocument[];
}

const BLANK_FORM: FormState = {
  productId: "", title: "", category: "", brand: "", brandSubCategory: "",
  brandSubCategoryLink: "", description: "", longDescription: "", mainImage: "",
  thumbnails: "", options: [], documents: [],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

function productToForm(p: ApiProduct): FormState {
  return {
    productId: p.productId,
    title: p.title,
    category: p.category,
    brand: p.brand,
    brandSubCategory: p.brandSubCategory || "",
    brandSubCategoryLink: p.brandSubCategoryLink || "",
    description: p.description || "",
    longDescription: p.longDescription || "",
    mainImage: p.mainImage || "",
    thumbnails: (p.thumbnails || []).join(", "),
    options: (p.options || []).map(o => ({
      partCode: o.partCode, specification: o.specification || "", price: o.price || 0, qty: o.qty || 0,
    })),
    documents: (p.documents || []).map(d => ({ name: d.name, url: d.url })),
  };
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ProductManagement() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");

  // Pagination
  const [page, setPage] = useState(1);

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(BLANK_FORM);
  const [activeTab, setActiveTab] = useState<"basic" | "media" | "options" | "documents">("basic");

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<ApiProduct | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ─── Load Products ────────────────────────────────────────────────────────────

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(
        filterCategory || undefined,
        filterBrand || undefined,
        filterSubCategory || undefined
      );
      setProducts(data);
      setPage(1);
    } catch (e: any) {
      toast.error(e.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [filterCategory, filterBrand, filterSubCategory]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  // ─── Filtered / Paginated List ────────────────────────────────────────────────

  const filtered = products.filter(p =>
    !search ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.productId.toLowerCase().includes(search.toLowerCase()) ||
    (p.brand || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // ─── Form Handlers ────────────────────────────────────────────────────────────

  function openCreate() {
    setEditingId(null);
    setForm(BLANK_FORM);
    setActiveTab("basic");
    setShowForm(true);
  }

  function openEdit(p: ApiProduct) {
    setEditingId(p.productId);
    setForm(productToForm(p));
    setActiveTab("basic");
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditingId(null); }

  function setField(key: keyof FormState, value: any) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  // Options
  function addOption() {
    setForm(prev => ({ ...prev, options: [...prev.options, { partCode: "", specification: "", price: 0, qty: 0 }] }));
  }
  function updateOption(i: number, key: keyof ProductOption, value: any) {
    setForm(prev => {
      const opts = [...prev.options];
      opts[i] = { ...opts[i], [key]: value };
      return { ...prev, options: opts };
    });
  }
  function removeOption(i: number) {
    setForm(prev => ({ ...prev, options: prev.options.filter((_, idx) => idx !== i) }));
  }

  // Documents
  function addDocument() {
    setForm(prev => ({ ...prev, documents: [...prev.documents, { name: "", url: "" }] }));
  }
  function updateDocument(i: number, key: keyof ProductDocument, value: string) {
    setForm(prev => {
      const docs = [...prev.documents];
      docs[i] = { ...docs[i], [key]: value };
      return { ...prev, documents: docs };
    });
  }
  function removeDocument(i: number) {
    setForm(prev => ({ ...prev, documents: prev.documents.filter((_, idx) => idx !== i) }));
  }

  // Auto-generate productId from title if creating
  function handleTitleChange(val: string) {
    setField("title", val);
    if (!editingId) setField("productId", toSlug(val));
  }

  // Auto-generate subcategory link
  function handleSubCategoryChange(val: string) {
    setField("brandSubCategory", val);
    const cat = form.category;
    const brand = form.brand.toLowerCase();
    if (cat === "Access Control" && brand === "honeywell") {
      const slug = val.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-").replace(/[^\w-]/g, "");
      setField("brandSubCategoryLink", `/products/access-control/honeywell/${slug}`);
    }
  }

  // ─── Save ─────────────────────────────────────────────────────────────────────

  async function handleSave() {
    if (!form.productId || !form.title || !form.category || !form.brand) {
      toast.error("Product ID, Title, Category and Brand are required.");
      return;
    }
    setSaving(true);
    try {
      const payload: Partial<ApiProduct> = {
        productId: form.productId,
        title: form.title,
        category: form.category,
        brand: form.brand,
        brandSubCategory: form.brandSubCategory || undefined,
        brandSubCategoryLink: form.brandSubCategoryLink || undefined,
        description: form.description,
        longDescription: form.longDescription,
        mainImage: form.mainImage,
        thumbnails: form.thumbnails.split(",").map(s => s.trim()).filter(Boolean),
        options: form.options.filter(o => o.partCode),
        documents: form.documents.filter(d => d.name && d.url),
      };

      if (editingId) {
        const updated = await updateProduct(editingId, payload);
        setProducts(prev => prev.map(p => p.productId === editingId ? updated : p));
        toast.success("Product updated successfully!");
      } else {
        const created = await addProduct(payload);
        setProducts(prev => [created, ...prev]);
        toast.success("Product created successfully!");
      }
      closeForm();
    } catch (e: any) {
      toast.error(e.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  // ─── Delete ───────────────────────────────────────────────────────────────────

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget.productId);
      setProducts(prev => prev.filter(p => p.productId !== deleteTarget.productId));
      toast.success("Product deleted successfully!");
      setDeleteTarget(null);
    } catch (e: any) {
      toast.error(e.message || "Failed to delete product");
    } finally {
      setDeleting(false);
    }
  }

  // ─── Derived Values for Form ──────────────────────────────────────────────────

  const availableBrands = BRANDS[form.category] || [];
  const availableSubCategories = (SUBCATEGORIES[form.category]?.[form.brand]) || [];

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Product <span className="text-[#C3110C]">Management</span></h1>
          <p className="text-gray-500 text-xs mt-1 font-medium">
            Add, edit, and remove products across all categories. Changes reflect immediately on the website.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-3 bg-[#C3110C] text-white text-sm font-bold rounded-lg hover:bg-[#a80f0b] transition-all shadow-lg shadow-[#C3110C]/30 hover:scale-[1.02] active:scale-95"
        >
          <Plus size={16} />
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by title, ID, or brand..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>

        <select
          value={filterCategory}
          onChange={e => {
            setFilterCategory(e.target.value);
            setFilterBrand("");
            setFilterSubCategory("");
          }}
          className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 transition"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={filterBrand}
          disabled={!filterCategory || (BRANDS[filterCategory] || []).length === 0}
          onChange={e => {
            setFilterBrand(e.target.value);
            setFilterSubCategory("");
          }}
          className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <option value="">All Brands</option>
          {filterCategory && (BRANDS[filterCategory] || []).map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <select
          value={filterSubCategory}
          disabled={!filterCategory || !filterBrand || (SUBCATEGORIES[filterCategory]?.[filterBrand] || []).length === 0}
          onChange={e => setFilterSubCategory(e.target.value)}
          className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <option value="">All Subcategories</option>
          {filterCategory && filterBrand && (SUBCATEGORIES[filterCategory]?.[filterBrand] || []).map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <span className="text-xs text-gray-400 font-medium ml-auto">
          {loading ? "Loading..." : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={32} className="text-[#C3110C] animate-spin" />
            <p className="text-sm text-gray-400 font-medium">Loading products...</p>
          </div>
        ) : paged.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Package size={40} className="text-gray-200" />
            <p className="text-sm text-gray-400 font-medium">
              {search ? "No products match your search." : "No products found. Click 'Add New Product' to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-[10px] font-black text-gray-400 uppercase tracking-wider px-4 py-3">Product</th>
                  <th className="text-left text-[10px] font-black text-gray-400 uppercase tracking-wider px-4 py-3">Category</th>
                  <th className="text-left text-[10px] font-black text-gray-400 uppercase tracking-wider px-4 py-3">Brand</th>
                  <th className="text-left text-[10px] font-black text-gray-400 uppercase tracking-wider px-4 py-3">Subcategory</th>
                  <th className="text-left text-[10px] font-black text-gray-400 uppercase tracking-wider px-4 py-3">Options</th>
                  <th className="text-right text-[10px] font-black text-gray-400 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paged.map(p => (
                  <tr key={p.productId} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {p.mainImage
                            ? <img src={p.mainImage} alt={p.title} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                            : <Package size={16} className="text-gray-300" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-800 truncate max-w-[200px]">{p.title}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{p.productId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                        <Layers size={10} />
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold text-gray-700">{p.brand}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500">{p.brandSubCategory || <span className="text-gray-300 italic">—</span>}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold text-gray-500">{(p as any).optionsCount ?? (p.options?.length ?? 0)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>{(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition">
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = page <= 3 ? i + 1 : page + i - 2;
                if (pg > totalPages) return null;
                return (
                  <button key={pg} onClick={() => setPage(pg)}
                    className={`w-7 h-7 rounded font-bold transition ${pg === page ? "bg-[#C3110C] text-white" : "hover:bg-gray-100 text-gray-600"}`}>
                    {pg}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── Product Form Modal ─────────────────────────────────────────────────── */}
      {showForm && (
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
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
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
              {/* ── Basic Info ── */}
              {activeTab === "basic" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">Product ID *</label>
                      <input value={form.productId} onChange={e => setField("productId", e.target.value)} disabled={!!editingId}
                        placeholder="auto-generated-slug"
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 font-mono focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 disabled:opacity-60 transition" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">Title *</label>
                      <input value={form.title} onChange={e => handleTitleChange(e.target.value)}
                        placeholder="e.g. PW7000 Intelligent Control Panel"
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">Category *</label>
                      <select value={form.category} onChange={e => { setField("category", e.target.value); setField("brand", ""); setField("brandSubCategory", ""); }}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition">
                        <option value="">Select...</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">Brand *</label>
                      <select value={form.brand} onChange={e => { setField("brand", e.target.value); setField("brandSubCategory", ""); }}
                        disabled={!form.category}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 disabled:opacity-50 transition">
                        <option value="">Select...</option>
                        {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">Subcategory</label>
                      <select value={form.brandSubCategory} onChange={e => handleSubCategoryChange(e.target.value)}
                        disabled={!form.brand || availableSubCategories.length === 0}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 disabled:opacity-50 transition">
                        <option value="">None</option>
                        {availableSubCategories.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <LinkIcon size={10} /> Subcategory Link
                    </label>
                    <input value={form.brandSubCategoryLink} onChange={e => setField("brandSubCategoryLink", e.target.value)}
                      placeholder="/products/access-control/honeywell/control-panels"
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg font-mono text-xs focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">Short Description</label>
                    <textarea value={form.description} onChange={e => setField("description", e.target.value)} rows={2}
                      placeholder="Brief product description for catalog listings..."
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">Long Description</label>
                    <textarea value={form.longDescription} onChange={e => setField("longDescription", e.target.value)} rows={4}
                      placeholder="Full detailed description shown on the product detail page..."
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition" />
                  </div>
                </div>
              )}

              {/* ── Media ── */}
              {activeTab === "media" && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">Main Image URL</label>
                    <input value={form.mainImage} onChange={e => setField("mainImage", e.target.value)}
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
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                      Thumbnail URLs <span className="normal-case text-gray-400 font-normal">(comma-separated)</span>
                    </label>
                    <textarea value={form.thumbnails} onChange={e => setField("thumbnails", e.target.value)} rows={3}
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

              {/* ── Options ── */}
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
                        <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Part Code *</label>
                        <input value={opt.partCode} onChange={e => updateOption(i, "partCode", e.target.value)}
                          placeholder="PW7000" className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded font-mono focus:outline-none focus:border-[#C3110C]/50 transition" />
                      </div>
                      <div className="col-span-5">
                        <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Specification</label>
                        <input value={opt.specification} onChange={e => updateOption(i, "specification", e.target.value)}
                          placeholder="Standard Configuration" className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#C3110C]/50 transition" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Price</label>
                        <input type="number" value={opt.price} onChange={e => updateOption(i, "price", parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#C3110C]/50 transition" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Qty</label>
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

              {/* ── Documents ── */}
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
                        <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Document Name *</label>
                        <input value={doc.name} onChange={e => updateDocument(i, "name", e.target.value)}
                          placeholder="Technical Datasheet" className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#C3110C]/50 transition" />
                      </div>
                      <div className="col-span-7">
                        <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">URL *</label>
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
              <button onClick={closeForm} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#C3110C] text-white text-sm font-bold rounded-lg hover:bg-[#a80f0b] disabled:opacity-60 transition shadow-lg shadow-[#C3110C]/20">
                {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Delete Confirmation Modal ───────────────────────────────────────────── */}
      {deleteTarget && (
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
              Are you sure you want to delete <strong className="text-gray-900">"{deleteTarget.title}"</strong>? 
              It will be permanently removed from the catalog.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 disabled:opacity-60 transition">
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
