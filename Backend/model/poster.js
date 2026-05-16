import mongoose from "mongoose";

const posterSchema = new mongoose.Schema({
    image: { type: String, required: true },
    link: { type: String, required: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

const Poster = mongoose.model("Poster", posterSchema);

export default Poster;
