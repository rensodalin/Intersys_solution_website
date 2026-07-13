import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../model/user.js";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@intersys.com";

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

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL
  || (process.env.NODE_ENV === "production"
    ? "https://intersys-solution-website-3.onrender.com/auth/google/callback"
    : "http://localhost:1000/auth/google/callback");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID.trim(),
      clientSecret: process.env.CLIENT_SECRET.trim(),
      callbackURL: GOOGLE_CALLBACK_URL,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile Received:", profile.id, profile.displayName);
        let user = await User.findOne({ googleId: profile.id });
        const email = profile.emails?.[0]?.value || "";

        if (user) {
          user.lastLogin = new Date();
          await user.save();
          user.isAdmin = user.email === ADMIN_EMAIL;
          done(null, user);
        } else {
          user = await User.findOne({ email });

          if (user) {
            user.googleId = profile.id;
            user.authProvider = "google";
            user.isVerified = true;
            user.name = profile.displayName;
            user.firstName = profile.name?.givenName || profile.displayName.split(" ")[0];
            user.lastName = profile.name?.familyName || profile.displayName.split(" ").slice(1).join(" ") || "";
            user.avatar = profile.photos?.[0]?.value || user.avatar;
            user.lastLogin = new Date();
            await user.save();
          } else {
            user = await User.create({
              googleId: profile.id,
              authProvider: "google",
              isVerified: true,
              profileCompleted: false,
              name: profile.displayName,
              firstName: profile.name?.givenName || profile.displayName.split(" ")[0],
              lastName: profile.name?.familyName || profile.displayName.split(" ").slice(1).join(" ") || "",
              email,
              avatar: profile.photos?.[0]?.value || "",
              lastLogin: new Date(),
            });
          }
          user.isAdmin = user.email === ADMIN_EMAIL;
          done(null, user);
        }
      } catch (error) {
        console.error("Google Auth Error:", error);
        done(error, null);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }
        if (!user.password) {
          return done(null, false, { message: "This email uses Google sign-in. Continue with Google to sign in.", googleOnly: true });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }
        user.lastLogin = new Date();
        await user.save();
        user.isAdmin = user.email === ADMIN_EMAIL;
        return done(null, user);
      } catch (error) {
        console.error("Local Auth Error:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;
