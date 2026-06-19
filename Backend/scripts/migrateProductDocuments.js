// Migrate embedded product.documents → ProductDocument collection
// Run: node scripts/migrateProductDocuments.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Product from "../model/product.js";
import ProductDocument from "../model/productDocument.js";

async function migrate() {
  await mongoose.connect(process.env.URI);
  console.log("Connected to MongoDB");

  const products = await Product.find({}).lean();
  let migrated = 0;

  for (const product of products) {
    if (!product.documents || product.documents.length === 0) continue;
    if (typeof product.documents[0] === "object" && product.documents[0]._id) continue;

    const docDocs = product.documents.map(d => ({
      productId: product._id,
      name: d.name,
      url: d.url
    }));

    const saved = await ProductDocument.insertMany(docDocs);
    await Product.findByIdAndUpdate(product._id, {
      $set: { documents: saved.map(d => d._id) }
    });
    migrated++;
    console.log(`  Migrated product ${product.productId} (${saved.length} documents)`);
  }

  console.log(`\nDone. Migrated ${migrated} products.`);
  await mongoose.disconnect();
}

migrate().catch(err => { console.error(err); process.exit(1); });
