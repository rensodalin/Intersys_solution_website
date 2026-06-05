import express from "express";
import Taxonomy from "../model/taxonomy.js";

const router = express.Router();

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated() && req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ success: false, error: "Access denied" });
};

const DEFAULT_DATA = [
    {
        category: "Access Control",
        brands: [
            { name: "Honeywell", subCategories: ["Control Panels", "Control Panel Kits", "Readers", "Credentials", "Software", "Accessories", "Lobby Kiosks", "System Agreements & Upgrades", "Door Hardware"] },
            { name: "SALTO", subCategories: ["Electronic Locks", "Online Systems", "Offline Systems", "Mobile & Cloud"] }
        ]
    },
    {
        category: "Surveillance (CCTV)",
        brands: [
            { name: "Intersys", subCategories: ["IP Cameras", "Analog Cameras", "NVR/DVR", "Accessories"] },
            { name: "Hikvision", subCategories: ["IP Cameras", "NVR/DVR", "Accessories"] },
            { name: "Dahua", subCategories: ["IP Cameras", "NVR/DVR", "Accessories"] },
            { name: "Axis", subCategories: ["IP Cameras", "Accessories"] }
        ]
    },
    {
        category: "Building Management",
        brands: [
            { name: "Schneider Electric", subCategories: ["Field Devices", "Controllers", "Software", "Networking"] },
            { name: "Siemens", subCategories: ["Field Devices", "Controllers", "Software"] },
            { name: "Johnson Controls", subCategories: ["Field Devices", "Controllers"] },
            { name: "Other", subCategories: ["General"] }
        ]
    },
    {
        category: "Integrated Systems",
        brands: []
    },
    {
        category: "Audio Visual",
        brands: []
    },
    {
        category: "Fire Systems",
        brands: []
    },
    {
        category: "Leak Detection",
        brands: []
    }
];

async function ensureSeeded() {
    const count = await Taxonomy.countDocuments();
    if (count === 0) {
        await Taxonomy.insertMany(DEFAULT_DATA);
        console.log("✅ Taxonomy seeded with default data");
    }
}

router.get("/", async (req, res) => {
    try {
        await ensureSeeded();
        const data = await Taxonomy.find({}).sort({ category: 1 }).lean();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/category", isAdmin, async (req, res) => {
    try {
        const { category } = req.body;
        if (!category) return res.status(400).json({ success: false, error: "Category name is required" });
        await ensureSeeded();
        const exists = await Taxonomy.findOne({ category });
        if (exists) return res.status(400).json({ success: false, error: "Category already exists" });
        const doc = await Taxonomy.create({ category, brands: [] });
        res.status(201).json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put("/category/:name", isAdmin, async (req, res) => {
    try {
        const { name } = req.params;
        const { category: newName } = req.body;
        if (!newName) return res.status(400).json({ success: false, error: "New category name is required" });
        const doc = await Taxonomy.findOneAndUpdate(
            { category: name },
            { category: newName },
            { new: true }
        );
        if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
        res.json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete("/category/:name", isAdmin, async (req, res) => {
    try {
        const doc = await Taxonomy.findOneAndDelete({ category: req.params.name });
        if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
        res.json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/category/:name/brand", isAdmin, async (req, res) => {
    try {
        const { name: brandName } = req.body;
        if (!brandName) return res.status(400).json({ success: false, error: "Brand name is required" });
        const doc = await Taxonomy.findOne({ category: req.params.name });
        if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
        if (doc.brands.some(b => b.name === brandName)) return res.status(400).json({ success: false, error: "Brand already exists in this category" });
        doc.brands.push({ name: brandName, subCategories: [] });
        await doc.save();
        res.status(201).json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put("/category/:name/brand/:brandName", isAdmin, async (req, res) => {
    try {
        const { name: newBrandName } = req.body;
        if (!newBrandName) return res.status(400).json({ success: false, error: "New brand name is required" });
        const doc = await Taxonomy.findOne({ category: req.params.name });
        if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
        const brand = doc.brands.find(b => b.name === req.params.brandName);
        if (!brand) return res.status(404).json({ success: false, error: "Brand not found" });
        brand.name = newBrandName;
        await doc.save();
        res.json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete("/category/:name/brand/:brandName", isAdmin, async (req, res) => {
    try {
        const doc = await Taxonomy.findOne({ category: req.params.name });
        if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
        doc.brands = doc.brands.filter(b => b.name !== req.params.brandName);
        await doc.save();
        res.json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/category/:name/brand/:brandName/subcategory", isAdmin, async (req, res) => {
    try {
        const { subCategory } = req.body;
        if (!subCategory) return res.status(400).json({ success: false, error: "Subcategory name is required" });
        const doc = await Taxonomy.findOne({ category: req.params.name });
        if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
        const brand = doc.brands.find(b => b.name === req.params.brandName);
        if (!brand) return res.status(404).json({ success: false, error: "Brand not found" });
        if (brand.subCategories.includes(subCategory)) return res.status(400).json({ success: false, error: "Subcategory already exists" });
        brand.subCategories.push(subCategory);
        await doc.save();
        res.status(201).json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put("/category/:name/brand/:brandName/subcategory/:subName", isAdmin, async (req, res) => {
    try {
        const { subCategory: newName } = req.body;
        if (!newName) return res.status(400).json({ success: false, error: "New subcategory name is required" });
        const doc = await Taxonomy.findOne({ category: req.params.name });
        if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
        const brand = doc.brands.find(b => b.name === req.params.brandName);
        if (!brand) return res.status(404).json({ success: false, error: "Brand not found" });
        const idx = brand.subCategories.indexOf(req.params.subName);
        if (idx === -1) return res.status(404).json({ success: false, error: "Subcategory not found" });
        brand.subCategories[idx] = newName;
        await doc.save();
        res.json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete("/category/:name/brand/:brandName/subcategory/:subName", isAdmin, async (req, res) => {
    try {
        const doc = await Taxonomy.findOne({ category: req.params.name });
        if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
        const brand = doc.brands.find(b => b.name === req.params.brandName);
        if (!brand) return res.status(404).json({ success: false, error: "Brand not found" });
        brand.subCategories = brand.subCategories.filter(s => s !== req.params.subName);
        await doc.save();
        res.json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
