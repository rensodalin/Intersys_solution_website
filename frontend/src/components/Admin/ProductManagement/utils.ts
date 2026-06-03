import type { FormState, ApiProduct } from "./types";

export function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export function productToForm(p: ApiProduct): FormState {
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
