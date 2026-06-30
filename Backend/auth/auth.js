import express from "express";
import passport from "passport";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { isAuthenticated } from "../middleware/auth.js";
import * as authController from "../controllers/authController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarStorage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/avatars"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".png";
    cb(null, `avatar_${req.user?._id || "unknown"}${ext}`);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, png, gif, webp) are allowed"));
    }
  },
});

const router = express.Router();

router.post("/login", authController.login);
router.post("/profile/complete", authController.completeProfile);
router.get("/google", authController.googleAuth, passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", authController.googleCallback);
router.all("/logout", isAuthenticated, authController.logout);
router.get("/user", authController.getUser);
router.put("/user/update", isAuthenticated, authController.updateUser);
router.post("/user/avatar", isAuthenticated, uploadAvatar.single("avatar"), authController.uploadAvatar);
router.post("/user/download", isAuthenticated, authController.recordDownload);

export default router;
