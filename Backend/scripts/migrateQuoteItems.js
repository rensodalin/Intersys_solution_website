// Migrate embedded quote.products → QuoteItem collection
// Run: node scripts/migrateQuoteItems.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Quote from "../model/quote.js";
import QuoteItem from "../model/quoteItem.js";

async function migrate() {
  await mongoose.connect(process.env.URI);
  console.log("Connected to MongoDB");

  const quotes = await Quote.find({ products: { $exists: true, $ne: [] } });
  console.log(`Found ${quotes.length} quotes with embedded products`);

  let migrated = 0;
  for (const quote of quotes) {
    const embeddedProducts = quote.products || [];
    if (embeddedProducts.length === 0 || typeof embeddedProducts[0] === "object" && embeddedProducts[0]._id) continue;

    const items = embeddedProducts.map(p => ({
      quoteId: quote._id,
      productId: p.productId || "",
      qty: p.qty,
      productNo: p.productNo,
      description: p.description,
      application: p.application,
      price: p.price || 0
    }));

    const savedItems = await QuoteItem.insertMany(items);
    quote.products = savedItems.map(item => item._id);
    await quote.save();
    migrated++;
    console.log(`  Migrated quote ${quote._id} (${savedItems.length} items)`);
  }

  console.log(`\nDone. Migrated ${migrated} quotes.`);
  await mongoose.disconnect();
}

migrate().catch(err => { console.error(err); process.exit(1); });
