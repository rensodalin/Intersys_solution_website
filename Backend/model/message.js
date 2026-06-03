import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String, default: "" },
    content: { type: String, required: true },
    source: { type: String, enum: ["contact", "quote", "reply"], required: true },
    sourceId: { type: mongoose.Schema.Types.ObjectId, default: null },
    isFromAdmin: { type: Boolean, default: false },
    read: { type: Boolean, default: false }
}, { timestamps: true });

messageSchema.index({ email: 1, createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
