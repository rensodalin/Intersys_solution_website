<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

if (!isset($_FILES["file"]) || $_FILES["file"]["error"] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No file uploaded or upload error"]);
    exit;
}

$allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
if (!in_array($_FILES["file"]["type"], $allowed)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid file type"]);
    exit;
}

if ($_FILES["file"]["size"] > 2 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "File too large (max 2MB)"]);
    exit;
}

$uploadDir = __DIR__ . "/uploads/avatars";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$ext = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION) ?: "jpg";
$filename = "avatar_" . uniqid() . "." . $ext;
$destPath = $uploadDir . "/" . $filename;

if (!move_uploaded_file($_FILES["file"]["tmp_name"], $destPath)) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to save file"]);
    exit;
}

$protocol = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") ? "https" : "http";
$baseUrl = $protocol . "://" . $_SERVER["HTTP_HOST"];
$fileUrl = $baseUrl . "/uploads/avatars/" . $filename;

echo json_encode(["success" => true, "url" => $fileUrl]);
