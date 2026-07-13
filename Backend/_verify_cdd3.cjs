const mongoose = require("mongoose");
require("dotenv").config();
async function main() {
  await mongoose.connect(process.env.URI);
  const db = mongoose.connection.db;
  const products = await db.collection("products").find({ productId: /CDD3/ }).project({ productId: 1, title: 1 }).toArray();
  console.log("CDD3 products:", products.length);
  products.forEach(p => console.log("  " + p.productId + " - " + p.title));
  // Get options for CDD3
  const prod = await db.collection("products").findOne({ productId: /CDD3/ });
  if (prod) {
    const opts = await db.collection("productoptions").find({ productId: prod._id }).toArray();
    console.log("Options count:", opts.length);
    console.log("First 3 options:");
    opts.slice(0, 3).forEach(o => console.log("  " + o.partCode + " | " + o.specification));
    console.log("Last 3 options:");
    opts.slice(-3).forEach(o => console.log("  " + o.partCode + " | " + o.specification));
  }
  await mongoose.disconnect();
}
main().catch(e => { console.error(e.message); process.exit(1); });
