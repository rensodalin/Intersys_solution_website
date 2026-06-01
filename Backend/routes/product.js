import express from "express";
import Product from "../model/product.js";
import Quote from "../model/quote.js";

const router = express.Router();

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated() && req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ success: false, error: "Access denied. Admin authorization required." });
};


router.get("/", async (req, res) => {
    try {
        const { category, brand, brandSubCategory } = req.query;

        // Build filter dynamically
        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (brand) {
            filter.brand = brand;
        }

        if (brandSubCategory) {
            filter.brandSubCategory = brandSubCategory;
        }

        // Fetch products
        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .lean();

        // Debug options count
        const formattedProducts = products.map((product) => ({
            ...product,
            optionsCount: product.options?.length || 0
        }));

        res.status(200).json({
            success: true,
            total: formattedProducts.length,
            data: formattedProducts
        });

    } catch (error) {
        console.error("Fetch products error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
});

router.get("/:productId", async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId });
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch product" });
    }
});

router.post("/", isAdmin, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put("/:productId", isAdmin, async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { productId: req.params.productId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete("/:productId", isAdmin, async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ productId: req.params.productId });
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// GET /api/products/popularity - Count how many times each product appears in quotes
router.get("/popularity/list", async (req, res) => {
    try {
        const quotes = await Quote.find({}).lean();
        const counts = {};
        quotes.forEach(quote => {
            (quote.products || []).forEach(p => {
                const key = p.description || p.productNo;
                if (key) counts[key] = (counts[key] || 0) + 1;
            });
        });
        res.status(200).json({ success: true, data: counts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
