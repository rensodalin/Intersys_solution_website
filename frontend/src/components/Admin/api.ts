import { toast } from "sonner";
import { QuoteRequest, ContactItem } from "./types";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

export async function fetchQuotes(startDate?: string, endDate?: string): Promise<QuoteRequest[]> {
  const params = new URLSearchParams();
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  const response = await fetch(`${baseUrl}/api/quotes/admin?${params.toString()}`, {
    credentials: "include",
  });
  const data = await response.json();
  if (data.success) {
    return data.data || [];
  }
  throw new Error(data.error || "Failed to fetch quotes");
}

export async function fetchContacts(): Promise<ContactItem[]> {
  const response = await fetch(`${baseUrl}/api/contacts`, {
    credentials: "include",
  });
  const data = await response.json();
  if (data.success) {
    return data.data || [];
  }
  throw new Error(data.error || "Failed to fetch contacts");
}

export async function updateQuoteStatus(
  id: string,
  status: "Pending" | "In Progress" | "Completed"
): Promise<void> {
  const response = await fetch(`${baseUrl}/api/quotes/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
    credentials: "include",
  });
  const data = await response.json();
  if (data.success) {
    toast.success(`Quote status updated to ${status}`);
    return;
  }
  throw new Error(data.error || "Failed to update status");
}

export async function deleteQuote(id: string): Promise<void> {
  const response = await fetch(`${baseUrl}/api/quotes/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  if (data.success) {
    toast.success("Quote request deleted successfully");
    return;
  }
  throw new Error(data.error || "Failed to delete quote");
}

export function exportQuotesToCSV(quotes: QuoteRequest[]) {
  if (quotes.length === 0) {
    toast.error("No quotes available to export");
    return;
  }

  const headers = [
    "Quote ID",
    "Date Requested",
    "Customer Name",
    "Title / Role",
    "Company",
    "Company Type",
    "Email",
    "Phone",
    "City",
    "Country",
    "Address",
    "Platform (BMS)",
    "Selected Systems",
    "Status",
    "Total Products Requested",
  ];

  const rows = quotes.map((q) => [
    `QR-${q._id.substring(q._id.length - 5).toUpperCase()}`,
    new Date(q.createdAt).toLocaleDateString(),
    q.name,
    q.title,
    q.company,
    q.companyType,
    q.email,
    q.phone,
    q.city || "",
    q.country || "",
    q.address.replace(/,/g, " "),
    q.bmsSystem,
    q.solutionCategories.join(" | "),
    q.status,
    q.products.reduce((acc, p) => acc + parseInt(p.qty || "0"), 0),
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `intersys_quotes_export_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success("Quotes exported to CSV successfully!");
}
