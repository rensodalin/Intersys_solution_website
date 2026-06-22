import Category from "../model/category.js";
import Product from "../model/product.js";


async function ensureSeeded() {
  const count = await Category.countDocuments({ parent: null });
  if (count > 0) return;

  for (const root of DEFAULT_SEED) {
    const { children, ...rootData } = root;
    const parent = await Category.create(rootData);
    for (const child of (children || [])) {
      await Category.create({ ...child, parent: parent._id });
    }
  }
  console.log("✅ Taxonomy seeded with default data");
}

function buildTree(categories) {
  const map = {};
  const roots = [];

  categories.forEach(c => {
    map[c._id] = { ...c, subCategories: [] };
  });

  categories.forEach(c => {
    if (c.parent && map[c.parent]) {
      map[c.parent].subCategories.push(map[c._id]);
    } else if (!c.parent) {
      roots.push(map[c._id]);
    }
  });

  return roots.map(root => ({
    _id: root._id,
    category: root.name,
    image: root.image || "",
    subCategories: root.subCategories.map(buildSubTree)
  }));
}

function buildSubTree(node) {
  return {
    name: node.name,
    title: node.label || "",
    description: node.description || "",
    image: node.image || "",
    heroImage: node.heroImage || "",
    children: (node.subCategories || []).map(buildSubTree)
  };
}

function getNodePath(node, pathParts) {
  if (pathParts.length === 0) return node;
  const [head, ...rest] = pathParts;
  const child = (node.subCategories || []).find(c => c.name === head);
  if (!child) return null;
  return getNodePath(child, rest);
}

export const getAll = async (req, res) => {
  try {
    await ensureSeeded();
    const all = await Category.find({}).sort({ order: 1, name: 1 }).lean();
    const tree = buildTree(all);
    res.json({ success: true, data: tree });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { category, image } = req.body;
    if (!category) return res.status(400).json({ success: false, error: "Category name is required" });
    await ensureSeeded();

    const exists = await Category.findOne({ name: category, parent: null });
    if (exists) return res.status(400).json({ success: false, error: "Category already exists" });

    const doc = await Category.create({ name: category, image: image || "" });
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const { category: newName, image } = req.body;

    const doc = await Category.findOne({ name, parent: null });
    if (!doc) return res.status(404).json({ success: false, error: "Category not found" });

    if (newName) doc.name = newName;
    if (image !== undefined) doc.image = image;
    await doc.save();

    if (newName && newName !== name) {
      await Product.updateMany(
        { categoryRef: doc._id },
        { $set: { category: newName } }
      );
    }

    const all = await Category.find({}).sort({ order: 1, name: 1 }).lean();
    const tree = buildTree(all);
    const updated = tree.find(t => t._id.equals(doc._id) || t.category === (newName || name));
    res.json({ success: true, data: updated || doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const root = await Category.findOne({ name: req.params.name, parent: null });
    if (!root) return res.status(404).json({ success: false, error: "Category not found" });

    await Category.deleteMany({
      $or: [{ _id: root._id }, { parent: root._id }]
    });

    await Product.deleteMany({ categoryRef: root._id });

    res.json({ success: true, data: root });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

function parsePath(p) {
  return p ? p.split("/").map(s => s.trim()).filter(Boolean) : [];
}

export const createSubcategory = async (req, res) => {
  try {
    const { subCategory, parentPath, title, description, image, heroImage } = req.body;
    if (!subCategory) return res.status(400).json({ success: false, error: "Subcategory name is required" });

    const root = await Category.findOne({ name: req.params.name, parent: null });
    if (!root) return res.status(404).json({ success: false, error: "Category not found" });

    const pathParts = parsePath(parentPath || "");
    let parent = root;

    for (const part of pathParts) {
      const child = await Category.findOne({ name: part, parent: parent._id });
      if (!child) return res.status(404).json({ success: false, error: `Parent "${part}" not found in path` });
      parent = child;
    }

    const exists = await Category.findOne({ name: subCategory, parent: parent._id });
    if (exists) return res.status(400).json({ success: false, error: "Subcategory already exists at this level" });

    await Category.create({
      name: subCategory,
      label: title || "",
      description: description || "",
      image: image || "",
      heroImage: heroImage || "",
      parent: parent._id
    });

    const all = await Category.find({}).sort({ order: 1, name: 1 }).lean();
    const tree = buildTree(all);
    res.status(201).json({ success: true, data: tree.find(t => t._id.equals(root._id)) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { subCategory: newName, parentPath, title, description, image, heroImage } = req.body;

    const root = await Category.findOne({ name: req.params.name, parent: null });
    if (!root) return res.status(404).json({ success: false, error: "Category not found" });

    const pathParts = parsePath(parentPath || "");
    let parent = root;

    for (const part of pathParts) {
      const child = await Category.findOne({ name: part, parent: parent._id });
      if (!child) return res.status(404).json({ success: false, error: "Parent not found" });
      parent = child;
    }

    const doc = await Category.findOne({ name: req.params.subName, parent: parent._id });
    if (!doc) return res.status(404).json({ success: false, error: "Subcategory not found" });

    if (newName && newName !== req.params.subName) {
      const dup = await Category.findOne({ name: newName, parent: parent._id });
      if (dup) return res.status(400).json({ success: false, error: "Subcategory already exists at this level" });
      doc.name = newName;
    }
    if (title !== undefined) doc.label = title;
    if (description !== undefined) doc.description = description;
    if (image !== undefined) doc.image = image;
    if (heroImage !== undefined) doc.heroImage = heroImage;
    await doc.save();

    const all = await Category.find({}).sort({ order: 1, name: 1 }).lean();
    const tree = buildTree(all);
    res.json({ success: true, data: tree.find(t => t._id.equals(root._id)) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const root = await Category.findOne({ name: req.params.name, parent: null });
    if (!root) return res.status(404).json({ success: false, error: "Category not found" });

    const parentPath = req.query.parentPath || "";
    const pathParts = parsePath(parentPath);
    let parent = root;

    for (const part of pathParts) {
      const child = await Category.findOne({ name: part, parent: parent._id });
      if (!child) return res.status(404).json({ success: false, error: "Parent not found" });
      parent = child;
    }

    const doc = await Category.findOne({ name: req.params.subName, parent: parent._id });
    if (!doc) return res.status(404).json({ success: false, error: "Subcategory not found" });

    const allDescendants = await Category.find({
      $or: [{ _id: doc._id }, { parent: doc._id }]
    });
    const idsToDelete = allDescendants.map(d => d._id);

    const subTreeRoots = allDescendants.filter(d => d._id.equals(doc._id) || d.parent.equals(doc._id));
    const subNames = subTreeRoots.map(d => d.name);

    await Category.deleteMany({ _id: { $in: idsToDelete } });

    if (subNames.length > 0) {
      const subNamePattern = new RegExp(`(^|/)(${subNames.join("|")})$`);
      await Product.deleteMany({
        category: req.params.name,
        brandSubCategory: { $regex: subNamePattern }
      });
    }

    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
