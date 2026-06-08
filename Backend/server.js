import express from "express";
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
import chatRoutes from "./routes/chat.js";
import taxonomyRoutes from "./routes/taxonomy.js";
import { submitContact, getContacts, deleteContact } from "./controllers/contactController.js";
import { isAdmin } from "./middleware/auth.js";

dotenv.config();

const app = express();

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

app.use('/uploads', express.static('uploads'));

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
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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

app.post("/api/contact", submitContact);
app.get("/api/contacts", isAdmin, getContacts);
app.delete("/api/contacts/:id", isAdmin, deleteContact);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
