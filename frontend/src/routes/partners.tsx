import { createFileRoute } from "@tanstack/react-router";
import { PartnersPage } from "@/components/Partners/PartnersPage";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Technology Partners & OEM Alliances — Intersys Solutions" },
      {
        name: "description",
        content:
          "Discover Intersys Solutions' official partnerships with Honeywell, SALTO Systems, Notifier, ESSER, and global leaders in Smart Building, Life Safety, and AI Security.",
      },
    ],
  }),
  component: PartnersPage,
});
