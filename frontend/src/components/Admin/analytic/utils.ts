import type { AnalyticsStats } from "./types";

export function getRelativeTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds === 0 ? 1 : seconds} SEC AGO`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} MIN AGO`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "HOUR" : "HOURS"} AGO`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function getTelemetryLog(stats: AnalyticsStats | null) {
  const logItems: Array<{
    id: string;
    level: "danger" | "info";
    title: string;
    description: string;
    time: string;
    timestamp: Date;
  }> = [];

  if (stats) {
    stats.recentContacts.forEach((c) => {
      const date = new Date(c.createdAt);
      logItems.push({
        id: `telemetry-contact-${c._id}`,
        level: "info",
        title: `External Visitor: ID #QR-${c._id.substring(c._id.length - 4).toUpperCase()}`,
        description: `Inquiry from ${c.name} (${c.country || "Global"})`,
        time: getRelativeTime(date),
        timestamp: date,
      });
    });

    stats.recentQuotes.forEach((q) => {
      const date = new Date(q.createdAt);
      const city = q.city || "Zurich";
      logItems.push({
        id: `telemetry-quote-${q._id}`,
        level: "danger",
        title: `Quote Requested: ${q.company || "Tower B"}`,
        description: `New System Inquiry from ${city} Office`,
        time: getRelativeTime(date),
        timestamp: date,
      });
    });
  }

  logItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const mockTelemetry = [
    {
      id: "mock-tel-1",
      level: "danger" as const,
      title: "HVAC Threshold Triggered",
      description: "Sector 3D - Dubai Financial Center",
      time: "2 SEC AGO",
      timestamp: new Date(Date.now() - 2000),
    },
    {
      id: "mock-tel-2",
      level: "danger" as const,
      title: "External Visitor: ID #9022",
      description: "Viewed: Structural Integrity Report",
      time: "1 MIN AGO",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "mock-tel-3",
      level: "info" as const,
      title: "System Sync: Lighting Hub",
      description: "Automated optimization routine completed",
      time: "5 MIN AGO",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "mock-tel-4",
      level: "info" as const,
      title: "Quote Requested: Tower B",
      description: "New Lead from Zurich Office",
      time: "12 MIN AGO",
      timestamp: new Date(Date.now() - 720000),
    },
  ];

  const combined = [...logItems];
  mockTelemetry.forEach((mock) => {
    if (combined.length < 4 && !combined.some((item) => item.title === mock.title)) {
      combined.push({ ...mock });
    }
  });

  return combined.slice(0, 4);
}

export const dynamicsData = [
  { name: "Desktop", value: 75, color: "#C3110C" },
  { name: "Mobile", value: 25, color: "#1E293B" },
];
