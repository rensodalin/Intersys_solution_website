import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.URI) {
            throw new Error("URI is not defined in the environment variables.");
        }
        await mongoose.connect(process.env.URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
