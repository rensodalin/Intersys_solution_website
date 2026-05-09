import { createFileRoute } from "@tanstack/react-router";
import { ProductDetailView } from "@/components/Product/ProductDetail/ProductDetailView";

export const Route = createFileRoute("/products/detail/$productId")({
  head: () => ({
    meta: [
      { title: "Product Details — Intersys Solutions" },
      {
        name: "description",
        content: "Detailed specifications and technical documents for our professional products.",
      },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  return <ProductDetailView />;
}
