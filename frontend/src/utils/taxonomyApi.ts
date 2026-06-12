const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

export interface TaxonomySubCategory {
  name: string;
  title?: string;
  description?: string;
  image?: string;
  heroImage?: string;
  children: TaxonomySubCategory[];
}

export interface TaxonomyCategory {
  _id?: string;
  category: string;
  image?: string;
  subCategories: TaxonomySubCategory[];
}

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

export async function fetchTaxonomy(): Promise<TaxonomyCategory[]> {
  const res = await fetch(`${baseUrl}/api/taxonomy`, { credentials: "include" });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch taxonomy");
  return json.data;
}

export async function addCategory(category: string, image = ""): Promise<TaxonomyCategory> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ category, image }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to add category");
  return json.data;
}

export async function renameCategory(oldName: string, newName: string, image?: string): Promise<TaxonomyCategory> {
  const body: Record<string, string> = { category: newName };
  if (image !== undefined) body.image = image;
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(oldName)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
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

export async function addSubCategory(category: string, subCategory: string, parentPath = "", title = "", description = "", image = "", heroImage = ""): Promise<TaxonomyCategory> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(category)}/subcategory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ subCategory, parentPath, title, description, image, heroImage }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to add subcategory");
  return json.data;
}

export async function renameSubCategory(category: string, oldSubName: string, newSubName: string, parentPath = "", title?: string, description?: string, image?: string, heroImage?: string): Promise<TaxonomyCategory> {
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(category)}/subcategory/${encodeURIComponent(oldSubName)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ subCategory: newSubName, parentPath, title, description, image, heroImage }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to rename subcategory");
  return json.data;
}

export async function deleteSubCategory(category: string, subName: string, parentPath = ""): Promise<void> {
  const params = new URLSearchParams();
  if (parentPath) params.set("parentPath", parentPath);
  const qs = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${baseUrl}/api/taxonomy/category/${encodeURIComponent(category)}/subcategory/${encodeURIComponent(subName)}${qs}`, {
    method: "DELETE",
    credentials: "include",
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to delete subcategory");
}
