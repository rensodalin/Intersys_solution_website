import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { fetchProducts } from "@/utils/productApi";
import { fetchTaxonomy } from "@/utils/taxonomyApi";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { ProductHero } from "@/components/Product/ProductHero";
import { Container } from "@/components/Common/Container";
import { Package } from "lucide-react";

export const Route = createFileRoute("/products/$slug/$brand/")({
  head: ({ params }) => ({
    meta: [
      { title: `${slugToTitle(params.brand)} — ${slugToTitle(params.slug)} — Intersys Solutions` },
    ],
  }),
  component: BrandProductsPage,
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

function useNames(slug: string, brand: string): [string, string] {
  const [catName, setCatName] = useState(slugToTitle(slug));
  const [brandName, setBrandName] = useState(slugToTitle(brand));
  useEffect(() => {
    fetchTaxonomy().then(data => {
      const cat = data.find(t => {
        const s = t.category.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
        return s === slug;
      });
      if (cat) {
        setCatName(cat.category);
        const b = cat.brands.find(b => {
          const s = b.name.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
          return s === brand;
        });
        if (b) setBrandName(b.name);
      }
    }).catch(() => {});
  }, [slug, brand]);
  return [catName, brandName];
}

function BrandProductsPage() {
  const { slug, brand } = Route.useParams();
  const [categoryName, brandName] = useNames(slug, brand);
  const [currentSort, setCurrentSort] = useState<SortOption>("name-asc");
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

  useEffect(() => {
    setLoading(true);
    fetchProducts(categoryName, brandName)
      .then(data => setApiProducts(data))
      .catch(() => setApiProducts([]))
      .finally(() => setLoading(false));
  }, [categoryName, brandName]);

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

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <ProductHero
          title={`${brandName} — ${categoryName}`}
          subtitle={`Browse our ${brandName} products for ${categoryName.toLowerCase()}.`}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: categoryName, href: `/products/${slug}` },
            { name: brandName, href: `/products/${slug}/${brand}` },
          ]}
        />
        <section className="py-14 md:py-16 px-8">
          <Container>
            <div className="text-center py-20 text-gray-400 text-sm">Loading products...</div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <ProductHero
        title={`${brandName} — ${categoryName}`}
        subtitle={`Browse our ${brandName} products for ${categoryName.toLowerCase()}.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: categoryName, href: `/products/${slug}` },
          { name: brandName, href: `/products/${slug}/${brand}` },
        ]}
      />

      <section className="py-14 md:py-16 px-8">
        <Container>
          <ProductSort
            currentSort={currentSort}
            onSortChange={setCurrentSort}
            totalProducts={mapped.length}
          />
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {sortedProducts.map(p => (
                <Link
                  key={p.id}
                  to={`/products/detail/${p.id}`}
                  className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#1A3263]/20 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-6">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <Package size={40} className="text-gray-200" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-[#1A3263] group-hover:text-[#C3110C] transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    {p.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400 text-sm flex flex-col items-center gap-4">
              <Package size={48} className="text-gray-200" />
              <p>No {brandName} products in this category yet.</p>
              <Link to={`/products/${slug}`} className="text-[#C3110C] hover:underline text-xs font-bold">
                View all {categoryName} products
              </Link>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
