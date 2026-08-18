import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as eventController from "../controllers/eventController.js";

const router = express.Router();

// Public routes
router.get("/active", eventController.getActive);
router.get("/:id", eventController.getById);

// Admin routes
router.get("/", isAdmin, eventController.getAll);
router.post("/", isAdmin, eventController.create);
router.put("/:id", isAdmin, eventController.update);
router.patch("/:id/active", isAdmin, eventController.toggleActive);
router.delete("/:id", isAdmin, eventController.remove);

export default router;
