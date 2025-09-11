import Restaurant from "../models/Restaurant.js";
import FoodItem from "../models/FoodItem.js";


// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const { offset = 0, limit = 9 } = req.query;

    const total = await Restaurant.countDocuments();
    const restaurants = await Restaurant.find()
      .skip(Number(offset))
      .limit(Number(limit));

    res.json({ restaurants, total });
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
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({ id });
    if (!restaurant) return res.status(404).json({ error: "Not found" });

    const foodItems = await FoodItem.find({ restaurant_id: id });

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
    res.status(500).json({ error: "Failed to fetch restaurant details" });
  }
};


// Create one or many food items under a restaurant
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
    res.status(201).json(savedItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to create food item(s)" });
  }
};

