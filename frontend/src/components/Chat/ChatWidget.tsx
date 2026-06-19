import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, ChevronLeft, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import environment from "@/enviroment/enviroment";

interface LocalMessage {
  id: string;
  content: string;
  isFromAdmin: boolean;
  name: string;
  createdAt: Date;
  attachment?: { url: string; name: string } | null;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [view, setView] = useState<"form" | "conversation">("form");
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [conversationEmail, setConversationEmail] = useState<string | null>(null);
  const [conversationName, setConversationName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);
  const [loadingConv, setLoadingConv] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const isProductPage = location.pathname.startsWith("/products");
  const baseUrl = environment;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && !formData.name) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isOpen || view !== "conversation" || !conversationEmail) return;
    const interval = setInterval(() => {
      fetchServerMessages(conversationEmail);
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen, view, conversationEmail]);

  const checkExistingConversation = useCallback(async (email: string) => {
    if (!email || !email.includes("@")) {
      setIsReturning(false);
      return;
    }
    setCheckingEmail(true);
    try {
      const res = await fetch(`${baseUrl}/api/chat/check-conversation/${encodeURIComponent(email)}`);
      const json = await res.json();
      setIsReturning(json.exists);
    } catch {
      setIsReturning(false);
    } finally {
      setCheckingEmail(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.email) checkExistingConversation(formData.email);
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.email, checkExistingConversation]);

  useEffect(() => {
    if (isReturning && formData.email) {
      setConversationEmail(formData.email);
      setConversationName(formData.name || formData.email);
      setView("conversation");
      setIsReturning(false);
      fetchServerMessages(formData.email);
    }
  }, [isReturning]);

  const fetchServerMessages = async (email: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/chat/public-messages/${encodeURIComponent(email)}`);
      const json = await res.json();
      if (json.success) {
        const serverMsgs: LocalMessage[] = json.data.map((m: any) => ({
          id: m._id,
          content: m.content,
          isFromAdmin: m.isFromAdmin,
          name: m.name,
          createdAt: new Date(m.createdAt),
          attachment: m.attachment || null
        }));
        setMessages(serverMsgs);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${baseUrl}/api/chat/client-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          content: formData.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setConversationEmail(formData.email);
        setConversationName(formData.name);
        setView("conversation");
        setFormData({ name: formData.name, email: formData.email, message: "" });
        setIsReturning(false);
        setTimeout(() => fetchServerMessages(formData.email), 500);
      }
    } catch (err) {
      console.error("Chat Widget Submit Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversationEmail || sendingMsg) return;
    setSendingMsg(true);
    const text = newMessage.trim();
    setNewMessage("");
    try {
      const res = await fetch(`${baseUrl}/api/chat/client-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: conversationName,
          email: conversationEmail,
          content: text
        })
      });
      const data = await res.json();
      if (data.success) {
        setTimeout(() => fetchServerMessages(conversationEmail), 500);
      }
    } catch (err) {
      console.error("Failed to send follow-up:", err);
    } finally {
      setSendingMsg(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (conversationEmail) {
      setLoadingConv(true);
      fetchServerMessages(conversationEmail).finally(() => setLoadingConv(false));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setView(conversationEmail ? "conversation" : "form");
  };

  const handleBack = () => {
    setView("form");
  };

  function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className={cn("fixed bottom-6 z-50", isProductPage ? "left-[312px]" : "left-6")}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 w-[340px] bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
          >
            <div className="bg-[#081F3D] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 min-w-0">
                {view === "conversation" && (
                  <button onClick={handleBack} className="text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0">
                    <ChevronLeft size={18} />
                  </button>
                )}
                <div className="min-w-0">
                  <h3 className="font-bold text-sm truncate">
                    {view === "conversation" ? conversationName : "Contact Support"}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {view === "conversation" ? conversationEmail : "Leave us a message"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {view === "form" ? (
              <div className="p-5 bg-white">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Name <span className="text-[#C3110C]">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm outline-none focus:border-[#C3110C] transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Email <span className="text-[#C3110C]">*</span></label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm outline-none focus:border-[#C3110C] transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  {(isReturning || checkingEmail) && (
                    <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-sm text-[10px] font-medium ${checkingEmail ? "bg-gray-50 text-gray-400" : "bg-blue-50 text-blue-700"}`}>
                      {checkingEmail ? (
                        <>Checking...</>
                      ) : (
                        <><MessageCircle size={10} /> Continuing existing conversation — your message will be added as a follow-up.</>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Message <span className="text-[#C3110C]">*</span></label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we help you today?"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm outline-none focus:border-[#C3110C] transition-colors resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C3110C] text-white font-bold text-sm py-2.5 rounded-sm hover:bg-red-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send size={14} />}
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col min-h-0" style={{ maxHeight: "400px" }}>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/50">
                  {loadingConv ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="animate-spin text-[#C3110C]" size={20} />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-8 text-xs text-gray-400">No messages yet</div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isFromAdmin ? "justify-start" : "justify-end"}`}>
                        <div
                          className={`max-w-[85%] rounded-lg px-3 py-2 text-xs ${
                            msg.isFromAdmin
                              ? "bg-gray-200 text-gray-800 rounded-bl-none"
                              : "bg-[#C3110C] text-white rounded-br-none"
                          }`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                            {msg.attachment && (
                              <>{" "}<a
                                href={`${baseUrl}${msg.attachment.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`underline font-semibold ${msg.isFromAdmin ? "text-gray-600" : "text-red-200"}`}
                              >{msg.attachment.name}</a></>
                            )}
                          </p>
                          <p className={`text-[9px] mt-1 ${msg.isFromAdmin ? "text-gray-500" : "text-red-200"}`}>
                            {msg.isFromAdmin ? "Admin" : "You"} · {formatTime(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {sendingMsg && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 rounded-lg px-3 py-2 rounded-bl-none">
                        <Loader2 size={14} className="animate-spin text-gray-500" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="px-4 py-3 border-t border-gray-150 bg-white flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-sm outline-none focus:border-[#C3110C] transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || sendingMsg}
                    className="p-2 bg-[#C3110C] text-white rounded-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={isOpen ? handleClose : handleOpen}
        className="w-14 h-14 bg-[#111FA2] hover:bg-[#D62828] text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
