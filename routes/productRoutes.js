import express from "express";
const router = express.Router();

// Example product route
router.get("/", (req, res) => {
  res.json({ message: "Product endpoint works" });
});

export default router;
