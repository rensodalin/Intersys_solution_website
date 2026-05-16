import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: [String], required: true },
    author: { type: String, default: "Intersys Team" },

    // Project Metadata
    client: { type: String },
    location: { type: String },
    scope: { type: [String] },

    // Section 1
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

    // Gallery
    galleryImages: { type: [String] },
    technicalTitle: { type: String },

}, { timestamps: true });

const Insight = mongoose.model("Insight", insightSchema);

export default Insight;
