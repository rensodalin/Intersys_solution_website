import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, ChevronRight, ChevronLeft } from "lucide-react";

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
    title: "Intersys Annual Building Tech & Security Expo 2025",
    tagline: "Showcasing Next-Gen AI Access Control, BMS & Fire Safety Systems",
    description:
      "A look back at our landmark engineering showcase in Phnom Penh. We hosted over 500 industry leaders, architects, and building owners to demonstrate integrated Honeywell & SALTO security infrastructure.",
    category: "Past Event Showcase",
    date: "November 18 - 20, 2025",
    time: "Completed",
    location: "Phnom Penh International Convention Center",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    registrationUrl: "/portfolio",
    highlights: [
      "Over 500+ Attendees & Building Developers",
      "Live Integration Demos of Honeywell Pro-Watch & Salto Wireless Locks",
      "Keynote Speeches by Senior Systems Engineers",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    _id: "default-2",
    title: "Intersys Engineers Summit & Innovation Showcase 2024",
    tagline: "Celebrating 10 Years of Smart Engineering in Cambodia",
    description:
      "Our team gathered with regional partners to unveil automated building management solutions and celebrate a decade of engineering excellence.",
    category: "Company Milestone",
    date: "December 14, 2024",
    time: "Completed",
    location: "Intersys Solutions HQ, Phnom Penh",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    registrationUrl: "/about/company-profile",
    highlights: [
      "Unveiled Next-Gen Building Control Room Prototypes",
      "Partner Recognition Awards with Honeywell Security",
      "Technological Roadmap Presentation for 2025+",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
    ],
    isActive: true,
    isFeatured: false,
  },
];

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EventPopup({ isOpen, onClose }: EventPopupProps) {
  const [events, setEvents] = useState<CompanyEvent[]>(DEFAULT_EVENTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Fetch live active events from backend
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

  // Automatic swipe to next event every 4 seconds
  useEffect(() => {
    if (!isOpen || events.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isOpen, events.length, isHovered]);

  const handleClose = () => {
    onClose();
  };

  const currentEvent = events[currentIndex] || DEFAULT_EVENTS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const gallery =
    currentEvent.galleryImages && currentEvent.galleryImages.length > 0
      ? currentEvent.galleryImages
      : [
          "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
        ];

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
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-auto"
            onClick={handleClose}
          />

          {/* Event Rectangular Box - Fully Responsive across mobile, tablet, and desktop */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative z-[10000] pointer-events-auto w-[85vw] sm:w-[360px] md:w-[390px] lg:w-[420px] xl:w-[440px] h-full max-h-full bg-white rounded-l-none sm:rounded-l-2xl shadow-2xl shadow-black/25 border-l-2 border-y-0 border-gray-200 overflow-hidden flex flex-col my-0"
          >
            {/* Auto-swipe glowing progress bar */}
            {events.length > 1 && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-40 overflow-hidden">
                <motion.div
                  key={currentIndex}
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "0%" : "100%" }}
                  transition={{ duration: isHovered ? 0 : 4, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-[#C3110C] to-[#D4FF00]"
                />
              </div>
            )}

            {/* Close Button with rotation micro-animation */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 z-50 p-1.5 sm:p-2 rounded-md bg-black/60 hover:bg-black/85 text-white backdrop-blur-md transition-colors shadow-md cursor-pointer"
              aria-label="Close event overlay"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </motion.button>

            {/* Dynamic Event Content Container with Crossfade Slide */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEvent._id || currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col flex-1 overflow-hidden"
              >
                {/* Event Header Banner Image */}
                <div className="relative w-full h-40 sm:h-48 md:h-52 lg:h-56 bg-slate-900 overflow-hidden shrink-0">
                  {currentEvent.image && (
                    <motion.img
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      src={currentEvent.image}
                      alt={currentEvent.title}
                      className="w-full h-full object-cover object-center opacity-85"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                  {/* Category Text */}
                  <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 flex items-center gap-2">
                    <span className="text-white text-[11px] sm:text-xs font-bold tracking-wide drop-shadow-md">
                      {currentEvent.category || "Past Event Showcase"}
                    </span>
                    {currentEvent.isFeatured && (
                      <span className="hidden sm:inline-flex text-[#D4FF00] text-[11px] sm:text-xs font-bold drop-shadow-md">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Event Title on Banner */}
                  <div className="absolute bottom-3 sm:bottom-3.5 left-3.5 sm:left-4 right-3.5 sm:right-4 text-white">
                    <h3 className="text-base sm:text-lg md:text-xl font-extrabold leading-snug drop-shadow-md">
                      {currentEvent.title}
                    </h3>
                    {currentEvent.tagline && (
                      <p className="text-[11px] sm:text-xs text-gray-200 font-medium mt-0.5 line-clamp-1 drop-shadow-sm">
                        {currentEvent.tagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Event Content Body */}
                <div className="p-3.5 sm:p-4 md:p-5 overflow-y-auto space-y-3 sm:space-y-4 text-gray-700 flex-1">
                  {/* Meta details grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-gray-50 p-2.5 sm:p-3 rounded-md border border-gray-100 text-[11px] sm:text-xs">
                    {currentEvent.date && (
                      <div className="flex items-center gap-2 text-gray-800 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#1A3263] shrink-0" />
                        <span className="truncate">{currentEvent.date}</span>
                      </div>
                    )}
                    {currentEvent.time && (
                      <div className="flex items-center gap-2 text-gray-800 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#1A3263] shrink-0" />
                        <span className="truncate">{currentEvent.time}</span>
                      </div>
                    )}
                    {currentEvent.location && (
                      <div className="flex items-center gap-2 text-gray-800 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#C3110C] shrink-0" />
                        <span className="truncate">{currentEvent.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {currentEvent.description && (
                    <p className="text-xs sm:text-xs md:text-sm text-gray-600 leading-relaxed">
                      {currentEvent.description}
                    </p>
                  )}

                  {/* Highlights List */}
                  {currentEvent.highlights && currentEvent.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <h4 className="text-xs sm:text-xs md:text-sm font-bold text-[#1A3263]">
                        Key Highlights
                      </h4>
                      <ul className="space-y-1 sm:space-y-1.5">
                        {currentEvent.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-xs md:text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C3110C] shrink-0 mt-1.5" />
                            <span className="leading-normal">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Event Photo Gallery - 3 pictures */}
                  {gallery.slice(0, 3).length > 0 && (
                    <div className="pt-2">
                      <h5 className="text-[11px] sm:text-xs font-bold text-[#1A3263] mb-1.5 sm:mb-2">
                        Event Photos
                      </h5>
                      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                        {gallery.slice(0, 3).map((imgUrl, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="relative h-16 sm:h-20 md:h-22 bg-gray-100 rounded-sm overflow-hidden border border-gray-200 shadow-xs group"
                          >
                            <img
                              src={imgUrl}
                              alt={`Event photo ${imgIdx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Modal Footer / Carousel Navigation & Close */}
            <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3 shrink-0 z-10">
              {/* Multi-event carousel controls */}
              {events.length > 1 ? (
                <div className="flex items-center gap-1.5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    className="p-1.5 rounded-sm border border-gray-200 hover:bg-white text-gray-600 transition-colors cursor-pointer"
                    title="Previous Event"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.button>
                  <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 px-1">
                    {currentIndex + 1} / {events.length}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    className="p-1.5 rounded-sm border border-gray-200 hover:bg-white text-gray-600 transition-colors cursor-pointer"
                    title="Next Event"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>
              ) : (
                <div className="text-[10px] sm:text-[11px] font-semibold text-gray-400">
                  Company Event Recap
                </div>
              )}

              {/* Action Button */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClose}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-bold bg-[#C3110C] hover:bg-[#1A3263] text-white transition-colors shadow-sm cursor-pointer"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
