import express from "express";
import Quote from "../model/quote.js";
import Contact from "../model/contact.js";
import User from "../model/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [recentQuotes, recentContacts, recentUsers] = await Promise.all([
            Quote.find().sort({ createdAt: -1 }).limit(5),
            Contact.find().sort({ createdAt: -1 }).limit(5),
            User.find().sort({ createdAt: -1 }).select("name email role createdAt avatar").limit(5),
        ]);

        const activities = [];

        recentQuotes.forEach((q) => {
            const date = new Date(q.createdAt);
            const name = q.name || "Client";
            const company = q.company || "Intersys Client";
            const isApproved = q.status === "Completed";
            activities.push({
                id: `quote-${q._id}`,
                type: isApproved ? "success" : "info",
                title: isApproved ? `Quote #${q._id.toString().slice(-4).toUpperCase()} Approved` : "New Quote Request",
                description: isApproved ? `${company} - Phase 1` : `${name} from ${company}`,
                timestamp: date,
            });
        });

        recentContacts.forEach((c) => {
            const date = new Date(c.createdAt);
            activities.push({
                id: `contact-${c._id}`,
                type: "primary",
                title: "New Client Message",
                description: `Inquiry regarding ${(c.message || "").substring(0, 25)}...`,
                timestamp: date,
            });
        });

        recentUsers.forEach((u) => {
            const date = new Date(u.createdAt);
            const roleStr = u.role ? u.role.charAt(0).toUpperCase() + u.role.slice(1) : "Member";
            activities.push({
                id: `user-${u._id}`,
                type: "warning",
                title: `${roleStr} Onboarded`,
                description: `${u.name} joined the project group`,
                timestamp: date,
            });
        });

        activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        res.json({ success: true, data: activities.slice(0, 4) });
    } catch (err) {
        console.error("Activity feed error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
