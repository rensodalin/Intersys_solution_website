import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CatalogSidebar } from "@/components/Product/CatalogSidebar";
import { Footer } from "@/components/Layout/Footer";

export const Route = createFileRoute("/products")({
  component: ProductsLayout,
});

function ProductsLayout() {
  return (
    <div className="flex bg-white min-h-screen">
      {/* Fixed Sidebar for Catalog Navigation */}
      <CatalogSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer isCompact />
      </main>
    </div>
  );
}
