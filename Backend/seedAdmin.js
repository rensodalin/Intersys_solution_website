/**
 * seedAdmin.js — Run once to create (or update) the default admin account.
 * Usage: node seedAdmin.js
 *
 * Reads credentials from .env:
 *   ADMIN_EMAIL    — admin account email   (default: admin@intersys.com)
 *   ADMIN_PASSWORD — admin account password (default: Admin@Intersys2025!)
 */

import "dotenv/config";
import mongoose from "mongoose";
import User from "./model/user.js";

const MONGO_URI = process.env.URI;
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || "admin@intersys.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@Intersys2025!";
const ADMIN_NAME     = "Intersys Admin";

if (!MONGO_URI) {
    console.error("❌  No MONGO URI found. Check your .env file.");
    process.exit(1);
}

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅  Connected to MongoDB");

        const existing = await User.findOne({ email: ADMIN_EMAIL });

        if (existing) {
            // Update the existing user to ensure isAdmin = true
            existing.isAdmin = true;
            existing.name    = existing.name || ADMIN_NAME;
            existing.password = ADMIN_PASSWORD;          // will be re-hashed by pre-save hook
            await existing.save();
            console.log(`♻️   Admin account updated for: ${ADMIN_EMAIL}`);
        } else {
            // Create a fresh admin account
            const admin = new User({
                firstName : "Intersys",
                lastName  : "Admin",
                name      : ADMIN_NAME,
                email     : ADMIN_EMAIL,
                password  : ADMIN_PASSWORD,
                isAdmin   : true,
                gender    : "other",
                country   : "Cambodia",
            });
            await admin.save();
            console.log(`🎉  Admin account created: ${ADMIN_EMAIL}`);
        }

        console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("  Admin Login Credentials");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log(`  Email    : ${ADMIN_EMAIL}`);
        console.log(`  Password : ${ADMIN_PASSWORD}`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    } catch (err) {
        console.error("❌  Seed failed:", err);
    } finally {
        await mongoose.disconnect();
        console.log("🔌  Disconnected from MongoDB");
        process.exit(0);
    }
}

seed();
