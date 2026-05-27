import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { MetricsCards } from "@/components/Admin/MetricsCards";
import { FilterBar } from "@/components/Admin/FilterBar";
import { QuoteTable } from "@/components/Admin/QuoteTable";
import { Pagination } from "@/components/Admin/Pagination";
import { SystemPopularity } from "@/components/Admin/SystemPopularity";
import { QuoteDetailModal } from "@/components/Admin/QuoteDetailModal";

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
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const itemsPerPage = 5;

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const data = await fetchQuotesApi();
      setQuotes(data);
    } catch (err) {
      console.error("Error fetching quotes:", err);
    } finally {
      setLoading(false);
    }
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
    try {
      await deleteQuote(id);
      setQuotes((prev) => prev.filter((q) => q._id !== id));
      if (selectedQuote?._id === id) {
        setSelectedQuote(null);
      }
    } catch (err) {
      console.error(err);
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

  const systemCounts: Record<string, number> = {};
  quotes.forEach((q) => {
    q.solutionCategories.forEach((cat) => {
      const cleanCat = cat.replace("System", "").trim();
      systemCounts[cleanCat] = (systemCounts[cleanCat] || 0) + 1;
    });
  });

  const sortedPopularity = Object.entries(systemCounts)
    .map(([name, count]) => ({
      name,
      percentage: quotes.length ? Math.round((count / quotes.length) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 4);

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
      <Sidebar userName={user.name} />

      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Header
          userName={user.name}
          avatar={user.avatar}
          loading={loading}
          onRefresh={loadQuotes}
        />

        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900">
                Quote Requests
              </h1>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed max-w-xl">
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
            <SystemPopularity sortedPopularity={sortedPopularity} loading={loading} />

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
    </div>
  );
}
