import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { fetchTaxonomy } from "@/utils/taxonomyApi";

import { ProductHero } from "@/components/Product/ProductHero";
import { ProductGrid } from "@/components/Product/ProductGrid";
import { ProductCategory } from "@/components/Product/types";
import { CatalogSidebar } from "@/components/Product/CatalogSidebar";
import { useProductsLayout } from "@/context/ProductsLayoutContext";
import { toSlug } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Our Products — Intersys Solutions" },
      {
        name: "description",
        content:
          "Elevate your facility with our comprehensive range of safety, security, and building management technologies.",
      },
    ],
  }),
  component: ProductsPage,
});

function buildCategories(taxonomy: Awaited<ReturnType<typeof fetchTaxonomy>>): ProductCategory[] {
  return taxonomy.map(t => {
    const slug = toSlug(t.category);
    const isService = t.category.toLowerCase().includes("integrated") || t.category.toLowerCase().includes("audio visual") || t.category.toLowerCase().includes("fire systems");
    return {
      title: t.category,
      desc: `Explore our range of ${t.category.toLowerCase()} solutions.`,
      image: t.image || "",
      buttonText: "View Products",
      link: isService ? `/services` : `/products/${slug}`,
    };
  });
}

function ProductsPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTaxonomy()
      .then(data => setCategories(buildCategories(data)))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <ProductHero />
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-[#C3110C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ProductGrid categories={categories} />
      )}
    </div>
  );
}

