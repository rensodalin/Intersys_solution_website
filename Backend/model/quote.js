import mongoose from "mongoose";

const productRowSchema = new mongoose.Schema({
    qty: { type: String },
    productNo: { type: String },
    description: { type: String },
    application: { type: String }
});

const quoteSchema = new mongoose.Schema({
    solutionCategories: [{ type: String }],
    products: [productRowSchema],
    sections: [{ type: String }],
    name: { type: String, required: true },
    company: { type: String, required: true },
    title: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    contactMethod: { type: String, enum: ["Email", "Phone", "Either"] },
    newsletter: { type: String },
    companyType: { type: String },
    bmsSystem: { type: String },
    otherBms: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quote", quoteSchema);
