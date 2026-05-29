import { useDashboardStats } from "./dashboard/hooks";
import { MetricsGrid } from "./dashboard/MetricsGrid";
import { TrafficTrajectory } from "./dashboard/TrafficTrajectory";
import { NodeActivity } from "./dashboard/NodeActivity";
import { QuoteVelocity } from "./dashboard/QuoteVelocity";
import { FeaturedNode } from "./dashboard/FeaturedNode";

export function DashboardOverview() {
  const { stats, loading, error, fetchStats, timeframe, setTimeframe } = useDashboardStats();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Systems Overview.
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 shadow-sm">
            <span>All Dates</span>
          </div>
        </div>
      </div>

      <MetricsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TrafficTrajectory timeframe={timeframe} onTimeframeChange={setTimeframe} />
        <NodeActivity stats={stats} loading={loading} onRefresh={fetchStats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QuoteVelocity stats={stats} />
        <FeaturedNode />
      </div>
    </div>
  );
}
