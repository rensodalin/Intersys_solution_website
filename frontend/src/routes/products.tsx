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
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer isCompact />
    </div>
  );
}

