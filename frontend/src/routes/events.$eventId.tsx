import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, ArrowLeft } from "lucide-react";
import { Container } from "@/components/Common/Container";
import { EventSidebar } from "@/components/Common/EventSidebar";
import environment from "@/enviroment/enviroment";

export const Route = createFileRoute("/events/$eventId")({
  component: EventDetailRoute,
});

interface EventData {
  _id?: string;
  title: string;
  tagline?: string;
  description?: string;
  category?: string;
  date?: string;
  time?: string;
  location?: string;
  image?: string;
  registrationUrl?: string;
  galleryImages?: string[];
  highlights?: string[];
}

const FALLBACK_EVENTS: Record<string, EventData> = {
  "default-1": {
    _id: "default-1",
    title:
      'Intersys organized a training course on "Smart Building & Safety Systems, Measures for Integrated Security & Fire Alarm Control, and Next-Gen BMS Solutions"',
    category: "News & Events",
    date: "13 Feb 2026",
    description:
      'In the morning of February 12th, 2026, Intersys organized a comprehensive engineering training course on "Smart Building Automation, Access Control & Fire Protection Infrastructure," under the high presidency of senior engineering directors and delegates from leading real estate developers and infrastructure groups.',
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  "default-2": {
    _id: "default-2",
    title:
      "The 4th Ordinary Meeting of the Intersys Engineering Advisory Board & Technology Roadmap Summit",
    category: "News & Events",
    date: "05 Feb 2026",
    description:
      "Intersys hosted the 4th Ordinary Meeting of the 9th Mandate's Engineering Advisory Board to review key project milestones, energy efficiency benchmarks, and future deployment strategy for commercial and industrial facilities.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  "default-3": {
    _id: "default-3",
    title:
      "The 3rd Ordinary Meeting of the Intersys Technology Board on Smart Facilities Management",
    category: "News & Events",
    date: "23 Jan 2026",
    description:
      "Members of the Intersys Technology Board convened to present thermal imaging, automated water leak detection systems, and integrated control room operations for high-rise developments.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  "default-4": {
    _id: "default-4",
    title:
      "Intersys participated in the Connectivity Investment & Infrastructure Forum 2025",
    category: "News & Events",
    date: "06 Dec 2025",
    description:
      "Intersys joined regional infrastructure partners to discuss smart city integration, wireless access control, and automated building management systems.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    ],
  },
};

const resolveImageUrl = (url?: string) => {
  if (!url) return "";
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${environment}${cleanPath}`;
};

function EventDetailRoute() {
  const { eventId } = Route.useParams();
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      if (eventId.startsWith("default-") && FALLBACK_EVENTS[eventId]) {
        setEventData(FALLBACK_EVENTS[eventId]);
        setLoading(false);
        return;
      }

      try {
        const backendUrl = environment;
        const res = await fetch(`${backendUrl}/api/events/${eventId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setEventData(json.data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Failed to fetch event detail:", err);
      }

      if (FALLBACK_EVENTS[eventId]) {
        setEventData(FALLBACK_EVENTS[eventId]);
      } else {
        setEventData({
          title: "Intersys Corporate Event Showcase",
          category: "News & Events",
          date: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          description:
            "Intersys organized an engineering showcase displaying smart building management systems, access control, and integrated fire alarm infrastructure.",
          image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
        });
      }
      setLoading(false);
    };

    fetchEventDetail();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#0F2B5B]" />
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Not Found</h1>
        <p className="text-gray-500 mb-6">The event details could not be found.</p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-[#0F2B5B] text-[#FFFFFF] text-xs font-bold rounded-lg hover:bg-[#3B49DF] transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const rawImages = [
    ...(eventData.image ? [eventData.image] : []),
    ...(eventData.galleryImages || []),
  ];
  const allImages = rawImages.map((img) => resolveImageUrl(img)).filter(Boolean);

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-36 pb-24">
      <Container className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Event Popup UI Sidebar */}
          <div className="lg:col-span-4 xl:col-span-4 lg:sticky lg:top-28">
            <EventSidebar activeEventId={eventId} />
          </div>

          {/* Right Column: Event Detail Content */}
          <div className="lg:col-span-8 xl:col-span-8 bg-white p-0 sm:p-2">
            {/* Back Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#0F2B5B] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            {/* 1. Large Bold Title at Top */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-snug tracking-tight mb-3 font-display">
              {eventData.title}
            </h1>

            {/* Sub-Tagline if available */}
            {eventData.tagline && (
              <p className="text-base sm:text-lg font-semibold text-[#3B49DF] mb-4">
                {eventData.tagline}
              </p>
            )}

            {/* 2. Sub-header Meta Line */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-bold text-gray-500 mb-8 border-b border-gray-100 pb-4">
              <div className="w-1 h-4 bg-[#0F2B5B] shrink-0" />
              {eventData.date && <span>{eventData.date}</span>}
              {eventData.date && eventData.category && <span>|</span>}
              {eventData.category && (
                <span className="text-[#0F2B5B]">{eventData.category}</span>
              )}
              {eventData.location && (
                <>
                  <span>|</span>
                  <span className="text-gray-600">📍 {eventData.location}</span>
                </>
              )}
              {eventData.time && (
                <>
                  <span>|</span>
                  <span className="text-gray-600">⏰ {eventData.time}</span>
                </>
              )}
            </div>

            {/* 3. Main Description Paragraph */}
            {eventData.description && (
              <div className="text-sm md:text-base text-gray-700 leading-relaxed mb-8 whitespace-pre-line font-normal">
                {eventData.description}
              </div>
            )}

            {/* Highlights list if provided */}
            {eventData.highlights && eventData.highlights.length > 0 && (
              <div className="mb-8 p-5 bg-slate-50 border-l-4 border-[#0F2B5B] rounded-r-md">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-3">
                  Key Highlights
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-700 font-medium">
                  {eventData.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Registration URL button if provided */}
            {eventData.registrationUrl && (
              <div className="mb-8">
                <a
                  href={eventData.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#0F2B5B] text-white text-xs sm:text-sm font-bold rounded-md hover:bg-[#3B49DF] transition-colors shadow-sm"
                >
                  Register for Event
                </a>
              </div>
            )}

            {/* 4. Stacked Full-Width Images */}
            <div className="space-y-6 md:space-y-8">
              {allImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative w-full overflow-hidden bg-gray-50 rounded-xs"
                >
                  <img
                    src={imgUrl}
                    alt={`${eventData.title} photo ${idx + 1}`}
                    className="w-full h-auto object-cover max-h-[600px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


