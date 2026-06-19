// Migrate embedded user.downloadedPdfs → DownloadedPdf collection
// Run: node scripts/migrateDownloadedPdfs.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "../model/user.js";
import DownloadedPdf from "../model/downloadedPdf.js";

async function migrate() {
  await mongoose.connect(process.env.URI);
  console.log("Connected to MongoDB");

  const users = await User.find({ downloadedPdfs: { $exists: true, $ne: [] } });
  console.log(`Found ${users.length} users with embedded downloadedPdfs`);

  let migrated = 0;
  for (const user of users) {
    const pdfs = user.downloadedPdfs || [];
    if (pdfs.length === 0) continue;

    const items = pdfs.map(p => ({
      userId: user._id,
      title: p.title,
      url: p.url,
      downloadedAt: p.downloadedAt || new Date()
    }));

    await DownloadedPdf.insertMany(items);
    migrated++;
    console.log(`  Migrated user ${user._id} (${items.length} pdfs)`);
  }

  console.log(`\nDone. Migrated ${migrated} users.`);
  await mongoose.disconnect();
}

migrate().catch(err => { console.error(err); process.exit(1); });
