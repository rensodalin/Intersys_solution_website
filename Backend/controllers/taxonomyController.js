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

function flattenTree(arr, prefix = "") {
  const result = [];
  for (const item of arr) {
    const path = prefix ? `${prefix}/${item.name}` : item.name;
    result.push(path);
    if (item.children && item.children.length > 0) {
      result.push(...flattenTree(item.children, path));
    }
  }
  return result;
}

const DEFAULT_SEED = [
  {
    category: "Access Control",
    brands: [
      { name: "Honeywell", subCategories: [
        { name: "Control Panels", children: [] }, { name: "Control Panel Kits", children: [] },
        { name: "Readers", children: [] }, { name: "Credentials", children: [] },
        { name: "Accessories", children: [] }, { name: "Lobby Kiosks", children: [] },
        { name: "System Agreements & Upgrades", children: [] }, { name: "Door Hardware", children: [] },
      ]},
      { name: "SALTO", subCategories: [
        { name: "Electronic Locks", children: [] }, { name: "Online Systems", children: [] },
        { name: "Offline Systems", children: [] }, { name: "Mobile & Cloud", children: [] },
      ]},
    ]
  },
  {
    category: "Surveillance (CCTV)",
    brands: [
      { name: "Intersys", subCategories: [
        { name: "IP Cameras", children: [] }, { name: "Analog Cameras", children: [] },
        { name: "NVR/DVR", children: [] }, { name: "Accessories", children: [] },
      ]},
      { name: "Hikvision", subCategories: [
        { name: "IP Cameras", children: [] }, { name: "NVR/DVR", children: [] }, { name: "Accessories", children: [] },
      ]},
      { name: "Dahua", subCategories: [
        { name: "IP Cameras", children: [] }, { name: "NVR/DVR", children: [] }, { name: "Accessories", children: [] },
      ]},
      { name: "Axis", subCategories: [
        { name: "IP Cameras", children: [] }, { name: "Accessories", children: [] },
      ]},
    ]
  },
  {
    category: "Building Management",
    brands: [
      { name: "Schneider Electric", subCategories: [
        { name: "Field Devices", children: [] }, { name: "Controllers", children: [] },
        { name: "Software", children: [] }, { name: "Networking", children: [] },
      ]},
      { name: "Siemens", subCategories: [
        { name: "Field Devices", children: [] }, { name: "Controllers", children: [] }, { name: "Software", children: [] },
      ]},
      { name: "Johnson Controls", subCategories: [
        { name: "Field Devices", children: [] }, { name: "Controllers", children: [] },
      ]},
      { name: "Other", subCategories: [{ name: "General", children: [] }] },
    ]
  },
  { category: "Integrated Systems", brands: [] },
  { category: "Audio Visual", brands: [] },
  { category: "Fire Systems", brands: [] },
  { category: "Leak Detection", brands: [] },
];

async function migrateTreeFormat() {
  const db = mongoose.connection.db;
  if (!db) return;
  const docs = await db.collection("taxonomies").find({ "brands.subCategories": { $exists: true } }).toArray();
  let migrated = 0;
  for (const doc of docs) {
    let changed = false;
    for (const brand of doc.brands) {
      if (brand.subCategories && brand.subCategories.length > 0 && typeof brand.subCategories[0] === "string") {
        brand.subCategories = brand.subCategories.map(s => ({ name: s, children: [] }));
        changed = true;
      }
    }
    if (changed) {
      await db.collection("taxonomies").updateOne({ _id: doc._id }, { $set: { brands: doc.brands } });
      migrated++;
    }
  }
  if (migrated > 0) console.log(`✅ Migrated ${migrated} taxonomy documents to tree format`);
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
    const doc = await Taxonomy.create({ category, brands: [] });
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

export const createBrand = async (req, res) => {
  try {
    const { name: brandName } = req.body;
    if (!brandName) return res.status(400).json({ success: false, error: "Brand name is required" });
    const doc = await Taxonomy.findOne({ category: req.params.name });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
    if (doc.brands.some(b => b.name === brandName)) return res.status(400).json({ success: false, error: "Brand already exists in this category" });
    doc.brands.push({ name: brandName, subCategories: [] });
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { name: newBrandName } = req.body;
    if (!newBrandName) return res.status(400).json({ success: false, error: "New brand name is required" });
    const doc = await Taxonomy.findOne({ category: req.params.name });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
    const brand = doc.brands.find(b => b.name === req.params.brandName);
    if (!brand) return res.status(404).json({ success: false, error: "Brand not found" });
    brand.name = newBrandName;
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const doc = await Taxonomy.findOne({ category: req.params.name });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
    doc.brands = doc.brands.filter(b => b.name !== req.params.brandName);
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createSubcategory = async (req, res) => {
  try {
    const { subCategory, parentPath } = req.body;
    if (!subCategory) return res.status(400).json({ success: false, error: "Subcategory name is required" });
    const doc = await Taxonomy.findOne({ category: req.params.name });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
    const brand = doc.brands.find(b => b.name === req.params.brandName);
    if (!brand) return res.status(404).json({ success: false, error: "Brand not found" });

    const pathParts = parsePath(parentPath || "");
    const arr = pathParts.length === 0 ? brand.subCategories : navigate(brand.subCategories, pathParts);
    if (!arr) return res.status(404).json({ success: false, error: "Parent not found" });
    if (arr.some(c => c.name === subCategory)) return res.status(400).json({ success: false, error: "Subcategory already exists at this level" });

    arr.push({ name: subCategory, children: [] });
    doc.markModified("brands");
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { subCategory: newName, parentPath } = req.body;
    if (!newName) return res.status(400).json({ success: false, error: "New subcategory name is required" });
    const doc = await Taxonomy.findOne({ category: req.params.name });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
    const brand = doc.brands.find(b => b.name === req.params.brandName);
    if (!brand) return res.status(404).json({ success: false, error: "Brand not found" });

    const pathParts = parsePath(parentPath || "");
    const parentArr = pathParts.length === 0 ? brand.subCategories : navigate(brand.subCategories, pathParts);
    if (!parentArr) return res.status(404).json({ success: false, error: "Parent not found" });

    const idx = parentArr.findIndex(c => c.name === req.params.subName);
    if (idx === -1) return res.status(404).json({ success: false, error: "Subcategory not found" });
    if (parentArr.some((c, i) => c.name === newName && i !== idx)) return res.status(400).json({ success: false, error: "Subcategory already exists at this level" });

    parentArr[idx].name = newName;
    doc.markModified("brands");
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
    const brand = doc.brands.find(b => b.name === req.params.brandName);
    if (!brand) return res.status(404).json({ success: false, error: "Brand not found" });

    const parentPath = req.query.parentPath || "";
    const pathParts = parsePath(parentPath);
    const parentArr = pathParts.length === 0 ? brand.subCategories : navigate(brand.subCategories, pathParts);
    if (!parentArr) return res.status(404).json({ success: false, error: "Parent not found" });

    const idx = parentArr.findIndex(c => c.name === req.params.subName);
    if (idx === -1) return res.status(404).json({ success: false, error: "Subcategory not found" });

    parentArr.splice(idx, 1);
    doc.markModified("brands");
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getFlatSubcategories = async (req, res) => {
  try {
    const doc = await Taxonomy.findOne({ category: req.params.name }).lean();
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });
    const brand = doc.brands.find(b => b.name === req.params.brandName);
    if (!brand) return res.status(404).json({ success: false, error: "Brand not found" });
    const flat = flattenTree(brand.subCategories);
    res.json({ success: true, data: flat });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
