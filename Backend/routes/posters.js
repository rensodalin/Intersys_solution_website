import express from "express";
import Poster from "../model/poster.js";

const router = express.Router();

// GET all posters sorted by order
router.get("/", async (req, res) => {
    try {
        const posters = await Poster.find().sort({ order: 1 });
        res.json({ success: true, data: posters });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
