import React, { useState } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CatalogSidebar } from "@/components/Product/CatalogSidebar";
import { Footer } from "@/components/Layout/Footer";

export const Route = createFileRoute("/products")({
  component: ProductsLayout,
});

function ProductsLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex bg-white min-h-screen">
      {/* Fixed Sidebar for Catalog Navigation */}
      <CatalogSidebar 
        isDesktopOpen={isSidebarOpen} 
        setIsDesktopOpen={setIsSidebarOpen} 
      />

      {/* Main Content Area */}
      <main 
        className={`flex-1 min-w-0 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-[288px]" : "pl-0"
        }`}
      >
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer isCompact />
      </main>
    </div>
  );
}
