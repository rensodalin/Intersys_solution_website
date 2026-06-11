import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    children: [{ type: mongoose.Schema.Types.Mixed }]
}, { _id: false });

const taxonomySchema = new mongoose.Schema({
    category: { type: String, required: true, unique: true },
    subCategories: [subCategorySchema]
}, { timestamps: true });

export default mongoose.model("Taxonomy", taxonomySchema);
