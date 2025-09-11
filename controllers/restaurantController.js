import Restaurant from "../models/Restaurant.js";
import FoodItem from "../models/FoodItem.js";

// Get all restaurants with pagination
export const getAllRestaurants = async (req, res) => {
  try {
    const { offset = 0, limit = 9 } = req.query;

    const total = await Restaurant.countDocuments();

    const restaurants = await Restaurant.find()
      .skip(Number(offset))
      .limit(Number(limit))
      .select("-_id -__v") // remove _id and __v
      .lean(); // convert to plain JS objects

    res.json({ restaurants, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

// Create one or multiple restaurants
export const createRestaurant = async (req, res) => {
  try {
    let data = req.body;

    // If single object, convert to array
    if (!Array.isArray(data)) data = [data];

    const savedRestaurants = await Restaurant.insertMany(data);

    // Format response exactly like frontend wants
    const formatted = savedRestaurants.map(r => {
      const { id, name, cost_for_two, cuisine, group_by_time, has_online_delivery, has_table_booking, image_url, location, menu_type, opens_at, user_rating } = r;
      return {
        id,
        name,
        cost_for_two,
        cuisine,
        group_by_time,
        has_online_delivery,
        has_table_booking,
        image_url,
        location,
        menu_type,
        opens_at,
        user_rating,
      };
    });

    res.status(201).json({ restaurants: formatted, total: formatted.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create restaurant(s)" });
  }
};

// Get restaurant by id with food items
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({ id }).select("-_id -__v").lean();
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

    const food_items = await FoodItem.find({ restaurant_id: id }).select("-_id -__v").lean();

    res.json({ ...restaurant, food_items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch restaurant details" });
  }
};
