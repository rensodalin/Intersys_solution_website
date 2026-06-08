import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as visitorController from "../controllers/visitorController.js";

const router = express.Router();

router.post("/track", visitorController.track);
router.get("/hourly", isAdmin, visitorController.getHourly);
router.get("/trend", isAdmin, visitorController.getTrend);

export default router;
