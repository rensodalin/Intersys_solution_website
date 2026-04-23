import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // change if your frontend runs elsewhere
}));

app.use(express.json());

// ✅ EMAIL TRANSPORT
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password (NOT normal password)
    },
});

// optional check
transporter.verify((error) => {
    if (error) {
        console.log("Email config error:", error);
    } else {
        console.log("Email server ready");
    }
});

// ✅ CONTACT API
app.post("/api/contact", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            company,
            position,
            message,
        } = req.body;

        // ✅ validation
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields",
            });
        }

        await transporter.sendMail({
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Contact Request - ${firstName} ${lastName}`,
            html: `
                <h2>New Contact Request</h2>
                <p><b>Name:</b> ${firstName} ${lastName}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone || "-"}</p>
                <p><b>Company:</b> ${company || "-"}</p>
                <p><b>Position:</b> ${position || "-"}</p>
                <p><b>Message:</b></p>
                <p>${message}</p>
            `,
        });

        res.json({ success: true });

    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({
            success: false,
            error: "Email failed",
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});