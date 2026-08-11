import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TechnicalTipDetail, Tip } from "@/components/TechnicalTips/TechnicalTipDetail";
import environment from "@/enviroment/enviroment";

export const Route = createFileRoute("/technical-tips/$tipId")({
  component: TechnicalTipDetailRoute,
});

function TechnicalTipDetailRoute() {
  const { tipId } = Route.useParams();
  const [tip, setTip] = useState<Tip | null>(null);
  const [relatedTips, setRelatedTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTipData = async () => {
      setLoading(true);
      setError(false);
      try {
        const baseUrl = environment;
        
        // Fetch specific tip by ID
        const res = await fetch(`${baseUrl}/api/technical-tips/${tipId}`);
        const data = await res.json();
        
        if (data.success && data.data) {
          setTip(data.data);
        } else {
          setError(true);
        }

        // Fetch all tips to get related tips in same category
        const allRes = await fetch(`${baseUrl}/api/technical-tips`);
        const allData = await allRes.json();
        if (allData.success) {
          setRelatedTips(allData.data);
        }
      } catch (err) {
        console.error("Failed to fetch technical tip detail:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTipData();
  }, [tipId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin w-10 h-10 border-3 border-[#C3110C] border-t-transparent rounded-full mb-4" />
        <p className="text-sm font-semibold text-gray-500">Loading Technical Tip...</p>
      </div>
    );
  }

  if (error || !tip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-slate-50">
        <div className="w-16 h-16 bg-red-50 text-[#C3110C] rounded-full flex items-center justify-center text-2xl font-bold mb-4">
          !
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Technical Tip Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          The technical tip document you are trying to access does not exist or may have been updated.
        </p>
        <a
          href="/technical-tips"
          className="px-6 py-3 bg-[#C3110C] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#a80f0b] transition-all"
        >
          Return to Technical Tips Overview
        </a>
      </div>
    );
  }

  return <TechnicalTipDetail tip={tip} relatedTips={relatedTips} />;
}
