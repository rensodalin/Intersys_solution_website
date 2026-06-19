import mongoose from "mongoose";

const productDocumentSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true
  },
  name: { type: String },
  url: { type: String }
});

const ProductDocument = mongoose.model("ProductDocument", productDocumentSchema);

export default ProductDocument;
