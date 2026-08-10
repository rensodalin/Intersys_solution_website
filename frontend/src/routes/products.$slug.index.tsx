import environment from "@/enviroment/enviroment";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { fetchProducts } from "@/utils/productApi";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { ProductCardGrid } from "@/components/Product/ProductCardGrid";
import { CatalogSidebar } from "@/components/Product/CatalogSidebar";
import { Package } from "lucide-react";
import { toSlug } from "@/lib/utils";
import { ProductHero } from "@/components/Product/ProductHero";
import { useProductsLayout } from "@/context/ProductsLayoutContext";

export const Route = createFileRoute("/products/$slug/")({
  head: ({ params }) => ({
    meta: [
      { title: `${slugToTitle(params.slug)} — Intersys Solutions` },
    ],
  }),
  component: CategoryProductsPage,
});

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map(w => {
      const s = w.charAt(0).toUpperCase() + w.slice(1);
      return s.length <= 4 ? s.toUpperCase() : s;
    })
    .join(" ");
}

function CategoryProductsPage() {
  const { slug } = Route.useParams();
  const { taxonomy } = useTaxonomy();
  const category = taxonomy.find(t => toSlug(t.category) === slug);
  const categoryName = category?.category || slugToTitle(slug);
  const subCategories = category?.subCategories || [];

  const { isSidebarOpen, setIsSidebarOpen, toggleSidebar, openMobileSidebar } = useProductsLayout();

  const handleToggleFilter = () => {
    if (window.innerWidth < 1024) {
      openMobileSidebar();
    } else {
      toggleSidebar();
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [currentSort, setCurrentSort] = useState<SortOption>("name-asc");
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = environment;

  useEffect(() => {
    setLoading(true);
    fetchProducts(categoryName)
      .then(data => setApiProducts(data))
      .catch(() => setApiProducts([]))
      .finally(() => setLoading(false));
  }, [categoryName]);

  const [popularity, setPopularity] = useState<Record<string, number>>({});
  useEffect(() => {
    fetch(`${baseUrl}/api/products/popularity/list`, { credentials: "include" })
      .then(r => r.json())
      .then(d => { if (d.success) setPopularity(d.data); })
      .catch(() => {});
  }, []);

  const mapped = useMemo(() =>
    apiProducts.map(p => ({
        id: p.productId,
        title: p.title,
        image: p.mainImage,
        description: p.description,
      })), [apiProducts]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return mapped;
    const q = searchQuery.toLowerCase();
    return mapped.filter(p =>
      p.title.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))
    );
  }, [mapped, searchQuery]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    switch (currentSort) {
      case "newest": return products.reverse();
      case "popular": return products
        .filter(p => (popularity[p.title] || 0) > 0)
        .sort((a, b) => (popularity[b.title] || 0) - (popularity[a.title] || 0));
      case "name-asc": return products.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc": return products.sort((a, b) => b.title.localeCompare(a.title));
      default: return products;
    }
  }, [currentSort, popularity, filteredProducts]);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: categoryName, href: `/products/${slug}` },
  ];

  return (
    <div className="bg-white min-h-screen">
      <ProductHero
        title={categoryName}
        subtitle={
          subCategories.length > 0
            ? `Browse our ${categoryName.toLowerCase()} solutions by category.`
            : `Explore our range of ${categoryName.toLowerCase()} solutions.`
        }
        categoryTag="STORE CATALOG"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 md:gap-8 items-start">
          <CatalogSidebar
            isDesktopOpen={isSidebarOpen}
            setIsDesktopOpen={setIsSidebarOpen}
          />

          <div className="flex-1 min-w-0">
            <ProductSort
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isFilterOpen={isSidebarOpen}
              onToggleFilter={handleToggleFilter}
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              totalProducts={sortedProducts.length}
            />

            {subCategories.length > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-4">Subcategories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {subCategories.map(sub => {
                    const subSlug = toSlug(sub.name);
                    const linkTo = `/products/${slug}/${subSlug}`;
                    return (
                      <Link key={sub.name}
                        to={linkTo}
                        className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-gray-300 transition-all"
                      >
                        {sub.image ? (
                          <div className="h-36 md:h-44 flex items-center justify-center bg-gray-50">
                            <img src={sub.image} alt={sub.title || sub.name} className="max-h-full max-w-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="h-36 md:h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                            <Package size={40} className="text-gray-200" />
                          </div>
                        )}
                        <div className="p-4">
                          <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-[#C3110C] transition-colors truncate">
                            {sub.title || sub.name}
                          </h4>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {subCategories.length > 0 ? null : loading ? (
              <div className="text-center py-20 text-gray-400 text-sm">Loading products...</div>
            ) : mapped.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-sm flex flex-col items-center gap-4">
                <Package size={48} className="text-gray-200" />
                <p>No products yet in this category.</p>
                <Link to="/products" className="text-[#C3110C] hover:underline text-xs font-bold">
                  Browse all categories
                </Link>
              </div>
            ) : (
              <>
                {sortedProducts.length > 0 ? (
                  <ProductCardGrid products={sortedProducts} />
                ) : (
                  <div className="text-center py-20 text-gray-400 text-sm">
                    {searchQuery ? `No products matching "${searchQuery}"` : "No products found."}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


