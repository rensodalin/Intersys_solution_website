import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    children: [{ type: mongoose.Schema.Types.Mixed }]
}, { _id: false });

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subCategories: [subCategorySchema]
}, { _id: false });

const taxonomySchema = new mongoose.Schema({
    category: { type: String, required: true, unique: true },
    brands: [brandSchema]
}, { timestamps: true });

export default mongoose.model("Taxonomy", taxonomySchema);
