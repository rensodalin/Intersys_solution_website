// Migrate embedded taxonomy.subCategories → Category collection (adjacency list)
// Run: node scripts/migrateCategories.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Taxonomy from "../model/taxonomy.js";
import Category from "../model/category.js";

function flatten(node, parentId = null) {
  const doc = { name: node.name, label: node.title || "", description: node.description || "", image: node.image || "", heroImage: node.heroImage || "", parent: parentId };
  const result = [doc];
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      result.push(...flatten(child, null));
    });
  }
  return result;
}

async function migrate() {
  await mongoose.connect(process.env.URI);
  console.log("Connected to MongoDB");

  const existing = await Category.countDocuments();
  if (existing > 0) {
    console.log("Categories already migrated. Skipping.");
    await mongoose.disconnect();
    return;
  }

  const taxonomies = await Taxonomy.find({ category: { $ne: "__seeded__" } }).lean();
  let migrated = 0;

  for (const tax of taxonomies) {
    const root = await Category.create({
      name: tax.category,
      image: tax.image || "",
      parent: null
    });

    if (tax.subCategories && tax.subCategories.length > 0) {
      for (const sub of tax.subCategories) {
        const subDoc = await Category.create({
          name: sub.name,
          label: sub.title || "",
          description: sub.description || "",
          image: sub.image || "",
          heroImage: sub.heroImage || "",
          parent: root._id
        });

        if (sub.children && sub.children.length > 0) {
          for (const child of sub.children) {
            await Category.create({
              name: child.name,
              label: child.title || "",
              description: child.description || "",
              image: child.image || "",
              heroImage: child.heroImage || "",
              parent: subDoc._id
            });
          }
        }
      }
    }
    migrated++;
    console.log(`  Migrated taxonomy "${tax.category}"`);
  }

  console.log(`\nDone. Migrated ${migrated} taxonomies.`);
  await mongoose.disconnect();
}

migrate().catch(err => { console.error(err); process.exit(1); });
