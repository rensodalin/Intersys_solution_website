import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { TechnicalTip, TechnicalTipFormData } from "./types";
import { BLANK_FORM, tipToForm, formToPayload, BASE_URL } from "./types";
import { TechnicalTipsList } from "./TechnicalTipsList";
import { TechnicalTipsForm } from "./TechnicalTipsForm";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

export function TechnicalTipsManagement() {
  const [tips, setTips] = useState<TechnicalTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TechnicalTipFormData>(BLANK_FORM);

  const [deleteTarget, setDeleteTarget] = useState<TechnicalTip | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadTips = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/technical-tips`);
      const json = await res.json();
      if (json.success) setTips(json.data);
    } catch {
      toast.error("Failed to load technical tips");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTips(); }, [loadTips]);

  function openCreate() {
    setEditingId(null);
    setForm(BLANK_FORM);
    setShowForm(true);
  }

  function openEdit(t: TechnicalTip) {
    setEditingId(t._id);
    setForm(tipToForm(t));
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditingId(null); }

  function setField(key: keyof TechnicalTipFormData, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.title || !form.pdfUrl || !form.category) {
      toast.error("Title, PDF URL, and Category are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = formToPayload(form);

      if (editingId) {
        const res = await fetch(`${BASE_URL}/api/technical-tips/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setTips(prev => prev.map(t => t._id === editingId ? json.data : t));
        toast.success("Technical tip updated!");
      } else {
        const res = await fetch(`${BASE_URL}/api/technical-tips`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setTips(prev => [json.data, ...prev]);
        toast.success("Technical tip created!");
      }
      closeForm();
    } catch (e: any) {
      toast.error(e.message || "Failed to save technical tip");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/technical-tips/${deleteTarget._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setTips(prev => prev.filter(t => t._id !== deleteTarget._id));
      toast.success("Technical tip deleted!");
      setDeleteTarget(null);
    } catch (e: any) {
      toast.error(e.message || "Failed to delete technical tip");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Technical Tips <span className="text-[#C3110C]">Management</span></h1>
          <p className="text-gray-500 text-xs mt-3 font-medium">
            Add and manage PDF guides for each technical category.
          </p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-3 bg-[#C3110C] text-white text-sm font-bold rounded-lg hover:bg-[#a80f0b] transition-all shadow-lg shadow-[#C3110C]/30 hover:scale-[1.02] active:scale-95">
          <Plus size={16} />
          Add New Tip
        </button>
      </div>

      <TechnicalTipsList tips={tips} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget} />

      {showForm && (
        <TechnicalTipsForm
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
