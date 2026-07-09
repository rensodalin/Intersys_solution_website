import { useEffect, useState } from "react";
import { AnalyticsStats } from "./analytic/types";
import { fetchAnalyticsStats } from "./analytic/api";
import { fetchQuotes } from "./api";
import { fetchProducts } from "@/utils/productApi";
import { VisitorTrajectoryChart } from "./analytic/VisitorTrajectoryChart";
import { GlobalPresenceCard } from "./analytic/GlobalPresenceCard";
import { SystemPopularity } from "./analytic/SystemPopularity";
import { InterfaceDynamicsCard } from "./analytic/InterfaceDynamicsCard";
import { PopularProductsCard } from "./analytic/PopularProductsCard";

export function AnalyticsOverview() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [allQuotes, setAllQuotes] = useState<any[]>([]);
  const [productImageMap, setProductImageMap] = useState<Record<string, string>>({});

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const data = await fetchAnalyticsStats();
      setStats(data);
      setLastUpdate(new Date().toUTCString().replace("GMT", "UTC"));
    } catch (err: any) {
      console.error("Analytics stats fetch error:", err);
      setLastUpdate(new Date().toUTCString().replace("GMT", "UTC"));
    } finally {
      setLoading(false);
    }
  };

  const fetchAllQuotesData = async () => {
    try {
      const quotes = await fetchQuotes();
      setAllQuotes(quotes);
    } catch {
      // non-critical
    }
  };

  useEffect(() => {
    fetchAnalytics();
    fetchAllQuotesData();
  }, []);

  // Build image map from API products (includes admin-added products)
  useEffect(() => {
    fetchProducts()
      .then(apiProducts => {
        const map: Record<string, string> = {};
        apiProducts.forEach(p => {
          if (p.title && p.mainImage) map[p.title.toLowerCase()] = p.mainImage;
        });
        setProductImageMap(map);
      })
      .catch(() => {
        // API unavailable – image map stays empty, images simply won't show
      });
  }, []);

  const productCounts: Record<string, number> = {};
  allQuotes.forEach((q: any) => {
    (q.products || []).forEach((p: any) => {
      const key = p.description || p.productNo;
      if (key) productCounts[key] = (productCounts[key] || 0) + 1;
    });
  });
  const sortedProductPopularity = Object.entries(productCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const getProductImage = (name: string) => {
    const key = name.toLowerCase();
    if (productImageMap[key]) return productImageMap[key];
    for (const [t, img] of Object.entries(productImageMap)) {
      if (key.includes(t) || t.includes(key)) return img;
    }
    return "";
  };

  const systemCounts: Record<string, number> = {};
  allQuotes.forEach((q: any) => {
    (q.solutionCategories || []).forEach((cat: string) => {
      const cleanCat = cat.replace("System", "").trim();
      systemCounts[cleanCat] = (systemCounts[cleanCat] || 0) + 1;
    });
  });
  const totalWithCategories = allQuotes.length;
  const sortedPopularity = Object.entries(systemCounts)
    .map(([name, count]) => ({
      name,
      percentage: totalWithCategories ? Math.round((count / totalWithCategories) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Analytics <span className="text-[#C3110C]">Overview</span>
          </h1>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <VisitorTrajectoryChart timeframe={timeframe} onTimeframeChange={setTimeframe} />
        <GlobalPresenceCard countryDistribution={stats?.countryDistribution ?? []} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PopularProductsCard
          products={sortedProductPopularity}
          loading={loading}
          getProductImage={getProductImage}
        />
        <SystemPopularity sortedPopularity={sortedPopularity} loading={loading} />
        <InterfaceDynamicsCard
          totalQuotes={stats?.totalQuotes ?? 0}
          totalContacts={stats?.totalContacts ?? 0}
          totalUsers={stats?.totalUsers ?? 0}
        />
      </div>

      <footer className="pt-8 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
        <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
          <span>Last Update: {lastUpdate || "—"}</span>
          <span className="hidden sm:inline w-1 h-1 bg-gray-200 rounded-full"></span>
          <span>Intersys Analytics</span>
        </div>
      </footer>
    </div>
  );
}
