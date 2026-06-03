import express from "express";
import Insight from "../model/insight.js";

const router = express.Router();

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated() && req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ success: false, error: "Access denied. Admin authorization required." });
};

// ✅ Get All Insights (public)
router.get("/", async (req, res) => {
    try {
        const insights = await Insight.find().sort({ createdAt: -1 });
        res.json({ success: true, data: insights });
    } catch (error) {
        console.error("Fetch Insights Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// ✅ Get Single Insight by Slug (public)
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

// ✅ Create Insight (Admin only)
router.post("/", isAdmin, async (req, res) => {
    try {
        const newInsight = new Insight(req.body);
        await newInsight.save();
        res.status(201).json({ success: true, data: newInsight });
    } catch (error) {
        console.error("Create Insight Error:", error);
        res.status(500).json({ success: false, message: "Failed to create insight", error: error.message });
    }
});

// ✅ Update Insight by ID (Admin only)
router.put("/:id", isAdmin, async (req, res) => {
    try {
        const insight = await Insight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!insight) {
            return res.status(404).json({ success: false, message: "Insight not found" });
        }
        res.json({ success: true, data: insight });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update insight", error: error.message });
    }
});

// ✅ Delete Insight by ID (Admin only)
router.delete("/:id", isAdmin, async (req, res) => {
    try {
        const insight = await Insight.findByIdAndDelete(req.params.id);
        if (!insight) {
            return res.status(404).json({ success: false, message: "Insight not found" });
        }
        res.json({ success: true, message: "Insight deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete insight", error: error.message });
    }
});

export default router;
