import express from "express";
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

router.post("/", async (req, res) => {
    try {
        const quoteData = req.body;
        const newQuote = new Quote(quoteData);
        await newQuote.save();

        const emailContent = `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">New Quote Request</h2>
                <p><strong>Name:</strong> ${quoteData.name}</p>
                <p><strong>Company:</strong> ${quoteData.company}</p>
                <p><strong>Email:</strong> ${quoteData.email}</p>
                <p><strong>Phone:</strong> ${quoteData.phone}</p>
                <p><strong>Address:</strong> ${quoteData.address}, ${quoteData.city || ""}, ${quoteData.country || ""}</p>
                <p><strong>Contact Method:</strong> ${quoteData.contactMethod}</p>
                <h3>Products Requested</h3>
                <ul>
                    ${(quoteData.products || []).map(p => `<li>${p.qty}x ${p.productNo} - ${p.description}</li>`).join("")}
                </ul>
            </div>
        `;

        await transporter.sendMail({
            from: `"Quote Request" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: quoteData.email,
            subject: `New Quote Request - ${quoteData.company}`,
            html: emailContent,
        });

        res.status(201).json({ success: true, message: "Quote request submitted successfully." });
    } catch (error) {
        console.error("Error submitting quote:", error);
        res.status(500).json({ success: false, error: "Failed to submit quote request" });
    }
});

router.get("/", async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: quotes });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch quotes" });
    }
});

export default router;
