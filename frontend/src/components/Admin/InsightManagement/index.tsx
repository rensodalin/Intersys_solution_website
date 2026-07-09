import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { Insight, InsightFormData } from "./types";
import { BLANK_FORM, insightToForm, formToPayload, BASE_URL } from "./types";
import { InsightList } from "./InsightList";
import { InsightForm } from "./InsightForm";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

export function InsightManagement() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<InsightFormData>(BLANK_FORM);

  const [deleteTarget, setDeleteTarget] = useState<Insight | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadInsights = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/insights`);
      const json = await res.json();
      if (json.success) setInsights(json.data);
    } catch {
      toast.error("Failed to load insights");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadInsights(); }, [loadInsights]);

  function openCreate() {
    setEditingId(null);
    setForm(BLANK_FORM);
    setShowForm(true);
  }

  function openEdit(i: Insight) {
    setEditingId(i._id);
    setForm(insightToForm(i));
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditingId(null); }

  function setField(key: keyof InsightFormData, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.title || !form.slug || !form.desc || !form.category || !form.date || !form.image) {
      toast.error("Title, Slug, Description, Category, Date and Main Image are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = formToPayload(form);

      if (editingId) {
        const res = await fetch(`${BASE_URL}/api/insights/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setInsights(prev => prev.map(i => i._id === editingId ? json.data : i));
        toast.success("Insight updated!");
      } else {
        const res = await fetch(`${BASE_URL}/api/insights`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setInsights(prev => [json.data, ...prev]);
        toast.success("Insight created!");
      }
      closeForm();
    } catch (e: any) {
      toast.error(e.message || "Failed to save insight");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/insights/${deleteTarget._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setInsights(prev => prev.filter(i => i._id !== deleteTarget._id));
      toast.success("Insight deleted!");
      setDeleteTarget(null);
    } catch (e: any) {
      toast.error(e.message || "Failed to delete insight");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Insight <span className="text-[#C3110C]">Management</span></h1>
          <p className="text-gray-500 text-xs mt-3 font-medium">
            Create and manage insight articles, case studies, and project showcases.
          </p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-3 bg-[#C3110C] text-white text-sm font-bold rounded-lg hover:bg-[#a80f0b] transition-all shadow-lg shadow-[#C3110C]/30 hover:scale-[1.02] active:scale-95">
          <Plus size={16} />
          Add New Insight
        </button>
      </div>

      <InsightList insights={insights} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget} />

      {showForm && (
        <InsightForm
          form={form}
          editingId={editingId}
          saving={saving}
          onFieldChange={setField}
          onClose={closeForm}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          deleting={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
