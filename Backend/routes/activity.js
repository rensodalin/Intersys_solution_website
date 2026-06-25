import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as activityController from "../controllers/activityController.js";

const router = express.Router();

router.get("/", isAdmin, activityController.getFeed);
router.get("/notifications", isAdmin, activityController.getNotifications);
router.put("/notifications/:id/read", isAdmin, activityController.markNotificationRead);

export default router;
