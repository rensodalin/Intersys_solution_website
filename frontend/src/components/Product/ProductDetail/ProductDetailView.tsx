import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import environment from "@/enviroment/enviroment";
import {
  ShoppingCart,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useInquiry } from "@/context/InquiryContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AuthModal } from "@/components/Auth/AuthModal";
import { saltoProducts } from "@/components/Product/AccessControl/Salto/data";

// ─── TYPES ───
export interface ProductOption {
  partCode: string;
  specification: string;
  price: number;
  qty: number;
}

export interface ProductData {
  _id: string;
  id: string;
  category: string;
  brand: string;
  title: string;
  description: string;
  mainImage: string;
  thumbnails: string[];
  brandSubCategory?: string;
  brandSubCategoryLink?: string;
  longDescription: string;
  options: ProductOption[];
  documents: { name: string; url: string }[];
}

// ─── MOCK DATA ───



export function ProductDetailView({ product, returnPath }: { product: ProductData, returnPath?: string }) {
  const navigate = useNavigate();
  // Initialize quantities from global inquiry context if items already exist
  const { addItem } = useInquiry();
  const [activeTab, setActiveTab] = useState<"description" | "documents">("description");
  const [selectedImage, setSelectedImage] = useState(0);


  const user = useSelector((state: RootState) => state.auth.user);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [pendingDocUrl, setPendingDocUrl] = useState<string | null>(null);

  const baseUrl = environment;

  const trackPdfDownload = async (title: string, url: string) => {
    if (!user) return;
    try {
      await fetch(`${baseUrl}/auth/user/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url }),
        credentials: "include"
      });
    } catch (err) {
      console.error("Failed to track download:", err);
    }
  };

  // Handle auto-opening PDF after successful login (local or OAuth)
  useEffect(() => {
    if (user) {
      // 1. Check local state (for email/password login)
      if (pendingDocUrl) {
        window.open(pendingDocUrl, "_blank");
        trackPdfDownload(product.title + " - Document", pendingDocUrl);
        setPendingDocUrl(null);
        localStorage.removeItem("pending_pdf_url");
        return;
      }

      // 2. Check localStorage (for Google OAuth redirect login)
      const storedPdf = localStorage.getItem("pending_pdf_url");
      if (storedPdf) {
        window.open(storedPdf, "_blank");
        trackPdfDownload(product.title + " - Document", storedPdf);
        localStorage.removeItem("pending_pdf_url");
      }
    }
  }, [user, pendingDocUrl]);

  const deriveSubcategory = (): string | undefined => {
    if (product.brandSubCategory && product.brandSubCategory !== "General") return product.brandSubCategory;
    if (!returnPath) return undefined;
    const path = returnPath.replace(/^\/products\//, '');
    const segments = path.split('/').filter(Boolean);
    if (segments.length >= 2) {
      return segments.slice(1)
        .map(seg => seg.split('-').filter(Boolean).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
        .join('/');
    }
    return undefined;
  };

  const handleQuickAdd = (opt: ProductOption) => {
    const subcategory = deriveSubcategory();

    addItem({
      _id: product._id,
      id: product.id,
      category: product.category,
      subcategory,
      title: product.title,
      image: product.mainImage,
      partCode: opt.partCode,
      specification: opt.specification,
      qty: 1,
      brand: product.brand,
      returnPath: returnPath,
    });

    navigate({ to: "/request-quote" });
  };

  const slugToTitle = (slug: string): string => {
    return slug
      .split("-")
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  // Build breadcrumbs from the returnPath (the category page URL the user came from)
  const buildBreadcrumbs = () => {
    const crumbs: { name: string; href: string }[] = [
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
    ];

    if (returnPath && returnPath.startsWith("/products/")) {
      // Parse the full URL path to get each hierarchy level
      const path = returnPath.replace(/^\/products\//, "").split("?")[0];
      const segments = path.split("/").filter(Boolean);
      let accumulated = "/products";

      for (let i = 0; i < segments.length; i++) {
        accumulated = `${accumulated}/${segments[i]}`;
        crumbs.push({ name: slugToTitle(segments[i]), href: accumulated });
      }
    } else {
      // Fallback when no returnPath: use flat product fields
      if (product.category === "Building Management") {
        crumbs.push({ name: "Building Management", href: "/products/building-management" });
      } else if (product.category === "Surveillance (CCTV)") {
        crumbs.push({ name: "Surveillance (CCTV)", href: "/products/surveillance" });
      } else {
        crumbs.push({ name: "Access Control", href: "/products/access-control" });

        if (product.brand === "Salto") {
          crumbs.push({ name: "Salto", href: "/products/access-control/salto" });
          if (returnPath && returnPath.startsWith("/products/access-control/salto/")) {
            const saltoParentId = returnPath
              .replace("/products/access-control/salto/", "")
              .split("?")[0]
              .split("/")[0];
            const parentCategory = saltoProducts.find((p) => p.id === saltoParentId);
            const subCatName = parentCategory?.title || product.brandSubCategory;
            if (subCatName) crumbs.push({ name: subCatName, href: returnPath });
          } else if (product.brandSubCategory) {
            crumbs.push({ name: product.brandSubCategory, href: product.brandSubCategoryLink || "#" });
          }
        } else if (product.brand === "Honeywell") {
          crumbs.push({ name: "Honeywell", href: "/products/access-control/honeywell" });
          if (product.brandSubCategory) {
            crumbs.push({ name: product.brandSubCategory, href: product.brandSubCategoryLink || "#" });
          }
        } else if (product.brand) {
          crumbs.push({ name: product.brand, href: "#" });
          if (product.brandSubCategory) {
            crumbs.push({ name: product.brandSubCategory, href: product.brandSubCategoryLink || "#" });
          }
        }
      }
    }

    crumbs.push({ name: product.title, href: "#" });
    return crumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO SECTION (Matching Sub-pages) ─── */}
      <section className="bg-[#F8F9FA] pt-28 md:pt-32 pb-10 px-8 border-b border-gray-200/50 mb-16">
        <Container>
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 mb-4 flex-wrap">
                {breadcrumbs.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <Link
                      to={item.href}
                      className={cn(
                        "text-[11px] transition-colors font-medium",
                        index === breadcrumbs.length - 1
                          ? "text-gray-700"
                          : "text-gray-400 hover:text-[#C3110C]"
                      )}
                    >
                      {item.name}
                    </Link>
                    {index < breadcrumbs.length - 1 && (
                      <span className="text-gray-300 text-[10px]">/</span>
                    )}
                  </div>
                ))}
              </nav>

              <h1 className="text-xl md:text-xl font-bold text-[#1A3263] tracking-tight mb-4 font-display">
                {product.title}
              </h1>

              <p className="text-gray-500 text-xs md:text-sm leading-snug max-w-xl font-light">
                {product.description}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      <Container>
        {/* ─── MAIN PRODUCT SECTION ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-16 mb-24 max-w-5xl mx-auto">
          {/* Gallery */}
          {/* Gallery */}
          <div>
            <div className="w-[360px] aspect-square bg-[#FBFBFC] rounded-sm border border-gray-100 flex items-center justify-center p-6 mb-5">
              <img
                src={product.thumbnails[selectedImage] || product.mainImage}
                alt="Product"
                className="max-w-[72%] max-h-[72%] object-contain mix-blend-multiply"
              />
            </div>

            <div className="flex gap-2 justify-start w-[360px]">
              {product.thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "w-14 h-14 rounded-sm border transition-all p-1 bg-white",
                    selectedImage === idx
                      ? "border-[#C3110C]"
                      : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <img src={img} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Tabs */}
          {/* Info Tabs */}
          <div>
            <div className="flex gap-10 border-b border-gray-100 mb-8">
              <button
                onClick={() => setActiveTab("description")}
                className={cn(
                  "pb-4 text-[15px] font-bold transition-all relative",
                  activeTab === "description" ? "text-[#C00707]" : "text-gray-400 hover:text-gray-600"
                )}
              >
                Description
                {activeTab === "description" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C00707]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={cn(
                  "pb-4 text-[15px] font-bold transition-all relative",
                  activeTab === "documents" ? "text-[#C00707]" : "text-gray-400 hover:text-gray-600"
                )}
              >
                Documents
                {activeTab === "documents" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C00707]" />
                )}
              </button>
            </div>

            <div className="min-h-[250px]">
              <AnimatePresence mode="wait">
                {activeTab === "description" ? (
                  <motion.div
                    key="desc"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-2"
                  >
                    <div className="text-gray-500 text-[13px] font-light leading-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_li]:text-gray-500 [&_strong]:font-semibold [&_strong]:text-gray-700 [&_br]:mb-1"
                      dangerouslySetInnerHTML={{ __html: (product.longDescription || "").replace(/\n/g, "<br>") }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="docs"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4 pt-4"
                  >
                    {product.documents.map((doc, i) => (
                      <a
                        key={i}
                        href={doc.url}
                        onClick={(e) => {
                          if (!user) {
                            e.preventDefault();
                            setPendingDocUrl(doc.url);
                            localStorage.setItem("pending_pdf_url", doc.url);
                            setIsAuthOpen(true);
                          } else {
                            trackPdfDownload(doc.name, doc.url);
                          }
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 group w-fit py-1 transition-all"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1280px-PDF_file_icon.svg.png"
                          alt="PDF"
                          className="w-5 h-5 object-contain"
                        />
                        <span className="text-[14px] text-[#42526E] underline underline-offset-[2px] decoration-gray-400 hover:text-blue-700 hover:decoration-blue-700 transition-all font-display">
                          {doc.name}
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ─── PRODUCT OPTIONS TABLE ─── */}
        {product.options.length > 0 && (
          <div className="mb-8">
            <div className="bg-[#1A3263] text-white px-8 py-5 rounded-t-sm font-semibold text-sm ">
              Product Options & Specifications
            </div>
            <div className="overflow-x-auto border-x border-b border-gray-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F9FA] text-gray-500 text-[12px] font-bold tracking-tight border-b border-gray-100">
                  <th className="px-8 py-5">Part Code</th>
                  <th className="px-8 py-5">Detailed Specification</th>
                  <th className="px-8 py-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.options.map((opt, i) => (
                    <tr key={opt.partCode} className="group hover:bg-[#FBFBFC] transition-colors">
                      <td className="px-8 py-8 border-b border-gray-100 text-[13px] font-bold text-[#1A3263]">
                        {opt.partCode}
                      </td>
                      <td className="px-8 py-8 border-b border-gray-100 text-[13px] text-gray-500 font-light whitespace-pre-line leading-relaxed">
                        {opt.specification}
                      </td>

                      <td className="px-8 py-8 border-b border-gray-100 text-center">
                        <button
                          onClick={() => handleQuickAdd(opt)}
                          className="text-gray-200 hover:text-[#C3110C] transition-all transform hover:scale-110 cursor-pointer"
                        >
                          <ShoppingCart size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


      </Container>
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingDocUrl(null);
          localStorage.removeItem("pending_pdf_url");
        }}
      />
    </div>
  );
}
