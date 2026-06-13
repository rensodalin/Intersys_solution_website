import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as technicalTipController from "../controllers/technicalTipController.js";

const router = express.Router();

router.get("/", technicalTipController.getAll);
router.post("/", isAdmin, technicalTipController.create);
router.put("/:id", isAdmin, technicalTipController.update);
router.delete("/:id", isAdmin, technicalTipController.remove);

export default router;
