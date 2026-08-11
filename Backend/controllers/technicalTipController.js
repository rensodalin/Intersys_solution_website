import TechnicalTip from "../model/technicalTip.js";

export const getAll = async (req, res) => {
  try {
    const tips = await TechnicalTip.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: tips });
  } catch (error) {
    console.error("Fetch Technical Tips Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getById = async (req, res) => {
  try {
    const tip = await TechnicalTip.findById(req.params.id);
    if (!tip) {
      return res.status(404).json({ success: false, message: "Technical tip not found" });
    }
    res.json({ success: true, data: tip });
  } catch (error) {
    console.error("Fetch Technical Tip By ID Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const newTip = new TechnicalTip(req.body);
    await newTip.save();
    res.status(201).json({ success: true, data: newTip });
  } catch (error) {
    console.error("Create Technical Tip Error:", error);
    res.status(500).json({ success: false, message: "Failed to create technical tip", error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const tip = await TechnicalTip.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!tip) {
      return res.status(404).json({ success: false, message: "Technical tip not found" });
    }
    res.json({ success: true, data: tip });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update technical tip", error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const tip = await TechnicalTip.findByIdAndDelete(req.params.id);
    if (!tip) {
      return res.status(404).json({ success: false, message: "Technical tip not found" });
    }
    res.json({ success: true, message: "Technical tip deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete technical tip", error: error.message });
  }
};
