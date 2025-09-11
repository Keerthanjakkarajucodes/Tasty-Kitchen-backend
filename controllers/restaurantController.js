import Restaurant from "../models/Restaurant.js";
import FoodItem from "../models/FoodItem.js";

// Create multiple restaurants
import Restaurant from "../models/Restaurant.js";

// Create multiple restaurants
export const createRestaurants = async (req, res) => {
  try {
    const { restaurants } = req.body;  // Extract the array from the key
    if (!Array.isArray(restaurants) || restaurants.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const inserted = await Restaurant.insertMany(restaurants);

    res.status(201).json({
      message: "Restaurants added successfully",
      data: inserted
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding restaurants",
      error: err.message
    });
  }
};


// Get all restaurants
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Error fetching restaurants", error: err.message });
  }
};

// Get restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ id }).lean();
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

    const foodItems = await FoodItem.find({ restaurant_id: id })
      .select("-_id -__v")
      .lean();

    res.json({
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      location: restaurant.location,
      cost_for_two: restaurant.cost_for_two,
      rating: restaurant.user_rating?.rating,
      reviews_count: restaurant.user_rating?.total_reviews,
      image_url: restaurant.image_url,
      food_items: foodItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch restaurant details" });
  }
};

// Create food item(s) for a restaurant
export const createFoodItem = async (req, res) => {
  try {
    const { id } = req.params; // restaurant string id
    let data = req.body;

    if (!Array.isArray(data)) data = [data];

    const foodItemsData = data.map(item => ({
      ...item,
      restaurant_id: id,
    }));

    const savedItems = await FoodItem.insertMany(foodItemsData);

    const formatted = savedItems.map(f => ({
      name: f.name,
      cost: f.cost,
      food_type: f.food_type,
      image_url: f.image_url,
      restaurant_id: f.restaurant_id,
    }));

    res.status(201).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create food item(s)" });
  }
};
