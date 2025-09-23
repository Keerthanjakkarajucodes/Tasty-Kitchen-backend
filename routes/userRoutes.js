import express from "express";
import { registerUser, loginUser, getProfile, changePassword } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/change-password", protect, changePassword);
router.post("/google-login", async (req, res) => {
  try {
    const { name, email, photo, uid } = req.body;

    if (!email || !uid) {
      return res.status(400).json({ message: "Invalid Google data" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // If not, create new user
      user = await User.create({
        username: name,
        email,
        googleId: uid,
        avatar: photo,
      });
    }

    // Generate JWT token (if you want auth token)
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
