import express from "express";
import path from "path";
import fs from "fs";
import { createServer } from "http";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "./passportsetup/passportSetup.js";
import connectDB from "./conn/conn.js";
import { initSocket } from "./socket/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import authRoutes from "./auth/auth.js";
import insightsRoutes from "./routes/insights.js";
import projectRoutes from "./routes/project.js";
import posterRoutes from "./routes/posters.js";
import quoteRoutes from "./routes/quote.js";
import productRoutes from "./routes/product.js";
import visitorRoutes from "./routes/visitor.js";
import activityRoutes from "./routes/activity.js";
import chatRoutes from "./routes/chat.js";
import taxonomyRoutes from "./routes/taxonomy.js";
import technicalTipRoutes from "./routes/technicalTips.js";
import { submitContact, getContacts, deleteContact, markContactRead } from "./controllers/contactController.js";
import { isAdmin } from "./middleware/auth.js";
import User from "./model/user.js";

dotenv.config();

const app = express();

// Trust the reverse proxy (Render, Heroku, etc.) to allow secure session cookies
app.set("trust proxy", true);

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174"
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

app.use(express.json());

const uploadsDir = path.join(__dirname, 'uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');
fs.mkdirSync(avatarsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

app.use(session({
  secret: process.env.SESSION_SECRET || "intersys_super_secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.URI,
    collectionName: "sessions",
    ttl: 24 * 60 * 60,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || process.env.RENDER === "true",
    sameSite: process.env.NODE_ENV === "production" || process.env.RENDER === "true" ? "none" : "lax",
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/posters", posterRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/products", productRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/taxonomy", taxonomyRoutes);
app.use("/api/technical-tips", technicalTipRoutes);

app.post("/api/contact", submitContact);
app.get("/api/contacts", isAdmin, getContacts);
app.put("/api/contacts/:id/read", isAdmin, markContactRead);
app.delete("/api/contacts/:id", isAdmin, deleteContact);

// Fix existing absolute avatar URLs stored from Hostinger FTP
app.post("/api/migrate-avatars", isAdmin, async (req, res) => {
  try {
    const users = await User.find({ avatar: /^https?:\/\/intersys-solution\.com\/uploads\/avatars\// });
    let updated = 0;
    for (const user of users) {
      const relativePath = user.avatar.replace(/^https?:\/\/intersys-solution\.com/, "");
      user.avatar = relativePath;
      await user.save();
      updated++;
    }
    res.json({ success: true, message: `Migrated ${updated} avatar URLs from absolute to relative` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

if (process.env.NODE_ENV === "production") {
  const frontendDist = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendDist));
  app.use((req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
initSocket(httpServer);
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
