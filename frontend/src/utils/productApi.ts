import environment from "@/enviroment/enviroment";

const BASE_URL = environment;

export interface ApiProduct {
    _id: string;
    productId: string;
    title: string;
    description: string;
    mainImage: string;
    category: string;
    brand: string;
    brandSubCategory?: string;
    brandSubCategoryLink?: string;
    longDescription?: string;
    thumbnails?: string[];
    options?: { partCode: string; specification?: string; price?: number; qty?: number }[];
    documents?: { name: string; url: string }[];
}

export async function fetchProducts(
    category?: string,
    brand?: string,
    brandSubCategory?: string
): Promise<ApiProduct[]> {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (brand) params.set("brand", brand);
    if (brandSubCategory) params.set("brandSubCategory", brandSubCategory);

    const res = await fetch(`${BASE_URL}/api/products?${params}`, {
        credentials: "include",
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || "Failed to fetch products");
    return json.data as ApiProduct[];
}

export async function addProduct(product: Partial<ApiProduct>): Promise<ApiProduct> {
    const res = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(product),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || "Failed to add product");
    return json.data as ApiProduct;
}

export async function updateProduct(productId: string, product: Partial<ApiProduct>): Promise<ApiProduct> {
    const res = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(product),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || "Failed to update product");
    return json.data as ApiProduct;
}

export async function deleteProduct(productId: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || "Failed to delete product");
}
