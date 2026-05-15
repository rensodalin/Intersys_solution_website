import express from "express";
import Insight from "../model/insight.js";

const router = express.Router();

// ✅ Get All Insights
router.get("/", async (req, res) => {
    try {
        const insights = await Insight.find().sort({ createdAt: -1 });
        res.json({ success: true, data: insights });
    } catch (error) {
        console.error("Fetch Insights Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// ✅ Get Single Insight by Slug
router.get("/:slug", async (req, res) => {
    try {
        const insight = await Insight.findOne({ slug: req.params.slug });
        if (!insight) {
            return res.status(404).json({ success: false, message: "Insight not found" });
        }
        res.json({ success: true, data: insight });
    } catch (error) {
        console.error("Fetch Insight Detail Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// ✅ Create Insight (Admin Protected in future, open for now)
router.post("/", async (req, res) => {
    try {
        const newInsight = new Insight(req.body);
        await newInsight.save();
        res.status(201).json({ success: true, data: newInsight });
    } catch (error) {
        console.error("Create Insight Error:", error);
        res.status(500).json({ success: false, message: "Failed to create insight", error: error.message });
    }
});

export default router;
