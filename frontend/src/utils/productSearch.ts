import environment from "@/enviroment/enviroment";

const BASE_URL = environment;

export interface SearchResult {
    id: string;
    title: string;
    description: string;
    image: string;
    brand: string;
    partCodes: string[];
    matchedPartCodes: string[];
    link: string;
}

let searchCache: SearchResult[] | null = null;
let initPromise: Promise<void> | null = null;

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

            searchCache = json.data.map((p: any) => {
                const fromPath = p.brandSubCategoryLink
                    ? p.brandSubCategoryLink.split('#')[0]
                    : p.category
                        ? `/products/${p.category.toLowerCase().replace(/\s+/g, '-')}`
                        : "/products";
                const partCodes = (p.options || []).map((o: any) => o.partCode).filter(Boolean);
                return {
                    id: p.productId,
                    title: p.title,
                    description: p.description || "",
                    image: p.mainImage || "",
                    brand: brandLabel(p.brand),
                    partCodes,
                    matchedPartCodes: [],
                    link: `/products/detail/${p.productId}?from=${encodeURIComponent(fromPath)}`,
                };
            });
        } catch {
            searchCache = [];
        }
    })();

    return initPromise;
}

export async function searchProducts(query: string): Promise<SearchResult[]> {
    if (!query || query.length < 1) return [];
    await initSearchIndex();
    const products = searchCache || [];
    const lowerQuery = query.toLowerCase();

    return products.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.partCodes.some(code => code.toLowerCase().includes(lowerQuery))
    ).slice(0, 8).map(p => ({
        ...p,
        matchedPartCodes: p.partCodes.filter(code =>
            code.toLowerCase().includes(lowerQuery)
        ),
    }));
};
