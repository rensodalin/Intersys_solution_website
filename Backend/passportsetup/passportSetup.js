import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/user.js";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID.trim(),
            clientSecret: process.env.CLIENT_SECRET.trim(),
            callbackURL: "http://localhost:1000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists in DB
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // User exists, return user
                    done(null, user);
                } else {
                    // Create a new user
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0]?.value || "",
                        avatar: profile.photos?.[0]?.value || "",
                    });
                    done(null, user);
                }
            } catch (error) {
                console.error("Google Auth Error:", error);
                done(error, null);
            }
        }
    )
);

export default passport;
