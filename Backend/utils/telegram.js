import https from "https";

export async function sendTelegramNotification(text) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
        console.log("[telegram] Skipped — TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
        return;
    }

    const payload = JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
    });

    return new Promise((resolve) => {
        const req = https.request(
            {
                hostname: "api.telegram.org",
                path: `/bot${token}/sendMessage`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(payload),
                },
            },
            (res) => {
                let body = "";
                res.on("data", (chunk) => (body += chunk));
                res.on("end", () => {
                    if (res.statusCode === 200) {
                        console.log("[telegram] Notification sent");
                    } else {
                        console.error("[telegram] API error:", res.statusCode, body);
                    }
                    resolve();
                });
            }
        );
        req.on("error", (err) => {
            console.error("[telegram] Request failed:", err.message);
            resolve();
        });
        req.write(payload);
        req.end();
    });
}
