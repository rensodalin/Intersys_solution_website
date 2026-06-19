import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../model/product.js";
import Category from "../model/category.js";

dotenv.config();

async function migrate() {
  await mongoose.connect(process.env.URI);
  console.log("Connected to MongoDB");

  const products = await Product.find({ categoryRef: { $exists: false } });
  console.log(`Found ${products.length} products without categoryRef`);

  let updated = 0;
  for (const product of products) {
    const cat = await Category.findOne({ name: product.category });
    if (cat) {
      await Product.updateOne(
        { _id: product._id },
        { $set: { categoryRef: cat._id } }
      );
      updated++;
    } else {
      console.log(`No category found for product "${product.title}" (category: "${product.category}")`);
    }
  }

  console.log(`Updated ${updated} products with categoryRef`);
  process.exit(0);
}

migrate().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
