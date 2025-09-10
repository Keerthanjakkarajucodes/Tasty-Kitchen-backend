import express from "express";
const router = express.Router();

// Example recipe route
router.get("/", (req, res) => {
  res.json({ message: "Recipe endpoint works" });
});

export default router;
