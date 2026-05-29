export interface DashboardStats {
  totalQuotes: number;
  pendingQuotes: number;
  inProgressQuotes: number;
  completedQuotes: number;
  totalVisitors: number;
  activeUsers: number;
  totalContacts: number;
  totalUsers: number;
  recentQuotes: any[];
  recentContacts: any[];
  recentUsers: any[];
  monthlyVelocity: { name: string; quotes: number }[];
}
