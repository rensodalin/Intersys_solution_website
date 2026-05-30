import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "./passportsetup/passportSetup.js";
import connectDB from "./conn/conn.js";
import authRoutes from "./auth/auth.js";
import insightsRoutes from "./routes/insights.js";
import projectRoutes from "./routes/project.js";
import posterRoutes from "./routes/posters.js";
import quoteRoutes from "./routes/quote.js";
import productRoutes from "./routes/product.js";
import visitorRoutes from "./routes/visitor.js";
import activityRoutes from "./routes/activity.js";

dotenv.config();

const app = express();

// Connect to Database
connectDB();


// CORS Configuration - dynamically adds the production domain from environment variables
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

// ✅ Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    next();
});

app.use(express.json());

// Session setup with MongoDB-backed store (required for load-balanced clusters)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "intersys_super_secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.URI,
            collectionName: "sessions",
            ttl: 24 * 60 * 60, // 1 day (matches cookie maxAge)
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        },
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ AUTH ROUTES
app.use("/auth", authRoutes);

// ✅ INSIGHTS ROUTES
app.use("/api/insights", insightsRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/posters", posterRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/products", productRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/activity", activityRoutes);

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

import Contact from "./model/contact.js";

// ✅ CONTACT API
app.post("/api/contact", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            contactMethod,
            city,
            country,
            message,
        } = req.body;

        // ✅ validation
        if (!name || (!email && !phone) || !message) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields",
            });
        }

        // ✅ 1. Save to Database
        const newContact = new Contact({
            name,
            email,
            phone,
            contactMethod,
            city,
            country,
            message
        });
        await newContact.save();
        console.log("✅ Contact saved to DB:", newContact._id);

        // ✅ 2. Send Email
        await transporter.sendMail({
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email || undefined,
            subject: `New Contact Request - ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                    <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">New Contact Request</h2>
                    <p><b>Name:</b> ${name}</p>
                    <p><b>Preferred Contact:</b> ${contactMethod}</p>
                    <p><b>Email:</b> ${email || "Not provided"}</p>
                    <p><b>Phone:</b> ${phone || "Not provided"}</p>
                    <p><b>Location:</b> ${city}, ${country}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p><b>Message:</b></p>
                    <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
                </div>
            `,
        });
        console.log("📧 Contact email sent successfully");

        res.json({ success: true, message: "Message saved and sent successfully" });

    } catch (error) {
        console.error("❌ Contact API error details:", error);
        res.status(500).json({
            success: false,
            error: "Failed to process request",
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
