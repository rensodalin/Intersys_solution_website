import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    solutionCategories: [{ type: String }],
    sections: [{ type: String }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuoteItem" }],
    name: { type: String, required: true },
    company: { type: String, required: true },
    title: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    contactpreference: { type: String, enum: ["Email", "Phone", "Either"] },
    newsletter: { type: String },
    companyType: { type: String, required: true },
    bmsSystem: { type: String },
    otherBms: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quote", quoteSchema);
