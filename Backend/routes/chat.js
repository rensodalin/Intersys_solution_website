import express from "express";
import Message from "../model/message.js";
import Contact from "../model/contact.js";
import Quote from "../model/quote.js";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated() && req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ success: false, error: "Access denied. Admin authorization required." });
};

async function sendReplyEmail(userEmail, userName, subject, replyContent, adminName, context) {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

        let detailsHtml = "";

        if (context && context.quotes && context.quotes.length > 0) {
            const q = context.quotes[0];
            const productsHtml = (q.products || []).map(p => `
                <tr>
                    <td style="padding: 8px 12px; border: 1px solid #e5e7eb; text-align:center; font-size:13px;">${p.qty}x</td>
                    <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-size:13px; font-weight:600; color:#C3110C;">${p.productNo}</td>
                    <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-size:13px;">${p.description}</td>
                    <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-size:13px; color:#6b7280;">${p.application}</td>
                    <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-size:13px; text-align:right; font-weight:600;">$${(p.price || 0).toFixed(2)}</td>
                </tr>
            `).join("");

            detailsHtml = `
                <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:6px; padding:20px; margin:15px 0;">
                    <h3 style="margin:0 0 12px 0; font-size:15px; color:#081F3D;">📋 Quote Request Summary</h3>
                    <table style="width:100%; border-collapse:collapse; font-size:13px;">
                        <tr><td style="padding:4px 0; color:#6b7280; width:120px;">Name:</td><td style="padding:4px 0; font-weight:600;">${q.name}</td></tr>
                        <tr><td style="padding:4px 0; color:#6b7280;">Company:</td><td style="padding:4px 0; font-weight:600;">${q.company}</td></tr>
                        <tr><td style="padding:4px 0; color:#6b7280;">Email:</td><td style="padding:4px 0;">${q.email}</td></tr>
                        <tr><td style="padding:4px 0; color:#6b7280;">Phone:</td><td style="padding:4px 0;">${q.phone}</td></tr>
                        <tr><td style="padding:4px 0; color:#6b7280;">Preferred:</td><td style="padding:4px 0;">${q.contactMethod || "—"}</td></tr>
                        <tr><td style="padding:4px 0; color:#6b7280;">Address:</td><td style="padding:4px 0;">${q.address}, ${q.city || ""}, ${q.country || ""}</td></tr>
                        <tr><td style="padding:4px 0; color:#6b7280;">Platform:</td><td style="padding:4px 0;">${q.bmsSystem || "—"}</td></tr>
                    </table>
                    ${(q.products || []).length > 0 ? `
                        <h4 style="margin:15px 0 8px 0; font-size:13px; color:#374151;">Requested Products</h4>
                        <table style="width:100%; border-collapse:collapse; font-size:12px;">
                            <thead>
                                <tr style="background:#e5e7eb;">
                                    <th style="padding:8px 12px; border:1px solid #d1d5db; text-align:center;">Qty</th>
                                    <th style="padding:8px 12px; border:1px solid #d1d5db; text-align:left;">Part Code</th>
                                    <th style="padding:8px 12px; border:1px solid #d1d5db; text-align:left;">Product</th>
                                    <th style="padding:8px 12px; border:1px solid #d1d5db; text-align:left;">Spec</th>
                                    <th style="padding:8px 12px; border:1px solid #d1d5db; text-align:right;">Price</th>
                                </tr>
                            </thead>
                            <tbody>${productsHtml}</tbody>
                        </table>
                    ` : ""}
                    ${q.otherBms ? `<div style="margin-top:12px; padding:12px; background:#fff; border:1px solid #e5e7eb; border-radius:4px; font-size:12px; color:#6b7280; white-space:pre-wrap;">${q.otherBms}</div>` : ""}
                </div>
            `;
        } else if (context && context.contacts && context.contacts.length > 0) {
            const c = context.contacts[0];
            detailsHtml = `
                <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:6px; padding:20px; margin:15px 0;">
                    <h3 style="margin:0 0 12px 0; font-size:15px; color:#081F3D;">📩 Contact Request Summary</h3>
                    <table style="width:100%; border-collapse:collapse; font-size:13px;">
                        <tr><td style="padding:4px 0; color:#6b7280; width:120px;">Name:</td><td style="padding:4px 0; font-weight:600;">${c.name}</td></tr>
                        <tr><td style="padding:4px 0; color:#6b7280;">Email:</td><td style="padding:4px 0;">${c.email || "—"}</td></tr>
                        <tr><td style="padding:4px 0; color:#6b7280;">Phone:</td><td style="padding:4px 0;">${c.phone || "—"}</td></tr>
                        <tr><td style="padding:4px 0; color:#6b7280;">Preferred Contact:</td><td style="padding:4px 0; font-weight:600;">${c.contactMethod || "Not specified"}</td></tr>
                        <tr><td style="padding:4px 0; color:#6b7280;">Location:</td><td style="padding:4px 0;">${[c.city, c.country].filter(Boolean).join(", ") || "—"}</td></tr>
                    </table>
                    <div style="margin-top:12px; padding:12px; background:#fff; border:1px solid #e5e7eb; border-radius:4px; font-size:12px; color:#6b7280;">
                        <strong style="color:#374151;">Original Message:</strong>
                        <div style="margin-top:6px; white-space:pre-wrap;">${c.message}</div>
                    </div>
                </div>
            `;
        }

        const fullHtml = `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: auto; background: #fff;">
                <div style="background: #081F3D; padding: 24px 30px; text-align:center;">
                    <h1 style="color: #fff; margin:0; font-size:20px; letter-spacing:1px;">INTERSYS SOLUTIONS</h1>
                    <p style="color: rgba(255,255,255,0.6); margin:4px 0 0 0; font-size:11px;">Building Management & Security Systems</p>
                </div>
                <div style="padding: 30px;">
                    <p style="font-size:14px; color:#374151;">Dear <b>${userName}</b>,</p>
                    ${detailsHtml}
                    <div style="background: #f9f9f9; border-left: 4px solid #C3110C; padding: 15px 20px; margin: 15px 0; border-radius: 0 4px 4px 0;">
                        <p style="margin:0 0 6px 0; font-size:11px; color:#C3110C; font-weight:700; text-transform:uppercase;">Our Response</p>
                        <div style="font-size:14px; color:#374151; line-height:1.6; white-space:pre-wrap;">${replyContent}</div>
                    </div>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                    <p style="font-size:12px; color:#6b7280; line-height:1.6;">
                        Best regards,<br/>
                        <b style="color:#C3110C;">${adminName}</b><br/>
                        <span style="color:#9ca3af;">Intersys Solutions</span><br/>
                        <span style="color:#9ca3af;">Phone: +855 12 345 678</span>
                    </p>
                </div>
                <div style="background: #f3f4f6; padding: 12px 30px; text-align:center; font-size:10px; color:#9ca3af;">
                    This email was sent in response to your inquiry. Please reply directly if you have further questions.
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: `"Intersys Solutions" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Re: ${subject}`,
            html: fullHtml,
        });
    } catch (err) {
        console.error("Failed to send reply email:", err);
    }
}

router.get("/debug", isAdmin, async (req, res) => {
    try {
        const contactsRaw = await Contact.find({}).lean();
        const firstFew = contactsRaw.slice(0, 3).map(c => ({ name: c.name, email: c.email, phone: c.phone, message: c.message?.slice(0, 50) }));
        res.json({
            totalContacts: contactsRaw.length,
            sampleContacts: firstFew,
            emails: contactsRaw.map(c => c.email)
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post("/test-telegram", isAdmin, async (req, res) => {
    try {
        const { sendTelegramNotification } = await import("../utils/telegram.js");
        await sendTelegramNotification("<b>✅ Test</b>\n\nIf you see this, Telegram is working!");
        res.json({ success: true, message: "Test message sent" });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

router.get("/conversations", isAdmin, async (req, res) => {
    try {
        const [contacts, quotes, messages, unreadGroups] = await Promise.all([
            Contact.find({}).sort({ createdAt: -1 }).lean(),
            Quote.find({}).sort({ createdAt: -1 }).lean(),
            Message.find({}).sort({ createdAt: -1 }).lean(),
            Message.aggregate([
                { $match: { isFromAdmin: false, read: false } },
                { $group: { _id: "$email", count: { $sum: 1 } } }
            ])
        ]);

        console.log("[chat] contacts:", contacts.length, "quotes:", quotes.length, "messages:", messages.length);
        if (contacts.length > 0) console.log("[chat] sample contact emails:", contacts.slice(0, 5).map(c => JSON.stringify(c.email)));

        const unreadMap = {};
        for (const u of unreadGroups) {
            unreadMap[u._id] = u.count;
        }

        const byEmail = {};

        for (const c of contacts) {
            const email = (c.email || "").trim() || "unknown";
            const hasPhone = !!(c.phone || "").trim();
            if (!byEmail[email] || new Date(c.createdAt) > new Date(byEmail[email].lastDate)) {
                byEmail[email] = {
                    _id: email,
                    email,
                    name: c.name || email,
                    phone: c.phone || "",
                    hasPhone,
                    prefers: c.contactMethod || "",
                    lastMessage: c.message || "(no message)",
                    lastDate: c.createdAt,
                    lastSource: "contact",
                    count: 0,
                    unreadCount: unreadMap[email] || 0
                };
            } else if (!byEmail[email].phone && c.phone) {
                byEmail[email].phone = c.phone;
                byEmail[email].hasPhone = true;
            }
        }

        for (const q of quotes) {
            const email = (q.email || "").trim() || "unknown";
            const msg = `Quote request from ${q.name} at ${q.company}`;
            const qPhone = q.phone || "";
            if (!byEmail[email] || new Date(q.createdAt) > new Date(byEmail[email].lastDate)) {
                byEmail[email] = {
                    _id: email,
                    email,
                    name: q.name || email,
                    phone: qPhone,
                    hasPhone: !!(qPhone.trim()),
                    prefers: q.contactMethod || "",
                    lastMessage: msg,
                    lastDate: q.createdAt,
                    lastSource: "quote",
                    count: 0,
                    unreadCount: unreadMap[email] || 0
                };
            } else if (!byEmail[email].phone && qPhone) {
                byEmail[email].phone = qPhone;
                byEmail[email].hasPhone = true;
            }
        }

        for (const m of messages) {
            const email = (m.email || "").trim() || "unknown";
            if (!byEmail[email] || new Date(m.createdAt) > new Date(byEmail[email].lastDate)) {
                byEmail[email] = {
                    _id: email,
                    email,
                    name: m.name || email,
                    lastMessage: m.content || "(no message)",
                    lastDate: m.createdAt,
                    lastSource: m.source || "reply",
                    count: 0,
                    unreadCount: unreadMap[email] || 0
                };
            }
        }

        const result = Object.values(byEmail).sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate));

        res.json({ success: true, data: result });
    } catch (error) {
        console.error("Failed to fetch conversations:", error);
        res.status(500).json({ success: false, error: "Failed to fetch conversations" });
    }
});

router.get("/conversations/:email", isAdmin, async (req, res) => {
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
            _id: c._id.toString(),
            email: c.email || email,
            name: c.name,
            phone: c.phone || "",
            contactMethod: c.contactMethod || "",
            city: c.city || "",
            country: c.country || "",
            content: c.message,
            source: "contact",
            isFromAdmin: false,
            read: true,
            createdAt: c.createdAt
        }));

        const mappedQuotes = quotes.map(q => {
            const productSummary = (q.products || []).map(p => `${p.qty}x ${p.productNo}`).join(", ");
            return {
                _id: q._id.toString(),
                email: q.email,
                name: q.name,
                content: `Quote request from ${q.name} at ${q.company}.\n\nProducts: ${productSummary || "None"}`,
                source: "quote",
                isFromAdmin: false,
                read: true,
                createdAt: q.createdAt
            };
        });

        const mappedMessages = messages.map(m => ({
            _id: m._id.toString(),
            email: m.email,
            name: m.name,
            content: m.content,
            source: m.source,
            isFromAdmin: m.isFromAdmin,
            read: m.read,
            createdAt: m.createdAt
        }));

        const all = [...mappedContacts, ...mappedQuotes, ...mappedMessages];
        all.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        res.json({ success: true, data: all });
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        res.status(500).json({ success: false, error: "Failed to fetch messages" });
    }
});

router.post("/reply", isAdmin, async (req, res) => {
    try {
        const { email, name, content, subject } = req.body;
        if (!email || !content) {
            return res.status(400).json({ success: false, error: "Email and content are required" });
        }

        const message = new Message({
            email,
            name: name || email,
            subject: subject || "Conversation with Intersys Solutions",
            content,
            source: "reply",
            isFromAdmin: true,
            read: true
        });
        await message.save();

        const [contacts, quotes] = await Promise.all([
            Contact.find({ email }).sort({ createdAt: -1 }).limit(1).lean(),
            Quote.find({ email }).sort({ createdAt: -1 }).limit(1).lean()
        ]);

        const adminName = req.user.name || "Admin";
        sendReplyEmail(email, name || email, message.subject, content, adminName, { contacts, quotes });

        res.json({ success: true, data: message });
    } catch (error) {
        console.error("Failed to send reply:", error);
        res.status(500).json({ success: false, error: "Failed to send reply" });
    }
});

router.put("/:id/read", isAdmin, async (req, res) => {
    try {
        await Message.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ success: true });
    } catch (error) {
        console.error("Failed to mark as read:", error);
        res.status(500).json({ success: false, error: "Failed to mark as read" });
    }
});

router.put("/conversations/:email/read", isAdmin, async (req, res) => {
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
});

router.post("/migrate", isAdmin, async (req, res) => {
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
                    email: c.email || "unknown@intersys.com",
                    name: c.name,
                    subject: `Contact Request - ${c.name}`,
                    content: c.message,
                    source: "contact",
                    sourceId: c._id,
                    isFromAdmin: false,
                    read: false
                });
                imported++;
            }
        }

        for (const q of quotes) {
            const exists = await Message.findOne({ source: "quote", sourceId: q._id });
            if (!exists) {
                const productSummary = (q.products || []).map(p => `${p.qty}x ${p.productNo}`).join(", ");
                await Message.create({
                    email: q.email,
                    name: q.name,
                    subject: `Quote Request - ${q.company}`,
                    content: `Quote request from ${q.name} at ${q.company}.\n\nProducts: ${productSummary || "None"}\n\nDetails: ${q.otherBms || ""}`,
                    source: "quote",
                    sourceId: q._id,
                    isFromAdmin: false,
                    read: false
                });
                imported++;
            }
        }

        res.json({ success: true, imported });
    } catch (error) {
        console.error("Migration failed:", error);
        res.status(500).json({ success: false, error: "Migration failed" });
    }
});

export default router;
