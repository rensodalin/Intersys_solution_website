import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Mail,
  Search,
  Send,
  Reply,
  Loader2,
  RefreshCw,
  Inbox,
  FileText,
  Phone,
  MapPin,
  Globe,
  Building2,
  SendHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { Conversation, ChatMessage, ContactItem, QuoteItem } from "./types";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 86400000 && d.getDate() === now.getDate()) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
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

export function ChatInbox() {
  const [activeTab, setActiveTab] = useState<"all" | "contact" | "chat" | "quote">("all");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollOnNextMessages = useRef(false);

  // Conversation state (for "all" and "chat" tabs)
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  // Contact state
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Quote state
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(null);
  const [loadingQuotes, setLoadingQuotes] = useState(false);

  // Polling refs
  const prevConversationsRef = useRef<Conversation[]>([]);
  const selectedEmailRef = useRef<string | null>(null);
  const firstPollDone = useRef(false);

  useEffect(() => {
    selectedEmailRef.current = selectedEmail;
  }, [selectedEmail]);

  // --- Fetch functions ---

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/chat/conversations`, { credentials: "include" });
      const json = await res.json();
      if (json.success) setConversations(json.data);
    } catch {
      toast.error("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (email: string) => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`${baseUrl}/api/chat/conversations/${encodeURIComponent(email)}`, { credentials: "include" });
      const json = await res.json();
      if (json.success) setMessages(json.data);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await fetch(`${baseUrl}/api/contacts`, { credentials: "include" });
      const json = await res.json();
      if (json.success) setContacts(json.data);
    } catch {
      toast.error("Failed to load contacts");
    } finally {
      setLoadingContacts(false);
    }
  };

  const fetchQuotes = async () => {
    setLoadingQuotes(true);
    try {
      const res = await fetch(`${baseUrl}/api/quotes/admin`, { credentials: "include" });
      const json = await res.json();
      if (json.success) setQuotes(json.data);
    } catch {
      toast.error("Failed to load quotes");
    } finally {
      setLoadingQuotes(false);
    }
  };

  const markConversationRead = async (email: string) => {
    try {
      await fetch(`${baseUrl}/api/chat/conversations/${encodeURIComponent(email)}/read`, {
        method: "PUT",
        credentials: "include",
      });
    } catch {}
  };

  // --- Handlers ---

  const handleSelectConversation = async (email: string) => {
    scrollOnNextMessages.current = true;
    setSelectedEmail(email);
    setReplyText("");
    setReplyingTo(null);
    await fetchMessages(email);
    await markConversationRead(email);
    setConversations(prev => prev.map(c =>
      c.email === email ? { ...c, unreadCount: 0 } : c
    ));
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedEmail) return;
    setSending(true);
    try {
      const conv = conversations.find(c => c.email === selectedEmail);
      let finalContent = replyText.trim();
      if (replyingTo) {
        const quoted = replyingTo.content.split("\n").map(l => `> ${l}`).join("\n");
        finalContent = `${finalContent}\n\n${quoted}`;
      }
      const res = await fetch(`${baseUrl}/api/chat/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: selectedEmail,
          name: conv?.name || selectedEmail,
          content: finalContent,
          subject: "Conversation with Intersys Solutions",
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Reply sent");
        setReplyText("");
        setReplyingTo(null);
        scrollOnNextMessages.current = true;
        await fetchMessages(selectedEmail);
      } else {
        toast.error(json.error || "Failed to send reply");
      }
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  // --- Effects ---

  useEffect(() => {
    if (activeTab === "all" || activeTab === "chat") {
      fetchConversations();
      setSelectedEmail(null);
      setMessages([]);
      setReplyText("");
      setReplyingTo(null);
    } else if (activeTab === "contact") {
      fetchContacts();
      setSelectedContact(null);
    } else if (activeTab === "quote") {
      fetchQuotes();
      setSelectedQuote(null);
    }
  }, [activeTab]);

  // Polling for conversations tab
  useEffect(() => {
    if (activeTab !== "all" && activeTab !== "chat") return;
    firstPollDone.current = false;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${baseUrl}/api/chat/conversations`, { credentials: "include" });
        const json = await res.json();
        if (!json.success) return;

        const curr: Conversation[] = json.data;

        if (!firstPollDone.current) {
          firstPollDone.current = true;
          prevConversationsRef.current = curr;
          setConversations(curr);
          const email = selectedEmailRef.current;
          if (email) {
            try {
              const r2 = await fetch(`${baseUrl}/api/chat/conversations/${encodeURIComponent(email)}`, { credentials: "include" });
              const j2 = await r2.json();
              if (j2.success) setMessages(j2.data);
            } catch {}
          }
          return;
        }

        setConversations(curr);
        prevConversationsRef.current = curr;

        const email = selectedEmailRef.current;
        if (email) {
          const conv = curr.find(c => c.email === email);
          if (conv) {
            try {
              const r2 = await fetch(`${baseUrl}/api/chat/conversations/${encodeURIComponent(email)}`, { credentials: "include" });
              const j2 = await r2.json();
              if (j2.success) setMessages(j2.data);
            } catch {}
          }
        }
      } catch {}
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    if (scrollOnNextMessages.current && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      scrollOnNextMessages.current = false;
    }
  }, [messages]);

  // --- Derived data ---

  const isConversationView = activeTab === "all" || activeTab === "chat";

  const filteredConversations = conversations.filter(c => {
    if (activeTab === "all") {
      // Show all
    } else if (activeTab === "chat") {
      if (!["chat", "client-reply"].includes(c.lastSource)) return false;
    }
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.phone && c.phone.toLowerCase().includes(q))
    );
  });

  const filteredContacts = contacts.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.phone && c.phone.toLowerCase().includes(q))
    );
  });

  const filteredQuotes = quotes.filter(q => {
    if (!search) return true;
    const qLower = search.toLowerCase();
    return (
      q.name.toLowerCase().includes(qLower) ||
      q.email.toLowerCase().includes(qLower) ||
      q.company.toLowerCase().includes(qLower) ||
      (q.phone && q.phone.toLowerCase().includes(qLower))
    );
  });

  const selectedConv = selectedEmail
    ? conversations.find(c => c.email === selectedEmail)
    : null;

  // --- Render helpers ---

  const renderSidebarList = () => {
    if (isConversationView) {
      if (loading) {
        return (
          <div className="flex flex-col items-center py-12 gap-2">
            <Loader2 className="animate-spin text-red-600" size={20} />
            <span className="text-xs text-gray-400">Loading...</span>
          </div>
        );
      }
      if (filteredConversations.length === 0) {
        return (
          <div className="flex flex-col items-center py-12 gap-2">
            <Inbox size={28} className="text-gray-300" />
            <p className="text-xs text-gray-400">No conversations yet</p>
          </div>
        );
      }
      return filteredConversations.map(conv => (
        <button
          key={conv._id}
          onClick={() => handleSelectConversation(conv.email)}
          className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-white transition cursor-pointer ${selectedEmail === conv.email ? "bg-white shadow-sm" : ""}`}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
              style={{ backgroundColor: getAvatarColor(conv.name) }}
            >
              {getInitials(conv.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 truncate">{conv.name}</span>
                <span className="text-[10px] text-gray-400 flex-shrink-0">{formatDate(conv.lastDate)}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {conv.unreadCount > 0 && (
                  <span className="bg-[#C3110C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {conv.unreadCount}
                  </span>
                )}
                <span className="text-[11px] text-gray-500 truncate">{conv.lastMessage}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {conv.lastSource === "quote" ? (
                  <FileText size={10} className="text-[#0D7C5E]" />
                ) : ["client-reply", "chat", "reply"].includes(conv.lastSource) ? (
                  <MessageSquare size={10} className="text-[#8B5CF6]" />
                ) : (
                  <Mail size={10} className="text-[#1B7B9E]" />
                )}
                <span className="text-[9px] text-gray-400">{conv.email}</span>
              </div>
            </div>
          </div>
        </button>
      ));
    }

    if (activeTab === "contact") {
      if (loadingContacts) {
        return (
          <div className="flex flex-col items-center py-12 gap-2">
            <Loader2 className="animate-spin text-red-600" size={20} />
            <span className="text-xs text-gray-400">Loading...</span>
          </div>
        );
      }
      if (filteredContacts.length === 0) {
        return (
          <div className="flex flex-col items-center py-12 gap-2">
            <Inbox size={28} className="text-gray-300" />
            <p className="text-xs text-gray-400">No contacts yet</p>
          </div>
        );
      }
      return filteredContacts.map(c => (
        <button
          key={c._id}
          onClick={() => setSelectedContact(c)}
          className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-white transition cursor-pointer ${selectedContact?._id === c._id ? "bg-white shadow-sm" : ""}`}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
              style={{ backgroundColor: getAvatarColor(c.name) }}
            >
              {getInitials(c.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 truncate">{c.name}</span>
                <span className="text-[10px] text-gray-400 flex-shrink-0">{formatDate(c.createdAt)}</span>
              </div>
              <span className="text-[11px] text-gray-500 truncate block mt-0.5">{c.message}</span>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-1">
                <span className="text-[9px] text-gray-400">{c.email}</span>
                {c.phone && (
                  <span className="flex items-center gap-0.5 text-[9px] text-gray-500">
                    <Phone size={9} className="text-gray-400" />
                    {c.phone}
                  </span>
                )}
                {(c.city || c.country) && (
                  <span className="flex items-center gap-0.5 text-[9px] text-gray-500">
                    <MapPin size={9} className="text-gray-400" />
                    {[c.city, c.country].filter(Boolean).join(", ")}
                  </span>
                )}
                {c.contactMethod && (
                  <span className={`text-[8px] font-bold px-1 py-0.5 rounded-sm ${
                    c.contactMethod.toLowerCase().includes("phone")
                      ? "bg-blue-50 text-blue-700"
                      : c.contactMethod.toLowerCase().includes("email")
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                  }`}>
                    {c.contactMethod}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ));
    }

    if (activeTab === "quote") {
      if (loadingQuotes) {
        return (
          <div className="flex flex-col items-center py-12 gap-2">
            <Loader2 className="animate-spin text-red-600" size={20} />
            <span className="text-xs text-gray-400">Loading...</span>
          </div>
        );
      }
      if (filteredQuotes.length === 0) {
        return (
          <div className="flex flex-col items-center py-12 gap-2">
            <Inbox size={28} className="text-gray-300" />
            <p className="text-xs text-gray-400">No quotes yet</p>
          </div>
        );
      }
      return filteredQuotes.map(q => (
        <button
          key={q._id}
          onClick={() => setSelectedQuote(q)}
          className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-white transition cursor-pointer ${selectedQuote?._id === q._id ? "bg-white shadow-sm" : ""}`}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
              style={{ backgroundColor: getAvatarColor(q.name) }}
            >
              {getInitials(q.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 truncate">{q.name}</span>
                <span className="text-[10px] text-gray-400 flex-shrink-0">{formatDate(q.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] text-gray-500 truncate">
                  <span className="font-bold text-[#0D7C5E]">{q.company}</span> — {q.title}
                </span>
              </div>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-1">
                <span className="text-[9px] text-gray-400">{q.email}</span>
                <span className={`text-[8px] font-bold px-1 py-0.5 rounded-sm ${
                  q.status === "Completed" ? "bg-green-50 text-green-700"
                  : q.status === "In Progress" ? "bg-blue-50 text-blue-700"
                  : "bg-gray-100 text-gray-600"
                }`}>{q.status}</span>
              </div>
            </div>
          </div>
        </button>
      ));
    }

    return null;
  };

  const renderRightPanel = () => {
    if (isConversationView) {
      if (!selectedConv) {
        return (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
            <MessageSquare size={40} className="text-gray-200" />
            <p className="text-sm font-semibold text-gray-500">Select a conversation</p>
            <p className="text-xs">Choose a conversation from the left to view messages</p>
          </div>
        );
      }

      return (
        <>
          <div className="px-6 py-4 border-b border-gray-150 bg-white flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0 mt-0.5"
              style={{ backgroundColor: getAvatarColor(selectedConv.name) }}
            >
              {getInitials(selectedConv.name)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-gray-900">{selectedConv.name}</h3>
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  {selectedConv.lastSource === "quote" ? <FileText size={10} /> : ["client-reply", "chat", "reply"].includes(selectedConv.lastSource) ? <MessageSquare size={10} /> : <Mail size={10} />}
                  {selectedConv.email}
                </span>
              </div>
              {selectedConv.hasContact === true && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px]">
                  {selectedConv.phone && (
                    <span className="flex items-center gap-1 text-gray-600">
                      <Phone size={11} className="text-gray-400" />
                      <a href={`tel:${selectedConv.phone}`} className="hover:text-[#C3110C]">{selectedConv.phone}</a>
                      <a
                        href={`https://t.me/+${selectedConv.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0088cc] hover:text-[#0077b5] flex items-center gap-0.5 ml-0.5"
                        title="Open in Telegram"
                      >
                        <SendHorizontal size={11} />
                      </a>
                    </span>
                  )}
                  {(selectedConv.city || selectedConv.country) && (
                    <span className="flex items-center gap-1 text-gray-500">
                      <MapPin size={11} className="text-gray-400" />
                      {[selectedConv.city, selectedConv.country].filter(Boolean).join(", ")}
                    </span>
                  )}
                  {selectedConv.prefers && (
                    <span className={`font-bold px-1.5 py-0.5 rounded-sm text-[9px] ${
                      selectedConv.prefers.toLowerCase().includes("phone")
                        ? "bg-blue-50 text-blue-700"
                        : selectedConv.prefers.toLowerCase().includes("email")
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                    }`}>
                      {selectedConv.prefers}
                    </span>
                  )}
                </div>
              )}
              {selectedConv.hasQuote === true && (
                <div className="mt-1.5 text-[11px] text-[#0D7C5E] flex items-center gap-1">
                  <FileText size={11} />
                  <span className="font-bold">Quote Request</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {loadingMessages ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-red-600" size={20} />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-400">No messages in this conversation</div>
            ) : (
              messages.map(msg => (
                <div key={msg._id} className={`flex ${msg.isFromAdmin ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-sm ${
                      msg.isFromAdmin
                        ? "bg-[#C3110C] text-white"
                        : "bg-gray-50 border border-gray-100 text-gray-800"
                    }`}
                  >
                    {!msg.isFromAdmin && (
                      <div className="flex items-center gap-1.5 p-3 pb-0">
                        {msg.source === "quote" ? (
                          <span className="text-[9px] font-bold text-[#0D7C5E] uppercase flex items-center gap-0.5">
                            <FileText size={10} /> Quote Request
                          </span>
                        ) : msg.source === "client-reply" || msg.source === "chat" ? (
                          <span className="text-[9px] font-bold text-[#8B5CF6] uppercase flex items-center gap-0.5">
                            <MessageSquare size={10} /> Follow-up
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-[#1B7B9E] uppercase flex items-center gap-0.5">
                            <Mail size={10} /> Contact Form
                          </span>
                        )}
                      </div>
                    )}

                    {msg.source === "contact" && (msg.phone || msg.contactMethod || msg.city) && (
                      <div className="px-3 pt-3 pb-2 space-y-1.5 border-b border-gray-200/50">
                        <div className="flex items-center gap-2 text-[11px] text-gray-600">
                          <Mail size={12} className="text-gray-400 flex-shrink-0" />
                          <a href={`mailto:${msg.email}`} className="hover:text-[#C3110C] underline">{msg.email}</a>
                        </div>
                        {msg.phone && (
                          <div className="flex items-center gap-2 text-[11px] text-gray-600">
                            <Phone size={12} className="text-gray-400 flex-shrink-0" />
                            <a href={`tel:${msg.phone}`} className="hover:text-[#C3110C]">{msg.phone}</a>
                            <a
                              href={`https://t.me/+${msg.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0088cc] hover:text-[#0077b5] flex items-center gap-0.5 ml-1"
                              title="Open in Telegram"
                            >
                              <SendHorizontal size={12} /> Telegram
                            </a>
                          </div>
                        )}
                        {msg.contactMethod && (
                          <div className="flex items-center gap-2 text-[11px]">
                            <Reply size={12} className="text-gray-400 flex-shrink-0" />
                            <span className="text-gray-500">Prefers:</span>
                            <span className={`font-bold px-1.5 py-0.5 rounded-sm text-[9px] ${
                              msg.contactMethod.toLowerCase().includes("phone")
                                ? "bg-blue-50 text-blue-700"
                                : msg.contactMethod.toLowerCase().includes("email")
                                  ? "bg-green-50 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}>
                              {msg.contactMethod}
                            </span>
                          </div>
                        )}
                        {(msg.city || msg.country) && (
                          <div className="flex items-center gap-2 text-[11px] text-gray-500">
                            <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                            <span>{[msg.city, msg.country].filter(Boolean).join(", ")}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {msg.source === "quote" && msg.company && (
                      <div className="px-3 pt-3 pb-2 space-y-1.5 border-b border-gray-200/50">
                        <div className="flex items-center gap-2 text-[11px] text-gray-600">
                          <Building2 size={12} className="text-gray-400 flex-shrink-0" />
                          <span className="font-bold text-gray-900">{msg.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-600">
                          <Mail size={12} className="text-gray-400 flex-shrink-0" />
                          <a href={`mailto:${msg.email}`} className="hover:text-[#C3110C] underline">{msg.email}</a>
                        </div>
                        {msg.phone && (
                          <div className="flex items-center gap-2 text-[11px] text-gray-600">
                            <Phone size={12} className="text-gray-400 flex-shrink-0" />
                            <a href={`tel:${msg.phone}`} className="hover:text-[#C3110C]">{msg.phone}</a>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-[11px] text-gray-600">
                          <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                          <span>{[msg.address, msg.city, msg.country].filter(Boolean).join(", ")}</span>
                        </div>
                        {msg.bmsSystem && (
                          <div className="flex items-center gap-2 text-[11px] text-gray-600">
                            <Globe size={12} className="text-gray-400 flex-shrink-0" />
                            <span className="font-medium">Platform: {msg.bmsSystem}</span>
                          </div>
                        )}
                        {msg.solutionCategories && msg.solutionCategories.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {msg.solutionCategories.map((cat, i) => (
                              <span key={i} className="bg-[#081F3D]/5 text-[#081F3D] text-[9px] font-bold px-1.5 py-0.5 rounded-sm">{cat}</span>
                            ))}
                          </div>
                        )}
                        {msg.products && msg.products.length > 0 && (
                          <div className="pt-1">
                            <div className="text-[10px] font-bold text-gray-500 mb-1">Products ({msg.products.length})</div>
                            <div className="space-y-1">
                              {msg.products.map((p, i) => (
                                <div key={i} className="flex items-center gap-2 text-[10px] bg-gray-100/50 rounded-sm px-2 py-1">
                                  <span className="font-bold text-red-600">{p.qty}x</span>
                                  <span className="font-bold text-[#081F3D]">{p.productNo}</span>
                                  <span className="text-gray-500 truncate flex-1">{p.description}</span>
                                  <span className="font-bold text-gray-900">${p.price.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {msg.otherBms && (
                          <div className="pt-1">
                            <div className="text-[10px] font-bold text-gray-500 mb-1">Details</div>
                            <p className="text-[10px] text-gray-600 bg-gray-50 rounded-sm px-2 py-1.5 whitespace-pre-wrap">{msg.otherBms}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="px-3 py-3">
                      <p className="text-xs whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>

                    <div className="flex items-center justify-between px-3 pb-3">
                      <p className={`text-[9px] ${msg.isFromAdmin ? "text-red-200" : "text-gray-400"}`}>
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                      {!msg.isFromAdmin && (
                        <button
                          onClick={() => setReplyingTo(replyingTo?._id === msg._id ? null : msg)}
                          className={`text-[9px] font-bold flex items-center gap-1 transition cursor-pointer ${
                            replyingTo?._id === msg._id
                              ? "text-[#C3110C]"
                              : "text-gray-400 hover:text-[#C3110C]"
                          }`}
                          title="Reply to this message"
                        >
                          <Reply size={10} />
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-6 py-4 border-t border-gray-150 bg-white">
            {replyingTo && (
              <div className="flex items-center justify-between bg-gray-100 rounded-sm px-3 py-2 mb-2 text-xs text-gray-600">
                <div className="flex items-center gap-2 min-w-0">
                  <Reply size={12} className="text-gray-400 flex-shrink-0" />
                  <span className="truncate font-medium">Replying to: {replyingTo.content.slice(0, 80)}{replyingTo.content.length > 80 ? "..." : ""}</span>
                </div>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="text-gray-400 hover:text-[#C3110C] ml-2 flex-shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder={replyingTo ? "Type your reply..." : "Type your reply..."}
                  rows={2}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply();
                    }
                  }}
                  className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-sm outline-none focus:border-[#C3110C] resize-none bg-gray-50"
                />
              </div>
              <button
                onClick={handleSendReply}
                disabled={!replyText.trim() || sending}
                className="px-5 py-2.5 bg-[#C3110C] text-white text-xs font-bold rounded-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer"
              >
                {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                Send
              </button>
            </div>
          </div>
        </>
      );
    }

    // Contact detail view
    if (activeTab === "contact") {
      if (!selectedContact) {
        return (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
            <Mail size={40} className="text-gray-200" />
            <p className="text-sm font-semibold text-gray-500">Select a contact</p>
            <p className="text-xs">Choose a contact from the left to view details</p>
          </div>
        );
      }

      const c = selectedContact;
      return (
        <div className="flex-1 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-150 bg-white flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0 mt-0.5"
              style={{ backgroundColor: getAvatarColor(c.name) }}
            >
              {getInitials(c.name)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-gray-900">{c.name}</h3>
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <Mail size={10} />
                {c.email}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px]">
                {c.phone && (
                  <span className="flex items-center gap-1 text-gray-600">
                    <Phone size={11} className="text-gray-400" />
                    <a href={`tel:${c.phone}`} className="hover:text-[#C3110C]">{c.phone}</a>
                    <a
                      href={`https://t.me/+${c.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0088cc] hover:text-[#0077b5] flex items-center gap-0.5 ml-0.5"
                      title="Open in Telegram"
                    >
                      <SendHorizontal size={11} />
                    </a>
                  </span>
                )}
                {(c.city || c.country) && (
                  <span className="flex items-center gap-1 text-gray-500">
                    <MapPin size={11} className="text-gray-400" />
                    {[c.city, c.country].filter(Boolean).join(", ")}
                  </span>
                )}
                {c.contactMethod && (
                  <span className={`font-bold px-1.5 py-0.5 rounded-sm text-[9px] ${
                    c.contactMethod.toLowerCase().includes("phone")
                      ? "bg-blue-50 text-blue-700"
                      : c.contactMethod.toLowerCase().includes("email")
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                  }`}>
                    {c.contactMethod}
                  </span>
                )}
                <span className={`font-bold px-1.5 py-0.5 rounded-sm text-[9px] ${
                  c.status === "replied" ? "bg-green-50 text-green-700"
                  : c.status === "read" ? "bg-blue-50 text-blue-700"
                  : "bg-gray-100 text-gray-600"
                }`}>
                  {c.status}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">{new Date(c.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="bg-gray-50 border border-gray-100 rounded-sm p-4">
              <p className="text-xs whitespace-pre-wrap leading-relaxed text-gray-800">{c.message}</p>
            </div>
          </div>
        </div>
      );
    }

    // Quote detail view
    if (activeTab === "quote") {
      if (!selectedQuote) {
        return (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
            <FileText size={40} className="text-gray-200" />
            <p className="text-sm font-semibold text-gray-500">Select a quote</p>
            <p className="text-xs">Choose a quote from the left to view details</p>
          </div>
        );
      }

      const q = selectedQuote;
      return (
        <div className="flex-1 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-150 bg-white flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0 mt-0.5"
              style={{ backgroundColor: getAvatarColor(q.name) }}
            >
              {getInitials(q.name)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-gray-900">{q.name}</h3>
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <Building2 size={10} className="text-[#0D7C5E]" />
                <span className="font-bold text-[#0D7C5E]">{q.company}</span>
                <span>— {q.title}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px]">
                <span className="flex items-center gap-1 text-gray-600">
                  <Mail size={11} className="text-gray-400" />
                  <a href={`mailto:${q.email}`} className="hover:text-[#C3110C] underline">{q.email}</a>
                </span>
                {q.phone && (
                  <span className="flex items-center gap-1 text-gray-600">
                    <Phone size={11} className="text-gray-400" />
                    <a href={`tel:${q.phone}`} className="hover:text-[#C3110C]">{q.phone}</a>
                  </span>
                )}
                {(q.city || q.country) && (
                  <span className="flex items-center gap-1 text-gray-500">
                    <MapPin size={11} className="text-gray-400" />
                    {[q.address, q.city, q.country].filter(Boolean).join(", ")}
                  </span>
                )}
                <span className={`font-bold px-1.5 py-0.5 rounded-sm text-[9px] ${
                  q.status === "Completed" ? "bg-green-50 text-green-700"
                  : q.status === "In Progress" ? "bg-blue-50 text-blue-700"
                  : "bg-gray-100 text-gray-600"
                }`}>
                  {q.status}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">{new Date(q.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {q.solutionCategories && q.solutionCategories.length > 0 && (
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 mb-1.5">Solutions</h4>
                <div className="flex flex-wrap gap-1">
                  {q.solutionCategories.map((cat, i) => (
                    <span key={i} className="bg-[#081F3D]/5 text-[#081F3D] text-[10px] font-bold px-2 py-1 rounded-sm">{cat}</span>
                  ))}
                </div>
              </div>
            )}

            {q.bmsSystem && (
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 mb-1">BMS System</h4>
                <p className="text-xs font-medium text-gray-800">{q.bmsSystem}</p>
              </div>
            )}

            {q.otherBms && (
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 mb-1">Additional Details</h4>
                <p className="text-xs text-gray-600 bg-gray-50 rounded-sm px-3 py-2 whitespace-pre-wrap">{q.otherBms}</p>
              </div>
            )}

            {q.products && q.products.length > 0 && (
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 mb-1.5">Products ({q.products.length})</h4>
                <div className="space-y-1.5">
                  {q.products.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs bg-gray-50/50 rounded-sm px-3 py-2">
                      <span className="font-bold text-red-600">{p.qty}x</span>
                      <span className="font-bold text-[#081F3D]">{p.productNo}</span>
                      <span className="text-gray-500 truncate flex-1">{p.description}</span>
                      <span className="text-gray-400 text-[10px] hidden sm:inline">{p.application}</span>
                      <span className="font-bold text-gray-900">${p.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {q.sections && q.sections.length > 0 && (
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 mb-1.5">Sections</h4>
                <div className="flex flex-wrap gap-1">
                  {q.sections.map((s, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-sm">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white rounded-sm border border-gray-150 shadow-sm overflow-hidden">
      <div className="w-80 flex-shrink-0 border-r border-gray-150 flex flex-col bg-gray-50/30">
        <div className="p-4 border-b border-gray-150">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black text-[#081F3D] capitalize">{activeTab === "all" ? "Inbox" : `${activeTab}s`}</h2>
            <button
              onClick={() => {
                if (isConversationView) fetchConversations();
                else if (activeTab === "contact") fetchContacts();
                else if (activeTab === "quote") fetchQuotes();
              }}
              className="p-1.5 text-gray-400 hover:text-[#081F3D] rounded-sm hover:bg-gray-100 transition cursor-pointer"
              title="Refresh"
            >
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-sm outline-none focus:border-[#C3110C] bg-white"
            />
          </div>
          <div className="flex gap-1 mt-2">
            {(["all", "contact", "chat", "quote"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearch(""); }}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-sm cursor-pointer transition capitalize ${
                  activeTab === tab
                    ? "bg-[#C3110C] text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {renderSidebarList()}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {renderRightPanel()}
      </div>
    </div>
  );
}
