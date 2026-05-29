import { 
    honeywellAccessories, 
    honeywellCredentials, 
    honeywellReaders, 
    honeywellSoftware, 
    honeywellControlPanelKits, 
    honeywellKiosks, 
    honeywellUpgrades, 
    honeywellDoorHardware, 
    honeywellControlPanels 
} from "@/components/Product/AccessControl/Honeywell/data";

import { saltoProducts } from "@/components/Product/AccessControl/Salto/data";
import { bmsProducts } from "@/components/Product/BuildingManagement/data";
import { surveillanceProducts } from "@/components/Product/Surveillance/data";

export interface SearchResult {
    id: string;
    title: string;
    description: string;
    image: string;
    brand: string;
    link: string;
}

export const getAllSearchableProducts = (): SearchResult[] => {
    const products: SearchResult[] = [];

    // --- HONEYWELL ---
    const honeywellGroups = [
        { data: honeywellAccessories, cat: "accessories" },
        { data: honeywellCredentials, cat: "credentials" },
        { data: honeywellReaders, cat: "readers" },
        { data: honeywellSoftware, cat: "software" },
        { data: honeywellControlPanelKits, cat: "control-panel-kits" },
        { data: honeywellKiosks, cat: "lobby-kiosks" },
        { data: honeywellUpgrades, cat: "upgrades" },
        { data: honeywellDoorHardware, cat: "door-hardware" },
        { data: honeywellControlPanels, cat: "control-panels" },
    ];

    honeywellGroups.forEach(group => {
        group.data.forEach(p => {
            const slug = p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            const catLink = `/products/access-control/honeywell/${group.cat}`;
            products.push({
                id: slug,
                title: p.title,
                description: p.desc,
                image: p.image,
                brand: "Honeywell",
                link: `/products/detail/${slug}?from=${catLink}`
            });
        });
    });

    // --- SALTO ---
    saltoProducts.forEach(cat => {
        if (cat.subProducts) {
            const catLink = `/products/access-control/salto/${cat.id}`;
            cat.subProducts.forEach(p => {
                products.push({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    image: p.image,
                    brand: "Salto",
                    link: `/products/detail/${p.id}?from=${catLink}`
                });
            });
        }
    });

    // --- SURVEILLANCE ---
    surveillanceProducts.forEach(p => {
        products.push({
            id: p.id,
            title: p.title,
            image: p.image,
            description: p.description,
            brand: "Surveillance",
            link: `/products/detail/${p.id}?from=/products/surveillance`
        });
    });

    // --- BUILDING MANAGEMENT ---
    bmsProducts.forEach(p => {
        products.push({
            id: p.id,
            title: p.title,
            image: p.image,
            description: p.description,
            brand: "Building Management",
            link: `/products/detail/${p.id}?from=/products/building-management`
        });
    });

    return products;
};

export const searchProducts = (query: string): SearchResult[] => {
    if (!query || query.length < 2) return [];
    const products = getAllSearchableProducts();
    const lowerQuery = query.toLowerCase();

    return products.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery)
    ).slice(0, 8); // Limit to 8 results for sidebar
};
