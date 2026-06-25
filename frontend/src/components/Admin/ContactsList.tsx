import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageSquare, Eye, Loader2, Inbox, ChevronLeft, Trash2 } from "lucide-react";
import { ContactItem } from "./types";
import { toast } from "sonner";
import environment from "@/enviroment/enviroment";

const baseUrl = environment;

interface ContactsListProps {
  contacts: ContactItem[];
  loading: boolean;
  onRefresh: () => void;
  highlightContactId?: string | null;
  onHighlightConsumed?: () => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

const avatarColors = [
  "#1A3263", "#C3110C", "#0D7C5E", "#B85C1A",
  "#6C3483", "#1B7B9E", "#A04000", "#2E86C1",
  "#7D3C98", "#1E8449", "#D35400", "#2471A3",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function ContactDetail({ contact, onBack }: { contact: ContactItem; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#081F3D] transition cursor-pointer"
      >
        <ChevronLeft size={14} />
        Back to Contacts
      </button>

      <div className="bg-gradient-to-r from-[#081F3D] to-[#1A3263] rounded-sm p-6 text-white">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg text-white flex-shrink-0"
            style={{ backgroundColor: getAvatarColor(contact.name) }}
          >
            {getInitials(contact.name)}
          </div>
          <div>
            <h2 className="text-lg font-black">{contact.name}</h2>
            <p className="text-xs text-white/70 mt-0.5">{formatDate(contact.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-150 rounded-sm p-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h3>
          <div className="space-y-3">
            {contact.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gray-400 flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-xs text-[#C3110C] hover:underline">{contact.email}</a>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gray-400 flex-shrink-0" />
                <a href={`https://t.me/+${contact.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#C3110C] hover:underline">{contact.phone}</a>
              </div>
            )}
            {contact.contactMethod && (
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-800">Preferred: {contact.contactMethod}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-150 rounded-sm p-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Location</h3>
          <div className="space-y-3">
            {(contact.city || contact.country) ? (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-800">{[contact.city, contact.country].filter(Boolean).join(", ")}</span>
              </div>
            ) : (
              <span className="text-xs text-gray-400">Not provided</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-150 rounded-sm p-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Message</h3>
        <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
      </div>

    </div>
  );
}

export function ContactsList({ contacts, loading, onRefresh, highlightContactId, onHighlightConsumed }: ContactsListProps) {
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [filterDay, setFilterDay] = useState<string>("");

  useEffect(() => {
    if (highlightContactId) {
      const contact = contacts.find(c => c._id === highlightContactId);
      if (contact) {
        setSelectedContact(contact);
        onHighlightConsumed?.();
      }
    }
  }, [highlightContactId, contacts]);

  const years = [...new Set(contacts.map(c => new Date(c.createdAt).getFullYear()))].sort((a, b) => b - a);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/contacts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Contact deleted");
        if (selectedContact?._id === id) setSelectedContact(null);
        onRefresh();
      } else {
        toast.error(json.error || "Failed to delete");
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  const daysInMonth = filterMonth && filterYear
    ? new Date(Number(filterYear), Number(filterMonth), 0).getDate()
    : 31;

  const clearDateFilter = () => {
    setFilterMonth("");
    setFilterYear("");
    setFilterDay("");
  };

  const filtered = contacts.filter(c => {
    if (filterYear) {
      const year = new Date(c.createdAt).getFullYear().toString();
      if (year !== filterYear) return false;
    }
    if (filterMonth) {
      const month = (new Date(c.createdAt).getMonth() + 1).toString();
      if (month !== filterMonth) return false;
    }
    if (filterDay) {
      const day = new Date(c.createdAt).getDate().toString();
      if (day !== filterDay) return false;
    }
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phone && c.phone.toLowerCase().includes(q))
    );
  });

  if (selectedContact) {
    return <ContactDetail contact={selectedContact} onBack={() => setSelectedContact(null)} />;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-150 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-150">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-black text-[#081F3D]">Contact Submissions</h2>
            <span className="bg-[#081F3D]/10 text-[#081F3D] text-[10px] font-bold px-2 py-0.5 rounded-sm">{contacts.length}</span>
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64 pl-3 pr-3 py-2 text-xs border border-gray-200 rounded-sm outline-none focus:border-[#C3110C]"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterMonth}
            onChange={e => setFilterMonth(e.target.value)}
            className="text-xs border border-gray-200 rounded-sm px-3 py-1.5 outline-none focus:border-[#C3110C] bg-white text-gray-700"
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select
            value={filterYear}
            onChange={e => { setFilterYear(e.target.value); setFilterDay(""); }}
            className="text-xs border border-gray-200 rounded-sm px-3 py-1.5 outline-none focus:border-[#C3110C] bg-white text-gray-700"
          >
            <option value="">All Years</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            value={filterDay}
            onChange={e => setFilterDay(e.target.value)}
            className="text-xs border border-gray-200 rounded-sm px-3 py-1.5 outline-none focus:border-[#C3110C] bg-white text-gray-700"
          >
            <option value="">All Days</option>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {(filterMonth || filterYear || filterDay) && (
            <button
              onClick={clearDateFilter}
              className="text-xs text-[#C3110C] hover:underline font-medium cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-20 gap-3">
          <Loader2 className="animate-spin text-red-600 w-10 h-10" />
          <span className="text-xs text-gray-500 font-medium">Loading contacts...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Inbox className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-semibold text-sm">No contact submissions found</p>
          <p className="text-gray-400 text-xs mt-1">
            {search || filterMonth || filterYear || filterDay ? "No results matching your filters." : "Contact form submissions will appear here."}
          </p>
        </div>
      ) : (
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-150 text-xs text-gray-400 font-bold bg-gray-50/50">
              <th className="px-6 py-4">Name & Date</th>
              <th className="px-6 py-4">Contact Info</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Preferred Contact</th>
              <th className="px-6 py-4">Message Preview</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(contact => (
              <tr
                key={contact._id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 text-sm text-gray-700 transition"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
                      style={{ backgroundColor: getAvatarColor(contact.name) }}
                    >
                      {getInitials(contact.name)}
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">{contact.name}</span>
                      <span className="text-[10px] text-gray-400">{formatDate(contact.createdAt)}</span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="block text-xs text-[#C3110C] hover:underline" title={contact.email}>{contact.email}</a>
                  )}
                  {contact.phone && (
                    <a href={`https://t.me/+${contact.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="block text-[11px] text-[#C3110C] hover:underline mt-0.5">{contact.phone}</a>
                  )}
                </td>

                <td className="px-6 py-4">
                  <span className="text-xs text-gray-600">
                    {[contact.city, contact.country].filter(Boolean).join(", ") || "—"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-xs text-gray-600">{contact.contactMethod || "—"}</span>
                </td>

                <td className="px-6 py-4 max-w-[250px]">
                  <span className="text-xs text-gray-500 block truncate">{contact.message}</span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="p-2 text-gray-400 hover:text-[#081F3D] hover:bg-gray-100 rounded-sm cursor-pointer transition"
                      title="View Details"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm cursor-pointer transition"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
