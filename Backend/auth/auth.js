import express from "express";
import passport from "passport";
import User from "../model/user.js";

const router = express.Router();

// ✅ Register Route
router.post("/register", async (req, res) => {
    try {
        console.log("Register payload:", req.body);
        const { firstName, lastName, email, password, phone, gender, country } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists with this email" });
        }

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            name: `${firstName} ${lastName}`.trim(),
            email,
            password,
            phone,
            gender: gender || undefined,
            country
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

        // Log the user in via Passport
        req.logIn(user, (err) => {
            if (err) {
                console.error("Passport Login Error:", err);
                return next(err);
            }
            return res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
        });
    } catch (error) {
        console.error("Login Error Details:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

// ✅ Trigger Google OAuth
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Google OAuth Callback
router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", (err, user, info) => {
            if (err) {
                console.error("Google Auth Error:", err);
                return res.redirect("http://localhost:5173/?error=auth_failed");
            }
            if (!user) {
                return res.redirect("http://localhost:5173/?error=user_not_found");
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.error("Session Login Error:", err);
                    return res.redirect("http://localhost:5173/?error=session_error");
                }
                // Successful login
                return res.redirect("http://localhost:5173/");
            });
        })(req, res, next);
    }
);

// ✅ Logout Route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("http://localhost:5173/");
    });
});

// ✅ Get Logged-in User Info
router.get("/user", (req, res) => {
    if (req.user) {
        res.json({ success: true, user: req.user });
    } else {
        res.status(401).json({ success: false, message: "Not authenticated" });
    }
});

export default router;
