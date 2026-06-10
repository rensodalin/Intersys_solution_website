import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { isAdmin } from "../middleware/auth.js";
import * as chatController from "../controllers/chatController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chatStorage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/chat"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `chat_${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const uploadChat = multer({
  storage: chatStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const router = express.Router();

router.get("/debug", isAdmin, chatController.debug);
router.post("/test-telegram", isAdmin, chatController.testTelegram);
router.get("/conversations", isAdmin, chatController.getConversations);
router.get("/conversations/:email", isAdmin, chatController.getConversationDetail);
router.post("/reply", isAdmin, chatController.reply);
router.post("/upload", isAdmin, uploadChat.single("file"), chatController.uploadFile);
router.get("/check-conversation/:email", chatController.checkConversation);
router.get("/public-messages/:email", chatController.getPublicMessages);
router.post("/client-message", chatController.clientMessage);
router.put("/:id/read", isAdmin, chatController.markRead);
router.put("/conversations/:email/read", isAdmin, chatController.markConversationRead);
router.post("/migrate", isAdmin, chatController.migrate);

export default router;
