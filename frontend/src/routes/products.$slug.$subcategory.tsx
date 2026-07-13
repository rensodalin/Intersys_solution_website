import environment from "@/enviroment/enviroment";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { fetchProducts } from "@/utils/productApi";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { ProductCardGrid } from "@/components/Product/ProductCardGrid";
import { Container } from "@/components/Common/Container";
import { Package, ChevronRight } from "lucide-react";
import { toSlug } from "@/lib/utils";
import { motion } from "framer-motion";
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
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = environment;

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

  const sortedProducts = useMemo(() => {
    const products = [...mapped];
    switch (currentSort) {
      case "newest": return products.reverse();
      case "popular": return products
        .filter(p => (popularity[p.title] || 0) > 0)
        .sort((a, b) => (popularity[b.title] || 0) - (popularity[a.title] || 0));
      case "name-asc": return products.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc": return products.sort((a, b) => b.title.localeCompare(a.title));
      default: return products;
    }
  }, [currentSort, popularity, mapped]);

  const breadcrumbs = (() => {
    const trail = [
      { name: "Home", href: "/" as const },
      { name: "Products", href: "/products" as const },
      { name: categoryName, href: `/products/${slug}` },
    ];
    if (subcategoryName) {
      trail.push({ name: subcategoryName, href: `/products/${slug}/${subcategory}` });
    }
    return trail;
  })();

  return (
    <div className="bg-white min-h-screen">
      <section className="relative w-full overflow-hidden bg-white">
        {subData?.heroImage && (
          <div className="w-full relative h-[180px] md:h-[220px] overflow-hidden pt-24 md:pt-28">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src={subData.heroImage}
              alt={subcategoryName}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-white/20" />
          </div>
        )}

        <div className="bg-[#F8F9FA] pt-28 md:pt-32 pb-10 px-8 border-b border-gray-200/50">
          <Container>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <nav className="flex items-center gap-2 mb-4 flex-wrap">
                {breadcrumbs.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <Link
                      to={item.href}
                      className={`text-xs transition-colors ${
                        index === breadcrumbs.length - 1
                          ? "text-gray-700 pointer-events-none"
                          : "text-gray-400 hover:text-[#C3110C]"
                      }`}
                    >
                      {item.name}
                    </Link>
                    {index < breadcrumbs.length - 1 && (
                      <span className="text-gray-300 text-xs">/</span>
                    )}
                  </div>
                ))}
              </nav>
              <h1 className="text-xl font-bold text-[#1A3263] tracking-tight mb-3">
                {subcategoryName}
              </h1>
              {subData?.description && (
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-2xl">
                  {subData.description}
                </p>
              )}
            </motion.div>
          </Container>
        </div>
      </section>

      {childSubCategories.length > 0 && (
        <section className="py-10 px-8 border-b border-gray-100">
          <Container>
            <h2 className="text-lg font-bold text-[#1A3263] mb-6">Subcategories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {childSubCategories.map(child => {
                const childSlug = toSlug(child.name);
                const childLink = `/products/${slug}/${subcategory}/${childSlug}`;
                return (
                  <Link key={child.name}
                    to={childLink}
                    className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-gray-300 transition-all"
                  >
                    {child.image ? (
                      <div className="h-44 md:h-36 flex items-center justify-center bg-gray-50">
                        <img src={child.image} alt={child.title || child.name} className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="h-44 md:h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                        <Package size={36} className="text-gray-200" />
                      </div>
                    )}
                    <div className="p-4 md:p-4">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#C3110C] transition-colors">
                        {child.title || child.name}
                      </h3>
                      {child.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{child.description}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      <section className="py-14 md:py-16 px-8">
        <Container>
          {loading ? (
            <div className="text-center py-20 text-gray-400 text-sm">Loading products...</div>
          ) : (
            <>
              {childSubCategories.length === 0 && mapped.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-sm flex flex-col items-center gap-4">
                  <Package size={48} className="text-gray-200" />
                  <p>No {subcategoryName} products yet.</p>
                  <Link to={`/products/${slug}`} className="text-[#C3110C] hover:underline text-xs font-bold">
                    View all {categoryName} products
                  </Link>
                </div>
              ) : mapped.length > 0 ? (
                <>
                  <ProductSort
                    currentSort={currentSort}
                    onSortChange={setCurrentSort}
                    totalProducts={mapped.length}
                  />
                  <ProductCardGrid products={sortedProducts} />
                </>
              ) : null}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
