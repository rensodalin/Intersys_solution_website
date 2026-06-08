import Message from "../model/message.js";
import Contact from "../model/contact.js";
import Quote from "../model/quote.js";

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
      Message.find({}).sort({ createdAt: -1 }).lean(),
      Message.aggregate([
        { $match: { isFromAdmin: false, read: false } },
        { $group: { _id: "$email", count: { $sum: 1 } } }
      ])
    ]);

    const unreadMap = {};
    for (const u of unreadGroups) { unreadMap[u._id] = u.count; }

    const byEmail = {};

    for (const m of messages) {
      const email = (m.email || "").trim() || "unknown";
      let source = m.source || "reply";
      if (source === "client-reply") source = "chat";
      if (source === "reply") source = "chat";
      const isContact = source === "contact";
      const isQuote = source === "quote";
      if (!byEmail[email] || new Date(m.createdAt) > new Date(byEmail[email].lastDate)) {
        byEmail[email] = {
          _id: email, email, name: m.name || email,
          lastMessage: m.content || "(no message)", lastDate: m.createdAt,
          lastSource: source, count: 0,
          unreadCount: unreadMap[email] || 0,
          hasContact: isContact,
          hasQuote: isQuote,
          phone: "",
          hasPhone: false,
          prefers: "",
          city: "",
          country: ""
        };
      } else {
        const existing = byEmail[email];
        if (isContact) existing.hasContact = true;
        if (isQuote) existing.hasQuote = true;
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
    const emailFilter = email === "unknown"
      ? { $or: [{ email: { $exists: false } }, { email: null }, { email: "" }] }
      : { email };

    const [contacts, quotes, messages] = await Promise.all([
      Contact.find(emailFilter).sort({ createdAt: 1 }).lean(),
      Quote.find(emailFilter).sort({ createdAt: 1 }).lean(),
      Message.find({ email }).sort({ createdAt: 1 }).lean()
    ]);

    const mappedContacts = contacts.map(c => ({
      _id: c._id.toString(), email: c.email || email, name: c.name,
      phone: c.phone || "", contactMethod: c.contactMethod || "",
      city: c.city || "", country: c.country || "", content: c.message,
      source: "contact", isFromAdmin: false, read: true, createdAt: c.createdAt
    }));

    const mappedQuotes = quotes.map(q => ({
      _id: q._id.toString(), email: q.email, name: q.name, company: q.company || "",
      phone: q.phone || "", contactMethod: q.contactMethod || "",
      address: q.address || "", city: q.city || "", country: q.country || "",
      bmsSystem: q.bmsSystem || "", otherBms: q.otherBms || "",
      products: (q.products || []).map(p => ({
        qty: p.qty, productNo: p.productNo, description: p.description,
        application: p.application, price: p.price || 0
      })),
      solutionCategories: q.solutionCategories || [],
      content: `Quote request from ${q.name} at ${q.company}`,
      source: "quote", isFromAdmin: false, read: true, createdAt: q.createdAt
    }));

    const mappedMessages = messages.map(m => ({
      _id: m._id.toString(), email: m.email, name: m.name,
      content: m.content, source: m.source,
      isFromAdmin: m.isFromAdmin, read: m.read, createdAt: m.createdAt
    }));

    const all = [...mappedContacts, ...mappedQuotes, ...mappedMessages];
    all.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    res.json({ success: true, data: all });
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

    const [contacts, quotes] = await Promise.all([
      Contact.find({ email }).sort({ createdAt: -1 }).limit(1).lean(),
      Quote.find({ email }).sort({ createdAt: -1 }).limit(1).lean()
    ]);

    const adminName = req.user.name || "Admin";

    res.json({ success: true, data: message });
  } catch (error) {
    console.error("Failed to send reply:", error);
    res.status(500).json({ success: false, error: "Failed to send reply" });
  }
};

export const checkConversation = async (req, res) => {
  try {
    const email = req.params.email;
    const [contactCount, quoteCount, messageCount] = await Promise.all([
      Contact.countDocuments({ email }),
      Quote.countDocuments({ email }),
      Message.countDocuments({ email })
    ]);
    const exists = contactCount > 0 || quoteCount > 0 || messageCount > 0;
    res.json({ success: true, exists });
  } catch (error) {
    res.status(500).json({ success: false, exists: false });
  }
};

export const getPublicMessages = async (req, res) => {
  try {
    const email = req.params.email;
    const messages = await Message.find({ email }).sort({ createdAt: 1 }).lean();
    const mapped = messages.map(m => ({
      _id: m._id.toString(), email: m.email, name: m.name,
      content: m.content, source: m.source,
      isFromAdmin: m.isFromAdmin, createdAt: m.createdAt
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

    const message = new Message({
      email, name, subject: subject || "Follow-up message",
      content, source: "client-reply", isFromAdmin: false, read: false
    });
    await message.save();

    res.json({ success: true, data: message });
  } catch (error) {
    console.error("Failed to save client message:", error);
    res.status(500).json({ success: false, error: "Failed to save message" });
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
