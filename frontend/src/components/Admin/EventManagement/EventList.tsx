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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((evt) => (
        <div
          key={evt._id}
          className="bg-white rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
        >
          {/* Header / Banner Preview */}
          <div className="relative h-44 bg-slate-900 overflow-hidden">
            {evt.image ? (
              <img
                src={evt.image}
                alt={evt.title}
                className="w-full h-full object-cover opacity-85"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#1A3263] to-[#0d1a33]">
                <Calendar className="w-12 h-12 text-white/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="text-white text-xs font-bold drop-shadow-md">
                {evt.category || "Past Event Showcase"}
              </span>

              <div className="flex items-center gap-3">
                {evt.isFeatured && (
                  <span className="flex items-center gap-1 text-[#D4FF00] text-xs font-bold drop-shadow-md">
                    <Star className="w-3.5 h-3.5 fill-[#D4FF00] text-[#D4FF00]" /> Featured
                  </span>
                )}
                <button
                  onClick={() => onToggleActive(evt._id)}
                  className={`flex items-center gap-1 text-xs font-bold drop-shadow-md transition-colors ${
                    evt.isActive
                      ? "text-white hover:text-gray-200"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                  title="Click to toggle visibility on website"
                >
                  {evt.isActive ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" /> Hidden
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="text-base font-extrabold leading-snug line-clamp-1">
                {evt.title}
              </h3>
              {evt.tagline && (
                <p className="text-xs text-gray-300 font-medium line-clamp-1 mt-0.5">
                  {evt.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-5 space-y-3 flex-1 text-xs text-gray-600">
            {evt.description && (
              <p className="line-clamp-2 leading-relaxed">{evt.description}</p>
            )}

            <div className="space-y-1.5 pt-1 text-gray-700 font-medium">
              {evt.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#1A3263]" />
                  <span>{evt.date} {evt.time ? `(${evt.time})` : ""}</span>
                </div>
              )}
              {evt.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C3110C]" />
                  <span className="truncate">{evt.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400">Order: {evt.order}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(evt)}
                className="p-2 rounded-lg text-gray-600 hover:text-[#1A3263] hover:bg-gray-200/60 transition-colors"
                title="Edit Event"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(evt)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete Event"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
