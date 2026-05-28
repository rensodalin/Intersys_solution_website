import mongoose from "mongoose";

const productOptionSchema = new mongoose.Schema({
    partCode: { type: String, required: true },
    specification: { type: String },
    price: { type: Number, default: 0 },
    qty: { type: Number, default: 0 }
});

const documentSchema = new mongoose.Schema({
    name: { type: String },
    url: { type: String }
});

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    mainImage: { type: String },
    thumbnails: [{ type: String }],
    brandSubCategory: { type: String },
    brandSubCategoryLink: { type: String },
    longDescription: { type: String },
    options: [productOptionSchema],
    documents: [documentSchema],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
