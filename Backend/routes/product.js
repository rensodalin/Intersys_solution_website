import express from "express";
import Product from "../model/product.js";

const router = express.Router();

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

router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
