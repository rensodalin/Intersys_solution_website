import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { fetchProducts } from "@/utils/productApi";
import { fetchTaxonomy } from "@/utils/taxonomyApi";
import { ProductSort, SortOption } from "@/components/Product/ProductSort";
import { ProductHero } from "@/components/Product/ProductHero";
import { ProductCardGrid } from "@/components/Product/ProductCardGrid";
import { Container } from "@/components/Common/Container";
import { Package } from "lucide-react";
import { toSlug } from "@/lib/utils";

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
      const cat = data.find(t => toSlug(t.category) === slug);
      if (cat) {
        setCatName(cat.category);
        const b = cat.brands.find(b => toSlug(b.name) === brand);
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

  // Only show products without a specific subcategory here.
  // Subcategory-specific products appear on their own subcategory page.
  const mapped = useMemo(() =>
    apiProducts
      .filter(p => !p.brandSubCategory)
      .map(p => ({
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
            <ProductCardGrid products={sortedProducts} />
          ) : (
            <div className="text-center py-20 text-gray-400 text-sm flex flex-col items-center gap-4">
              <Package size={48} className="text-gray-200" />
              <p>No general {brandName} products — all products are organized under subcategories.</p>
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
