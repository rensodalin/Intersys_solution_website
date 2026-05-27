import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple null/missing values
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    name: { // Keeping for Google compatibility
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    country: {
        type: String,
    },
    role: {
        type: String,
        enum: ["engineer", "project manager", "architect", "technician", "director", "procurement", "consultant", "other"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    },
    newsletter: {
        type: Boolean,
        default: false
    },
    receiveUpdates: {
        type: Boolean,
        default: false
    },
    downloadedPdfs: [{
        title: { type: String, required: true },
        url: { type: String, required: true },
        downloadedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err;
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
