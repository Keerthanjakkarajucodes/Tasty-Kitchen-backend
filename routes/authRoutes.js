import express from "express";
import passport from "passport";
import { register, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // ✅ Successful login
    // You can send a JWT token or redirect to frontend
    res.redirect("https://tasty-kitchen-swiggy-clone.vercel.app/"); // change to your frontend page
  }
);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
