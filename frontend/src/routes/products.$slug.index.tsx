import environment from "@/enviroment/enviroment";
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
  ];

  function renderHero(title: string, subtitle?: string) {
    return (
      <section className="bg-white border-b border-gray-200/50">
        <div className="bg-[#F8F9FA] pt-28 md:pt-32 pb-10 px-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-[#1A3263] tracking-tight mb-3">{title}</h1>
              {subtitle && <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed max-w-2xl">{subtitle}</p>}
            </motion.div>
          </Container>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {renderHero(
        categoryName,
        subCategories.length > 0
          ? `Browse our ${categoryName.toLowerCase()} solutions by category.`
          : `Explore our range of ${categoryName.toLowerCase()} solutions.`
      )}

      {subCategories.length > 0 && (
        <section className="py-10 px-8 border-b border-gray-100">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {subCategories.map(sub => {
                const subSlug = toSlug(sub.name);
                const linkTo = `/products/${slug}/${subSlug}`;
                return (
                  <Link key={sub.name}
                    to={linkTo}
                    className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-gray-300 transition-all"
                  >
                    {sub.image ? (
                      <div className="h-44 md:h-36 flex items-center justify-center bg-gray-50">
                        <img src={sub.image} alt={sub.title || sub.name} className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="h-44 md:h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                        <Package size={36} className="text-gray-200" />
                      </div>
                    )}
                    <div className="p-4 md:p-4">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#C3110C] transition-colors">
                        {sub.title || sub.name}
                      </h3>
                      {sub.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{sub.description}</p>
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
          ) : mapped.length === 0 && subCategories.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-sm flex flex-col items-center gap-4">
              <Package size={48} className="text-gray-200" />
              <p>No products yet in this category.</p>
              <Link to="/products" className="text-[#C3110C] hover:underline text-xs font-bold">
                Browse all categories
              </Link>
            </div>
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
                <div className="text-center py-20 text-gray-400 text-sm">Browse subcategories above to find products.</div>
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
