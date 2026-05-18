import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Common/Container";
import {
  ChevronRight,
  Download,
  ShoppingCart,
  Minus,
  Plus,
  Info,
  CheckCircle2,
  FileText,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useInquiry } from "@/context/InquiryContext";

// ─── TYPES ───
export interface ProductOption {
  partCode: string;
  specification: string;
  qty: number;
}

export interface ProductData {
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
const MOCK_PRODUCT: ProductData = {
  id: "honeywell-accessories-1",
  category: "Access Control",
  brand: "Honeywell",
  title: "Honeywell Accessories",
  description: "Industrial-grade peripherals and support components designed for seamless system integration.",
  mainImage: "https://cdn11.bigcommerce.com/s-71kr5fhb2y/images/stencil/850x850/products/60031/475339/2cd6841c-c2c9-4f59-8190-c27021245a4e__91383.1769976010.jpg?c=1",
  thumbnails: [
    "https://cdn11.bigcommerce.com/s-71kr5fhb2y/images/stencil/850x850/products/60031/475339/2cd6841c-c2c9-4f59-8190-c27021245a4e__91383.1769976010.jpg?c=1",
    "https://vectorenergy.com/wp-content/uploads/2023/03/D2_H100.jpg",
  ],
  longDescription: "The XS4 ONE is an all-in-one smart lock that brings together the latest in electronic security with the physical endurance required for high-traffic environments. Its modular design allows it to be fitted to any door, with multiple handle and cover plate options.\n\nPowered by four AA batteries, it delivers up to 40,000 operations on a single set. The integrated reader uses a high-density security matrix to prevent unauthorized data cloning.",
  options: [
    { partCode: "TNAPA20AB", specification: "Brushed Steel (AISI 304) \nRFID / BLE / NFC ENABLED", qty: 1 },
    { partCode: "TNAPA20AM", specification: "Matte Black Chrome \nRFID / BLE / NFC ENABLED", qty: 0 },
    { partCode: "TNAPA2AV", specification: "Polished White \nSTANDARD SECURITY PROFILE", qty: 1 },
  ],
  documents: [
    { name: "Submittal", url: "#" },
    { name: "BACnet® Installation Instructions", url: "#" },
    { name: "Modbus Installation Instructions", url: "#" },
  ]
};

export function ProductDetailView({ product, returnPath }: { product: ProductData, returnPath?: string }) {
  const navigate = useNavigate();
  // Initialize quantities from global inquiry context if items already exist
  const { addItem, items } = useInquiry();
  const [activeTab, setActiveTab] = useState<"description" | "documents">("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    product.options.forEach(opt => {
      // Check if this specific partCode is already in the inquiry
      const existingItem = items.find(item => item.partCode === opt.partCode);
      initial[opt.partCode] = existingItem ? existingItem.qty : 0;
    });
    return initial;
  });

  const inquiryCount = Object.values(quantities).reduce((acc, val) => acc + val, 0);

  const handleQtyChange = (code: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [code]: Math.max(0, (prev[code] || 0) + delta)
    }));
    if (error) setError(null);
  };

  const handleAddToInquiry = () => {
    if (inquiryCount === 0) {
      setError("Please select at least one product quantity to proceed.");
      return;
    }

    // Add each product with qty > 0 to the global inquiry
    product.options.forEach(opt => {
      const qty = quantities[opt.partCode];
      if (qty > 0) {
        addItem({
          id: product.id,
          category: product.category,
          title: product.title,
          image: product.mainImage,
          partCode: opt.partCode,
          specification: opt.specification,
          qty: qty,
          brand: product.brand
        });
      }
    });

    // Navigate to request quote page
    navigate({ to: "/request-quote" });
  };

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: product.category, href: returnPath || (product.category === "Building Management" ? "/products/building-management" : product.category === "Surveillance (CCTV)" ? "/products/surveillance" : "#") },
    ...((product.category !== "Building Management" && product.category !== "Surveillance (CCTV)") ? [{ name: product.brand, href: "#" }] : []),
    ...(product.brandSubCategory ? [{ name: product.brandSubCategory, href: product.brandSubCategoryLink || "#" }] : []),
    { name: product.title, href: "#" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO SECTION (Matching Sub-pages) ─── */}
      <section className="bg-[#F8F9FA] pt-40 md:pt-44 pb-10 px-8 border-b border-gray-200/50 mb-16">
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

              <h1 className="text-2xl md:text-2xl font-bold text-[#1A3263] tracking-tight mb-4 font-display">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-[#FBFBFC] rounded-sm border border-gray-100 flex items-center justify-center p-12 mb-6">
              <img
                src={product.thumbnails[selectedImage] || product.mainImage}
                alt="Product"
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="flex gap-3">
              {product.thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "w-20 h-20 rounded-sm border-2 transition-all p-2 bg-white",
                    selectedImage === idx ? "border-[#C3110C]" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <img src={img} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

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
                    className="space-y-6"
                  >
                    <h3 className="text-md font-bold text-[#162E93] tracking-tight font-display">Engineered for Performance</h3>
                    <div className="text-gray-500 text-[13px] leading-relaxed whitespace-pre-line font-light">
                      {product.longDescription}
                    </div>
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
        <div className="mb-8">
          <div className="bg-[#1A3263] text-white px-8 py-5 rounded-t-sm font-bold text-sm tracking-wide">
            Product Options & Specifications
          </div>
          <div className="overflow-x-auto border-x border-b border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA] text-gray-500 text-[12px] font-bold tracking-tight border-b border-gray-100">
                  <th className="px-8 py-5">Part Code</th>
                  <th className="px-8 py-5">Detailed Specification</th>
                  <th className="px-8 py-5 text-center">Quantity</th>
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

                    <td className="px-8 py-8 border-b border-gray-100">
                      <div className="flex items-center justify-center gap-4 bg-white rounded-sm py-2 px-3 w-fit mx-auto border border-gray-200 shadow-sm">
                        <button
                          onClick={() => handleQtyChange(opt.partCode, -1)}
                          className="text-gray-400 hover:text-[#C3110C] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-[13px] font-bold text-[#1A3263] min-w-[24px] text-center">
                          {quantities[opt.partCode]}
                        </span>
                        <button
                          onClick={() => handleQtyChange(opt.partCode, 1)}
                          className="text-gray-400 hover:text-[#C3110C] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-8 border-b border-gray-100 text-center">
                      <button className="text-gray-200 hover:text-[#C3110C] transition-all transform hover:scale-110">
                        <ShoppingCart size={20} className={cn(quantities[opt.partCode] > 0 && "text-[#C3110C]")} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── INQUIRY ACTION BUTTON (Under Table) ─── */}
        <div className="flex flex-col items-end mb-24">
          <button
            onClick={handleAddToInquiry}
            className="bg-[#162E93] hover:bg-[#0E1E61] text-white px-10 py-4 rounded-sm shadow-xl flex items-center gap-4 group transition-all transform hover:-translate-y-1"
          >
            <div className="relative">
              <ShoppingCart size={20} />
              {inquiryCount > 0 && (
                <span className="absolute -top-3 -right-3 w-5 h-5 bg-[#C3110C] text-[10px] flex items-center justify-center rounded-full border-2 border-[#162E93] font-bold">
                  {inquiryCount}
                </span>
              )}
            </div>
            <span className="font-bold text-[15px]">Add to inquiry</span>
          </button>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#D62828] text-sm font-bold mt-3"
            >
              {error}
            </motion.p>
          )}
        </div>
      </Container>
    </div>
  );
}
