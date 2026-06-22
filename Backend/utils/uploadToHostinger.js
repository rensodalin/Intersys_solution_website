import fs from "fs";
import path from "path";

const MIME_MAP = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

export async function uploadToHostinger(localFilePath, filename) {
  const uploadUrl = process.env.HOSTINGER_UPLOAD_URL;
  if (!uploadUrl) return null;

  const fileBuffer = fs.readFileSync(localFilePath);
  const ext = path.extname(filename).toLowerCase();
  const mime = MIME_MAP[ext] || "application/octet-stream";
  const blob = new Blob([fileBuffer], { type: mime });
  const formData = new FormData();
  formData.append("file", blob, filename);

  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Hostinger upload failed:", res.status, text);
    return null;
  }

  try {
    const data = JSON.parse(text);
    return data.success ? data.url : null;
  } catch {
    console.error("Hostinger upload: invalid JSON response", text);
    return null;
  }
}
