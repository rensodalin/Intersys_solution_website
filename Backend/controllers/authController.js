import passport from "passport";
import fs from "fs";
import User from "../model/user.js";
import DownloadedPdf from "../model/downloadedPdf.js";
import { uploadToHostinger } from "../utils/uploadToHostinger.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@intersys.com";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const VALID_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Azerbaijan",
  "Bangladesh", "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria",
  "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Croatia", "Cuba", "Czech Republic",
  "Denmark", "Dominican Republic", "Ecuador", "Egypt", "Ethiopia", "Finland", "France",
  "Germany", "Ghana", "Greece", "Guatemala", "Hong Kong", "Hungary",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait",
  "Laos", "Lebanon", "Libya", "Malaysia", "Mexico", "Morocco", "Myanmar",
  "Nepal", "Netherlands", "New Zealand", "Nigeria", "North Korea", "Norway",
  "Oman", "Pakistan", "Panama", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia",
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Thailand", "Tunisia", "Turkey", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zimbabwe"
];

export const completeProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }
  try {
    const { firstName, lastName, role, company, phone, newsletter, receiveUpdates, password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.profileCompleted) {
      return res.status(400).json({ success: false, message: "Profile already completed" });
    }

    if (firstName && firstName.trim()) user.firstName = firstName.trim();
    if (lastName && lastName.trim()) user.lastName = lastName.trim();
    if (firstName || lastName) user.name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    if (role) user.role = role;
    if (company !== undefined) user.company = company;
    if (phone !== undefined) user.phone = phone;
    if (typeof newsletter !== "undefined") user.newsletter = newsletter;
    if (typeof receiveUpdates !== "undefined") user.receiveUpdates = receiveUpdates;
    if (!password || password.trim().length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }
    user.password = password;
    user.authProvider = "local";

    user.profileCompleted = true;
    await user.save();

    const updatedUser = user.toObject ? user.toObject() : user;
    updatedUser.isAdmin = user.email === ADMIN_EMAIL;

    req.login(user, (err) => {
      if (err) {
        console.error("Error updating passport session:", err);
        return res.status(500).json({ success: false, message: "Profile saved but session update failed" });
      }
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Session Save Error after profile complete:", saveErr);
          return res.status(500).json({ success: false, message: "Profile saved but session save failed" });
        }
        res.json({ success: true, message: "Profile completed successfully", user: updatedUser });
      });
    });
  } catch (error) {
    console.error("Complete Profile Error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const login = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      console.error("Login Error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
    if (!user) {
      if (info?.googleOnly) {
        return res.status(401).json({ success: false, googleOnly: true, message: info.message });
      }
      return res.status(401).json({ success: false, message: info?.message || "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login session error:", err);
        return res.status(500).json({ success: false, message: "Login failed" });
      }
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Session Save Error after login:", saveErr);
          return res.status(500).json({ success: false, message: "Session save failed" });
        }
        const userObj = user.toObject ? user.toObject() : user;
        const { password, __v, ...safeUser } = userObj;
        safeUser.isAdmin = user.email === ADMIN_EMAIL;
        res.json({ success: true, message: "Login successful", user: safeUser });
      });
    });
  })(req, res, next);
};

export const googleAuth = (req, res, next) => {
  if (req.query.redirect) {
    req.session.redirectTo = req.query.redirect;
  }
  next();
};

const getFrontendUrl = () => {
  const url = process.env.FRONTEND_URL || "http://localhost:5173";
  return url.endsWith("/") ? url : url + "/";
};

export const googleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    const baseUrl = getFrontendUrl();
    const redirectTo = req.session.redirectTo || baseUrl;
    delete req.session.redirectTo;

    if (err) {
      console.error("Google Auth Error:", err);
      return res.redirect(`${baseUrl}?error=auth_failed`);
    }
    if (!user) {
      return res.redirect(`${baseUrl}?error=user_not_found`);
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Session Login Error:", err);
        return res.redirect(`${baseUrl}?error=session_error`);
      }
      res.redirect(redirectTo);
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).json({ success: false, message: "Failed to log out" });
    }
    req.session.destroy((destroyErr) => {
      if (destroyErr) {
        console.error("Session destroy error during logout:", destroyErr);
      }
      const isSecure = process.env.NODE_ENV === "production";
      res.clearCookie("connect.sid", {
        path: "/", httpOnly: true, secure: isSecure, sameSite: isSecure ? "none" : "lax"
      });
      return res.json({ success: true, message: "Logged out successfully" });
    });
  });
};

