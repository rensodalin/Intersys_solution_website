import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

import logoImg from "@/assets/logo.avif";

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

const DEFAULT_EVENTS: CompanyEvent[] = [
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

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function parseDateBadge(dateStr?: string) {
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

export function EventPopup({ isOpen, onClose }: EventPopupProps) {
  const [events, setEvents] = useState<CompanyEvent[]>(DEFAULT_EVENTS);

  useEffect(() => {
    const fetchActiveEvents = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
        const res = await fetch(`${backendUrl}/api/events/active`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            setEvents(json.data);
          }
        }
      } catch (err) {
        console.warn("Using fallback event data due to network error:", err);
      }
    };

    fetchActiveEvents();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-y-0 right-0 left-auto z-[9999] pointer-events-none flex items-stretch justify-end p-0">
          {/* Subtle backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
            onClick={onClose}
          />

          {/* Right-side Drawer Popup Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative z-[10000] pointer-events-auto w-[85vw] sm:w-[360px] md:w-[400px] lg:w-[420px] h-full max-h-full bg-white shadow-2xl border-l border-gray-200 overflow-hidden flex flex-col p-5 sm:p-6"
          >
            {/* Modal Header */}
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

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                aria-label="Close event overlay"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Event Cards Scrollable Content Area */}
            <div
              className="overflow-y-auto scroll-smooth overscroll-contain flex-1 space-y-6 pr-2.5 [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent]"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {events.map((evt, idx) => {
                const { day, month } = parseDateBadge(evt.date);
                const imageSrc =
                  evt.image ||
                  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop";

                return (
                  <Link
                    key={evt._id || idx}
                    to="/events/$eventId"
                    params={{ eventId: evt._id || `default-${idx + 1}` }}
                    onClick={onClose}
                    className="group cursor-pointer flex flex-col pb-4 border-b border-gray-100 last:border-0 block"
                  >
                    {/* Image Box with Bottom-Left Date Badge Overlay */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-3 rounded-md">
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
                    </div>

                    {/* Event Title */}
                    <h3 className="text-sm md:text-base font-extrabold text-[#0F172A] leading-snug line-clamp-2 group-hover:text-[#3B49DF] transition-colors">
                      {evt.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
