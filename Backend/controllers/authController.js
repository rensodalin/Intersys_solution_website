import passport from "passport";
import fs from "fs";
import User from "../model/user.js";
import DownloadedPdf from "../model/downloadedPdf.js";
import { uploadToHostinger } from "../utils/uploadToHostinger.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@intersys.com";

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

function isStrongPassword(password) {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, gender, country, role } = req.body;

    if (!firstName || !firstName.trim()) return res.status(400).json({ success: false, message: "First name is required" });
    if (!lastName || !lastName.trim()) return res.status(400).json({ success: false, message: "Last name is required" });
    if (!email || !email.trim()) return res.status(400).json({ success: false, message: "Email is required" });
    if (!password) return res.status(400).json({ success: false, message: "Password is required" });
    if (!phone || !phone.trim()) return res.status(400).json({ success: false, message: "Phone number is required" });
    if (!gender) return res.status(400).json({ success: false, message: "Gender is required" });
    if (!country || !country.trim()) return res.status(400).json({ success: false, message: "Country is required" });
    if (!VALID_COUNTRIES.includes(country.trim())) return res.status(400).json({ success: false, message: "Please select a valid country" });

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Please choose a stronger password. Try a mix of letters, numbers, and symbols."
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    const newUser = new User({
      firstName, lastName,
      name: `${firstName} ${lastName}`.trim(),
      email, password, phone,
      gender: gender || undefined,
      country, role: role || undefined,
      isAdmin: false
    });
    await newUser.save();
    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Registration Error Details:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    user.lastLogin = new Date();
    await user.save();

    const downloadedPdfs = await DownloadedPdf.find({ userId: user._id })
      .sort({ downloadedAt: -1 }).lean();

    req.logIn(user, (err) => {
      if (err) {
        console.error("Passport Login Error:", err);
        return next(err);
      }
      // Save session explicitly to avoid session race conditions
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Session Save Error:", saveErr);
          return next(saveErr);
        }
        return res.json({
          success: true,
          user: {
            id: user._id, name: user.name, email: user.email,
            firstName: user.firstName, lastName: user.lastName,
            avatar: user.avatar, phone: user.phone,
            gender: user.gender, country: user.country,
            role: user.role, isAdmin: user.email === ADMIN_EMAIL,
            newsletter: user.newsletter, receiveUpdates: user.receiveUpdates,
            downloadedPdfs
          }
        });
      });
    });
  } catch (error) {
    console.error("Login Error Details:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const googleAuth = (req, res, next) => {
  if (req.query.redirect) {
    req.session.redirectTo = req.query.redirect;
  }
  next();
};

export const googleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    const defaultRedirect = process.env.FRONTEND_URL || "http://localhost:5173/";
    const redirectTo = req.session.redirectTo || defaultRedirect;
    delete req.session.redirectTo;

    if (err) {
      console.error("Google Auth Error:", err);
      return res.redirect(`${defaultRedirect}?error=auth_failed`);
    }
    if (!user) {
      return res.redirect(`${defaultRedirect}?error=user_not_found`);
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Session Login Error:", err);
        return res.redirect(`${defaultRedirect}?error=session_error`);
      }
      // Save session explicitly before redirecting to prevent race condition in DB session storage
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Session Save Error:", saveErr);
          return res.redirect(`${defaultRedirect}?error=session_save_error`);
        }
        res.status(200).send(`<!DOCTYPE html>
<html><head>
<meta http-equiv="refresh" content="0;url=${redirectTo}">
</head><body>
<script>window.location.replace("${redirectTo}");</script>
</body></html>`);
      });
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
    res.json({ success: true, user: { ...safeUser, id: user._id, downloadedPdfs } });
  } else {
    res.json({ success: false, user: null });
  }
};

export const updateUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }
  try {
    const { firstName, lastName, phone, country, role, password, currentPassword, newsletter, receiveUpdates } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (firstName || lastName) user.name = `${firstName || user.firstName} ${lastName || user.lastName}`.trim();
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
      if (!isStrongPassword(password)) {
        return res.status(400).json({
          success: false, message: "Please choose a stronger password. Try a mix of letters, numbers, and symbols."
        });
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
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    const localPath = req.file.path;
    let avatarUrl = `/uploads/avatars/${req.file.filename}`;

    try {
      const hostingerUrl = await uploadToHostinger(localPath, req.file.filename);
      if (hostingerUrl) {
        console.log("Avatar uploaded to Hostinger:", hostingerUrl);
        avatarUrl = hostingerUrl;
        fs.unlink(localPath, () => {});
      }
    } catch (err) {
      console.error("Hostinger upload error (non-blocking):", err);
    }

    const user = await User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl }, { returnDocument: 'after' });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userObj = user.toObject ? user.toObject() : user;
    userObj.isAdmin = user.email === ADMIN_EMAIL;

    req.login(user, (err) => {
      if (err) {
        console.error("Error updating passport session after avatar upload:", err);
        return res.status(500).json({ success: false, message: "Failed to update session" });
      }
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Session Save Error after avatar upload:", saveErr);
          return res.status(500).json({ success: false, message: "Failed to save updated session" });
        }
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
