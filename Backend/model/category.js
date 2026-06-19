import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  heroImage: { type: String, default: "" },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
    index: true
  },
  order: { type: Number, default: 0 }
}, { timestamps: true });

categorySchema.index({ parent: 1, name: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
