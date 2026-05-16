import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true }, // Short summary for the card
    category: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: [String], required: true }, // Array of images
    author: { type: String, default: "Intersys Team" },

    // Project metadata for cases
    client: { type: String },
    location: { type: String },
    scope: { type: [String] },

    // Section 1 (Side-by-side)
    section1Image: { type: String },
    section1Title: { type: String },
    section1Desc: { type: String },
    section1SubTitle: { type: String },
    section1SubDesc: { type: String },
    section1SubImage: { type: String },

    // Article Content
    articleTitle1: { type: String },
    articleContent1: { type: String },
    articleBannerImage: { type: String },
    pdfUrl: { type: String },
    articleTitle2: { type: String },
    articleContent2: { type: String },

    // Technical Gallery (The bottom grid)
    galleryImages: { type: [String] },
    technicalTitle: { type: String },

    // Dynamic Features (Bottom of Article)
    feature1Title: { type: String },
    feature1Desc: { type: String },
    feature2Title: { type: String },
    feature2Desc: { type: String },

}, { timestamps: true });

const Insight = mongoose.model("Insight", insightSchema);

export default Insight;
