import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SystemTipsPage, Tip } from "@/components/TechnicalTips/SystemTipsPage";
import environment from "@/enviroment/enviroment";

export const Route = createFileRoute("/technical-tips/system/$systemSlug")({
  component: SystemTipsRoute,
});

function SystemTipsRoute() {
  const { systemSlug } = Route.useParams();
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      setLoading(true);
      try {
        const baseUrl = environment;
        const res = await fetch(`${baseUrl}/api/technical-tips`);
        const json = await res.json();
        if (json.success) {
          setTips(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch technical tips for system:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, [systemSlug]);

  return <SystemTipsPage currentSlug={systemSlug} allTips={tips} loading={loading} />;
}
