import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { EventItem } from "./types";
import { BASE_URL } from "./types";
import { EventList } from "./EventList";
import { EventFormModal } from "./EventFormModal";
import { ConfirmModal } from "../ConfirmModal";

export function EventManagement() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/events`, { credentials: "include" });
      const json = await res.json();
      if (json.success) {
        setEvents(json.data);
      }
    } catch {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleOpenEdit = (item: EventItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleSave = async (data: Partial<EventItem>) => {
    setSaving(true);
    try {
      if (editingItem) {
        // Update existing event
        const res = await fetch(`${BASE_URL}/api/events/${editingItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setEvents((prev) => prev.map((e) => (e._id === editingItem._id ? json.data : e)));
        toast.success("Event updated successfully!");
      } else {
        // Create new event
        const res = await fetch(`${BASE_URL}/api/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setEvents((prev) => [json.data, ...prev]);
        toast.success("Event created successfully!");
      }
      handleCloseForm();
    } catch (err: any) {
      toast.error(err.message || "Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/events/${id}/active`, {
        method: "PATCH",
        credentials: "include",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setEvents((prev) => prev.map((e) => (e._id === id ? json.data : e)));
      toast.success(json.data.isActive ? "Event is now visible" : "Event hidden");
    } catch (err: any) {
      toast.error(err.message || "Failed to toggle status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${BASE_URL}/api/events/${deleteTarget._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setEvents((prev) => prev.filter((e) => e._id !== deleteTarget._id));
      toast.success("Event deleted successfully!");
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete event");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Company Event <span className="text-[#C3110C]">Management</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium">
            Manage past company events, expos, technology showcases, and milestone achievements displayed to website visitors.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-3 bg-[#C3110C] text-white text-xs font-bold rounded-xl hover:bg-[#1A3263] transition-all shadow-md hover:scale-[1.02] active:scale-95 self-start md:self-auto"
        >
          <Plus size={16} />
          Create New Event
        </button>
      </div>

      <EventList
        events={events}
        loading={loading}
        onEdit={handleOpenEdit}
        onDelete={setDeleteTarget}
        onToggleActive={handleToggleActive}
        onAddNew={handleOpenCreate}
      />

      {showForm && (
        <EventFormModal
          editingItem={editingItem}
          saving={saving}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
