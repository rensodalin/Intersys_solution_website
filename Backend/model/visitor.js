import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    page: { type: String, default: "/" },
    visitedAt: { type: Date, default: Date.now }
}, { timestamps: false });

visitorSchema.index({ sessionId: 1, visitedAt: 1 });
visitorSchema.index({ visitedAt: -1 });

const VisitorVisit = mongoose.model("VisitorVisit", visitorSchema);

export default VisitorVisit;
