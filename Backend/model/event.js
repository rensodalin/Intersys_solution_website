import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    category: { type: String, default: "Company Event" },
    date: { type: String, default: "" },
    time: { type: String, default: "" },
    location: { type: String, default: "" },
    image: { type: String, default: "" },
    registrationUrl: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    galleryImages: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
