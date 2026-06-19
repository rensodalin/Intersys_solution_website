import mongoose from "mongoose";

const productOptionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true
  },
  partCode: { type: String, required: true },
  specification: { type: String },
  price: { type: Number, default: 0 },
  qty: { type: Number, default: 0 }
});

const ProductOption = mongoose.model("ProductOption", productOptionSchema);

export default ProductOption;
