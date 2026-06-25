import Quote from "../model/quote.js";
import Contact from "../model/contact.js";
import User from "../model/user.js";
import Message from "../model/message.js";

export const getFeed = async (req, res) => {
  try {
    const [recentQuotes, recentContacts, recentUsers] = await Promise.all([
      Quote.find().sort({ createdAt: -1 }).limit(5),
      Contact.find().sort({ createdAt: -1 }).limit(5),
      User.find().sort({ createdAt: -1 }).select("name email role createdAt avatar").limit(5),
    ]);

    const activities = [];

    recentQuotes.forEach(q => {
      const date = new Date(q.createdAt);
      const name = q.name || "Client";
      const company = q.company || "Intersys Client";
      const isApproved = q.status === "Completed";
      activities.push({
        id: `quote-${q._id}`, type: isApproved ? "success" : "info",
        title: isApproved ? `Quote #${q._id.toString().slice(-4).toUpperCase()} Approved` : "New Quote Request",
        description: isApproved ? `${company} - Phase 1` : `${name} from ${company}`, timestamp: date,
      });
    });

    recentContacts.forEach(c => {
      activities.push({
        id: `contact-${c._id}`, type: "primary", title: "New Client Message",
        description: `Inquiry regarding ${(c.message || "").substring(0, 25)}...`,
        timestamp: new Date(c.createdAt),
      });
    });

    recentUsers.forEach(u => {
      const roleStr = u.role ? u.role.charAt(0).toUpperCase() + u.role.slice(1) : "Member";
      const roleType = (u.role || "member").toLowerCase();
      activities.push({
        id: `user-${u._id}`, type: roleType, title: `${roleStr} Onboarded`,
        description: `${u.name} joined the Website`, timestamp: new Date(u.createdAt),
      });
    });

    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    res.json({ success: true, data: limit ? activities.slice(0, limit) : activities });
  } catch (err) {
    console.error("Activity feed error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [unreadMessages, pendingQuotes, unreadContacts, recentContacts, recentQuotes] = await Promise.all([
      Message.countDocuments({ isFromAdmin: false, read: false, createdAt: { $gte: startOfToday } }),
      Quote.countDocuments({ status: "Pending", createdAt: { $gte: startOfToday } }),
      Contact.countDocuments({ status: "new", createdAt: { $gte: startOfToday } }),
      Contact.find({ status: "new", createdAt: { $gte: startOfToday } }).sort({ createdAt: -1 }).limit(5).lean(),
      Quote.find({ status: "Pending", createdAt: { $gte: startOfToday } }).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const totalUnread = unreadContacts;

    const items = [];

    recentContacts.forEach(c => {
      items.push({
        id: `contact-${c._id}`,
        type: "contact",
        title: "New Contact Message",
        description: `${c.name}: ${(c.message || "").substring(0, 40)}${c.message?.length > 40 ? "..." : ""}`,
        section: "contacts",
        createdAt: c.createdAt,
      });
    });

    recentQuotes.forEach(q => {
      items.push({
        id: `quote-${q._id}`,
        type: "quote",
        title: "Pending Quote Request",
        description: `${q.name} from ${q.company || "N/A"}`,
        section: "quotes",
        createdAt: q.createdAt,
      });
    });

    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      success: true,
      data: {
        totalUnread,
        unreadMessages,
        pendingQuotes,
        recentItems: items.slice(0, 10),
      },
    });
  } catch (err) {
    console.error("Notifications error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    const [type, actualId] = id.split("-");
    if (!type || !actualId) {
      return res.status(400).json({ success: false, message: "Invalid notification id format" });
    }

    switch (type) {
      case "contact":
        await Contact.findByIdAndUpdate(actualId, { status: "read" });
        break;
      case "quote":
        break;
      default:
        return res.status(400).json({ success: false, message: "Unknown notification type" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Mark notification read error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
