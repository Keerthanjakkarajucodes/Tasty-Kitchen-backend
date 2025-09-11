import Restaurant from "../models/Restaurant.js";
import FoodItem from "../models/FoodItem.js";


// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

// Create one or many restaurants
export const createRestaurant = async (req, res) => {
  try {
    let data = req.body;

    // If not an array, make it an array
    if (!Array.isArray(data)) {
      data = [data];
    }

    const savedRestaurants = await Restaurant.insertMany(data);
    res.status(201).json(savedRestaurants);
  } catch (err) {
    res.status(500).json({ error: "Failed to create restaurant(s)" });
  }
};



// Get all food items for a restaurant
export const getRestaurantFoodItems = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItems = await FoodItem.find({ restaurant_id: id });
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

// Create one or many food items under a restaurant
export const createFoodItem = async (req, res) => {
  try {
    const { id } = req.params; // restaurant ID
    let data = req.body;

    // If not an array, make it an array
    if (!Array.isArray(data)) {
      data = [data];
    }

    // Attach restaurant_id to each item
    const foodItemsData = data.map(item => ({
      ...item,
      restaurant_id: id,
    }));

    const savedItems = await FoodItem.insertMany(foodItemsData);
    res.status(201).json(savedItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to create food item(s)" });
  }
};
