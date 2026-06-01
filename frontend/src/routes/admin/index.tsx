import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { QuoteRequest } from "@/components/Admin/types";
import {
  fetchQuotes as fetchQuotesApi,
  updateQuoteStatus,
  deleteQuote,
  exportQuotesToCSV,
} from "@/components/Admin/api";
import { LoadingState } from "@/components/Admin/LoadingState";
import { AccessDenied } from "@/components/Admin/AccessDenied";
import { Sidebar } from "@/components/Admin/Sidebar";
import { Header } from "@/components/Admin/Header";
import {
  honeywellMainProducts,
  honeywellAccessories,
  honeywellCredentials,
  honeywellReaders,
  honeywellSoftware,
  honeywellControlPanels,
  honeywellControlPanelKits,
  honeywellKiosks,
  honeywellUpgrades,
  honeywellDoorHardware,
} from "@/components/Product/AccessControl/Honeywell/data";
import { saltoProducts } from "@/components/Product/AccessControl/Salto/data";
import { bmsProducts } from "@/components/Product/BuildingManagement/data";
import { surveillanceProducts } from "@/components/Product/Surveillance/data";
import { MetricsCards } from "@/components/Admin/MetricsCards";
import { FilterBar } from "@/components/Admin/FilterBar";
import { QuoteTable } from "@/components/Admin/QuoteTable";
import { Pagination } from "@/components/Admin/Pagination";
import { QuoteDetailModal } from "@/components/Admin/QuoteDetailModal";
import { ConfirmModal } from "@/components/Admin/ConfirmModal";
import { DashboardOverview } from "@/components/Admin/DashboardOverview";
import { AnalyticsOverview } from "@/components/Admin/AnalyticsOverview";
import type { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Intersys Solutions" },
      {
        name: "description",
        content:
          "Administrator control panel to manage quote requests, customer accounts, and system specifications.",
      },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthChecking = useSelector((state: RootState) => state.auth.isAuthChecking);

  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"All" | "Pending" | "In Progress" | "Completed">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"dashboard" | "quotes" | "analytics" | "customers" | "products" | "reports" | "settings">("dashboard");

  const itemsPerPage = 5;

  const toDateString = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const [quoteDateRange, setQuoteDateRange] = useState<DateRange | undefined>(undefined);
  const latestRequest = useRef(0);

  const loadQuotes = async (startDate?: string, endDate?: string) => {
    const requestId = ++latestRequest.current;
    setLoading(true);
    try {
      const data = await fetchQuotesApi(startDate, endDate);
      if (requestId !== latestRequest.current) return;
      setQuotes(data);
    } catch (err) {
      if (requestId !== latestRequest.current) return;
      console.error("Error fetching quotes:", err);
    } finally {
      if (requestId !== latestRequest.current) return;
      setLoading(false);
    }
  };

  const handleQuoteDateChange = (dr: DateRange | undefined) => {
    setQuoteDateRange(dr);
    const sd = dr?.from ? toDateString(dr.from) : undefined;
    const ed = dr?.to ? toDateString(dr.to) : dr?.from ? toDateString(dr.from) : undefined;
    loadQuotes(sd, ed);
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      loadQuotes();
    }
  }, [user]);

  const handleStatusChange = async (
    quote: QuoteRequest,
    status: "Pending" | "In Progress" | "Completed"
  ) => {
    try {
      await updateQuoteStatus(quote._id, status);
      setQuotes((prev) => prev.map((q) => (q._id === quote._id ? { ...q, status } : q)));
      if (selectedQuote && selectedQuote._id === quote._id) {
        setSelectedQuote((prev) => (prev ? { ...prev, status } : null));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteQuote(deleteTarget);
      setQuotes((prev) => prev.filter((q) => q._id !== deleteTarget));
      if (selectedQuote?._id === deleteTarget) {
        setSelectedQuote(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteTarget(null);
    }
  };

  const totalOutstanding = quotes.filter((q) => q.status === "Pending").length;
  const inProgressCount = quotes.filter((q) => q.status === "In Progress").length;
  const completedCount = quotes.filter((q) => q.status === "Completed").length;

  const filteredQuotes = quotes
    .filter((q) => {
      if (selectedTab === "All") return true;
      return q.status.toLowerCase() === selectedTab.toLowerCase();
    })
    .filter((q) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        q.name.toLowerCase().includes(term) ||
        q.company.toLowerCase().includes(term) ||
        (q.country && q.country.toLowerCase().includes(term)) ||
        (q.city && q.city.toLowerCase().includes(term))
      );
    });

  const productCounts: Record<string, number> = {};
  quotes.forEach((q) => {
    (q.products || []).forEach((p) => {
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

  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredQuotes.length, totalPages]);

  if (isAuthChecking) {
    return <LoadingState />;
  }

  if (!user || !user.isAdmin) {
    return (
      <AccessDenied
        isAuthOpen={isAuthOpen}
        onAuthOpen={() => setIsAuthOpen(true)}
        onAuthClose={() => setIsAuthOpen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      <Sidebar 
        userName={user.name} 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Header
          userName={user.name}
          userRole={user.role}
          avatar={user.avatar}
          loading={loading}
          onRefresh={activeSection === "dashboard" ? () => window.location.reload() : activeSection === "quotes" ? () => { const sd = quoteDateRange?.from ? toDateString(quoteDateRange.from) : undefined; const ed = quoteDateRange?.to ? toDateString(quoteDateRange.to) : quoteDateRange?.from ? toDateString(quoteDateRange.from) : undefined; loadQuotes(sd, ed); } : loadQuotes}
        />

        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
          {activeSection === "dashboard" && <DashboardOverview />}
          {activeSection === "analytics" && <AnalyticsOverview />}

          {activeSection === "quotes" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold  text-gray-900">
                    Quote Requests
                  </h1>
                  <p className="text-gray-500 text-sm mt-1 max-w-xl">
                    Review and process inbound system specifications from clients.
                  </p>
                </div>
                <MetricsCards
                  totalOutstanding={totalOutstanding}
                  inProgressCount={inProgressCount}
                  completedCount={completedCount}
                  loading={loading}
                  selectedTab={selectedTab}
                  onTabChange={(tab) => {
                    setSelectedTab(tab);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="flex justify-end">
                <DateRangePicker date={quoteDateRange} onDateChange={handleQuoteDateChange} />
              </div>

            <div className="bg-white rounded-sm border border-gray-150 shadow-sm overflow-hidden flex flex-col">
              <FilterBar
                  selectedTab={selectedTab}
                  onTabChange={(tab) => {
                    setSelectedTab(tab);
                    setCurrentPage(1);
                  }}
                  showSearch={showSearch}
                  searchTerm={searchTerm}
                  onSearchToggle={() => setShowSearch(!showSearch)}
                  onSearchChange={(value) => {
                    setSearchTerm(value);
                    setCurrentPage(1);
                  }}
                  onExport={() => exportQuotesToCSV(quotes)}
                />

                <div className="overflow-x-auto">
                  <QuoteTable
                    quotes={currentQuotes}
                    loading={loading}
                    onViewDetails={setSelectedQuote}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                </div>

                {!loading && filteredQuotes.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    indexOfFirstItem={indexOfFirstItem}
                    indexOfLastItem={indexOfLastItem}
                    totalItems={filteredQuotes.length}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-8">
                  {/* Popular Products */}
                  <div className="bg-white p-6 rounded-sm border border-gray-150 shadow-sm">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">
                      Popular Products
                    </span>
                    {loading ? (
                      <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-2 border-[#C3110C] border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : sortedProductPopularity.length === 0 ? (
                      <p className="text-xs text-gray-400 py-10 text-center">No product data available.</p>
                    ) : (
                      <div className="space-y-3">
                        {sortedProductPopularity.map((p, i) => (
                          <div key={i} className="flex items-center gap-3 text-xs">
                            <span className="w-5 h-5 rounded-full bg-[#C3110C]/10 text-[#C3110C] text-[10px] font-bold flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            {getProductImage(p.name) && (
                              <img
                                src={getProductImage(p.name)}
                                alt={p.name}
                                className="w-8 h-8 rounded object-contain bg-gray-50 border border-gray-100 shrink-0"
                              />
                            )}
                            <span className="font-medium text-gray-800 truncate flex-1">{p.name}</span>
                            <span className="font-bold text-[#C3110C] shrink-0">{p.count}x</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-150 shadow-sm flex flex-col lg:col-span-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">
                    Operations Notes
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600 leading-relaxed">
                    <div className="space-y-3">
                      <p className="font-semibold text-gray-900">Status Cycling Control</p>
                      <p>
                        Clicking on the status badge in the table cycles the quote through the three
                        stages: <b>Pending → In Progress → Completed → Pending</b>. Changes are saved
                        instantly to the database.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p className="font-semibold text-gray-900">System Platform Indicator</p>
                      <p>
                        The "Platform" column represents the preferred Building Management System (BMS)
                        selected by the client during quote assembly, such as{" "}
                        <b>In-House DB, Cloud v2.1, or On-Premises</b>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection !== "dashboard" && activeSection !== "quotes" && (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-gray-150 shadow-sm p-8">
              <span className="text-4xl">🛠️</span>
              <h2 className="text-xl font-black text-gray-800 mt-4 capitalize">{activeSection} Section</h2>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                We are currently implementing real-time panels for {activeSection} overview. Please check back shortly.
              </p>
            </div>
          )}
        </main>
      </div>

      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Quote"
        message="Are you sure you want to delete this quote request? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
