import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./passportsetup/passportSetup.js";
import connectDB from "./conn/conn.js";
import authRoutes from "./auth/auth.js";

dotenv.config();

const app = express();

// Connect to Database
connectDB();


app.use(cors({
    origin: [
        "http://localhost:5173", 
        "http://localhost:5174", 
        "http://127.0.0.1:5173", 
        "http://127.0.0.1:5174"
    ],
    credentials: true,
}));

// ✅ Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    next();
});

app.use(express.json());

// Session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET || "intersys_super_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ AUTH ROUTES
app.use("/auth", authRoutes);

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

        res.json({ success: true });

    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({
            success: false,
            error: "Email failed",
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});