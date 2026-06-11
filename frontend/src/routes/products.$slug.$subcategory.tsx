import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { fetchProducts } from "@/utils/productApi";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { ProductCardGrid } from "@/components/Product/ProductCardGrid";
import { Container } from "@/components/Common/Container";
import { Package } from "lucide-react";
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

function findSubcategory(items: TaxonomySubCategory[], slug: string): TaxonomySubCategory | null {
  for (const item of items) {
    if (toSlug(item.name) === slug) return item;
    if (item.children?.length) {
      const found = findSubcategory(item.children, slug);
      if (found) return found;
    }
  }
  return null;
}

function SubcategoryProductsPage() {
  const { slug, subcategory } = Route.useParams();
  const { taxonomy } = useTaxonomy();
  const category = taxonomy.find(t => toSlug(t.category) === slug);
  const categoryName = category?.category || slugToTitle(slug);
  const subData = category ? findSubcategory(category.subCategories || [], subcategory) : null;
  const subcategoryName = subData?.title || subData?.name || slugToTitle(subcategory);

  const [currentSort, setCurrentSort] = useState<SortOption>("name-asc");
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

  useEffect(() => {
    setLoading(true);
    fetchProducts(categoryName, undefined, subcategoryName)
      .then(data => setApiProducts(data))
      .catch(() => setApiProducts([]))
      .finally(() => setLoading(false));
  }, [categoryName, subcategoryName]);

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

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: categoryName, href: `/products/${slug}` },
    { name: subcategoryName, href: `/products/${slug}/${subcategory}` },
  ];

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
                      className={`text-[11px] transition-colors ${
                        index === breadcrumbs.length - 1
                          ? "text-gray-700 pointer-events-none"
                          : "text-gray-400 hover:text-[#C3110C]"
                      }`}
                    >
                      {item.name}
                    </Link>
                    {index < breadcrumbs.length - 1 && (
                      <span className="text-gray-300 text-[10px]">/</span>
                    )}
                  </div>
                ))}
              </nav>
              <h1 className="text-xl md:text-2xl font-bold text-[#1A3263] tracking-tight mb-3">
                {subcategoryName}
              </h1>
              {subData?.description && (
                <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed max-w-2xl">
                  {subData.description}
                </p>
              )}
            </motion.div>
          </Container>
        </div>
      </section>

      <section className="py-14 md:py-16 px-8">
        <Container>
          {loading ? (
            <div className="text-center py-20 text-gray-400 text-sm">Loading products...</div>
          ) : (
            <>
              <ProductSort
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                totalProducts={mapped.length}
              />
              {sortedProducts.length > 0 ? (
                <ProductCardGrid products={sortedProducts} />
              ) : (
                <div className="text-center py-20 text-gray-400 text-sm flex flex-col items-center gap-4">
                  <Package size={48} className="text-gray-200" />
                  <p>No {subcategoryName} products yet.</p>
                  <Link to={`/products/${slug}`} className="text-[#C3110C] hover:underline text-xs font-bold">
                    View all {categoryName} products
                  </Link>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
