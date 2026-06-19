import { useEffect, useState } from "react";
import { DashboardStats } from "./types";
import environment from "@/enviroment/enviroment";

const baseUrl = environment;

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/quotes/admin-stats`, {
        credentials: "include",
      });
      const resData = await response.json();
      if (resData.success) {
        setStats(resData.data);
      } else {
        throw new Error(resData.error || "Failed to fetch dashboard statistics");
      }
    } catch (err: any) {
      console.error("Dashboard stats fetch error:", err);
      setError(err.message || "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, fetchStats };
}
