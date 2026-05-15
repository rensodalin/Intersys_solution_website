import express from "express";
import Project from "../model/project.js";

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: projects
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error: error.message
        });
    }
});

// Add a single project (for future use or admin panel)
router.post("/", async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create project",
            error: error.message
        });
    }
});

export default router;
