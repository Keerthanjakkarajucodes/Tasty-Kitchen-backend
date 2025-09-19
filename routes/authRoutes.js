import express from "express";
import passport from "passport";
import { register, login, logout } from "../controllers/authController.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/validate-token", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ valid: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ valid: true, user: decoded });
  } catch (err) {
    return res.json({ valid: false });
  }
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.redirect("https://tasty-kitchen-swiggy-clone.vercel.app/");
  }
);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/validate-token", validateToken);

export default router;
