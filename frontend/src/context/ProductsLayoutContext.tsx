import React, { createContext, useContext, useState } from "react";

interface ProductsLayoutContextType {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSidebar: () => void;
}

const ProductsLayoutContext = createContext<ProductsLayoutContextType>({
    isSidebarOpen: true,
    setIsSidebarOpen: () => {},
    toggleSidebar: () => {},
});

export function ProductsLayoutProvider({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <ProductsLayoutContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, toggleSidebar }}>
            {children}
        </ProductsLayoutContext.Provider>
    );
}

export function useProductsLayout() {
    return useContext(ProductsLayoutContext);
}
