import Product from "../model/product.js";
import ProductOption from "../model/productOption.js";
import ProductDocument from "../model/productDocument.js";
import QuoteItem from "../model/quoteItem.js";
import Category from "../model/category.js";

export const getAll = async (req, res) => {
  try {
    const { category, brand, brandSubCategory } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (brandSubCategory) filter.brandSubCategory = brandSubCategory;

    const products = await Product.find(filter)
      .populate("options")
      .populate("documents")
      .sort({ createdAt: -1 })
      .lean();

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
    const product = await Product.findOne({ productId: req.params.productId })
      .populate("options")
      .populate("documents");
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
    const { options, documents, ...productData } = req.body;

    if (productData.category) {
      const cat = await Category.findOne({ name: productData.category });
      if (cat) productData.categoryRef = cat._id;
    }

    const newProduct = new Product(productData);
    await newProduct.save();

    if (options && options.length > 0) {
      const optionDocs = options.map(opt => ({
        productId: newProduct._id,
        partCode: opt.partCode,
        specification: opt.specification,
        price: opt.price || 0,
        qty: opt.qty || 0
      }));
      const savedOptions = await ProductOption.insertMany(optionDocs);
      newProduct.options = savedOptions.map(o => o._id);
    }

    if (documents && documents.length > 0) {
      const documentDocs = documents.map(doc => ({
        productId: newProduct._id,
        name: doc.name,
        url: doc.url
      }));
      const savedDocs = await ProductDocument.insertMany(documentDocs);
      newProduct.documents = savedDocs.map(d => d._id);
    }

    if (options?.length > 0 || documents?.length > 0) {
      await newProduct.save();
    }

    const populated = await Product.findById(newProduct._id)
      .populate("options")
      .populate("documents");

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { options, documents, ...productData } = req.body;
    const existing = await Product.findOne({ productId: req.params.productId });
    if (!existing) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    if (productData.category) {
      const cat = await Category.findOne({ name: productData.category });
      if (cat) productData.categoryRef = cat._id;
    }

    if (options !== undefined) {
      await ProductOption.deleteMany({ productId: existing._id });
      if (options.length > 0) {
        const optionDocs = options.map(opt => ({
          productId: existing._id,
          partCode: opt.partCode,
          specification: opt.specification,
          price: opt.price || 0,
          qty: opt.qty || 0
        }));
        const savedOptions = await ProductOption.insertMany(optionDocs);
        productData.options = savedOptions.map(o => o._id);
      } else {
        productData.options = [];
      }
    }

    if (documents !== undefined) {
      await ProductDocument.deleteMany({ productId: existing._id });
      if (documents.length > 0) {
        const documentDocs = documents.map(doc => ({
          productId: existing._id,
          name: doc.name,
          url: doc.url
        }));
        const savedDocs = await ProductDocument.insertMany(documentDocs);
        productData.documents = savedDocs.map(d => d._id);
      } else {
        productData.documents = [];
      }
    }

    const product = await Product.findOneAndUpdate(
      { productId: req.params.productId },
      productData,
      { returnDocument: 'after', runValidators: true }
    )
      .populate("options")
      .populate("documents");

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
    await Promise.all([
      ProductOption.deleteMany({ productId: product._id }),
      ProductDocument.deleteMany({ productId: product._id })
    ]);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPopularity = async (req, res) => {
  try {
    const items = await QuoteItem.find({}).populate("product").lean();
    const counts = {};
    items.forEach(item => {
      const key = item.description || item.productNo;
      if (key) counts[key] = (counts[key] || 0) + 1;
    });
    res.status(200).json({ success: true, data: counts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
