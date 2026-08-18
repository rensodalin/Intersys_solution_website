import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/events/")({
  beforeLoad: async () => {
    let firstEventId = "default-1";
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
      const res = await fetch(`${backendUrl}/api/events/active`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          firstEventId = json.data[0]._id || "default-1";
        }
      }
    } catch (err) {
      console.warn("Failed to fetch active events for redirect:", err);
    }

    throw redirect({
      to: "/events/$eventId",
      params: { eventId: firstEventId },
    });
  },
});

