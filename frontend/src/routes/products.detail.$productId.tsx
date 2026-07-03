import environment from "@/enviroment/enviroment";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductDetailView, ProductData } from "@/components/Product/ProductDetail/ProductDetailView";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/Common/Container";
import { useState, useEffect } from "react";
import { useTaxonomy } from "@/hooks/useTaxonomy";

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
import { bmsProducts } from "@/components/Product/BuildingManagement/data";
import { surveillanceProducts } from "@/components/Product/Surveillance/data";

export const Route = createFileRoute("/products/detail/$productId")({
  validateSearch: (search: Record<string, unknown>) => ({
    from: (search.from as string) || "/products",
  }),
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
  const { from } = Route.useSearch();
  useTaxonomy();

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const baseUrl = environment;
        const response = await fetch(`${baseUrl}/api/products/${productId}`);
        const result = await response.json();

        if (isMounted && result.success && result.data) {
          const item = result.data;
          // Map to ProductData expected format
          const mapped: ProductData = {
            _id: item._id,
            id: item.productId,
            category: item.category,
            brand: item.brand,
            brandSubCategory: item.brandSubCategory,
            brandSubCategoryLink: item.brandSubCategoryLink,
            title: item.title,
            description: item.description || "",
            mainImage: item.mainImage,
            thumbnails: item.thumbnails && item.thumbnails.length > 0 ? item.thumbnails : [item.mainImage],
            longDescription: item.longDescription || item.description || "Professional grade security component designed for enterprise deployments.",
            options: item.options || [],
            documents: item.documents || []
          };
          setProductData(mapped);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error fetching product from backend:", err);
      }

      // If fetch fails or not found, fall back to mock data
      if (isMounted) {
        // Combine all product lists for searching
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

        const fallbackProduct = [...allHoneywell, ...allSalto, ...bmsProducts, ...surveillanceProducts].find(p => {
          const slug = p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
          return slug === productId || (p as any).id === productId;
        });

        if (fallbackProduct) {
          // Detect Honeywell Sub-category
          let subCat = "";
          let subCatLink = "";
          if (honeywellControlPanels.some(p => p.title === fallbackProduct.title)) {
            subCat = "Control Panels";
            subCatLink = "/products/access-control/honeywell/control-panels";
          } else if (honeywellReaders.some(p => p.title === fallbackProduct.title)) {
            subCat = "Readers";
            subCatLink = "/products/access-control/honeywell/readers";
          } else if (honeywellSoftware.some(p => p.title === fallbackProduct.title)) {
            subCat = "Software";
            subCatLink = "/products/access-control/honeywell/software";
          } else if (honeywellAccessories.some(p => p.title === fallbackProduct.title)) {
            subCat = "Accessories";
            subCatLink = "/products/access-control/honeywell/accessories";
          } else if (honeywellCredentials.some(p => p.title === fallbackProduct.title)) {
            subCat = "Credentials";
            subCatLink = "/products/access-control/honeywell/credentials";
          } else if (honeywellControlPanelKits.some(p => p.title === fallbackProduct.title)) {
            subCat = "Control Panel Kits";
            subCatLink = "/products/access-control/honeywell/control-panel-kits";
          } else if (honeywellKiosks.some(p => p.title === fallbackProduct.title)) {
            subCat = "Lobby Kiosks";
            subCatLink = "/products/access-control/honeywell/lobby-kiosks";
          } else if (honeywellUpgrades.some(p => p.title === fallbackProduct.title)) {
            subCat = "System Agreements & Upgrades";
            subCatLink = "/products/access-control/honeywell/upgrades";
          } else if (honeywellDoorHardware.some(p => p.title === fallbackProduct.title)) {
            subCat = "Door Hardware";
            subCatLink = "/products/access-control/honeywell/door-hardware";
          }

          const mappedFallback: ProductData = {
            _id: "",
            id: productId,
            category: allSalto.some(p => p.id === productId) ? "Access Control" :
              bmsProducts.some(p => p.id === productId) ? "Building Management" :
                surveillanceProducts.some(p => p.id === productId) ? "Surveillance (CCTV)" :
                  "Access Control",
            brand: allSalto.some(p => p.id === productId) ? "Salto" :
              bmsProducts.some(p => p.id === productId) ? "BMS" :
                surveillanceProducts.some(p => p.id === productId) ? "Intersys" :
                  "Honeywell",
            brandSubCategory: subCat,
            brandSubCategoryLink: subCatLink,
            title: fallbackProduct.title,
            description: (fallbackProduct as any).desc || (fallbackProduct as any).description || fallbackProduct.title,
            mainImage: fallbackProduct.image,
            thumbnails: [fallbackProduct.image],
            longDescription: (fallbackProduct as any).longDescription || (fallbackProduct as any).desc || "Professional grade security component designed for enterprise deployments and high-reliability environments.",
            options: (fallbackProduct as any).options || [
              {
                partCode: (fallbackProduct as any).partCode || `${productId}-unit`,
                specification: "Standard Configuration \nProfessional Grade",
                price: 0,
                qty: 0
              }
            ],
            documents: (fallbackProduct as any).documents || [
              { name: "Technical Datasheet", url: "#" },
              { name: "Installation Manual", url: "#" }
            ]
          };
          setProductData(mappedFallback);
        } else {
          setProductData(null);
        }
        setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [productId, from]);

  if (loading) {
    return (
      <div className="py-32 bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#C3110C] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-medium tracking-wide">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="py-32 bg-white min-h-screen">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1A3263] mb-8 font-display">Product Not Found</h1>
            <p className="text-gray-500 mb-8">The product you are looking for does not exist or has been moved.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[#C3110C] font-bold tracking-widest text-xs hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO CATALOG
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return <ProductDetailView product={productData} returnPath={from} />;
}
