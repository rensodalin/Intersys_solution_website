import fs from "fs";

export async function uploadToHostinger(localFilePath, filename) {
  const uploadUrl = process.env.HOSTINGER_UPLOAD_URL;
  if (!uploadUrl) return null;

  const fileBuffer = fs.readFileSync(localFilePath);
  const blob = new Blob([fileBuffer]);
  const formData = new FormData();
  formData.append("file", blob, filename);

  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    console.error("Hostinger upload failed:", res.status, await res.text());
    return null;
  }

  const data = await res.json();
  return data.success ? data.url : null;
}
