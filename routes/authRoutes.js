import express from "express";
const router = express.Router();

// Example auth route
router.post("/login", (req, res) => {
  res.json({ message: "Login endpoint works" });
});

export default router;
