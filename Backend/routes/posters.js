import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as posterController from "../controllers/posterController.js";

const router = express.Router();

router.post("/save-image", isAdmin, posterController.saveImage);
router.get("/", posterController.getAll);
router.post("/", isAdmin, posterController.create);
router.put("/:id", isAdmin, posterController.update);
router.delete("/:id", isAdmin, posterController.remove);

export default router;
