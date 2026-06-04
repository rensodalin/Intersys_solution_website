import mongoose from "mongoose";

const posterSchema = new mongoose.Schema({
    image: { type: String, required: true },
    link: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    facebookLink: { type: String, default: "" },
    linkedinLink: { type: String, default: "" },
    order: { type: Number, default: 0 }
}, { timestamps: true });

const Poster = mongoose.model("Poster", posterSchema);

export default Poster;
