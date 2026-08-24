import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import {
  MoveLeft,
  Download,
  Zap,
  BarChart3,
  Settings2,
  Eye,
  Activity,
  Shield,
  Cpu,
  Globe,
  Lock,
  Layers,
  Users,
  MapPin,
  ClipboardList,
  FileText
} from "lucide-react";
import { Link } from "@tanstack/react-router";

interface InsightsDetailProps {
  title: string;
  category: string;
  date: string;
  image: string[];
  desc: string;
  section1Title?: string;
  section1Desc?: string;
  section1Image?: string;
  section1SubTitle?: string;
  section1SubDesc?: string;
  section1SubImage?: string;
  articleTitle1?: string;
  articleContent1?: string;
  articleBannerImage?: string;
  articleTitle2?: string;
  articleContent2?: string;
  pdfUrl?: string;
  feature1Title?: string;
  feature1Desc?: string;
  feature2Title?: string;
  feature2Desc?: string;
  features?: Array<{
    iconName: string;
    title: string;
    desc: string;
  }>;
  technicalTitle?: string;
  galleryImages?: string[];
  content?: React.ReactNode;
  client?: string;
  location?: string;
  scope?: string[];
}

export function InsightsDetail(props: InsightsDetailProps) {
  const {
    title,
    desc,
    image,
    category,
    date,
    section1Title,
    section1Desc,
    section1Image,
    section1SubTitle,
    section1SubDesc,
    section1SubImage,
    articleTitle1,
    articleContent1,
    articleBannerImage,
    articleTitle2,
    articleContent2,
    pdfUrl,
    technicalTitle,
    galleryImages,
    client,
    location,
    scope
  } = props;

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO SECTION (Original UI - Mobile Responsive) ─── */}
      <section className="relative h-[45vh] min-h-[350px] sm:min-h-[400px] overflow-hidden pt-20 sm:pt-24 md:pt-28">
        <img
          src={image && image[0]}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay for navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />

        <Container className="relative h-full flex flex-col justify-between py-6 sm:py-10">
          {/* <Link
            to="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit group text-xs font-semibold"
          >
            <MoveLeft size={16} />
            <span>Back to Insights</span>
          </Link> */}

          <div className="max-w-2xl mt-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-2 sm:mb-3"
            >
              <span className="text-white/50 text-xs font-medium tracking-wide">
                {date}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-snug sm:leading-tight tracking-tight mb-2 sm:mb-3"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base text-white/75 leading-relaxed max-w-xl"
            >
              {desc}
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ─── PDF CALLOUT BANNER (Mobile Responsive) ─── */}
      <div className="bg-[#0A0F1A] text-white border-y border-slate-800 py-3.5 shadow-sm">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
          </div>

          <a
            href={pdfUrl || "/documents/project-references-bms.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#C3110C] hover:bg-[#1A3263] text-white text-xs font-bold px-4 py-2 rounded transition-all shadow cursor-pointer whitespace-nowrap w-full sm:w-auto"
          >
            <span>View / Download PDF</span>
            <Download className="h-3.5 w-3.5" />
          </a>
        </Container>
      </div>

      {/* ─── SECTION 1: ABOUT THE PROJECT (Fixed Header) ─── */}
      <section className="py-10 sm:py-16 md:py-20">
        <Container>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#162E93] tracking-tight">
              About The Project
            </h2>
            <div className="mt-2 h-[2px] w-12 bg-[#9B0F06]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
            {/* Left Image Card (Original UI) */}
            <div className="lg:col-span-7 relative group overflow-hidden rounded-sm border border-gray-100 shadow-md">
              <img
                src={section1Image || image?.[1] || (image && image[0])}
                alt="About The Project"
                className="w-full h-[250px] sm:h-[320px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                  About The Project
                </h3>
              </div>
            </div>

            {/* Right Info Card (Original UI) */}
            <div className="lg:col-span-5 bg-gray-50 rounded-lg p-5 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-center min-h-0 lg:min-h-[400px]">
              <div
                className="text-gray-600 text-xs sm:text-sm leading-relaxed space-y-4 font-normal"
                dangerouslySetInnerHTML={{
                  __html: section1Desc || desc || "This project involves the implementation of an intelligent water leak detection system to protect critical technical and service areas."
                }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── SECTION 2: SOLUTION (Dynamic Admin Title) ─── */}
      <section className="py-10 sm:py-16 md:py-20 bg-slate-50/60 border-y border-gray-100">
        <Container>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#162E93] tracking-tight">
              {section1SubTitle || articleTitle1 || "TTK's Solution"}
            </h2>
            <div className="mt-2 h-[2px] w-12 bg-[#9B0F06]" />
          </div>

          <div className="max-w-4xl space-y-8">
            <div
              className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{
                __html: section1SubDesc || articleContent1 || "Protected areas include technical rooms, wet risers, sump pits, and service trenches carrying chilled water, Zamzam water, and firefighting pipelines."
              }}
            />
          </div>

          {/* Banner Image with Button (Original UI - Mobile Responsive) */}
          {(articleBannerImage || section1SubImage || image?.[2]) && (
            <div className="relative min-h-[220px] sm:min-h-[280px] rounded-sm overflow-hidden my-8 sm:my-12 group shadow-md">
              <img
                src={articleBannerImage || section1SubImage || image?.[2]}
                alt="Solution Deployment Banner"
                className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col sm:flex-row items-start sm:items-end justify-between p-5 sm:p-8 gap-4">
                <p className="text-white text-xs sm:text-sm font-semibold max-w-md">
                  On-site trench where sense cables are laid beneath pipelines for continuous monitoring and early leak detection
                </p>
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#C3110C] hover:bg-[#1A3263] text-white text-xs font-bold px-4 py-2.5 rounded shadow transition-colors no-underline whitespace-nowrap w-full sm:w-auto shrink-0"
                  >
                    <span>View Project Reference</span>
                    <Download className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ─── SECTION 3: CONCLUSION (Fixed Header) ─── */}
      <section className="py-10 sm:py-16 md:py-20">
        <Container>
          <div className="max-w-4xl">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#162E93] tracking-tight">
                Conclusion
              </h2>
              <div className="mt-2 h-[2px] w-12 bg-[#9B0F06]" />
            </div>

            <div
              className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed space-y-4 font-normal"
              dangerouslySetInnerHTML={{
                __html: articleContent2 || "The project represents a mission-critical installation providing continuous monitoring, clear alarm indication, and accurate leak location identification."
              }}
            />
          </div>
        </Container>
      </section>

      {/* ─── TECHNICAL DEPLOYMENT GALLERY (Original UI - Mobile Responsive) ─── */}
      {galleryImages && galleryImages.length >= 4 && (
        <section className="py-12 sm:py-20 bg-gray-50 border-t border-gray-100 overflow-hidden">
          <Container>
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#162E93] tracking-tight">
                {technicalTitle || "Technical Deployment"}
              </h2>
              <div className="mt-2 h-[2px] w-12 bg-[#9B0F06]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
              {/* BIG LEFT IMAGE */}
              <div className="md:col-span-8 group relative overflow-hidden rounded-sm shadow-md">
                <img
                  src={galleryImages[0]}
                  className="w-full h-[220px] sm:h-[280px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Tech 1"
                />
              </div>

              {/* RIGHT IMAGE */}
              <div className="md:col-span-4 group relative overflow-hidden rounded-sm shadow-md">
                <img
                  src={galleryImages[1]}
                  className="w-full h-[220px] sm:h-[280px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Tech 2"
                />
              </div>

              {/* SMALL LEFT IMAGE */}
              <div className="md:col-span-4 group relative overflow-hidden rounded-sm shadow-md">
                <img
                  src={galleryImages[2]}
                  className="w-full h-[180px] sm:h-[220px] md:h-[240px] object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Tech 3"
                />
              </div>

              {/* BOTTOM WIDE IMAGE */}
              <div className="md:col-span-8 group relative overflow-hidden rounded-sm shadow-md">
                <img
                  src={galleryImages[3]}
                  className="w-full h-[180px] sm:h-[220px] md:h-[240px] object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Tech 4"
                />
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}