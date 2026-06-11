import mongoose from "mongoose";
import Taxonomy from "../model/taxonomy.js";

function parsePath(p) {
  return p ? p.split("/").map(s => s.trim()).filter(Boolean) : [];
}

function navigate(parentArray, pathParts) {
  let arr = parentArray;
  for (const part of pathParts) {
    const found = arr.find(c => c.name === part);
    if (!found) return null;
    arr = found.children || [];
  }
  return arr;
}

const DEFAULT_SEED = [
  {
    category: "Access Control",
    subCategories: [
      { name: "Control Panels", children: [] }, { name: "Control Panel Kits", children: [] },
      { name: "Readers", children: [] }, { name: "Credentials", children: [] },
      { name: "Accessories", children: [] }, { name: "Lobby Kiosks", children: [] },
      { name: "System Agreements & Upgrades", children: [] }, { name: "Door Hardware", children: [] },
    ]
  },
  {
    category: "Surveillance (CCTV)",
    subCategories: [
      { name: "IP Cameras", children: [] }, { name: "Analog Cameras", children: [] },
      { name: "NVR/DVR", children: [] }, { name: "Accessories", children: [] },
    ]
  },
  {
    category: "Building Management",
    subCategories: [
      { name: "Field Devices", children: [] }, { name: "Controllers", children: [] },
      { name: "Software", children: [] }, { name: "Networking", children: [] },
    ]
  },
  { category: "Integrated Systems", subCategories: [] },
  { category: "Audio Visual", subCategories: [] },
  { category: "Fire Systems", subCategories: [] },
  { category: "Leak Detection", subCategories: [] },
];

async function migrateTreeFormat() {
  const db = mongoose.connection.db;
  if (!db) return;
  const docs = await db.collection("taxonomies").find({ subCategories: { $exists: false }, brands: { $exists: true } }).toArray();
  let migrated = 0;
  for (const doc of docs) {
    const flatSubs = [];
    for (const brand of (doc.brands || [])) {
      for (const sub of (brand.subCategories || [])) {
        if (!flatSubs.find(s => s.name === sub.name)) {
          flatSubs.push(sub);
        }
      }
    }
    if (flatSubs.length > 0) {
      await db.collection("taxonomies").updateOne({ _id: doc._id }, { $set: { subCategories: flatSubs }, $unset: { brands: "" } });
      migrated++;
    } else {
      await db.collection("taxonomies").updateOne({ _id: doc._id }, { $set: { subCategories: [] }, $unset: { brands: "" } });
      migrated++;
    }
  }
  if (migrated > 0) console.log(`✅ Migrated ${migrated} taxonomy documents to brandless format`);
}

async function ensureSeeded() {
  const count = await Taxonomy.countDocuments();
  if (count === 0) {
    await Taxonomy.insertMany(DEFAULT_SEED);
    console.log("✅ Taxonomy seeded with default data");
  } else {
    await migrateTreeFormat();
  }
}

export const getAll = async (req, res) => {
  try {
    await ensureSeeded();
    const data = await Taxonomy.find({}).sort({ category: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) return res.status(400).json({ success: false, error: "Category name is required" });
    await ensureSeeded();
    const exists = await Taxonomy.findOne({ category });
    if (exists) return res.status(400).json({ success: false, error: "Category already exists" });
    const doc = await Taxonomy.create({ category, subCategories: [] });
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const { category: newName } = req.body;
    if (!newName) return res.status(400).json({ success: false, error: "New category name is required" });
    const doc = await Taxonomy.findOneAndUpdate({ category: name }, { category: newName }, { new: true });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const doc = await Taxonomy.findOneAndDelete({ category: req.params.name });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createSubcategory = async (req, res) => {
  try {
    const { subCategory, parentPath, title, description, image, heroImage } = req.body;
    if (!subCategory) return res.status(400).json({ success: false, error: "Subcategory name is required" });
    const doc = await Taxonomy.findOne({ category: req.params.name });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });

    const pathParts = parsePath(parentPath || "");
    const arr = pathParts.length === 0 ? doc.subCategories : navigate(doc.subCategories, pathParts);
    if (!arr) return res.status(404).json({ success: false, error: "Parent not found" });
    if (arr.some(c => c.name === subCategory)) return res.status(400).json({ success: false, error: "Subcategory already exists at this level" });

    arr.push({ name: subCategory, title: title || "", description: description || "", image: image || "", heroImage: heroImage || "", children: [] });
    doc.markModified("subCategories");
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { subCategory: newName, parentPath, title, description, image, heroImage } = req.body;
    const doc = await Taxonomy.findOne({ category: req.params.name });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });

    const pathParts = parsePath(parentPath || "");
    const parentArr = pathParts.length === 0 ? doc.subCategories : navigate(doc.subCategories, pathParts);
    if (!parentArr) return res.status(404).json({ success: false, error: "Parent not found" });

    const idx = parentArr.findIndex(c => c.name === req.params.subName);
    if (idx === -1) return res.status(404).json({ success: false, error: "Subcategory not found" });
    if (newName && newName !== req.params.subName && parentArr.some((c, i) => c.name === newName && i !== idx))
      return res.status(400).json({ success: false, error: "Subcategory already exists at this level" });

    if (newName) parentArr[idx].name = newName;
    if (title !== undefined) parentArr[idx].title = title;
    if (description !== undefined) parentArr[idx].description = description;
    if (image !== undefined) parentArr[idx].image = image;
    if (heroImage !== undefined) parentArr[idx].heroImage = heroImage;
    doc.markModified("subCategories");
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const doc = await Taxonomy.findOne({ category: req.params.name });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });

    const parentPath = req.query.parentPath || "";
    const pathParts = parsePath(parentPath);
    const parentArr = pathParts.length === 0 ? doc.subCategories : navigate(doc.subCategories, pathParts);
    if (!parentArr) return res.status(404).json({ success: false, error: "Parent not found" });

    const idx = parentArr.findIndex(c => c.name === req.params.subName);
    if (idx === -1) return res.status(404).json({ success: false, error: "Subcategory not found" });

    parentArr.splice(idx, 1);
    doc.markModified("subCategories");
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
