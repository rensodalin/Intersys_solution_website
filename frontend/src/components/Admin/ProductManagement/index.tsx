import { useEffect, useState, useCallback } from "react";
import { Plus, Layers } from "lucide-react";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "@/utils/productApi";
import { fetchTaxonomy, flattenTree } from "@/utils/taxonomyApi";
import type { TaxonomyCategory } from "@/utils/taxonomyApi";
import { toast } from "sonner";
import type { ApiProduct } from "./types";
import { BLANK_FORM } from "./types";
import { productToForm, toSlug } from "./utils";
import { ITEMS_PER_PAGE, CATEGORIES as FALLBACK_CATEGORIES, SUBCATEGORIES as FALLBACK_SUBCATEGORIES } from "./constants";
import { FilterBar } from "./FilterBar";
import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { TaxonomyManager } from "./TaxonomyManager";

export function ProductManagement() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Taxonomy
  const [taxonomy, setTaxonomy] = useState<TaxonomyCategory[]>([]);
  const [showTaxonomyManager, setShowTaxonomyManager] = useState(false);

  const categories = taxonomy.length > 0 ? taxonomy.map(t => t.category) : FALLBACK_CATEGORIES;
  const subCategories: Record<string, string[]> = {};
  if (taxonomy.length > 0) {
    for (const t of taxonomy) {
      subCategories[t.category] = flattenTree(t.subCategories || []);
    }
  } else {
    Object.assign(subCategories, FALLBACK_SUBCATEGORIES);
  }

  // Filters
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");

  // Pagination
  const [page, setPage] = useState(1);

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(BLANK_FORM);

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<ApiProduct | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ─── Load Products ──────────────────────────────────────────

  const loadTaxonomy = useCallback(async () => {
    try {
      const data = await fetchTaxonomy();
      setTaxonomy(data);
    } catch { /* use defaults */ }
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(
        filterCategory || undefined,
        undefined,
        filterSubCategory || undefined
      );
      setProducts(data);
      setPage(1);
    } catch (e: any) {
      toast.error(e.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [filterCategory, filterSubCategory]);

  useEffect(() => { loadTaxonomy(); }, [loadTaxonomy]);
  useEffect(() => { loadProducts(); }, [loadProducts]);

  // ─── Filtered / Paginated List ──────────────────────────────

  const filtered = products.filter(p =>
    !search ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.productId.toLowerCase().includes(search.toLowerCase()) ||
    (p.brand || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.options || []).some(o => o.partCode.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // ─── Form Handlers ──────────────────────────────────────────

  function autoGenerateLink(cat: string, subCat: string) {
    const catSlug = cat.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
    if (subCat) {
      const subSlug = subCat
        .toLowerCase()
        .replace(/\s+&\s+/g, "-")
        .replace(/\s+/g, "-")
        .replace(/\/+/g, "-")
        .replace(/[^\w-]/g, "");
      return `/products/${catSlug}/${subSlug}`;
    }
    return `/products/${catSlug}`;
  }

  function setField(key: string, value: any) {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === "category" || key === "brandSubCategory") {
        next.brandSubCategoryLink = autoGenerateLink(
          key === "category" ? value : next.category,
          key === "brandSubCategory" ? value : next.brandSubCategory
        );
      }
      return next;
    });
  }

  function handleTitleChange(val: string) {
    setField("title", val);
    if (!editingId) setField("productId", toSlug(val));
  }

  function handleSubCategoryChange(val: string) {
    setField("brandSubCategory", val);
  }

  function openCreate() {
    setEditingId(null);
    setForm(BLANK_FORM);
    setShowForm(true);
  }

  function openEdit(p: ApiProduct) {
    setEditingId(p.productId);
    setForm(productToForm(p));
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditingId(null); }

  // ─── Save ───────────────────────────────────────────────────

  async function handleSave() {
    if (!form.productId || !form.title || !form.category) {
      toast.error("Product ID, Title and Category are required.");
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

  // ─── Delete ─────────────────────────────────────────────────

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

  // ─── Render ─────────────────────────────────────────────────

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
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTaxonomyManager(true)}
            className="flex items-center gap-2 px-4 py-3 bg-white text-gray-600 text-sm font-bold rounded-lg border border-gray-200 hover:border-[#C3110C]/30 hover:text-[#C3110C] transition-all shadow-sm hover:shadow"
          >
            <Layers size={16} />
            Manage Categories
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-3 bg-[#C3110C] text-white text-sm font-bold rounded-lg hover:bg-[#a80f0b] transition-all shadow-lg shadow-[#C3110C]/30 hover:scale-[1.02] active:scale-95"
          >
            <Plus size={16} />
            Add New Product
          </button>
        </div>
      </div>

      <FilterBar
        search={search}
        onSearchChange={v => { setSearch(v); setPage(1); }}
        filterCategory={filterCategory}
        onCategoryChange={v => { setFilterCategory(v); setFilterSubCategory(""); }}
        filterSubCategory={filterSubCategory}
        onSubCategoryChange={setFilterSubCategory}
        categories={categories}
        subCategories={subCategories}
        loading={loading}
        totalCount={filtered.length}
      />

      <ProductTable
        loading={loading}
        paged={paged}
        filtered={filtered}
        page={page}
        totalPages={totalPages}
        search={search}
        onPageChange={setPage}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      {showForm && (
        <ProductForm
          form={form}
          editingId={editingId}
          saving={saving}
          onFieldChange={setField}
          onTitleChange={handleTitleChange}
          onSubCategoryChange={handleSubCategoryChange}
          onClose={closeForm}
          onSave={handleSave}
          categories={categories}
          subCategories={subCategories}
        />
      )}

      <TaxonomyManager
        open={showTaxonomyManager}
        onClose={() => setShowTaxonomyManager(false)}
        onChanged={() => { loadTaxonomy(); loadProducts(); }}
      />

      {deleteTarget && (
        <DeleteConfirmModal
          target={deleteTarget}
          deleting={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
