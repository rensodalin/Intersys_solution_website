import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { SaltoHero } from "@/components/Product/AccessControl/Salto/SaltoHero";
import { SaltoSubGrid } from "@/components/Product/AccessControl/Salto/SaltoSubGrid";
import { saltoProducts } from "@/components/Product/AccessControl/Salto/data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/products_/access-control_/salto_/$productId")({
  head: (params) => {
    const product = saltoProducts.find((p) => p.id === params.params.productId);
    return {
      meta: [
        { title: `${product?.title || "Salto Product"} — Intersys Solutions` },
        {
          name: "description",
          content: product?.description || "Explore SALTO's premium access control solutions.",
        },
      ],
    };
  },
  component: SaltoSubProductPage,
});

function SaltoSubProductPage() {
  const { productId } = Route.useParams();
  const product = saltoProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="py-32 bg-white min-h-screen">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1A3263] mb-8">Product Not Found</h1>
            <Link
              to="/products/access-control/salto"
              className="inline-flex items-center gap-2 text-[#9B0F06] font-bold uppercase tracking-widest text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Salto Systems
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <SaltoHero
        title={product.title}
        subtitle={product.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "Access Control", href: "/products/access-control" },
          { name: "Salto", href: "/products/access-control/salto" },
          { name: product.title, href: `/products/access-control/salto/${product.id}` },
        ]}
      />

      {/* Product Grid */}
      <section className="py-24 relative z-20">
        <Container>
          {product.subProducts && product.subProducts.length > 0 ? (
            <SaltoSubGrid products={product.subProducts} />
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">Detailed catalog for this category is coming soon.</p>
              <Link
                to="/contact"
                className="inline-block mt-4 text-[#9B0F06] font-bold uppercase tracking-widest text-xs hover:underline"
              >
                Contact for Inquiry →
              </Link>
            </div>
          )}
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}
