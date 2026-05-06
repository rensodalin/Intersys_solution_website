import { createFileRoute } from "@tanstack/react-router";
import { Support } from "@/components/Support/Support";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Technical Support & Customer Service — Intersys Solutions" },
      {
        name: "description",
        content: "Reliable technical support and responsive customer service for all Intersys systems.",
      },
    ],
  }),
  component: Support,
});
