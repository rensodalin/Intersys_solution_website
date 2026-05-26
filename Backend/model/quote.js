import mongoose from "mongoose";

const productRowSchema = new mongoose.Schema({
    qty: { type: String, required: true },
    productNo: { type: String, required: true },
    description: { type: String, required: true },
    application: { type: String, required: true }
});

const quoteSchema = new mongoose.Schema({
    solutionCategories: [{ type: String }],
    products: [productRowSchema],
    sections: [{ type: String }],
    name: { type: String, required: true },
    company: { type: String, required: true },
    title: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    contactMethod: { type: String, enum: ["Email", "Phone", "Either"] },
    newsletter: { type: String },
    companyType: { type: String, required: true },
    bmsSystem: { type: String, required: true },
    otherBms: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quote", quoteSchema);
