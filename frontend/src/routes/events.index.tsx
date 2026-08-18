import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/events/")({
  beforeLoad: () => {
    throw redirect({
      to: "/events/$eventId",
      params: { eventId: "default-1" },
    });
  },
});
