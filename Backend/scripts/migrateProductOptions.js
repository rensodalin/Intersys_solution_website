// Migrate embedded product.options → ProductOption collection
// Run: node scripts/migrateProductOptions.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Product from "../model/product.js";
import ProductOption from "../model/productOption.js";

async function migrate() {
  await mongoose.connect(process.env.URI);
  console.log("Connected to MongoDB");

  const products = await Product.find({}).lean();
  let migrated = 0;

  for (const product of products) {
    if (!product.options || product.options.length === 0) continue;
    if (typeof product.options[0] === "object" && product.options[0]._id) continue;

    const optionDocs = product.options.map(opt => ({
      productId: product._id,
      partCode: opt.partCode,
      specification: opt.specification,
      price: opt.price || 0,
      qty: opt.qty || 0
    }));

    const saved = await ProductOption.insertMany(optionDocs);
    await Product.findByIdAndUpdate(product._id, {
      $set: { options: saved.map(o => o._id) }
    });
    migrated++;
    console.log(`  Migrated product ${product.productId} (${saved.length} options)`);
  }

  console.log(`\nDone. Migrated ${migrated} products.`);
  await mongoose.disconnect();
}

migrate().catch(err => { console.error(err); process.exit(1); });
