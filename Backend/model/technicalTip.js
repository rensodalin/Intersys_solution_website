import mongoose from "mongoose";

const technicalTipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 }
}, { timestamps: true });

const TechnicalTip = mongoose.model("TechnicalTip", technicalTipSchema);

export default TechnicalTip;
