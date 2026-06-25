import { useEffect, useRef, useState } from "react";
import { MessageSquare, Search, Send, Reply, Loader2, RefreshCw, Inbox, Paperclip, FileText, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Conversation, ChatMessage } from "./types";
import environment from "@/enviroment/enviroment";

const baseUrl = environment;

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
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollOnNextMessages = useRef(false);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedEmailRef = useRef<string | null>(null);

  useEffect(() => {
    selectedEmailRef.current = selectedEmail;
  }, [selectedEmail]);

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

  const markConversationRead = async (email: string) => {
    try {
      await fetch(`${baseUrl}/api/chat/conversations/${encodeURIComponent(email)}/read`, {
        method: "PUT",
        credentials: "include",
      });
    } catch {}
  };

  const handleSelectConversation = async (email: string) => {
    scrollOnNextMessages.current = true;
    setSelectedEmail(email);
    setReplyText("");
    setReplyingTo(null);
    setSelectedFile(null);
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

  const handleFileUpload = async () => {
    if (!selectedFile || !selectedEmail) return;
    setUploading(true);
    try {
      const conv = conversations.find(c => c.email === selectedEmail);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("email", selectedEmail);
      formData.append("name", conv?.name || selectedEmail);
      if (replyText.trim()) {
        formData.append("content", replyText.trim());
      }
      const res = await fetch(`${baseUrl}/api/chat/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        toast.success("File sent");
        setSelectedFile(null);
        setReplyText("");
        scrollOnNextMessages.current = true;
        await fetchMessages(selectedEmail);
      } else {
        toast.error(json.error || "Failed to upload file");
      }
    } catch {
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    setSelectedEmail(null);
    setMessages([]);
    setReplyText("");
    setReplyingTo(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${baseUrl}/api/chat/conversations`, { credentials: "include" });
        const json = await res.json();
        if (!json.success) return;
        setConversations(json.data);

        const email = selectedEmailRef.current;
        if (email) {
          const conv = json.data.find((c: Conversation) => c.email === email);
          if (conv) {
            const r2 = await fetch(`${baseUrl}/api/chat/conversations/${encodeURIComponent(email)}`, { credentials: "include" });
            const j2 = await r2.json();
            if (j2.success) setMessages(j2.data);
          }
        }
      } catch {}
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollOnNextMessages.current && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      scrollOnNextMessages.current = false;
    }
  }, [messages]);

  const handleDeleteConversation = async (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Delete this entire conversation? This cannot be undone.")) return;
    try {
      const res = await fetch(`${baseUrl}/api/chat/conversations/${encodeURIComponent(email)}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Conversation deleted");
        if (selectedEmail === email) {
          setSelectedEmail(null);
          setMessages([]);
        }
        setConversations(prev => prev.filter(c => c.email !== email));
      } else {
        toast.error(json.error || "Failed to delete conversation");
      }
    } catch {
      toast.error("Failed to delete conversation");
    }
  };

  const filteredConversations = conversations
    .filter(c => ["chat", "client-reply"].includes(c.lastSource))
    .filter(c => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone && c.phone.toLowerCase().includes(q))
      );
    });

  const selectedConv = selectedEmail
    ? conversations.find(c => c.email === selectedEmail)
    : null;

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white rounded-sm border border-gray-150 shadow-sm overflow-hidden">
      <div className="w-80 flex-shrink-0 border-r border-gray-150 flex flex-col bg-gray-50/30">
        <div className="p-4 border-b border-gray-150">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black text-[#081F3D]">Chat Inbox</h2>
            <button
              onClick={fetchConversations}
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
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center py-12 gap-2">
              <Loader2 className="animate-spin text-red-600" size={20} />
              <span className="text-xs text-gray-400">Loading...</span>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center py-12 gap-2">
              <Inbox size={28} className="text-gray-300" />
              <p className="text-xs text-gray-400">No chat conversations yet</p>
            </div>
          ) : (
            filteredConversations.map(conv => (
              <button
                key={conv._id}
                onClick={() => handleSelectConversation(conv.email)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-white transition cursor-pointer group ${selectedEmail === conv.email ? "bg-white shadow-sm" : ""}`}
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
                      <MessageSquare size={10} className="text-[#8B5CF6]" />
                      <span className="text-[9px] text-gray-400">{conv.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDeleteConversation(conv.email, e)}
                    className="p-1 text-gray-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition cursor-pointer flex-shrink-0 mt-1"
                    title="Delete conversation"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {!selectedConv ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
            <MessageSquare size={40} className="text-gray-200" />
            <p className="text-sm font-semibold text-gray-500">Select a conversation</p>
            <p className="text-xs">Choose a conversation from the left to view messages</p>
          </div>
        ) : (
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
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <MessageSquare size={10} className="text-[#8B5CF6]" />
                  {selectedConv.email}
                </div>
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
                      <div className="px-3 py-3">
                        <p className="text-xs whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                          {msg.attachment && (
                            <>
                              {" "}<a
                                href={`${baseUrl}${msg.attachment.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`underline font-semibold ${msg.isFromAdmin ? "text-red-200" : "text-blue-600"}`}
                              >{msg.attachment.name}</a>
                            </>
                          )}
                        </p>
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
              {selectedFile && (
                <div className="flex items-center justify-between bg-gray-100 rounded-sm px-3 py-2 mb-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText size={12} className="text-[#C3110C] flex-shrink-0" />
                    <span className="truncate">{selectedFile.name}</span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">
                      ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-gray-400 hover:text-[#C3110C] ml-2 flex-shrink-0 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <div className="flex items-end gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-3 py-2.5 text-gray-400 hover:text-[#C3110C] hover:bg-gray-100 rounded-sm transition cursor-pointer disabled:opacity-40"
                  title="Attach file"
                >
                  <Paperclip size={16} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 10 * 1024 * 1024) {
                        toast.error("File size must be under 10MB");
                        return;
                      }
                      setSelectedFile(file);
                    }
                    e.target.value = "";
                  }}
                />
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder={selectedFile ? "Add a message (optional)..." : "Type your reply..."}
                    rows={2}
                    onKeyDown={e => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (selectedFile) {
                          handleFileUpload();
                        } else if (replyText.trim()) {
                          handleSendReply();
                        }
                      }
                    }}
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-sm outline-none focus:border-[#C3110C] resize-none bg-gray-50"
                  />
                </div>
                {selectedFile ? (
                  <button
                    onClick={handleFileUpload}
                    disabled={uploading}
                    className="px-5 py-2.5 bg-[#C3110C] text-white text-xs font-bold rounded-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer"
                  >
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Paperclip size={14} />}
                    Send File
                  </button>
                ) : (
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim() || sending}
                    className="px-5 py-2.5 bg-[#C3110C] text-white text-xs font-bold rounded-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer"
                  >
                    {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    Send
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
