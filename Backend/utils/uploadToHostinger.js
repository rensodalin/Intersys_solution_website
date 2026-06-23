import fs from "fs";
import ftp from "basic-ftp";
import path from "path";

export async function uploadToHostinger(localFilePath, filename) {
  const host = process.env.FTP_HOST;
  if (!host) return null;

  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: parseInt(process.env.FTP_PORT || "21"),
      secure: process.env.FTP_SECURE === "true",
    });

    const remoteDir = process.env.FTP_REMOTE_DIR || "/public_html/uploads/avatars";
    await client.ensureDir(remoteDir);
    await client.uploadFrom(localFilePath, `${remoteDir}/${filename}`);

    const publicUrl = `${process.env.FTP_PUBLIC_URL || "https://intersys-solution.com"}/uploads/avatars/${filename}`;
    console.log("Avatar uploaded to Hostinger via FTP:", publicUrl);
    return publicUrl;
  } catch (err) {
    console.error("FTP upload error:", err);
    return null;
  } finally {
    client.close();
  }
}
