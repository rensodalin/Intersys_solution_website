import Contact from "../model/contact.js";
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

    // Removed: no longer creates chat messages for contact form submissions

    res.json({ success: true, message: "Message saved and sent successfully" });

    process.nextTick(async () => {
      try {
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
      } catch (emailErr) {
        console.error("Failed to send contact email:", emailErr);
      }
    });

    process.nextTick(async () => {
      try {
        const pref = contactMethod || "Not specified";
        const loc = [city, country].filter(Boolean).join(", ") || "Not specified";
        await sendTelegramNotification(
          `<b>📩 New Contact Request</b>\n\n<b>Name:</b> ${name}\n<b>Prefers:</b> ${pref}\n<b>Email:</b> ${email || "—"}\n<b>Phone:</b> ${phone || "—"}\n<b>Location:</b> ${loc}\n\n<b>Message:</b>\n${message.slice(0, 500)}`
        );
      } catch (teleErr) {
        console.error("Failed to send telegram notification:", teleErr);
      }
    });
  } catch (error) {
    console.error("❌ Contact API error details:", error);
    res.status(500).json({ success: false, error: "Failed to process request", details: error.message });
  }
};

export const markContactRead = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Contact.updateOne({ _id: id }, { status: "read" });
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Failed to mark contact as read:", error);
    res.status(500).json({ success: false, error: "Failed to mark contact as read" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    res.status(500).json({ success: false, error: "Failed to fetch contacts" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id).lean();
    if (!contact) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }
    res.json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Failed to delete contact:", error);
    res.status(500).json({ success: false, error: "Failed to delete contact" });
  }
};
