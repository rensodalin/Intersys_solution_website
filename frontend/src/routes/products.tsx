import React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CatalogSidebar } from "@/components/Product/CatalogSidebar";
import { Footer } from "@/components/Layout/Footer";
import { ProductsLayoutProvider, useProductsLayout } from "@/context/ProductsLayoutContext";

export const Route = createFileRoute("/products")({
  component: ProductsPageWrapper,
});

function ProductsPageWrapper() {
  return (
    <ProductsLayoutProvider>
      <ProductsLayoutContent />
    </ProductsLayoutProvider>
  );
}

function ProductsLayoutContent() {
  const { isSidebarOpen, setIsSidebarOpen } = useProductsLayout();

  return (
    <div className="bg-white min-h-screen flex flex-col pt-20 md:pt-24">
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-6 md:gap-8 items-start">
          <CatalogSidebar
            isDesktopOpen={isSidebarOpen}
            setIsDesktopOpen={setIsSidebarOpen}
          />
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer isCompact />
    </div>
  );
}

