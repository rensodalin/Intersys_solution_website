import environment from "@/enviroment/enviroment";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { fetchProducts } from "@/utils/productApi";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { ProductCardGrid } from "@/components/Product/ProductCardGrid";
import { CatalogSidebar } from "@/components/Product/CatalogSidebar";
import { ProductHero } from "@/components/Product/ProductHero";
import { Package } from "lucide-react";
import { toSlug } from "@/lib/utils";
import { useProductsLayout } from "@/context/ProductsLayoutContext";
import type { TaxonomySubCategory } from "@/utils/taxonomyApi";

export const Route = createFileRoute("/products/$slug/$subcategory")({
  head: ({ params }) => ({
    meta: [
      { title: `${slugToTitle(params.subcategory)} — ${slugToTitle(params.slug)} — Intersys Solutions` },
    ],
  }),
  component: SubcategoryProductsPage,
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

function findSubcategoryWithPath(items: TaxonomySubCategory[], slug: string): { node: TaxonomySubCategory; path: string } | null {
  for (const item of items) {
    if (toSlug(item.name) === slug) return { node: item, path: item.name };
    if (item.children?.length) {
      const found = findSubcategoryWithPath(item.children, slug);
      if (found) return { node: found.node, path: `${item.name}/${found.path}` };
    }
  }
  return null;
}

function SubcategoryProductsPage() {
  const { slug, subcategory } = Route.useParams();
  const { taxonomy } = useTaxonomy();
  const category = taxonomy.find(t => toSlug(t.category) === slug);
  const categoryName = category?.category || slugToTitle(slug);
  const found = category ? findSubcategoryWithPath(category.subCategories || [], subcategory) : null;
  const subData = found?.node || null;
  const subcategoryName = subData?.title || subData?.name || slugToTitle(subcategory);
  const brandSubCategoryPath = found?.path || subcategoryName;
  const childSubCategories = subData?.children || [];

  const [currentSort, setCurrentSort] = useState<SortOption>("name-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = environment;

  const { isSidebarOpen, setIsSidebarOpen, toggleSidebar, openMobileSidebar } = useProductsLayout();

  const handleToggleFilter = () => {
    if (window.innerWidth < 1024) {
      openMobileSidebar();
    } else {
      toggleSidebar();
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts(categoryName, undefined, subcategoryName)
      .then(data => setApiProducts(data))
      .catch(() => setApiProducts([]))
      .finally(() => setLoading(false));
  }, [categoryName, brandSubCategoryPath]);

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
    { name: subcategoryName, href: `/products/${slug}/${subcategory}` },
  ];

  return (
    <div className="bg-white min-h-screen">
      <ProductHero
        title={subcategoryName}
        subtitle={subData?.description || `Browse high-performance ${subcategoryName.toLowerCase()} products.`}
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

            {childSubCategories.length > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-4">Subcategories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {childSubCategories.map(child => {
                    const childSlug = toSlug(child.name);
                    const childLink = `/products/${slug}/${subcategory}/${childSlug}`;
                    return (
                      <Link key={child.name}
                        to={childLink}
                        className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-gray-300 transition-all"
                      >
                        {child.image ? (
                          <div className="h-48 md:h-56 flex items-center justify-center bg-gray-50">
                            <img src={child.image} alt={child.title || child.name} className="max-h-full max-w-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="h-48 md:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                            <Package size={40} className="text-gray-200" />
                          </div>
                        )}
                        <div className="p-4">
                          <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-[#C3110C] transition-colors truncate">
                            {child.title || child.name}
                          </h4>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {childSubCategories.length > 0 ? null : loading ? (
              <div className="text-center py-20 text-gray-400 text-sm">Loading products...</div>
            ) : mapped.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-sm flex flex-col items-center gap-4">
                <Package size={48} className="text-gray-200" />
                <p>No {subcategoryName} products yet.</p>
                <Link to={`/products/${slug}`} className="text-[#C3110C] hover:underline text-xs font-bold">
                  View all {categoryName} products
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
