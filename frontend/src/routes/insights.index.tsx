import environment from "@/enviroment/enviroment";
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/insights/")({
  component: InsightsPage,
});

const DEFAULT_CASE_STUDIES = [
  {
    _id: "cs-1",
    slug: "smart-building-bms-integration",
    title: "TTK Project Case Study: TTK at TSMC, Taiwan",
    subtitle: "TSMC - Taiwan Semiconductor Manufacturing Company, Taiwan",
    category: "Semiconductor & High-Tech",
    desc: "At TSMC's fab in Taiwan, TTK's addressable water leak detection system protects over 50,000 m² of cleanroom space, pinpointing Process Cooling Water and chemical piping leaks before they can reach sensitive back-end assembly and test equipment.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "cs-2",
    slug: "data-center-environmental-monitoring",
    title: "TTK Project Case Study: TTK in a Leading Data Center in Milan, Italy",
    subtitle: "Leading Data Center in Milan, Italy",
    category: "Data Center Infrastructure",
    desc: "See how we protect two purpose-built data center buildings across a 16-acre campus with a combined critical IT power capacity of 40 MW, safeguarding the cooling infrastructure behind high-density, AI-ready compute.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "cs-3",
    slug: "salto-wireless-access-control",
    title: "Intersys Project Case Study: Integrated Smart Building & Access Control",
    subtitle: "Commercial & Corporate Headquarters, Cambodia",
    category: "Building Management",
    desc: "Deploying integrated BMS controls, Salto wireless locksets, and Honeywell Pro-Watch security integration across Phnom Penh high-rises, providing 24/7 automated monitoring and instant leak/hazard response.",
    image: "https://files.intersys-solutions.com.kh/RandomIMG/772726245_1747029863008860_976472377558814630_n.jpg",
  },
];

function InsightsPage() {
  const [insights, setInsights] = useState<any[]>(DEFAULT_CASE_STUDIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const baseUrl = environment;
        const res = await fetch(`${baseUrl}/api/insights`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setInsights(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch insights:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  const displayItems = insights.length > 0 ? insights : DEFAULT_CASE_STUDIES;

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-36 pb-24">
      <div className="max-w-[1140px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-3 mb-10 sm:mb-14">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight uppercase">
            <span className="text-[#1A3263]">Case</span> <span className="text-[#D62828]">Studies</span>
          </h1>
        </div>

        {/* Alternating Row Grid matching reference UI */}
        <div className="space-y-16 sm:space-y-20 md:space-y-24">
          {displayItems.map((item, idx) => {
            const isEven = idx % 2 === 1;
            const imgSrc = Array.isArray(item.image)
              ? item.image[0]
              : item.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop";

            return (
              <div
                key={item.slug || item._id || idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* Image Box */}
                <div className={cn("md:col-span-6", isEven && "md:order-2")}>
                  <Link
                    to="/insights/$slug"
                    params={{ slug: item.slug || `insight-${idx + 1}` }}
                    className="block group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
                      <img
                        src={imgSrc}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </div>

                {/* Text Content */}
                <div className={cn("md:col-span-6 flex flex-col justify-center", isEven && "md:order-1")}>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-snug mb-1.5">
                    <Link
                      to="/insights/$slug"
                      params={{ slug: item.slug || `insight-${idx + 1}` }}
                      className="hover:text-[#D62828] transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h2>

                  {item.subtitle ? (
                    <p className="text-sm font-medium text-gray-500 mb-3">
                      {item.subtitle}
                    </p>
                  ) : item.category ? (
                    <p className="text-sm font-medium text-gray-500 mb-3">
                      {item.category}
                    </p>
                  ) : null}

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal mb-5">
                    {item.desc}
                  </p>

                  <Link
                    to="/insights/$slug"
                    params={{ slug: item.slug || `insight-${idx + 1}` }}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1A3263] hover:text-[#D62828] transition-colors self-start group cursor-pointer"
                  >
                    <span className="text-xs transition-transform group-hover:translate-x-1 text-[#D62828]">►</span>
                    <span>Read more</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
