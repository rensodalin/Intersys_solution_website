import { useEffect, useState } from "react";
import { createFileRoute } from '@tanstack/react-router'
import { InsightsDetail } from "../components/Insights/InsightsDetail";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute('/insights/$slug')({
  component: InsightDetailRoute,
})

function InsightDetailRoute() {
  const { slug } = Route.useParams();
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const baseUrl = `http://${window.location.hostname}:5000`;
        const res = await fetch(`${baseUrl}/api/insights/${slug}`);
        const data = await res.json();
        if (data.success) {
          setInsight(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch insight detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mb-4">404 - Insight Not Found</h1>
        <p className="text-gray-500 mb-8">The article you are looking for does not exist or has been moved.</p>
      </div>
    );
  }

  return (
    <InsightsDetail
      title={insight.title}
      category={insight.category}
      date={insight.date}
      image={insight.image}
      desc={insight.desc}
      section1Title={insight.section1Title}
      section1Desc={insight.section1Desc}
      section1Image={insight.section1Image}
      section1SubTitle={insight.section1SubTitle}
      section1SubDesc={insight.section1SubDesc}
      section1SubImage={insight.section1SubImage}
      articleTitle1={insight.articleTitle1}
      articleContent1={insight.articleContent1}
      articleBannerImage={insight.articleBannerImage}
      articleTitle2={insight.articleTitle2}
      articleContent2={insight.articleContent2}
      pdfUrl={insight.pdfUrl}
      technicalTitle={insight.technicalTitle}
      galleryImages={insight.galleryImages}
      client={insight.client}
      location={insight.location}
      scope={insight.scope}
    />
  );
}
