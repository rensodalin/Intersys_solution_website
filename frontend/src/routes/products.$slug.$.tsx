import environment from "@/enviroment/enviroment";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { fetchProducts } from "@/utils/productApi";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { ProductCardGrid } from "@/components/Product/ProductCardGrid";
import { CatalogSidebar } from "@/components/Product/CatalogSidebar";
import { Container } from "@/components/Common/Container";
import { Package } from "lucide-react";
import { toSlug } from "@/lib/utils";
import { ProductHero } from "@/components/Product/ProductHero";
import { useProductsLayout } from "@/context/ProductsLayoutContext";
import type { TaxonomySubCategory } from "@/utils/taxonomyApi";

function buildPageTitle(slug: string, splat: string): string {
  const parts = splat.split("/").filter(Boolean).map(slugToTitle);
  const subName = parts[parts.length - 1] || "";
  const catName = slugToTitle(slug);
  return subName ? `${subName} — ${catName} — Intersys Solutions` : `${catName} — Intersys Solutions`;
}

export const Route = createFileRoute("/products/$slug/$")({
  head: ({ params }) => ({
    meta: [
      { title: buildPageTitle(params.slug, params._splat || "") },
    ],
  }),
  component: DeepSubcategoryPage,
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

function findSubcategoryByPath(items: TaxonomySubCategory[], slugs: string[]): { node: TaxonomySubCategory; path: string } | null {
  let current: TaxonomySubCategory | null = null;
  let arr = items;
  const nameParts: string[] = [];
  for (const slug of slugs) {
    const found = arr.find(item => toSlug(item.name) === slug);
    if (!found) return null;
    current = found;
    nameParts.push(found.name);
    arr = found.children || [];
  }
  if (!current) return null;
  return { node: current, path: nameParts.join("/") };
}

function buildBreadcrumbs(slug: string, categoryName: string, subSlugs: string[], subData: TaxonomySubCategory | null) {
  const trail = [
    { name: "Home", href: "/" as const },
    { name: "Products", href: "/products" as const },
    { name: categoryName, href: `/products/${slug}` },
  ];
  let accumulated = "";
  for (let i = 0; i < subSlugs.length; i++) {
    accumulated = accumulated ? `${accumulated}/${subSlugs[i]}` : subSlugs[i];
    const name = subData && i === subSlugs.length - 1
      ? (subData.title || subData.name || slugToTitle(subSlugs[i]))
      : slugToTitle(subSlugs[i]);
    trail.push({
      name,
      href: `/products/${slug}/${accumulated}`,
    });
  }
  return trail;
}

interface ProductsContext {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
}

function DeepSubcategoryPage() {
  const { slug, _splat } = Route.useParams();
  const splatPath = _splat || "";
  const subSlugs = splatPath.split("/").filter(Boolean);

  const { taxonomy } = useTaxonomy();
  const category = taxonomy.find(t => toSlug(t.category) === slug);
  const categoryName = category?.category || slugToTitle(slug);

  const found = category && subSlugs.length > 0
    ? findSubcategoryByPath(category.subCategories || [], subSlugs)
    : null;
  const subData = found?.node || null;
  const subcategoryName = subData?.title || subData?.name || (subSlugs.length > 0 ? slugToTitle(subSlugs[subSlugs.length - 1]) : "");
  const brandSubCategoryPath = found?.path || subcategoryName;
  const childSubCategories = subData?.children || [];

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
    const fullPath = `/products/${slug}/${splatPath}`.replace(/\/+$/, "");
    fetchProducts(categoryName, undefined, subcategoryName)
      .then(data => {
        const filtered = data.filter(p =>
          !p.brandSubCategoryLink || p.brandSubCategoryLink.startsWith(fullPath)
        );
        setApiProducts(filtered);
      })
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
        .filter(p => (popularity[p.title] || 0) > 0)
        .sort((a, b) => (popularity[b.title] || 0) - (popularity[a.title] || 0));
      case "name-asc": return products.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc": return products.sort((a, b) => b.title.localeCompare(a.title));
      default: return products;
    }
  }, [currentSort, popularity, filteredProducts]);

  const breadcrumbs = buildBreadcrumbs(slug, categoryName, subSlugs, subData);

  return (
    <div className="bg-white min-h-screen">
      <ProductHero
        title={subcategoryName}
        subtitle={subData?.description || `Browse high-performance ${subcategoryName.toLowerCase()} products.`}
        categoryTag={categoryName.toUpperCase()}
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {childSubCategories.map(child => {
                    const childSlug = toSlug(child.name);
                    const deeperPath = [...subSlugs, childSlug].join("/");
                    const childLink = `/products/${slug}/${deeperPath}`;
                    return (
                      <Link key={child.name}
                        to={childLink}
                        className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-gray-300 transition-all"
                      >
                        {child.image ? (
                          <div className="h-32 flex items-center justify-center bg-gray-50">
                            <img src={child.image} alt={child.title || child.name} className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                            <Package size={28} className="text-gray-200" />
                          </div>
                        )}
                        <div className="p-3">
                          <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#C3110C] transition-colors truncate">
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
            ) : (
              <>
                {mapped.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 text-sm flex flex-col items-center gap-4">
                    <Package size={48} className="text-gray-200" />
                    <p>No {subcategoryName} products yet.</p>
                    <Link to={`/products/${slug}`} className="text-[#C3110C] hover:underline text-xs font-bold">
                      View all {categoryName} products
                    </Link>
                  </div>
                ) : sortedProducts.length > 0 ? (
                  <ProductCardGrid products={sortedProducts} />
                ) : (
                  <div className="text-center py-20 text-gray-400 text-sm">
                    {searchQuery ? `No products matching "${searchQuery}"` : `No products found.`}
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
