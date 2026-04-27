import { createFileRoute } from "@tanstack/react-router";
import { DocumentCenter } from "@/components/DocumentCenter/DocumentCenter";

export const Route = createFileRoute("/document-center")({
    head: () => ({
        meta: [
            { title: "Document Center — Intersys Solutions" },
            {
                name: "description",
                content:
                    "Download Intersys Solutions company profiles, product catalogues, and technical documentation. Access engineering resources for BMS and safety systems.",
            },
        ],
    }),
    component: DocumentCenterPage,
});

function DocumentCenterPage() {
    return <DocumentCenter />;
}
