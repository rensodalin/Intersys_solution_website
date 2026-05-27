import express from "express";
import Poster from "../model/poster.js";
import User from "../model/user.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// GET all posters sorted by order
router.get("/", async (req, res) => {
    try {
        const posters = await Poster.find().sort({ order: 1 });
        res.json({ success: true, data: posters });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST — Create a new poster and notify all newsletter subscribers
router.post("/", async (req, res) => {
    try {
        const { image, link, order } = req.body;
        if (!image || !link) {
            return res.status(400).json({ success: false, message: "image and link are required." });
        }

        // 1. Save the new poster
        const poster = new Poster({ image, link, order: order || 0 });
        await poster.save();
        console.log("✅ New poster saved:", poster._id);

        // 2. Find all subscribed users
        const subscribers = await User.find({ newsletter: true }).select("email name firstName");
        console.log(`📧 Sending newsletter to ${subscribers.length} subscriber(s)...`);

        // 3. Send email to each subscriber
        const emailPromises = subscribers.map((user) => {
            const displayName = user.firstName || user.name || "Valued Subscriber";
            return transporter.sendMail({
                from: `"Intersys Solutions" <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: "🔔 New Update from Intersys Solutions!",
                html: `
                    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb;">
                        <!-- Header -->
                        <div style="background: #0A0F1A; padding: 24px 32px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 22px; margin: 0; letter-spacing: 1px;">
                                INTERSYS <span style="color: #D62828;">SOLUTIONS</span>
                            </h1>
                            <p style="color: #9ca3af; font-size: 12px; margin: 6px 0 0;">Smart Building & Engineering Systems</p>
                        </div>

                        <!-- Body -->
                        <div style="padding: 32px; background: #ffffff;">
                            <p style="font-size: 15px; color: #374151; margin: 0 0 12px;">Dear <strong>${displayName}</strong>,</p>
                            <p style="font-size: 14px; color: #6b7280; line-height: 1.7; margin: 0 0 24px;">
                                We have a new update just for you! Our team has published fresh content — check it out below.
                            </p>

                            <!-- Poster Image -->
                            <div style="border-radius: 8px; overflow: hidden; margin-bottom: 24px; border: 1px solid #f3f4f6;">
                                <img src="${image}" alt="New Poster" style="width: 100%; display: block; object-fit: cover;" />
                            </div>

                            <!-- CTA Button -->
                            <div style="text-align: center; margin-bottom: 24px;">
                                <a href="${link}" target="_blank"
                                    style="display: inline-block; background: #D62828; color: #ffffff; text-decoration: none;
                                            padding: 12px 32px; border-radius: 6px; font-weight: bold; font-size: 14px; letter-spacing: 0.5px;">
                                    View Full Post →
                                </a>
                            </div>

                            <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 0;">
                                You're receiving this because you subscribed to Intersys Solutions newsletter updates.<br/>
                                You can unsubscribe anytime from your <strong>My Account → Communication Settings</strong>.
                            </p>
                        </div>

                        <!-- Footer -->
                        <div style="background: #f9fafb; padding: 16px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="font-size: 11px; color: #9ca3af; margin: 0;">
                                © ${new Date().getFullYear()} Intersys Solutions Co., Ltd. · Phnom Penh, Cambodia
                            </p>
                        </div>
                    </div>
                `,
            });
        });

        await Promise.allSettled(emailPromises);
        console.log("✅ Newsletter emails dispatched.");

        res.json({ success: true, data: poster, notified: subscribers.length });

    } catch (err) {
        console.error("❌ Poster creation error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;

