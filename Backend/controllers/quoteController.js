import mongoose from "mongoose";
import Quote from "../model/quote.js";
import QuoteItem from "../model/quoteItem.js";
import DownloadedPdf from "../model/downloadedPdf.js";
import Contact from "../model/contact.js";
import User from "../model/user.js";
import Message from "../model/message.js";
import transporter from "../config/email.js";
import { sendTelegramNotification } from "../utils/telegram.js";

export const create = async (req, res) => {
  try {
    const quoteData = req.body;
    const newQuote = new Quote({
      ...quoteData,
      products: [],
      userId: req.user ? req.user._id : null
    });
    await newQuote.save();

    const productRows = quoteData.products || [];
    if (productRows.length > 0) {
      const quoteItems = productRows.map(p => ({
        quoteId: newQuote._id,
        product: mongoose.Types.ObjectId.isValid(p.product) ? p.product : null,
        productId: p.productId || "",
        qty: p.qty,
        productNo: p.productNo,
        description: p.description,
        application: p.application,
        price: p.price || 0
      }));
      const savedItems = await QuoteItem.insertMany(quoteItems);
      newQuote.products = savedItems.map(item => item._id);
      await newQuote.save();
    }

    try {
      const productSummary = (quoteData.products || []).map(p => `${p.qty}x ${p.productNo}`).join(", ");
      const chatMsg = new Message({
        email: quoteData.email, name: quoteData.name,
        subject: `Quote Request - ${quoteData.company}`,
        content: `Quote request from ${quoteData.name} at ${quoteData.company}.\n\nProducts: ${productSummary || "None"}\n\nDetails: ${quoteData.otherBms || ""}`,
        source: "quote", sourceId: newQuote._id, isFromAdmin: false, read: false
      });
      await chatMsg.save();
    } catch (chatErr) {
      console.error("Failed to create chat message for quote:", chatErr);
    }

    const productsEmailHtml = (quoteData.products || []).map(p => `
      <tr>
        <td style="padding:8px 12px; border:1px solid #e5e7eb; text-align:center; font-size:13px;">${p.qty}x</td>
        <td style="padding:8px 12px; border:1px solid #e5e7eb; font-size:13px; font-weight:600; color:#C3110C;">${p.productNo}</td>
        <td style="padding:8px 12px; border:1px solid #e5e7eb; font-size:13px;">${p.description}</td>
        <td style="padding:8px 12px; border:1px solid #e5e7eb; font-size:13px; color:#6b7280;">${p.application}</td>
      </tr>
    `).join("");
    const categoriesList = (quoteData.solutionCategories || []).join(", ");
    const sectionsList = (quoteData.sections || []).join(", ");
    const fullAddress = [quoteData.address, quoteData.city, quoteData.country].filter(Boolean).join(", ");

    const emailContent = `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif; max-width:640px; margin:auto; background:#fff;">
        <div style="background:#081F3D; padding:24px 30px; text-align:center;">
          <img src="https://static.wixstatic.com/media/3d5958_de5e6808f56c48b48bdf976b6224847c~mv2.png/v1/crop/x_0,y_0,w_3932,h_1626/fill/w_248,h_90,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/new%20Logo.png" alt="Intersys Solutions" style="max-width:180px; height:auto; display:block; margin:0 auto;" />
          <p style="color:rgba(255,255,255,0.6); margin:4px 0 0 0; font-size:11px;">Building Management & Security Systems</p>
        </div>
        <div style="padding:30px;">
          <h2 style="color:#C3110C; font-size:18px; margin:0 0 6px 0;">📋 New Quote Request</h2>
          <p style="font-size:13px; color:#6b7280; margin:0 0 20px 0;">A new quote request has been submitted from the website.</p>
          <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:6px; padding:20px; margin:15px 0;">
            <h3 style="margin:0 0 12px 0; font-size:15px; color:#081F3D;">Contact Information</h3>
            <table style="width:100%; border-collapse:collapse; font-size:13px;">
              <tr><td style="padding:4px 0; color:#6b7280; width:120px;">Name:</td><td style="padding:4px 0; font-weight:600;">${quoteData.name}</td></tr>
              <tr><td style="padding:4px 0; color:#6b7280;">Company:</td><td style="padding:4px 0; font-weight:600;">${quoteData.company}</td></tr>
              <tr><td style="padding:4px 0; color:#6b7280;">Title:</td><td style="padding:4px 0;">${quoteData.title || "—"}</td></tr>
              <tr><td style="padding:4px 0; color:#6b7280;">Email:</td><td style="padding:4px 0;">${quoteData.email}</td></tr>
              <tr><td style="padding:4px 0; color:#6b7280;">Phone:</td><td style="padding:4px 0;">${quoteData.phone}</td></tr>
              <tr><td style="padding:4px 0; color:#6b7280;">Contact Method:</td><td style="padding:4px 0; font-weight:600;">${quoteData.contactMethod || "—"}</td></tr>
              <tr><td style="padding:4px 0; color:#6b7280;">Company Type:</td><td style="padding:4px 0;">${quoteData.companyType || "—"}</td></tr>
              <tr><td style="padding:4px 0; color:#6b7280;">Address:</td><td style="padding:4px 0;">${fullAddress || "—"}</td></tr>
              ${quoteData.bmsSystem ? `<tr><td style="padding:4px 0; color:#6b7280;">Platform:</td><td style="padding:4px 0;">${quoteData.bmsSystem}</td></tr>` : ""}
            </table>
          </div>
          ${categoriesList ? `<div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:6px; padding:20px; margin:15px 0;"><h3 style="margin:0 0 8px 0; font-size:15px; color:#081F3D;">Categories & Sections</h3><p style="margin:0; font-size:13px; color:#374151;"><strong>Categories:</strong> ${categoriesList}</p>${sectionsList ? `<p style="margin:6px 0 0 0; font-size:13px; color:#374151;"><strong>Sections:</strong> ${sectionsList}</p>` : ""}</div>` : ""}
          ${(quoteData.products || []).length > 0 ? `<div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:6px; padding:20px; margin:15px 0;"><h3 style="margin:0 0 12px 0; font-size:15px; color:#081F3D;">Requested Products</h3><table style="width:100%; border-collapse:collapse; font-size:12px;"><thead><tr style="background:#e5e7eb;"><th style="padding:8px 12px; border:1px solid #d1d5db; text-align:center;">Qty</th><th style="padding:8px 12px; border:1px solid #d1d5db; text-align:left;">Part Code</th><th style="padding:8px 12px; border:1px solid #d1d5db; text-align:left;">Product</th><th style="padding:8px 12px; border:1px solid #d1d5db; text-align:left;">Spec</th></tr></thead><tbody>${productsEmailHtml}</tbody></table></div>` : ""}
          ${quoteData.otherBms ? `<div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:6px; padding:20px; margin:15px 0;"><h3 style="margin:0 0 8px 0; font-size:15px; color:#081F3D;">Additional Details</h3><div style="font-size:13px; color:#374151; white-space:pre-wrap; line-height:1.5;">${quoteData.otherBms}</div></div>` : ""}
          <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0;" />
          <p style="font-size:12px; color:#9ca3af; text-align:center;">This is an automated notification from Intersys Solutions website.</p>
        </div>
        <div style="background:#f3f4f6; padding:12px 30px; text-align:center; font-size:10px; color:#9ca3af;">Intersys Solutions Co., Ltd. · Phnom Penh, Cambodia</div>
      </div>
    `;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: `"Quote Request" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          replyTo: quoteData.email,
          subject: `New Quote Request - ${quoteData.company}`,
          html: emailContent,
        });
      } catch (emailError) {
        console.error("Failed to send notification email, but quote was saved:", emailError);
      }
    }

    const productList = (quoteData.products || []).map(p =>
      `${p.qty}x <b>${p.productNo}</b> — ${p.description} (${p.application})`
    ).join("\n");
    await sendTelegramNotification(
      `<b>📋 New Quote Request</b>\n\n<b>Name:</b> ${quoteData.name}\n<b>Company:</b> ${quoteData.company}\n<b>Title:</b> ${quoteData.title || "—"}\n<b>Email:</b> ${quoteData.email}\n<b>Phone:</b> ${quoteData.phone}\n<b>Contact Method:</b> ${quoteData.contactMethod || "Not specified"}\n<b>Company Type:</b> ${quoteData.companyType || "—"}\n<b>Address:</b> ${fullAddress || "—"}\n\n${categoriesList ? `<b>Categories:</b> ${categoriesList}\n\n` : ""}${sectionsList ? `<b>Sections:</b> ${sectionsList}\n\n` : ""}<b>Products:</b>\n${productList || "None"}\n\n<b>Platform:</b> ${quoteData.bmsSystem || "—"}\n\n<b>Details:</b>\n${(quoteData.otherBms || "").slice(0, 500)}`
    );

    res.status(201).json({ success: true, message: "Quote request submitted successfully." });
  } catch (error) {
    console.error("Error submitting quote:", error);
    res.status(500).json({ success: false, error: "Failed to submit quote request" });
  }
};

