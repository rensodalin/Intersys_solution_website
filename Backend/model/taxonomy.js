import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subCategories: [{ type: String }]
});

const taxonomySchema = new mongoose.Schema({
    category: { type: String, required: true, unique: true },
    brands: [brandSchema]
}, { timestamps: true });

export default mongoose.model("Taxonomy", taxonomySchema);
