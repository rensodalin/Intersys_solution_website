import mongoose from "mongoose";

const downloadedPdfSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  title: { type: String, required: true },
  url: { type: String, required: true },
  downloadedAt: { type: Date, default: Date.now }
});

const DownloadedPdf = mongoose.model("DownloadedPdf", downloadedPdfSchema);

export default DownloadedPdf;
