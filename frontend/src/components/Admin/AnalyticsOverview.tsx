import { useEffect, useState } from "react";
import { AnalyticsStats } from "./analytic/types";
import { fetchAnalyticsStats } from "./analytic/api";
import { fetchQuotes } from "./api";
import { VisitorTrajectoryChart } from "./analytic/VisitorTrajectoryChart";
import { GlobalPresenceCard } from "./analytic/GlobalPresenceCard";
import { SystemPopularity } from "./analytic/SystemPopularity";
import { InterfaceDynamicsCard } from "./analytic/InterfaceDynamicsCard";
import { PopularProductsCard } from "./analytic/PopularProductsCard";
import {
  honeywellMainProducts, honeywellAccessories, honeywellCredentials,
  honeywellReaders, honeywellSoftware, honeywellControlPanels,
  honeywellControlPanelKits, honeywellKiosks, honeywellUpgrades,
  honeywellDoorHardware,
} from "@/components/Product/AccessControl/Honeywell/data";
import { saltoProducts } from "@/components/Product/AccessControl/Salto/data";
import { bmsProducts } from "@/components/Product/BuildingManagement/data";
import { surveillanceProducts } from "@/components/Product/Surveillance/data";

export function AnalyticsOverview() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [allQuotes, setAllQuotes] = useState<any[]>([]);

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

  const productImageMap: Record<string, string> = {};
  const allProducts = [
    ...honeywellMainProducts, ...honeywellAccessories, ...honeywellCredentials,
    ...honeywellReaders, ...honeywellSoftware, ...honeywellControlPanels,
    ...honeywellControlPanelKits, ...honeywellKiosks, ...honeywellUpgrades,
    ...honeywellDoorHardware,
    ...saltoProducts.flatMap((p: any) => [p, ...(p.subProducts || [])]),
    ...bmsProducts, ...surveillanceProducts,
  ];
  allProducts.forEach((p: any) => { if (p.title) productImageMap[p.title.toLowerCase()] = p.image; });

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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Structural <span className="text-[#C3110C]">Insights</span>
          </h1>
          <p className="text-gray-500 text-xs mt-1 max-w-xl font-medium leading-relaxed">
            Real-time building system telemetry and digital visitor interaction metrics for global architectural assets.
          </p>
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

      <footer className="pt-8 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-bold text-gray-300 uppercase tracking-wider">
        <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
          <span>Last Update: {lastUpdate || "Oct 24, 2023 - 14:22:01 UTC"}</span>
          <span className="hidden sm:inline w-1 h-1 bg-gray-200 rounded-full"></span>
          <span>Active Nodes: 12,402 Units</span>
        </div>

        <div className="flex items-center gap-1.5 text-center sm:text-right">
          <span>© 2023 Structural Intel — Architectural Data Systems</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#C3110C]/20 border border-[#C3110C]/40 flex items-center justify-center shrink-0">
            <span className="w-1 h-1 bg-[#C3110C] rounded-full animate-ping"></span>
          </span>
        </div>
      </footer>
    </div>
  );
}
