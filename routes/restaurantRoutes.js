import express from "express";
import { addRestaurants, getRestaurants } from "../controllers/restaurantController.js";

const router = express.Router();

// POST multiple restaurants
router.post("/", addRestaurants);

// GET all restaurants
router.get("/", getRestaurants);

export default router;
