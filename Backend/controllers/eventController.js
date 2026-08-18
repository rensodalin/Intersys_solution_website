import mongoose from "mongoose";
import Event from "../model/event.js";

// Public: Get all active events for visitors
export const getActive = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ isFeatured: -1, order: 1, createdAt: -1 });
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Get all events
export const getAll = async (req, res) => {
  try {
    const events = await Event.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Get single event by ID
export const getById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Create new event
export const create = async (req, res) => {
  try {
    const {
      title,
      tagline,
      description,
      category,
      date,
      time,
      location,
      image,
      registrationUrl,
      highlights,
      galleryImages,
      isActive,
      isFeatured,
      order,
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required." });
    }

    const event = new Event({
      title,
      tagline: tagline || "",
      description: description || "",
      category: category || "Company Event",
      date: date || "",
      time: time || "",
      location: location || "",
      image: image || "",
      registrationUrl: registrationUrl || "",
      highlights: Array.isArray(highlights) ? highlights : [],
      galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured !== undefined ? isFeatured : true,
      order: order !== undefined ? order : 0,
    });

    await event.save();
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Update event
export const update = async (req, res) => {
  try {
    const {
      title,
      tagline,
      description,
      category,
      date,
      time,
      location,
      image,
      registrationUrl,
      highlights,
      galleryImages,
      isActive,
      isFeatured,
      order,
    } = req.body;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        tagline,
        description,
        category,
        date,
        time,
        location,
        image,
        registrationUrl,
        highlights,
        galleryImages,
        isActive,
        isFeatured,
        order,
      },
      { returnDocument: 'after', runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Toggle active status
export const toggleActive = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    event.isActive = !event.isActive;
    await event.save();
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Remove event
export const remove = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