export const getUser = async (req, res) => {
  if (req.user) {
    const user = req.user.toObject ? req.user.toObject() : req.user;
    const { password, __v, ...safeUser } = user;
    safeUser.isAdmin = user.email === ADMIN_EMAIL;
    const downloadedPdfs = await DownloadedPdf.find({ userId: user._id })
      .sort({ downloadedAt: -1 }).lean();
    res.json({ success: true, user: { ...safeUser, id: user._id, profileCompleted: user.profileCompleted, company: user.company, downloadedPdfs } });
  } else {
    res.json({ success: false, user: null });
  }
};

export const updateUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }
  try {
    const { firstName, lastName, gender, phone, country, role, password, currentPassword, newsletter, receiveUpdates } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (firstName || lastName) user.name = `${firstName || user.firstName} ${lastName || user.lastName}`.trim();
    if (gender) user.gender = gender;
    if (phone !== undefined && phone !== null) user.phone = phone || user.phone;
    if (country) {
      if (!VALID_COUNTRIES.includes(country.trim())) {
        return res.status(400).json({ success: false, message: "Please select a valid country" });
      }
      user.country = country.trim();
    }
    if (role) user.role = role;
    if (typeof newsletter !== 'undefined') user.newsletter = newsletter;
    if (typeof receiveUpdates !== 'undefined') user.receiveUpdates = receiveUpdates;

    if (password && password.trim() !== "") {
      if (!currentPassword || currentPassword.trim() === "") {
        return res.status(400).json({
          success: false, message: "Please enter your current password to set a new one."
        });
      }
      if (user.password) {
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: "Current password is incorrect. Please try again." });
        }
      }
      user.password = password;
    }

    await user.save();

    const updatedUser = user.toObject ? user.toObject() : user;
    updatedUser.isAdmin = user.email === ADMIN_EMAIL;

    req.login(user, (err) => {
      if (err) {
        console.error("Error updating passport session:", err);
        return res.status(500).json({ success: false, message: "Profile saved but session update failed" });
      }
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Session Save Error after update:", saveErr);
          return res.status(500).json({ success: false, message: "Profile saved but session save failed" });
        }
        res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
      });
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const uploadAvatar = async (req, res) => {
  if (!req.user) {
    console.log("[uploadAvatar] Attempted upload without authenticated user session");
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }
  try {
    if (!req.file) {
      console.log("[uploadAvatar] No file found in req.file");
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    console.log("[uploadAvatar] Received uploaded file details:", {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    });

    const localPath = req.file.path;
    let avatarUrl = `/uploads/avatars/${req.file.filename}`;

    try {
      console.log("[uploadAvatar] Uploading avatar to Hostinger via FTP...");
      const hostingerUrl = await uploadToHostinger(localPath, req.file.filename);
      if (hostingerUrl) {
        console.log("[uploadAvatar] Avatar uploaded to Hostinger successfully:", hostingerUrl);
        avatarUrl = hostingerUrl;
        // Clean up local temp file since the image is safely hosted on Hostinger
        fs.unlink(localPath, (err) => {
          if (err) console.error("[uploadAvatar] Failed to delete local temp file:", err);
          else console.log("[uploadAvatar] Deleted local temp file:", localPath);
        });
      } else {
        console.log("[uploadAvatar] Hostinger upload did not return URL. Falling back to local disk storage:", avatarUrl);
      }
    } catch (err) {
      console.error("[uploadAvatar] Hostinger upload error (falling back to local disk storage):", err);
    }

    console.log("[uploadAvatar] Saving avatarUrl in MongoDB for user ID:", req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      console.log("[uploadAvatar] User not found in database for ID:", req.user._id);
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.avatar = avatarUrl;
    await user.save();
    console.log("[uploadAvatar] User saved. New updatedAt timestamp:", user.updatedAt);

    const userObj = user.toObject ? user.toObject() : user;
    userObj.isAdmin = user.email === ADMIN_EMAIL;

    req.login(user, (err) => {
      if (err) {
        console.error("[uploadAvatar] Error updating passport session:", err);
        return res.status(500).json({ success: false, message: "Failed to update session" });
      }
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("[uploadAvatar] Session Save Error:", saveErr);
          return res.status(500).json({ success: false, message: "Failed to save updated session" });
        }
        console.log("[uploadAvatar] Session successfully saved in MongoDB. Sending response.");
        res.json({ success: true, avatar: avatarUrl, user: userObj });
      });
    });
  } catch (error) {
    console.error("Avatar Upload Error:", error);
    res.status(500).json({ success: false, message: "Failed to upload avatar", error: error.message });
  }
};

export const recordDownload = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      return res.status(400).json({ success: false, message: "Title and URL are required" });
    }
    const pdf = new DownloadedPdf({ userId: req.user._id, title, url });
    await pdf.save();

    const downloadedPdfs = await DownloadedPdf.find({ userId: req.user._id })
      .sort({ downloadedAt: -1 }).lean();
    res.json({ success: true, downloadedPdfs });
  } catch (error) {
    console.error("Record Download Error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
