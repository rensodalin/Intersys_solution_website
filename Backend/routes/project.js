import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as projectController from "../controllers/projectController.js";

const router = express.Router();

router.get("/", projectController.getAll);
router.post("/", isAdmin, projectController.create);

export default router;
