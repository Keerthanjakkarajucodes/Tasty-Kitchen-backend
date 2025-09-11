import express from "express";
import {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  createFoodItem,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/restaurants-list", getAllRestaurants);
router.post("/restaurants-list", createRestaurant);

router.get("/restaurants-list/:id", getRestaurantById);
router.post("/restaurants-list/:id/fooditems", createFoodItem);

export default router;
