import React, { createContext, useContext, useEffect, useState } from "react";

interface ProductsLayoutContextType {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSidebar: () => void;
    expandedSections: string[];
    setExpandedSections: React.Dispatch<React.SetStateAction<string[]>>;
}

const STORAGE_KEY = "intersys_expanded_sections";

const ProductsLayoutContext = createContext<ProductsLayoutContextType>({
    isSidebarOpen: true,
    setIsSidebarOpen: () => {},
    toggleSidebar: () => {},
    expandedSections: [],
    setExpandedSections: () => {},
});

export function ProductsLayoutProvider({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [expandedSections, setExpandedSections] = useState<string[]>(() => {
        try {
            return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(expandedSections));
        } catch {
            // ignore storage errors
        }
    }, [expandedSections]);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <ProductsLayoutContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, toggleSidebar, expandedSections, setExpandedSections }}>
            {children}
        </ProductsLayoutContext.Provider>
    );
}

export function useProductsLayout() {
    return useContext(ProductsLayoutContext);
}