export const getUserQuotes = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }
    const filter = {
      $or: [
        { userId: req.user._id },
        { email: req.user.email }
      ]
    };
    const quotes = await Quote.find(filter).populate({
      path: "products",
      populate: { path: "product" }
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: quotes });
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    res.status(500).json({ success: false, error: "Failed to fetch quotes" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const parseStart = (s) => s ? new Date(s + "T00:00:00.000Z") : null;
    const parseEnd = (s) => s ? new Date(s + "T23:59:59.999Z") : null;

    const dateFilter = {};
    if (req.query.startDate || req.query.endDate) {
      dateFilter.createdAt = {};
      if (req.query.startDate) dateFilter.createdAt.$gte = parseStart(req.query.startDate);
      if (req.query.endDate) dateFilter.createdAt.$lte = parseEnd(req.query.endDate);
    }
    if (!dateFilter.createdAt) {
      dateFilter.createdAt = {};
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      dateFilter.createdAt.$gte = thirtyDaysAgo;
    }

    const [totalQuotes, pendingQuotes, inProgressQuotes, completedQuotes, totalContacts, totalUsers] = await Promise.all([
      Quote.countDocuments(dateFilter),
      Quote.countDocuments({ ...dateFilter, status: "Pending" }),
      Quote.countDocuments({ ...dateFilter, status: "In Progress" }),
      Quote.countDocuments({ ...dateFilter, status: "Completed" }),
      Contact.countDocuments(dateFilter),
      User.countDocuments(dateFilter),
    ]);

    const actStart = req.query.startDate ? parseStart(req.query.startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const actEnd = req.query.endDate ? parseEnd(req.query.endDate) : new Date();

    const quoteUserIds = (await Quote.distinct("userId", {
      createdAt: { $gte: actStart, $lte: actEnd }, userId: { $ne: null }
    })).filter(id => id != null);

    const downloadUserIds = await DownloadedPdf.distinct("userId", {
      downloadedAt: { $gte: actStart, $lte: actEnd }
    });
    const activeConditions = [
      { lastLogin: { $gte: actStart, $lte: actEnd } },
    ];
    if (quoteUserIds.length > 0) {
      activeConditions.push({ _id: { $in: quoteUserIds } });
    }
    if (downloadUserIds.length > 0) {
      activeConditions.push({ _id: { $in: downloadUserIds } });
    }
    const activeUsers = await User.countDocuments({ $or: activeConditions });

    const velocityFilter = { createdAt: { ...dateFilter.createdAt } };
    if (!velocityFilter.createdAt.$lte) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      velocityFilter.createdAt.$gte = new Date(Math.max(velocityFilter.createdAt.$gte?.getTime() || 0, sixMonthsAgo.getTime()));
    }
    const monthlyVelocityRaw = await Quote.aggregate([
      { $match: velocityFilter },
      { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthlyVelocity = monthlyVelocityRaw.map(item => ({ name: monthNames[item._id.month - 1], quotes: item.count }));

    const [recentQuotes, recentContacts, recentUsers] = await Promise.all([
      Quote.find(dateFilter).sort({ createdAt: -1 }).limit(5),
      Contact.find(dateFilter).sort({ createdAt: -1 }).limit(5),
      User.find(dateFilter).select("name email role createdAt avatar").sort({ createdAt: -1 }).limit(5),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalQuotes, pendingQuotes, inProgressQuotes, completedQuotes,
        totalContacts, totalVisitors: totalUsers, activeUsers, totalUsers,
        recentQuotes, recentContacts, recentUsers, monthlyVelocity,
        dateFrom: dateFilter.createdAt.$gte,
        dateTo: dateFilter.createdAt.$lte || new Date()
      }
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    res.status(500).json({ success: false, error: "Failed to fetch admin statistics" });
  }
};

export const getAdminAnalytics = async (req, res) => {
  try {
    const [totalQuotes, totalContacts, totalUsers] = await Promise.all([
      Quote.countDocuments({}),
      Contact.countDocuments({}),
      User.countDocuments({}),
    ]);

    const [quoteCountryAgg, contactCountryAgg] = await Promise.all([
      Quote.aggregate([{ $match: { country: { $exists: true, $ne: "" } } }, { $group: { _id: "$country", count: { $sum: 1 } } }]),
      Contact.aggregate([{ $match: { country: { $exists: true, $ne: "" } } }, { $group: { _id: "$country", count: { $sum: 1 } } }])
    ]);
    const countryMap = {};
    [...quoteCountryAgg, ...contactCountryAgg].forEach(r => { countryMap[r._id] = (countryMap[r._id] || 0) + r.count; });
    const sorted = Object.entries(countryMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    const totalWithCountry = sorted.reduce((sum, c) => sum + c.count, 0) || 1;
    const countryDistribution = sorted.map(c => ({ name: c.name, percentage: Math.round((c.count / totalWithCountry) * 100) }));

    const [recentQuotes, recentContacts, recentUsers] = await Promise.all([
      Quote.find({}).sort({ createdAt: -1 }).limit(3),
      Contact.find({}).sort({ createdAt: -1 }).limit(3),
      User.find({}).sort({ createdAt: -1 }).limit(3),
    ]);

    res.status(200).json({
      success: true,
      data: {
        liveUsers: 1400 + totalUsers, avgDepth: "4.2m",
        totalQuotes, totalContacts, totalUsers,
        recentQuotes, recentContacts, recentUsers, countryDistribution
      }
    });
  } catch (error) {
    console.error("Failed to fetch admin analytics:", error);
    res.status(500).json({ success: false, error: "Failed to fetch analytics statistics" });
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const filter = {};
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) filter.createdAt.$gte = new Date(req.query.startDate + "T00:00:00.000Z");
      if (req.query.endDate) filter.createdAt.$lte = new Date(req.query.endDate + "T23:59:59.999Z");
    }
    const quotes = await Quote.find(filter).populate("userId", "name avatar email").populate({
      path: "products",
      populate: { path: "product" }
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: quotes });
  } catch (error) {
    console.error("Failed to fetch admin quotes:", error);
    res.status(500).json({ success: false, error: "Failed to fetch quotes" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status value" });
    }
    const quote = await Quote.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!quote) {
      return res.status(404).json({ success: false, error: "Quote not found" });
    }
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    console.error("Failed to update status:", error);
    res.status(500).json({ success: false, error: "Failed to update quote status" });
  }
};

export const remove = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, error: "Quote not found" });
    }
    await QuoteItem.deleteMany({ quoteId: quote._id });
    res.status(200).json({ success: true, message: "Quote request deleted successfully" });
  } catch (error) {
    console.error("Failed to delete quote:", error);
    res.status(500).json({ success: false, error: "Failed to delete quote" });
  }
};
