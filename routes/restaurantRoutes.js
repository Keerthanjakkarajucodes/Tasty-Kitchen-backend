import express from "express";
import {
  getAllRestaurants,
  createRestaurant,
  getRestaurantFoodItems,
  createFoodItem,
} from "../controllers/restaurantController.js";

const router = express.Router();

// Restaurants
router.get("/items", getAllRestaurants);
router.post("/items", createRestaurant);

// Food Items
router.get("/:id/fooditems", getRestaurantFoodItems);
router.post("/:id/fooditems", createFoodItem);

export default router;
