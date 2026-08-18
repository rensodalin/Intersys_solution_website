import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { EventItem } from "./types";

interface EventFormModalProps {
  editingItem: EventItem | null;
  saving: boolean;
  onClose: () => void;
  onSave: (data: Partial<EventItem>) => void;
}

export function EventFormModal({ editingItem, saving, onClose, onSave }: EventFormModalProps) {
  const [title, setTitle] = useState(editingItem?.title || "");
  const [tagline, setTagline] = useState(editingItem?.tagline || "");
  const [description, setDescription] = useState(editingItem?.description || "");
  const [category, setCategory] = useState(editingItem?.category || "Company Event");
  const [date, setDate] = useState(editingItem?.date || "");
  const [time, setTime] = useState(editingItem?.time || "");
  const [location, setLocation] = useState(editingItem?.location || "");
  const [image, setImage] = useState(editingItem?.image || "");
  const [registrationUrl, setRegistrationUrl] = useState(editingItem?.registrationUrl || "");
  const [highlights, setHighlights] = useState<string[]>(editingItem?.highlights || [""]);
  const [gallery1, setGallery1] = useState(editingItem?.galleryImages?.[0] || "");
  const [gallery2, setGallery2] = useState(editingItem?.galleryImages?.[1] || "");
  const [gallery3, setGallery3] = useState(editingItem?.galleryImages?.[2] || "");
  const [isActive, setIsActive] = useState(editingItem?.isActive ?? true);
  const [isFeatured, setIsFeatured] = useState(editingItem?.isFeatured ?? false);
  const [order, setOrder] = useState(editingItem?.order ?? 0);

  const handleAddHighlight = () => {
    setHighlights((prev) => [...prev, ""]);
  };

  const handleHighlightChange = (index: number, val: string) => {
    setHighlights((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanHighlights = highlights.map((h) => h.trim()).filter(Boolean);
    const cleanGallery = [gallery1, gallery2, gallery3].map((g) => g.trim()).filter(Boolean);
    onSave({
      title,
      tagline,
      description,
      category,
      date,
      time,
      location,
      image,
      registrationUrl,
      highlights: cleanHighlights,
      galleryImages: cleanGallery,
      isActive,
      isFeatured,
      order: Number(order),
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col my-auto border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-black text-gray-900">
              {editingItem ? "Edit Company Event" : "Create New Company Event"}
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-1">
              Configure event details displayed to website visitors.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Intersys Annual Tech Expo 2025"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Category Badge</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Past Event Showcase / Milestone"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Tagline / Subheading</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Short punchy highlight statement"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of what took place, attendee turnouts, and key achievements..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Date Held</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Nov 18 - 20, 2025"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Status / Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. Completed"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Location / Venue</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Phnom Penh Convention Center"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Banner / Photo Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Event Detail / Gallery Link</label>
              <input
                type="text"
                value={registrationUrl}
                onChange={(e) => setRegistrationUrl(e.target.value)}
                placeholder="/portfolio or https://..."
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
              />
            </div>
          </div>

          {/* Highlights */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block font-bold text-gray-700">Event Highlights / Agenda Bullet Points</label>
              <button
                type="button"
                onClick={handleAddHighlight}
                className="flex items-center gap-1 text-xs font-bold text-[#C3110C] hover:underline"
              >
                <Plus size={14} /> Add Highlight
              </button>
            </div>
            <div className="space-y-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={h}
                    onChange={(e) => handleHighlightChange(i, e.target.value)}
                    placeholder={`Highlight #${i + 1}`}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
                  />
                  {highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(i)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Event Photo Gallery - 3 Photos */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Event Gallery Photos (2-3 Image URLs)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                value={gallery1}
                onChange={(e) => setGallery1(e.target.value)}
                placeholder="Photo URL #1"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
              />
              <input
                type="text"
                value={gallery2}
                onChange={(e) => setGallery2(e.target.value)}
                placeholder="Photo URL #2"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
              />
              <input
                type="text"
                value={gallery3}
                onChange={(e) => setGallery3(e.target.value)}
                placeholder="Photo URL #3"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3110C]/20 focus:border-[#C3110C]"
              />
            </div>
          </div>

          {/* Checkboxes & Order */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C3110C] focus:ring-[#C3110C]"
                />
                <span className="font-bold text-gray-700">Active (Visible on website)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C3110C] focus:ring-[#C3110C]"
                />
                <span className="font-bold text-gray-700">Featured</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-bold text-gray-700">Sort Order:</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-20 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 font-bold bg-[#C3110C] text-white hover:bg-[#1A3263] rounded-xl transition-colors shadow-md disabled:opacity-50"
            >
              {saving ? "Saving..." : editingItem ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
