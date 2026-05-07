import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/Common/CtaBand";
import {
  ShieldCheck,
  Video,
  Settings,
  Cpu,
  Speaker,
  Flame,
} from "lucide-react";

// Components
import { ProductHero } from "@/components/Product/ProductHero";
import { ProductGrid } from "@/components/Product/ProductGrid";
import { ProductCategory } from "@/components/Product/types";
import { CatalogSidebar } from "@/components/Product/CatalogSidebar";
import { Footer } from "@/components/Layout/Footer";

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

const productCategories: ProductCategory[] = [
  {
    title: "Access Control",
    desc: "Secure biometric and card-based entry systems designed for enterprise-grade facility protection.",
    image: "https://plus.unsplash.com/premium_photo-1729091229423-96b85c74a815?q=80&w=1332&auto=format&fit=crop",
    icon: ShieldCheck,

    link: "/products/access-control"
  },
  {
    title: "Surveillance (CCTV)",
    desc: "High-definition IP cameras with AI analytics for real-time monitoring and threat detection.",
    image: "https://images.unsplash.com/photo-1665848383782-1ea74efde68f?q=80&w=1190&auto=format&fit=crop",
    icon: Video,
    link: "/services"
  },
  {
    title: "Integrated Systems",
    desc: "Unified control platforms connecting security, fire, and BMS for centralized facility management.",
    image: "https://plus.unsplash.com/premium_photo-1723914054622-5e11ec4d8b3f?q=80&w=1132&auto=format&fit=crop",
    icon: Settings,
    link: "/services"
  },
  {
    title: "Building Management",
    desc: "Smart automation for HVAC, lighting, and energy efficiency to optimize operational costs.",
    image: "https://plus.unsplash.com/premium_photo-1663011633080-bc3b7ef0697e?q=80&w=1170&auto=format&fit=crop",
    icon: Cpu,

    link: "/services"
  },
  {
    title: "Audio Visual",
    desc: "Immersive AV solutions for conference rooms, public address, and digital signage.",
    image: "https://plus.unsplash.com/premium_photo-1664699106229-1bc773380c35?q=80&w=1170&auto=format&fit=crop",
    icon: Speaker,

    link: "/services"
  },
  {
    title: "Fire Systems",
    desc: "Advanced fire detection and alarm integration ensuring compliance and maximum safety.",
    image: "https://www.ecmag.com/images/default-source/bonotom/ec-2023/ec2311-november-2023/codeapps_adobestock_562069694.tmb-art-detail.jpg?Culture=en&sfvrsn=89eac14a_1",
    icon: Flame,

    link: "/services"
  }
];

function ProductsPage() {
  return (
    <>
        <ProductHero />
        <ProductGrid categories={productCategories} />
    </>
  );
}
