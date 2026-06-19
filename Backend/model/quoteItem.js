import mongoose from "mongoose";

const quoteItemSchema = new mongoose.Schema({
  quoteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quote",
    required: true,
    index: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    default: null
  },
  productId: { type: String, default: "" },
  qty: { type: String, required: true },
  productNo: { type: String, required: true },
  description: { type: String, required: true },
  application: { type: String, required: true },
  price: { type: Number, default: 0 }
});

const QuoteItem = mongoose.model("QuoteItem", quoteItemSchema);

export default QuoteItem;
