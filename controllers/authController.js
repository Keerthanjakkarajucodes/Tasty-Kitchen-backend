import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    // 1. Username condition
    if (!username || username.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }

    // 2. Email condition
    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 3. Password condition
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    if (!/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) {
      return res.status(400).json({ message: "Password must contain at least one letter and one number" });
    }

    // 4. Mobile condition
    if (!mobile || mobile.length !== 10 || isNaN(mobile)) {
      return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      mobile,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Quick input checks before DB
    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No User Found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
