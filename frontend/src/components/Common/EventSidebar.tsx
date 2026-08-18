import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import environment from "@/enviroment/enviroment";

export interface CompanyEvent {
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
  highlights?: string[];
  galleryImages?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
}

export const DEFAULT_EVENTS: CompanyEvent[] = [
  {
    _id: "default-1",
    title: "Intersys organized a training course on Smart Building & Safety Systems",
    tagline: "Integrated Honeywell Pro-Watch & Salto Wireless Locks",
    description: "Hands-on engineering training with over 500 building developers and engineers.",
    category: "Training & Tech Showcase",
    date: "13 Feb 2025",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
  },
  {
    _id: "default-2",
    title: "The 4th Ordinary Meeting of the Intersys Engineering Advisory Board",
    tagline: "Next-Gen ELV Solutions and Sustainability Initiatives",
    description: "Annual strategic meeting celebrating engineering milestones across Cambodia.",
    category: "Executive Summit",
    date: "05 Feb 2025",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
  },
  {
    _id: "default-3",
    title: "The 3rd Ordinary Meeting of the Intersys Technology Board",
    tagline: "BMS Automation & Data Center Protection Showcase",
    description: "Reviewing thermal mapping and automated water leak detection deployments.",
    category: "Technology Review",
    date: "23 Jan 2025",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    _id: "default-4",
    title: "Intersys participated in the Connectivity Investment & Infrastructure Forum",
    tagline: "Smart Infrastructure & Energy Optimization Focus",
    description: "Keynote presentation on smart city integration and emergency evacuation systems.",
    category: "Industry Forum",
    date: "06 Dec 2024",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
  },
];

export function parseDateBadge(dateStr?: string) {
  if (!dateStr) {
    return { day: "01", month: "Event" };
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const day = d.getDate().toString().padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" });
    return { day, month };
  }

  const dayMatch = dateStr.match(/\b\d{1,2}\b/);
  const monthMatch = dateStr.match(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\b/i
  );

  const day = dayMatch ? dayMatch[0].padStart(2, "0") : "01";
  const month = monthMatch
    ? monthMatch[0].substring(0, 3)
    : "News";

  return { day, month };
}

interface EventSidebarProps {
  activeEventId?: string;
  onSelectEvent?: () => void;
  className?: string;
  maxHeightClass?: string;
}

export function EventSidebar({
  activeEventId,
  onSelectEvent,
  className,
  maxHeightClass = "max-h-[calc(100vh-220px)]",
}: EventSidebarProps) {
  const [events, setEvents] = useState<CompanyEvent[]>(DEFAULT_EVENTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveEvents = async () => {
      setLoading(true);
      try {
        const backendUrl = environment;
        const res = await fetch(`${backendUrl}/api/events/active`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            setEvents(json.data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Using fallback event data due to network error:", err);
      }
      setLoading(false);
    };

    fetchActiveEvents();
  }, []);

  return (
    <div
      className={cn(
        "bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden flex flex-col p-5 sm:p-6",
        className
      )}
    >
      {/* Sidebar Header matching Popup UI */}
      <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6 shrink-0">
        <div className="flex items-start gap-3.5">
          <div className="w-1.5 h-11 bg-[#0F2B5B] rounded-xs shrink-0 mt-0.5" />
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-[#0F172A] font-display leading-tight">
              All News & Events
            </h2>
            <span className="text-xs md:text-sm font-bold text-[#3B49DF]">
              From Intersys
            </span>
          </div>
        </div>
      </div>

      {/* Event Cards Scrollable List */}
      <div
        className={cn(
          "overflow-y-auto scroll-smooth overscroll-contain flex-1 space-y-6 pr-2.5 [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent]",
          maxHeightClass
        )}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex flex-col gap-2 p-2">
                <div className="w-full aspect-[16/10] bg-slate-100 rounded-xs" />
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          events.map((evt, idx) => {
          const eventId = evt._id || `default-${idx + 1}`;
          const isSelected = activeEventId === eventId;
          const { day, month } = parseDateBadge(evt.date);
          const rawImage =
            evt.image ||
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop";
          const imageSrc =
            rawImage.startsWith("http://") ||
            rawImage.startsWith("https://") ||
            rawImage.startsWith("data:")
              ? rawImage
              : `${environment}${rawImage.startsWith("/") ? rawImage : `/${rawImage}`}`;

          return (
            <Link
              key={eventId}
              to="/events/$eventId"
              params={{ eventId }}
              onClick={onSelectEvent}
              className={cn(
                "group cursor-pointer flex flex-col pb-4 border-b border-gray-100 last:border-0 block transition-all rounded-sm p-2 -mx-2",
                isSelected
                  ? "bg-blue-50/80 ring-1 ring-[#0F2B5B]/30 border-b-transparent shadow-xs"
                  : "hover:bg-gray-50/80"
              )}
            >
              {/* Image Box with Bottom-Left Date Badge Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-3 rounded-xs">
                <img
                  src={imageSrc}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Date Box overlapping bottom-left corner */}
                <div className="absolute bottom-0 left-0 bg-[#0F2B5B] text-white px-3.5 py-2 min-w-[68px] text-center shadow-md z-10">
                  <div className="text-2xl md:text-3xl font-black leading-none tracking-tight">
                    {day}
                  </div>
                  <div className="text-[10px] md:text-[11px] font-bold tracking-wider text-slate-200 mt-1">
                    {month}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 bg-[#0F2B5B] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shadow-sm">
                    Reading Now
                  </div>
                )}
              </div>

              {/* Event Title */}
              <h3
                className={cn(
                  "text-sm md:text-base font-extrabold leading-snug line-clamp-2 transition-colors",
                  isSelected
                    ? "text-[#0F2B5B]"
                    : "text-[#0F172A] group-hover:text-[#3B49DF]"
                )}
              >
                {evt.title}
              </h3>
            </Link>
          );
        })
        )}
      </div>
    </div>
  );
}

