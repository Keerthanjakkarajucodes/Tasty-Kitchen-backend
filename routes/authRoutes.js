import express from "express";
import { register, login, logout ,validateToken} from "../controllers/authController.js";
import jwt from "jsonwebtoken";

const router = express.Router();



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



router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/validate-token", validateToken);

export default router;
