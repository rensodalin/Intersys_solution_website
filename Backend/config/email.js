import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, "") : "";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use STARTTLS on port 587 (recommended for Render & cloud hosting)
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000, // 10 seconds timeout
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

if (emailUser && emailPass) {
  transporter.verify((error) => {
    if (error) {
      console.warn("Email warning (non-fatal): SMTP connection failed:", error.message || error);
      console.warn("Form submissions will still be saved to MongoDB even if email notifications are unavailable.");
    } else {
      console.log("Email server ready (SMTP connected via port 587)");
    }
  });
} else {
  console.log("Email service skipped: EMAIL_USER or EMAIL_PASS not defined in environment variables");
}

export default transporter;

