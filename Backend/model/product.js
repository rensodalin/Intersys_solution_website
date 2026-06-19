import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    categoryRef: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: String, default: "" },
    title: { type: String, required: true },
    description: { type: String },
    mainImage: { type: String },
    thumbnails: [{ type: String }],
    brandSubCategory: { type: String },
    brandSubCategoryLink: { type: String },
    longDescription: { type: String },
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductOption" }],
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductDocument" }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
