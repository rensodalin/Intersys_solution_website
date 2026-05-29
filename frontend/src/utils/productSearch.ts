const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1000";

export interface SearchResult {
    id: string;
    title: string;
    description: string;
    image: string;
    brand: string;
    link: string;
}

let searchCache: SearchResult[] | null = null;
let initPromise: Promise<void> | null = null;

function categoryFromLink(category: string): string {
    if (category.includes("Surveillance")) return "/products/surveillance";
    if (category.includes("Building Management")) return "/products/building-management";
    if (category.includes("Access Control")) return "/products/access-control";
    return "/products";
}

function brandLabel(brand: string): string {
    if (brand === "Intersys") return "Surveillance";
    if (brand === "BMS") return "Building Management";
    return brand;
}

export async function initSearchIndex(): Promise<void> {
    if (searchCache) return;
    if (initPromise) return initPromise;

    initPromise = (async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/products`, { credentials: "include" });
            const json = await res.json();
            if (!json.success || !json.data) return;

            searchCache = json.data.map((p: any) => ({
                id: p.productId,
                title: p.title,
                description: p.description || "",
                image: p.mainImage || "",
                brand: brandLabel(p.brand),
                link: `/products/detail/${p.productId}?from=${categoryFromLink(p.category)}`,
            }));
        } catch {
            searchCache = [];
        }
    })();

    return initPromise;
}

export const searchProducts = (query: string): SearchResult[] => {
    if (!query || query.length < 2) return [];
    const products = searchCache || [];
    const lowerQuery = query.toLowerCase();

    return products.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
};
