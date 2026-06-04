import express from "express";
import passport from "passport";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import User from "../model/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarStorage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads/avatars"),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || ".png";
        cb(null, `avatar_${req.user?._id || "unknown"}${ext}`);
    },
});

const uploadAvatar = multer({
    storage: avatarStorage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error("Only image files (jpg, png, gif, webp) are allowed"));
        }
    },
});

const router = express.Router();

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || "6LfwwfssAAAAAABLeDbe3IaO5dr0BHeFfozkcW-1";
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

async function verifyRecaptcha(token) {
    if (!token) return false;
    try {
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
        });
        const data = await response.json();
        return data.success;
    } catch (err) {
        console.error("reCAPTCHA verification error:", err);
        return false;
    }
}

// ✅ Register Route
router.post("/register", async (req, res) => {
    try {
        console.log("Register payload:", req.body);
        const { firstName, lastName, email, password, phone, gender, country, role, recaptchaToken } = req.body;

        // Verify reCAPTCHA
        const isHuman = await verifyRecaptcha(recaptchaToken);
        if (!isHuman) {
            return res.status(400).json({ success: false, message: "reCAPTCHA verification failed. Please try again." });
        }

        // Validation - All fields required except role
        if (!firstName || !firstName.trim()) {
            return res.status(400).json({ success: false, message: "First name is required" });
        }
        if (!lastName || !lastName.trim()) {
            return res.status(400).json({ success: false, message: "Last name is required" });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }
        if (!phone || !phone.trim()) {
            return res.status(400).json({ success: false, message: "Phone number is required" });
        }
        if (!gender) {
            return res.status(400).json({ success: false, message: "Gender is required" });
        }
        if (!country || !country.trim()) {
            return res.status(400).json({ success: false, message: "Country is required" });
        }
        if (!VALID_COUNTRIES.includes(country.trim())) {
            return res.status(400).json({ success: false, message: "Please select a valid country" });
        }

        // Strong password validation
        const isStrong =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        if (!isStrong) {
            return res.status(400).json({
                success: false,
                message: "Please choose a stronger password. Try a mix of letters, numbers, and symbols."
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists with this email" });
        }

        // Create new user (isAdmin is always false for public registration)
        const newUser = new User({
            firstName,
            lastName,
            name: `${firstName} ${lastName}`.trim(),
            email,
            password,
            phone,
            gender: gender || undefined,
            country,
            role: role || undefined,
            isAdmin: false
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "Registration successful" });
    } catch (error) {
        console.error("Registration Error Details:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

// ✅ Login Route (Traditional)
router.post("/login", async (req, res, next) => {
    try {
        console.log("Login payload:", req.body);
        const { email, password, recaptchaToken } = req.body;

        // Verify reCAPTCHA
        const isHuman = await verifyRecaptcha(recaptchaToken);
        if (!isHuman) {
            return res.status(400).json({ success: false, message: "reCAPTCHA verification failed. Please try again." });
        }

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

        // Update lastLogin timestamp
        user.lastLogin = new Date();
        await user.save();

        // Log the user in via Passport
        req.logIn(user, (err) => {
            if (err) {
                console.error("Passport Login Error:", err);
                return next(err);
            }
            return res.json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar,
                    phone: user.phone,
                    gender: user.gender,
                    country: user.country,
                    role: user.role,
                    isAdmin: user.email === ADMIN_EMAIL,
                    newsletter: user.newsletter,
                    receiveUpdates: user.receiveUpdates,
                    downloadedPdfs: user.downloadedPdfs
                }
            });
        });
    } catch (error) {
        console.error("Login Error Details:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

// ✅ Trigger Google OAuth
router.get(
    "/google",
    (req, res, next) => {
        if (req.query.redirect) {
            req.session.redirectTo = req.query.redirect;
        }
        next();
    },
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Google OAuth Callback
router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", (err, user, info) => {
            const defaultRedirect = "http://localhost:5173/";
            const redirectTo = req.session.redirectTo || defaultRedirect;
            // Clean up session redirect
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
                // Send HTML page that sets cookie via 200 response, then redirects via JS
                // (Express 5 + res.redirect has issues sending Set-Cookie headers properly)
                res.status(200).send(`<!DOCTYPE html>
<html><head>
<meta http-equiv="refresh" content="0;url=${redirectTo}">
</head><body>
<script>window.location.replace("${redirectTo}");</script>
</body></html>`);
            });
        })(req, res, next);
    }
);

// ✅ Logout Route (Destroys session, clears cookie, and handles both GET & POST)
router.all("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error("Logout Error:", err);
            return res.status(500).json({ success: false, message: "Failed to log out" });
        }

        req.session.destroy((destroyErr) => {
            if (destroyErr) {
                console.error("Session destroy error during logout:", destroyErr);
            }

            // Explicitly clear the connect.sid session cookie with security flags matching server config
            res.clearCookie("connect.sid", {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });

            return res.json({ success: true, message: "Logged out successfully" });
        });
    });
});

// ✅ Get Logged-in User Info
router.get("/user", (req, res) => {
    if (req.user) {
        const user = req.user.toObject ? req.user.toObject() : req.user;
        const { password, __v, ...safeUser } = user;
        safeUser.isAdmin = user.email === ADMIN_EMAIL;
        res.json({ success: true, user: { ...safeUser, id: user._id } });
    } else {
        res.status(401).json({ success: false, message: "Not authenticated" });
    }
});

// ✅ Update User Profile Details
router.put("/user/update", async (req, res) => {
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
            // Verify current password first
            if (!currentPassword || currentPassword.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Please enter your current password to set a new one."
                });
            }

            // For Google accounts that have no password yet, skip current password check
            if (user.password) {
                const isMatch = await user.comparePassword(currentPassword);
                if (!isMatch) {
                    return res.status(400).json({
                        success: false,
                        message: "Current password is incorrect. Please try again."
                    });
                }
            }

            // Strong password validation
            const isStrong =
                password.length >= 8 &&
                /[A-Z]/.test(password) &&
                /[a-z]/.test(password) &&
                /[0-9]/.test(password) &&
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

            if (!isStrong) {
                return res.status(400).json({
                    success: false,
                    message: "Please choose a stronger password. Try a mix of letters, numbers, and symbols."
                });
            }
            user.password = password;
        }

        await user.save();

        // Update passport session to keep it synchronized
        req.login(user, (err) => {
            if (err) {
                console.error("Error updating passport session:", err);
            }
        });

        const updatedUser = user.toObject ? user.toObject() : user;
        updatedUser.isAdmin = user.email === ADMIN_EMAIL;
        res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

// ✅ Upload Avatar
router.post("/user/avatar", uploadAvatar.single("avatar"), async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }

        const avatarUrl = `/uploads/avatars/${req.file.filename}`;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: avatarUrl },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const userObj = user.toObject ? user.toObject() : user;
        userObj.isAdmin = user.email === ADMIN_EMAIL;
        res.json({ success: true, avatar: avatarUrl, user: userObj });
    } catch (error) {
        console.error("Avatar Upload Error:", error);
        res.status(500).json({ success: false, message: "Failed to upload avatar", error: error.message });
    }
});

// ✅ Record PDF Download
router.post("/user/download", async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    try {
        const { title, url } = req.body;
        if (!title || !url) {
            return res.status(400).json({ success: false, message: "Title and URL are required" });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.downloadedPdfs = user.downloadedPdfs || [];
        user.downloadedPdfs.push({ title, url, downloadedAt: new Date() });
        await user.save();

        res.json({ success: true, downloadedPdfs: user.downloadedPdfs });
    } catch (error) {
        console.error("Record Download Error:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

export default router;
