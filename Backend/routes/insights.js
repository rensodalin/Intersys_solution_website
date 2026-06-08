import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as insightController from "../controllers/insightController.js";

const router = express.Router();

router.get("/", insightController.getAll);
router.get("/:slug", insightController.getBySlug);
router.post("/", isAdmin, insightController.create);
router.put("/:id", isAdmin, insightController.update);
router.delete("/:id", isAdmin, insightController.remove);

export default router;
