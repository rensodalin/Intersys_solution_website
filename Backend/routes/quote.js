import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";
import * as quoteController from "../controllers/quoteController.js";

const router = express.Router();

router.post("/", quoteController.create);
router.get("/", isAuthenticated, quoteController.getUserQuotes);
router.get("/admin-stats", isAdmin, quoteController.getAdminStats);
router.get("/admin-analytics", isAdmin, quoteController.getAdminAnalytics);
router.get("/admin", isAdmin, quoteController.getAllAdmin);
router.put("/:id/status", isAdmin, quoteController.updateStatus);
router.delete("/:id", isAdmin, quoteController.remove);

export default router;
