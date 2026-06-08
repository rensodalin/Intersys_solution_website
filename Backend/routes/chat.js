import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as chatController from "../controllers/chatController.js";

const router = express.Router();

router.get("/debug", isAdmin, chatController.debug);
router.post("/test-telegram", isAdmin, chatController.testTelegram);
router.get("/conversations", isAdmin, chatController.getConversations);
router.get("/conversations/:email", isAdmin, chatController.getConversationDetail);
router.post("/reply", isAdmin, chatController.reply);
router.get("/check-conversation/:email", chatController.checkConversation);
router.get("/public-messages/:email", chatController.getPublicMessages);
router.post("/client-message", chatController.clientMessage);
router.put("/:id/read", isAdmin, chatController.markRead);
router.put("/conversations/:email/read", isAdmin, chatController.markConversationRead);
router.post("/migrate", isAdmin, chatController.migrate);

export default router;
