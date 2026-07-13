import Message from "../model/message.js";
import Contact from "../model/contact.js";
import Quote from "../model/quote.js";
import { getIO } from "../socket/socket.js";

export const debug = async (req, res) => {
  try {
    const contactsRaw = await Contact.find({}).lean();
    const firstFew = contactsRaw.slice(0, 3).map(c => ({ name: c.name, email: c.email, phone: c.phone, message: c.message?.slice(0, 50) }));
    res.json({ totalContacts: contactsRaw.length, sampleContacts: firstFew, emails: contactsRaw.map(c => c.email) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const testTelegram = async (req, res) => {
  try {
    const { sendTelegramNotification } = await import("../utils/telegram.js");
    await sendTelegramNotification("<b>✅ Test</b>\n\nIf you see this, Telegram is working!");
    res.json({ success: true, message: "Test message sent" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const [messages, unreadGroups] = await Promise.all([
      Message.find({ source: "client-reply" }).sort({ createdAt: -1 }).lean(),
      Message.aggregate([
        { $match: { isFromAdmin: false, read: false, source: "client-reply" } },
        { $group: { _id: "$email", count: { $sum: 1 } } }
      ])
    ]);

    const unreadMap = {};
    for (const u of unreadGroups) { unreadMap[u._id] = u.count; }

    const byEmail = {};

    for (const m of messages) {
      const email = (m.email || "").trim() || "unknown";
      if (!byEmail[email] || new Date(m.createdAt) > new Date(byEmail[email].lastDate)) {
        byEmail[email] = {
          _id: email, email, name: m.name || email,
          lastMessage: m.content || "(no message)", lastDate: m.createdAt,
          lastSource: "chat", count: 0,
          unreadCount: unreadMap[email] || 0,
          hasContact: false,
          hasQuote: false,
          phone: "",
          hasPhone: false,
          prefers: "",
          city: "",
          country: ""
        };
      }
    }

    const result = Object.values(byEmail).sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate));
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    res.status(500).json({ success: false, error: "Failed to fetch conversations" });
  }
};

export const getConversationDetail = async (req, res) => {
  try {
    const email = req.params.email;
    const messages = await Message.find({
      email,
      source: { $in: ["client-reply", "reply"] }
    }).sort({ createdAt: 1 }).lean();

    const mapped = messages.map(m => ({
      _id: m._id.toString(), email: m.email, name: m.name,
      content: m.content, source: m.source,
      isFromAdmin: m.isFromAdmin, read: m.read, createdAt: m.createdAt,
      attachment: m.attachment || null
    }));

    res.json({ success: true, data: mapped });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
};

export const reply = async (req, res) => {
  try {
    const { email, name, content, subject } = req.body;
    if (!email || !content) {
      return res.status(400).json({ success: false, error: "Email and content are required" });
    }

    const message = new Message({
      email, name: name || email, subject: subject || "Conversation with Intersys Solutions",
      content, source: "reply", isFromAdmin: true, read: true
    });
    await message.save();

    try {
      const io = getIO();
      io.to(email).emit("new-message", message);
    } catch (e) {
      console.error("[socket] Failed to emit admin reply:", e.message);
    }

    res.json({ success: true, data: message });
  } catch (error) {
    console.error("Failed to send reply:", error);
    res.status(500).json({ success: false, error: "Failed to send reply" });
  }
};

export const checkConversation = async (req, res) => {
  try {
    const email = req.params.email;
    const exists = await Message.exists({ email, source: "client-reply" });
    res.json({ success: true, exists: !!exists });
  } catch (error) {
    res.status(500).json({ success: false, exists: false });
  }
};

export const getPublicMessages = async (req, res) => {
  try {
    const email = req.params.email;
    const messages = await Message.find({
      email,
      source: { $in: ["client-reply", "reply"] }
    }).sort({ createdAt: 1 }).lean();
    const mapped = messages.map(m => ({
      _id: m._id.toString(), email: m.email, name: m.name,
      content: m.content, source: m.source,
      isFromAdmin: m.isFromAdmin, createdAt: m.createdAt,
      attachment: m.attachment || null
    }));
    res.json({ success: true, data: mapped });
  } catch (error) {
    console.error("Failed to fetch public messages:", error);
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
};

export const clientMessage = async (req, res) => {
  try {
    const { email, name, content, subject } = req.body;
    if (!email || !content || !name) {
      return res.status(400).json({ success: false, error: "Email, name, and content are required" });
    }

    const existingCount = await Message.countDocuments({ email, source: "client-reply" });
    const isNewConversation = existingCount === 0;

    const message = new Message({
      email, name, subject: subject || "Follow-up message",
      content, source: "client-reply", isFromAdmin: false, read: false
    });
    await message.save();

    let botMessage = null;
    if (isNewConversation) {
      botMessage = new Message({
        email, name: "Intersys Bot",
        subject: "Welcome to Intersys Solutions",
        content: `Hi 👋 Welcome to our website! How can I help you today?\nPlease wait a moment while our support team gets back to you.`,
        source: "reply", isFromAdmin: true, read: true
      });
      await botMessage.save();
    }

    try {
      const io = getIO();
      io.to(email).emit("new-message", message);
      if (botMessage) {
        io.to(email).emit("new-message", botMessage);
      }
      io.to("admin").emit("admin-notification", { email, name, content, createdAt: message.createdAt });
    } catch (e) {
      console.error("[socket] Failed to emit client message:", e.message);
    }

    res.json({ success: true, data: message });
  } catch (error) {
    console.error("Failed to save client message:", error);
    res.status(500).json({ success: false, error: "Failed to save message" });
  }
};

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }
    const { email, name, content } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    const fileUrl = `/uploads/chat/${req.file.filename}`;

    const message = new Message({
      email,
      name: name || email,
      content: content || `Sent a file: ${req.file.originalname}`,
      source: "reply",
      isFromAdmin: true,
      read: true,
      attachment: {
        url: fileUrl,
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype,
      },
    });
    await message.save();

    try {
      const io = getIO();
      io.to(email).emit("new-message", message);
    } catch (e) {
      console.error("[socket] Failed to emit file upload:", e.message);
    }

    res.json({ success: true, data: message });
  } catch (error) {
    console.error("Failed to upload file:", error);
    res.status(500).json({ success: false, error: "Failed to upload file" });
  }
};

export const markRead = async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (error) {
    console.error("Failed to mark as read:", error);
    res.status(500).json({ success: false, error: "Failed to mark as read" });
  }
};

export const markConversationRead = async (req, res) => {
  try {
    await Message.updateMany(
      { email: req.params.email, isFromAdmin: false, read: false },
      { read: true }
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Failed to mark conversation as read:", error);
    res.status(500).json({ success: false, error: "Failed to mark conversation as read" });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const email = req.params.email;
    await Message.deleteMany({ email });
    res.json({ success: true, message: "Conversation deleted" });
  } catch (error) {
    console.error("Failed to delete conversation:", error);
    res.status(500).json({ success: false, error: "Failed to delete conversation" });
  }
};

export const migrate = async (req, res) => {
  try {
    const [contacts, quotes] = await Promise.all([
      Contact.find({}),
      Quote.find({})
    ]);

    let imported = 0;
    for (const c of contacts) {
      const exists = await Message.findOne({ source: "contact", sourceId: c._id });
      if (!exists) {
        await Message.create({
          email: c.email || "unknown@intersys.com", name: c.name,
          subject: `Contact Request - ${c.name}`, content: c.message,
          source: "contact", sourceId: c._id, isFromAdmin: false, read: false
        });
        imported++;
      }
    }

    for (const q of quotes) {
      const exists = await Message.findOne({ source: "quote", sourceId: q._id });
      if (!exists) {
        const productSummary = (q.products || []).map(p => `${p.qty}x ${p.productNo}`).join(", ");
        await Message.create({
          email: q.email, name: q.name, subject: `Quote Request - ${q.company}`,
          content: `Quote request from ${q.name} at ${q.company}.\n\nProducts: ${productSummary || "None"}\n\nDetails: ${q.otherBms || ""}`,
          source: "quote", sourceId: q._id, isFromAdmin: false, read: false
        });
        imported++;
      }
    }

    res.json({ success: true, imported });
  } catch (error) {
    console.error("Migration failed:", error);
    res.status(500).json({ success: false, error: "Migration failed" });
  }
};
