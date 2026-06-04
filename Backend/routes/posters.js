import express from "express";
import fs from "fs";
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

// POST /api/posters/save-image — Download an image and save to local uploads (for Facebook CDN hotlink bypass)
router.post("/save-image", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ success: false, message: "URL is required" });

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.status}`);

        const contentType = response.headers.get("content-type") || "image/jpeg";
        const ext = contentType.split("/").pop() || "jpg";
        const filename = `poster_${Date.now()}.${ext}`;
        const filepath = `uploads/${filename}`;
        const buffer = Buffer.from(await response.arrayBuffer());

        await fs.promises.writeFile(filepath, buffer);

        const localUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
        res.json({ success: true, url: localUrl });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
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
        const { image, link, title, description, facebookLink, linkedinLink, order } = req.body;
        if (!image) {
            return res.status(400).json({ success: false, message: "image is required." });
        }

        // 1. Save the new poster
        const poster = new Poster({
            image,
            link: link || "",
            title: title || "",
            description: description || "",
            facebookLink: facebookLink || "",
            linkedinLink: linkedinLink || "",
            order: order || 0,
        });
        await poster.save();
        console.log("✅ New poster saved:", poster._id);

        // 2. Find all subscribed users
        const subscribers = await User.find({ newsletter: true }).select("email name firstName");
        console.log(`📧 Sending newsletter to ${subscribers.length} subscriber(s)...`);

        const posterTitle = poster.title || "New Update";
        const posterDesc = poster.description || "We have a new update just for you!";

        // 3. Send email to each subscriber
        const emailPromises = subscribers.map((user) => {
            const displayName = user.firstName || user.name || "Valued Subscriber";
            return transporter.sendMail({
                from: `"Intersys Solutions" <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: `🔔 ${posterTitle} — Intersys Solutions`,
                html: `
                    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb;">
                        <!-- Header -->
                        <div style="background: #081F3D; padding: 24px 30px; text-align:center;">
                            <img
                                src="https://static.wixstatic.com/media/3d5958_de5e6808f56c48b48bdf976b6224847c~mv2.png/v1/crop/x_0,y_0,w_3932,h_1626/fill/w_248,h_90,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/new%20Logo.png"
                                alt="Intersys Solutions"
                                style="max-width:180px; height:auto; display:block; margin:0 auto;"
                            />
                            <p style="color: rgba(255,255,255,0.6); margin:4px 0 0 0; font-size:11px;">
                                Building Management & Security Systems
                            </p>
                        </div>

                        <!-- Body -->
                        <div style="padding: 32px; background: #ffffff;">
                            <p style="font-size: 15px; color: #374151; margin: 0 0 12px;">Dear <strong>${displayName}</strong>,</p>
                            <h2 style="font-size: 18px; color: #1f2937; margin: 0 0 8px;">${posterTitle}</h2>
                            <p style="font-size: 14px; color: #6b7280; line-height: 1.7; margin: 0 0 24px;">
                                ${posterDesc}
                            </p>

                            <!-- Poster Image -->
                            <div style="border-radius: 8px; overflow: hidden; margin-bottom: 24px; border: 1px solid #f3f4f6;">
                                <img src="${image}" alt="${posterTitle}" style="width: 100%; display: block; object-fit: cover;" />
                            </div>

                            <!-- CTA Button -->
                            ${link ? `
                            <div style="text-align: center; margin-bottom: 24px;">
                                <a href="${link}" target="_blank"
                                    style="display: inline-block; background: #D62828; color: #ffffff; text-decoration: none;
                                            padding: 12px 32px; border-radius: 6px; font-weight: bold; font-size: 14px; letter-spacing: 0.5px;">
                                    View Full Post →
                                </a>
                            </div>
                            ` : ""}

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

// PUT /api/posters/:id — Update a poster (Admin only)
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated() && req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ success: false, error: "Access denied. Admin authorization required." });
};

router.put("/:id", isAdmin, async (req, res) => {
    try {
        const { image, link, title, description, facebookLink, linkedinLink, order } = req.body;
        const poster = await Poster.findByIdAndUpdate(
            req.params.id,
            { image, link, title, description, facebookLink, linkedinLink, order },
            { new: true, runValidators: true }
        );
        if (!poster) {
            return res.status(404).json({ success: false, message: "Poster not found" });
        }
        res.json({ success: true, data: poster });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE /api/posters/:id — Delete a poster (Admin only)
router.delete("/:id", isAdmin, async (req, res) => {
    try {
        const poster = await Poster.findByIdAndDelete(req.params.id);
        if (!poster) {
            return res.status(404).json({ success: false, message: "Poster not found" });
        }
        res.json({ success: true, message: "Poster deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;

