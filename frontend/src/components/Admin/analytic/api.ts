import environment from "@/enviroment/enviroment";

const baseUrl = environment;

export async function fetchAnalyticsStats() {
  const response = await fetch(`${baseUrl}/api/quotes/admin-analytics`, {
    credentials: "include",
  });
  const resData = await response.json();
  if (resData.success) {
    return resData.data;
  }
  throw new Error(resData.error || "Failed to fetch analytics statistics");
}

export async function fetchTrajectoryData(timeframe: "24h" | "7d" | "30d") {
  if (timeframe === "24h") {
    const res = await fetch(`${baseUrl}/api/visitors/hourly`, { credentials: "include" });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || "Failed to fetch hourly data");
    return (json.data as { name: string; visitors: number }[]).map((d) => ({
      name: d.name,
      value: d.visitors,
    }));
  }

  const res = await fetch(`${baseUrl}/api/visitors/trend`, { credentials: "include" });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Failed to fetch trend data");

  const trend = json.data as { weekly: { name: string; visitors: number }[]; monthly: { name: string; visitors: number }[] };

  if (timeframe === "7d") {
    return trend.weekly.map((d) => ({
      name: d.name,
      value: d.visitors,
    }));
  }

  return trend.monthly.map((d) => ({
    name: d.name,
    value: d.visitors,
  }));
}
