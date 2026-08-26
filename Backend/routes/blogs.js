import express from "express";
import * as blogController from "../controllers/blogController.js";
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", blogController.getAll);
router.get("/:slug", blogController.getBySlug);
router.post("/", isAdmin, blogController.create);
router.put("/:id", isAdmin, blogController.update);
router.delete("/:id", isAdmin, blogController.remove);

export default router;
