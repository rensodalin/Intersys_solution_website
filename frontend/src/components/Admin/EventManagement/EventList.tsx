import { Edit2, Trash2, Calendar, MapPin, CheckCircle2, XCircle, Star } from "lucide-react";
import type { EventItem } from "./types";

interface EventListProps {
  events: EventItem[];
  loading: boolean;
  onEdit: (item: EventItem) => void;
  onDelete: (item: EventItem) => void;
  onToggleActive: (id: string) => void;
  onAddNew: () => void;
}

function parseDateBadge(dateStr?: string) {
  if (!dateStr) {
    return { day: "01", month: "EVENT" };
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const day = d.getDate().toString().padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    return { day, month };
  }

  const dayMatch = dateStr.match(/\b\d{1,2}\b/);
  const monthMatch = dateStr.match(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\b/i
  );

  const day = dayMatch ? dayMatch[0].padStart(2, "0") : "01";
  const month = monthMatch
    ? monthMatch[0].substring(0, 3).toUpperCase()
    : "EVENT";

  return { day, month };
}

export function EventList({
  events,
  loading,
  onEdit,
  onDelete,
  onToggleActive,
  onAddNew,
}: EventListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-gray-150 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-8 h-8 border-4 border-[#C3110C] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-xs font-bold text-gray-500">Loading events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-gray-150 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 text-[#C3110C] flex items-center justify-center mb-4">
          <Calendar className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-black text-gray-900">No Events Found</h3>
        <p className="text-xs text-gray-500 mt-1 max-w-sm">
          No company events have been created yet. Click below to add your first upcoming company event.
        </p>
        <button
          onClick={onAddNew}
          className="mt-5 px-5 py-2.5 bg-[#C3110C] text-white text-xs font-bold rounded-xl hover:bg-[#1A3263] transition-colors shadow-md"
        >
          + Add First Event
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {events.map((evt) => {
        const { day, month } = parseDateBadge(evt.date);
        return (
          <div
            key={evt._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between group"
          >
            {/* Top Image Box with Bottom-Left Date Overlay */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              {evt.image ? (
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#0F2B5B] to-[#081F3D]">
                  <Calendar className="w-12 h-12 text-white/30" />
                </div>
              )}

              {/* Status Badges Overlay Header */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-sm shadow-xs">
                  {evt.category || "Past Event Showcase"}
                </span>

                <div className="flex items-center gap-2">
                  {evt.isFeatured && (
                    <span className="flex items-center gap-1 bg-[#D4FF00] text-black text-[10px] font-black px-2 py-0.5 rounded-sm shadow-xs">
                      <Star className="w-3 h-3 fill-black" /> Featured
                    </span>
                  )}
                  <button
                    onClick={() => onToggleActive(evt._id)}
                    className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-sm shadow-xs transition-colors cursor-pointer ${
                      evt.isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-800 text-gray-300"
                    }`}
                    title="Toggle active status"
                  >
                    {evt.isActive ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> Hidden
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Date Box overlapping bottom-left corner */}
              <div className="absolute bottom-0 left-0 bg-[#0F2B5B] text-white px-4 py-2.5 min-w-[72px] text-center shadow-md z-10">
                <div className="text-2xl md:text-3xl font-black leading-none tracking-tight">
                  {day}
                </div>
                <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-200 mt-1">
                  {month}
                </div>
              </div>
            </div>

            {/* Event Title & Info Below Image */}
            <div className="p-5 flex-1 space-y-2">
              <h3 className="text-base md:text-lg font-extrabold text-[#0F172A] leading-snug line-clamp-2 group-hover:text-[#3B49DF] transition-colors">
                {evt.title}
              </h3>

              {evt.tagline && (
                <p className="text-xs font-semibold text-gray-500 line-clamp-1">
                  {evt.tagline}
                </p>
              )}

              {evt.description && (
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
              )}

              {evt.location && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C3110C] shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-400">Order: {evt.order}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(evt)}
                  className="p-1.5 rounded-md text-gray-600 hover:text-[#0F2B5B] hover:bg-gray-200 transition-colors cursor-pointer"
                  title="Edit Event"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(evt)}
                  className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete Event"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
