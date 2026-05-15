import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    client: { type: String },
    location: { type: String },
    scope: { type: [String], default: [] },
    slug: { type: String },
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;
