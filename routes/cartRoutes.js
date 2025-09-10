import express from "express";
const router = express.Router();

// Example cart route
router.get("/", (req, res) => {
  res.json({ message: "Cart endpoint works" });
});

export default router;
