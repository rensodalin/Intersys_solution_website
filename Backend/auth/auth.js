import express from "express";
import passport from "passport";

const router = express.Router();

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
