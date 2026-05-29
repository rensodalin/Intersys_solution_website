const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1000";

export interface ApiProduct {
    _id: string;
    productId: string;
    title: string;
    description: string;
    mainImage: string;
    category: string;
    brand: string;
    brandSubCategory?: string;
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
