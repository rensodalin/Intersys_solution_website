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

export const Route = createFileRoute("/products/$slug/$brand/$subcategory")({
  head: ({ params }) => ({
    meta: [
      { title: `${slugToTitle(params.subcategory)} — ${slugToTitle(params.brand)} — Intersys Solutions` },
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

function useNames(slug: string, brand: string, subcategory: string): [string, string, string] {
  const [catName, setCatName] = useState(slugToTitle(slug));
  const [brandName, setBrandName] = useState(slugToTitle(brand));
  const [subName, setSubName] = useState(slugToTitle(subcategory));
  useEffect(() => {
    fetchTaxonomy().then(data => {
      const cat = data.find(t => toSlug(t.category) === slug);
      if (cat) {
        setCatName(cat.category);
        const b = cat.brands.find(b => toSlug(b.name) === brand);
        if (b) {
          setBrandName(b.name);
          const flatSubs = flattenSubCategories(b.subCategories || []);
          const matched = flatSubs.find(s => toSlug(s) === subcategory);
          if (matched) setSubName(matched);
        }
      }
    }).catch(() => {});
  }, [slug, brand, subcategory]);
  return [catName, brandName, subName];
}

function flattenSubCategories(items: any[]): string[] {
  const result: string[] = [];
  for (const item of items) {
    result.push(item.name || item);
    if (item.children && item.children.length > 0) {
      result.push(...flattenSubCategories(item.children));
    }
  }
  return result;
}

function SubcategoryProductsPage() {
  const { slug, brand, subcategory } = Route.useParams();
  const [categoryName, brandName, subcategoryName] = useNames(slug, brand, subcategory);
  const [currentSort, setCurrentSort] = useState<SortOption>("name-asc");
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

  useEffect(() => {
    setLoading(true);
    fetchProducts(categoryName, brandName, subcategoryName)
      .then(data => setApiProducts(data))
      .catch(() => setApiProducts([]))
      .finally(() => setLoading(false));
  }, [categoryName, brandName, subcategoryName]);

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
          title={subcategoryName}
          subtitle={`Browse our ${subcategoryName.toLowerCase()} products.`}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: categoryName, href: `/products/${slug}` },
            { name: brandName, href: `/products/${slug}/${brand}` },
            { name: subcategoryName, href: `/products/${slug}/${brand}/${subcategory}` },
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
        title={subcategoryName}
        subtitle={`Browse our ${subcategoryName.toLowerCase()} products.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: categoryName, href: `/products/${slug}` },
          { name: brandName, href: `/products/${slug}/${brand}` },
          { name: subcategoryName, href: `/products/${slug}/${brand}/${subcategory}` },
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
              <p>No {subcategoryName} products yet.</p>
              <Link to={`/products/${slug}/${brand}`} className="text-[#C3110C] hover:underline text-xs font-bold">
                View all {brandName} products
              </Link>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
