const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

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
