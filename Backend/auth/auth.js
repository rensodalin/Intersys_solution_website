import express from "express";
import passport from "passport";
import User from "../model/user.js";

const router = express.Router();

// ✅ Register Route
router.post("/register", async (req, res) => {
    try {
        console.log("Register payload:", req.body);
        const { firstName, lastName, email, password, phone, gender, country, role } = req.body;

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

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            name: `${firstName} ${lastName}`.trim(),
            email,
            password,
            phone,
            gender: gender || undefined,
            country,
            role: role || undefined
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
                // Successful login, redirect to saved location
                return res.redirect(redirectTo);
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
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
            });
            
            return res.json({ success: true, message: "Logged out successfully" });
        });
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
