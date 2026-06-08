import Contact from "../model/contact.js";
import Message from "../model/message.js";
import transporter from "../config/email.js";
import { sendTelegramNotification } from "../utils/telegram.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, contactMethod, city, country, message } = req.body;

    if (!name || (!email && !phone) || !message) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const newContact = new Contact({ name, email, phone, contactMethod, city, country, message });
    await newContact.save();

    try {
      const chatMsg = new Message({
        email: email || "unknown@intersys.com", name,
        subject: `Contact Request - ${name}`, content: message,
        source: "contact", sourceId: newContact._id, isFromAdmin: false, read: false
      });
      await chatMsg.save();
    } catch (chatErr) {
      console.error("Failed to create chat message for contact:", chatErr);
    }

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email || undefined,
      subject: `New Contact Request - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">New Contact Request</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Preferred Contact:</b> ${contactMethod}</p>
          <p><b>Email:</b> ${email || "Not provided"}</p>
          <p><b>Phone:</b> ${phone || "Not provided"}</p>
          <p><b>Location:</b> ${city}, ${country}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><b>Message:</b></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    const pref = contactMethod || "Not specified";
    const loc = [city, country].filter(Boolean).join(", ") || "Not specified";
    await sendTelegramNotification(
      `<b>📩 New Contact Request</b>\n\n<b>Name:</b> ${name}\n<b>Prefers:</b> ${pref}\n<b>Email:</b> ${email || "—"}\n<b>Phone:</b> ${phone || "—"}\n<b>Location:</b> ${loc}\n\n<b>Message:</b>\n${message.slice(0, 500)}`
    );

    res.json({ success: true, message: "Message saved and sent successfully" });
  } catch (error) {
    console.error("❌ Contact API error details:", error);
    res.status(500).json({ success: false, error: "Failed to process request", details: error.message });
  }
};
