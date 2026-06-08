import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as activityController from "../controllers/activityController.js";

const router = express.Router();

router.get("/", isAdmin, activityController.getFeed);

export default router;
