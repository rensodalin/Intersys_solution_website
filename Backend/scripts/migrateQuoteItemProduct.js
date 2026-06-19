// Resolve QuoteItem.productId (string) → QuoteItem.product (ObjectId ref)
// Run: node scripts/migrateQuoteItemProduct.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import QuoteItem from "../model/quoteItem.js";
import Product from "../model/product.js";

async function migrate() {
  await mongoose.connect(process.env.URI);
  console.log("Connected to MongoDB");

  const items = await QuoteItem.find({ product: null, productId: { $ne: "" } }).lean();
  console.log(`Found ${items.length} QuoteItems with productId but no product ref`);

  let resolved = 0;
  for (const item of items) {
    const product = await Product.findOne({ productId: item.productId }).lean();
    if (product) {
      await QuoteItem.findByIdAndUpdate(item._id, { $set: { product: product._id } });
      resolved++;
    }
  }

  console.log(`Resolved ${resolved} QuoteItems to Product references`);
  await mongoose.disconnect();
}

migrate().catch(err => { console.error(err); process.exit(1); });
