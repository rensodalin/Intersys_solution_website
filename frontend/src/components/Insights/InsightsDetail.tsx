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
  ClipboardList
} from "lucide-react";
import { Link } from "@tanstack/react-router";

// Mapping string names to Lucide components
const IconMap: Record<string, any> = {
  Zap,
  BarChart3,
  Settings2,
  Eye,
  Activity,
  Shield,
  Cpu,
  Globe,
  Lock,
  Layers
};

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
    feature1Title,
    feature1Desc,
    feature2Title,
    feature2Desc,
    features,
    technicalTitle,
    galleryImages,
    content,
    client,
    location,
    scope
  } = props;

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO SECTION ─── */}
      <section className="relative h-[45vh] min-h-[400px] overflow-hidden">
        <img
          src={image && image[0]}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

        <Container className="relative h-full flex flex-col justify-between py-14">
          <Link
            to="/insights"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit group"
          >
          </Link>

          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-white/50 text-xs font-medium tracking-wide">
                {date}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-semibold text-white leading-tight tracking-tight"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-sm md:text-base text-white/75 leading-relaxed max-w-xl"
            >
              {desc}
            </motion.p>
          </div>
        </Container>
      </section>
      {/* ─── CONTENT SECTION 1 ─── */}
      {(section1Title || image?.[1]) && (
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Image Card */}
              <div className="lg:col-span-7 relative group overflow-hidden rounded-sm">
                <img
                  src={section1Image || image?.[1]}
                  alt={section1Title}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{section1Title || "Structural Preservation"}</h3>
                  <p className="text-white/70 text-sm max-w-md">
                    {section1Desc}
                  </p>
                </div>
              </div>

              {/* Right Info Card (Conditional UI based on if section1SubImage exists) */}
              <div className="lg:col-span-5 bg-gray-100 rounded-lg overflow-hidden shadow-sm flex flex-col">
                {section1SubImage ? (
                  /* Heritage Style: Full-bleed Image at top */
                  <>
                    <div className="w-full h-48">
                      <img
                        src={section1SubImage}
                        alt={section1SubTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-10 flex flex-col justify-center flex-grow">
                      <h4 className="text-2xl font-bold text-[#162E93] mb-3">
                        {section1SubTitle}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {section1SubDesc}
                      </p>
                    </div>
                  </>
                ) : (
                  /* Raffle Style: Icon + Content */
                  <div className="p-10 flex flex-col justify-center h-full">
                    <div className="mb-6">
                      <Zap className="h-8 w-8 text-[#9B0F06] mb-4" />
                      <h4 className="text-xl font-bold text-[#162E93] mb-3">{section1SubTitle || "Dynamic Intelligence"}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {section1SubDesc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ─── ARTICLE CONTENT ─── */}
      <section className="pb-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[#162E93] mb-6">{articleTitle1}</h2>
            <div
              className="text-gray-600 leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: articleContent1 || "" }}
            />
          </div>

          {/* Banner with Button */}
          {(articleBannerImage || image?.[2]) && (
            <div className="relative h-[250px] rounded-sm overflow-hidden my-16 group">
              <img
                src={articleBannerImage || image?.[2]}
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover brightness-50"
              />
              <div className="absolute inset-0 flex items-center justify-end px-10 pt-32">
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#C3110C] hover:bg-[#a80f0b] text-white text-sm font-medium px-5 py-2.5 rounded-md shadow-md transition-all duration-300 hover:translate-y-[-1px] no-underline"
                  >
                    <span>Project Reference</span>
                    <Download className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[#162E93] mb-6">{articleTitle2}</h2>
            <div
              className="text-gray-600 leading-relaxed mb-12"
              dangerouslySetInnerHTML={{ __html: articleContent2 || "" }}
            />

            {/* PROJECT METADATA GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10  text-center">

              {/* Client */}
              {client && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-4">
                    <img
                      src="https://icons.veryicon.com/png/o/miscellaneous/cloud-keeper/client-7.png"
                      alt="Client Icon"
                      className="w-5 h-5 object-contain"
                    />
                  </div>

                  <h5 className="text-sm font-semibold tracking-wide text-[#162E93] uppercase mb-2">
                    Client
                  </h5>

                  <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">
                    {client}
                  </p>
                </div>
              )}

              {/* Location */}
              {location && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-4">
                    <img
                      src="https://www.freeiconspng.com/uploads/google-location-icon-16.png"
                      alt="Location Icon"
                      className="w-5 h-5 object-contain"
                    />
                  </div>

                  <h5 className="text-sm font-semibold tracking-wide text-[#162E93] uppercase mb-2">
                    Location
                  </h5>

                  <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">
                    {location}
                  </p>
                </div>
              )}

              {/* Technical Scope */}
              {(scope && scope.length > 0) && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1835/1835948.png"
                      alt="Technical Scope Icon"
                      className="w-5 h-5 object-contain"
                    />
                  </div>

                  <h5 className="text-sm font-semibold tracking-wide text-[#162E93] uppercase mb-3">
                    Technical Scope
                  </h5>

                  <div className="flex flex-wrap justify-center gap-2 max-w-[260px]">
                    {scope.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-gray-100 text-gray-600 px-3 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </Container>
      </section>

      {/* ─── TECHNICAL DEPLOYMENT ─── */}
      {(galleryImages && galleryImages.length >= 4) && (
        <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
          <Container>
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#162E93] tracking-tight">
                {technicalTitle || "Technical Deployment"}
              </h2>
              <div className="mt-3 h-[2px] w-16 bg-[#9B0F06]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 perspective-1000">
              {/* BIG LEFT IMAGE */}
              <motion.div
                initial={{ opacity: 0, rotateX: 25, rotateY: -10, scale: 0.95 }}
                whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="md:col-span-8 group relative overflow-hidden rounded-sm shadow-lg"
              >
                <img
                  src={galleryImages[0]}
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Tech 1"
                />
              </motion.div>

              {/* RIGHT IMAGE */}
              <motion.div
                initial={{ opacity: 0, rotateX: -25, rotateY: 10, scale: 0.95 }}
                whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="md:col-span-4 group relative overflow-hidden rounded-sm shadow-lg"
              >
                <img
                  src={galleryImages[1]}
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Tech 2"
                />
              </motion.div>

              {/* SMALL LEFT IMAGE */}
              <motion.div
                initial={{ opacity: 0, rotateX: 20, rotateY: -10, scale: 0.95 }}
                whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="md:col-span-4 group relative overflow-hidden rounded-sm shadow-md"
              >
                <img
                  src={galleryImages[2]}
                  className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Tech 3"
                />
              </motion.div>

              {/* BOTTOM WIDE IMAGE */}
              <motion.div
                initial={{ opacity: 0, rotateX: -20, rotateY: 10, scale: 0.95 }}
                whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="md:col-span-8 group relative overflow-hidden rounded-sm shadow-lg"
              >
                <img
                  src={galleryImages[3]}
                  className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Tech 4"
                />
              </motion.div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}