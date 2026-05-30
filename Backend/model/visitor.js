import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    page: { type: String, default: "/" },
    visitDate: { type: String, required: true },
    visitedAt: { type: Date, default: Date.now }
}, { timestamps: false });

visitorSchema.index({ sessionId: 1, visitDate: 1 }, { unique: true });
visitorSchema.index({ visitedAt: -1 });

const VisitorVisit = mongoose.model("VisitorVisit", visitorSchema);

export default VisitorVisit;
