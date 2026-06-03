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
                    <img src="data:image/avif;base64,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" alt="Intersys Solutions" style="max-width:200px; height:auto; display:inline-block;" />
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

        const mappedQuotes = quotes.map(q => ({
            _id: q._id.toString(),
            email: q.email,
            name: q.name,
            company: q.company || "",
            phone: q.phone || "",
            contactMethod: q.contactMethod || "",
            address: q.address || "",
            city: q.city || "",
            country: q.country || "",
            bmsSystem: q.bmsSystem || "",
            otherBms: q.otherBms || "",
            products: (q.products || []).map(p => ({
                qty: p.qty,
                productNo: p.productNo,
                description: p.description,
                application: p.application,
                price: p.price || 0
            })),
            solutionCategories: q.solutionCategories || [],
            content: `Quote request from ${q.name} at ${q.company}`,
            source: "quote",
            isFromAdmin: false,
            read: true,
            createdAt: q.createdAt
        }));

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
