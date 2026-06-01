export interface CountryEntry {
  name: string;
  percentage: number;
}

export interface AnalyticsStats {
  liveUsers: number;
  avgDepth: string;
  totalQuotes: number;
  totalContacts: number;
  totalUsers: number;
  recentQuotes: any[];
  recentContacts: any[];
  recentUsers: any[];
  countryDistribution: CountryEntry[];
}
