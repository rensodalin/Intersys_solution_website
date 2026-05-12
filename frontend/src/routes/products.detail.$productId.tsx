import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductDetailView, ProductData } from "@/components/Product/ProductDetail/ProductDetailView";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/Common/Container";

// Import all product data for lookup
import { 
    honeywellControlPanels, 
    honeywellAccessories, 
    honeywellCredentials, 
    honeywellReaders, 
    honeywellSoftware, 
    honeywellControlPanelKits, 
    honeywellKiosks, 
    honeywellUpgrades, 
    honeywellDoorHardware 
} from "@/components/Product/AccessControl/Honeywell/data";
import { saltoProducts } from "@/components/Product/AccessControl/Salto/data";

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
  const { productId } = Route.useParams();

  // Combine all product lists for searching
  // Note: For Salto, we need to check subProducts
  const allHoneywell = [
    ...honeywellControlPanels,
    ...honeywellAccessories,
    ...honeywellCredentials,
    ...honeywellReaders,
    ...honeywellSoftware,
    ...honeywellControlPanelKits,
    ...honeywellKiosks,
    ...honeywellUpgrades,
    ...honeywellDoorHardware
  ];

  const allSalto = saltoProducts.flatMap(p => p.subProducts || []);

  // Find product by slug/id
  const product = [...allHoneywell, ...allSalto].find(p => {
    const slug = p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return slug === productId || (p as any).id === productId;
  });

  if (!product) {
    return (
      <div className="py-32 bg-white min-h-screen">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1A3263] mb-8 font-display">Product Not Found</h1>
            <p className="text-gray-500 mb-8">The product you are looking for does not exist or has been moved.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[#D62828] font-bold tracking-widest text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO CATALOG
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Map the raw data to the ProductData interface expected by ProductDetailView
  const mappedProduct = {
    id: productId,
    category: "Security Solution",
    brand: (product as any).brand || "Intersys Professional",
    title: product.title,
    description: (product as any).desc || product.title,
    mainImage: product.image,
    thumbnails: [product.image],
    longDescription: (product as any).longDescription || (product as any).desc || "Professional grade security component designed for enterprise deployments and high-reliability environments.",
    options: (product as any).options || [
        { 
            partCode: (product as any).partCode || `${productId}-unit`, 
            specification: "Standard Configuration \nProfessional Grade", 
            price: 0, 
            qty: 0 
        }
    ],
    documents: (product as any).documents || [
        { name: "Technical Datasheet", url: "#" },
        { name: "Installation Manual", url: "#" }
    ]
  };

  return <ProductDetailView product={mappedProduct} />;
}
