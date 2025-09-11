import express from "express";
import {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  createFoodItem,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/items", getAllRestaurants);
router.post("/items", createRestaurant);

router.get("/:id/fooditems", getRestaurantById);
router.post("/:id/fooditems", createFoodItem);

export default router;
