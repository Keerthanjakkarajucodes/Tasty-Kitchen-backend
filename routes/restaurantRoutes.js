import express from "express";
import {
  createRestaurants ,
  getRestaurants,
  getRestaurantById,
  createFoodItem,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/items", getRestaurants);
router.post("/items", createRestaurants);

router.get("/:id/fooditems", getRestaurantById);
router.post("/:id/fooditems", createFoodItem);

export default router;