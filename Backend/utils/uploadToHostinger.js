import fs from "fs";
import path from "path";

const MIME_MAP = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

export async function uploadToHostingeri(localFilePath, filename) {
  const uploadUrl = process.env.HOSTINGER_UPLOAD_URL;
  if (!uploadUrl) return null;

  try {
    const fileBuffer = fs.readFileSync(localFilePath);
    const ext = path.extname(filename).toLowerCase();
    const mime = MIME_MAP[ext] || "application/octet-stream";

    const file = new File([fileBuffer], filename, { type: mime });
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(uploadUrl, { method: "POST", body: formData });
    const text = await res.text();

    if (!res.ok) {
      console.error("Hostinger upload failed:", res.status, text);
      return null;
    }

    const data = JSON.parse(text);
    console.log("Hostinger upload response:", data);
    return data.success ? data.url : null;
  } catch (err) {
    console.error("Hostinger upload error:", err);
    return null;
  }
}
