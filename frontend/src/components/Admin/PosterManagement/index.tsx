import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { Poster } from "./types";
import { BASE_URL } from "./types";
import { PosterList } from "./PosterList";
import { PosterForm } from "./PosterForm";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

export function PosterManagement() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form modal
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formImage, setFormImage] = useState("");
  const [formLink, setFormLink] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const [formLinkedinLink, setFormLinkedinLink] = useState("");
  const [formFacebookLink, setFormFacebookLink] = useState("");
  const [formOrder, setFormOrder] = useState(0);

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<Poster | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadPosters = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/posters`);
      const json = await res.json();
      if (json.success) setPosters(json.data);
    } catch {
      toast.error("Failed to load posters");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPosters(); }, [loadPosters]);

  function openCreate() {
    setEditingId(null);
    setFormImage("");
    setFormLink("");
    setFormTitle("");
    setFormDescription("");
    setFormLinkedinLink("");
    setFormFacebookLink("");
    setFormOrder(posters.length);
    setShowForm(true);
  }

  function openEdit(p: Poster) {
    setEditingId(p._id);
    setFormImage(p.image);
    setFormLink(p.link);
    setFormTitle(p.title);
    setFormDescription(p.description);
    setFormLinkedinLink(p.linkedinLink);
    setFormFacebookLink(p.facebookLink);
    setFormOrder(p.order);
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditingId(null); }

  async function handleSave() {
    if (!formImage) {
      toast.error("Image URL is required.");
      return;
    }
    setSaving(true);
    const body = {
      image: formImage,
      link: formLink,
      title: formTitle,
      description: formDescription,
      linkedinLink: formLinkedinLink,
      facebookLink: formFacebookLink,
      order: formOrder,
    };
    try {
      if (editingId) {
        const res = await fetch(`${BASE_URL}/api/posters/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setPosters(prev => prev.map(p => p._id === editingId ? json.data : p));
        toast.success("Poster updated!");
      } else {
        const res = await fetch(`${BASE_URL}/api/posters`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setPosters(prev => [...prev, json.data].sort((a, b) => a.order - b.order));
        const notified = json.notified ?? 0;
        if (notified > 0) toast.success(`Poster created! ${notified} subscriber(s) notified.`);
        else toast.success("Poster created!");
      }
      closeForm();
    } catch (e: any) {
      toast.error(e.message || "Failed to save poster");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/posters/${deleteTarget._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setPosters(prev => prev.filter(p => p._id !== deleteTarget._id));
      toast.success("Poster deleted!");
      setDeleteTarget(null);
    } catch (e: any) {
      toast.error(e.message || "Failed to delete poster");
    } finally {
      setDeleting(false);
    }
  }

  async function moveOrder(index: number, direction: "up" | "down") {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= posters.length) return;
    const updated = [...posters];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updated.forEach((p, i) => p.order = i);
    setPosters(updated);

    try {
      await Promise.all(updated.map(p =>
        fetch(`${BASE_URL}/api/posters/${p._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ image: p.image, link: p.link, title: p.title, description: p.description, linkedinLink: p.linkedinLink, facebookLink: p.facebookLink, order: p.order }),
        })
      ));
    } catch {
      toast.error("Failed to save order");
      loadPosters();
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Poster <span className="text-[#C3110C]">Management</span></h1>
          <p className="text-gray-500 text-xs mt-3 font-medium">
            Add, edit, reorder, and remove marketing posters. New posters trigger a newsletter email to subscribers.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-3 bg-[#C3110C] text-white text-sm font-bold rounded-lg hover:bg-[#a80f0b] transition-all shadow-lg shadow-[#C3110C]/30 hover:scale-[1.02] active:scale-95"
        >
          <Plus size={16} />
          Add New Poster
        </button>
      </div>

      <PosterList
        posters={posters}
        loading={loading}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
        onMoveOrder={moveOrder}
        onAddNew={openCreate}
      />

      {showForm && (
        <PosterForm
          formImage={formImage}
          formLink={formLink}
          formTitle={formTitle}
          formDescription={formDescription}
          formLinkedinLink={formLinkedinLink}
          formFacebookLink={formFacebookLink}
          formOrder={formOrder}
          editingId={editingId}
          saving={saving}
          onImageChange={setFormImage}
          onLinkChange={setFormLink}
          onTitleChange={setFormTitle}
          onDescriptionChange={setFormDescription}
          onLinkedinLinkChange={setFormLinkedinLink}
          onFacebookLinkChange={setFormFacebookLink}
          onOrderChange={setFormOrder}
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
