import Product from "../model/product.js";
import Quote from "../model/quote.js";

export const getAll = async (req, res) => {
  try {
    const { category, brand, brandSubCategory } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (brandSubCategory) filter.brandSubCategory = brandSubCategory;

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    const formattedProducts = products.map(product => ({
      ...product, optionsCount: product.options?.length || 0
    }));

    res.status(200).json({ success: true, total: formattedProducts.length, data: formattedProducts });
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch product" });
  }
};

export const create = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const update = async (req, res) => {
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
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPopularity = async (req, res) => {
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
};
