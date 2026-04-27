import { createFileRoute } from "@tanstack/react-router";
import { QuoteForm } from "@/components/Quote/QuoteForm";

export const Route = createFileRoute("/request-quote")({
    head: () => ({
        meta: [
            { title: "Request a Quote — Intersys Solutions" },
            {
                name: "description",
                content:
                    "Request a detailed quote for BMS, security, or fire safety systems. Intersys Solutions provides professional engineering services tailored to your needs.",
            },
        ],
    }),
    component: RequestQuote,
});

function RequestQuote() {
    return <QuoteForm />;
}
