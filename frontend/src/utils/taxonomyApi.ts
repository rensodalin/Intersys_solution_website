const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

export interface TaxonomySubCategory {
  name: string;
  children: TaxonomySubCategory[];
}

export interface TaxonomyBrand {
  _id?: string;
  name: string;
  subCategories: TaxonomySubCategory[];
}

export interface TaxonomyCategory {
  _id?: string;
  category: string;
  brands: TaxonomyBrand[];
}

// ── Flatten tree to path strings ──────────────────────────────

export function flattenTree(arr: TaxonomySubCategory[], prefix = ""): string[] {
  const result: string[] = [];
  for (const item of arr) {
    const path = prefix ? `${prefix}/${item.name}` : item.name;
    result.push(path);
    if (item.children && item.children.length > 0) {
      result.push(...flattenTree(item.children, path));
    }
  }
  return result;
}

// ── API calls ─────────────────────────────────────────────────

export async function fetchTaxonomy(): Promise<TaxonomyCategory[]> {
  const res = await fetch(`${baseUrl}/api/taxonomy`, { credentials: "include" });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch taxonomy");
  return json.data;
}

export async function addCategory(category: string): Promise<TaxonomyCategory> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ category }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to add category");
  return json.data;
}

export async function renameCategory(oldName: string, newName: string): Promise<TaxonomyCategory> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(oldName)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ category: newName }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to rename category");
  return json.data;
}

export async function deleteCategory(name: string): Promise<void> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(name)}`, {
    method: "DELETE",
    credentials: "include",
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to delete category");
}

export async function addBrand(category: string, brandName: string): Promise<TaxonomyCategory> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(category)}/brand`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name: brandName }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to add brand");
  return json.data;
}

export async function renameBrand(category: string, oldBrandName: string, newBrandName: string): Promise<TaxonomyCategory> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(category)}/brand/${encodeURIComponent(oldBrandName)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name: newBrandName }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to rename brand");
  return json.data;
}

export async function deleteBrand(category: string, brandName: string): Promise<void> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(category)}/brand/${encodeURIComponent(brandName)}`, {
    method: "DELETE",
    credentials: "include",
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to delete brand");
}

export async function addSubCategory(category: string, brandName: string, subCategory: string, parentPath = ""): Promise<TaxonomyCategory> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(category)}/brand/${encodeURIComponent(brandName)}/subcategory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ subCategory, parentPath }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to add subcategory");
  return json.data;
}

export async function renameSubCategory(category: string, brandName: string, oldSubName: string, newSubName: string, parentPath = ""): Promise<TaxonomyCategory> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(category)}/brand/${encodeURIComponent(brandName)}/subcategory/${encodeURIComponent(oldSubName)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ subCategory: newSubName, parentPath }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to rename subcategory");
  return json.data;
}

export async function deleteSubCategory(category: string, brandName: string, subName: string, parentPath = ""): Promise<void> {
  const params = new URLSearchParams();
  if (parentPath) params.set("parentPath", parentPath);
  const qs = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(category)}/brand/${encodeURIComponent(brandName)}/subcategory/${encodeURIComponent(subName)}${qs}`, {
    method: "DELETE",
    credentials: "include",
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to delete subcategory");
}
