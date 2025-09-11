import Restaurant from "../models/Restaurant.js";
import FoodItem from "../models/FoodItem.js";

// ---------------------- GET ALL RESTAURANTS ----------------------
export const getAllRestaurants = async (req, res) => {
  try {
    const { offset = 0, limit = 9 } = req.query;

    const total = await Restaurant.countDocuments();

    const restaurants = await Restaurant.find()
      .skip(Number(offset))
      .limit(Number(limit))
      .lean(); // convert Mongoose documents to plain JS objects

    // Format to remove _id, __v
    const formatted = restaurants.map(r => ({
      id: r.id,
      name: r.name,
      cost_for_two: r.cost_for_two,
      cuisine: r.cuisine,
      group_by_time: r.group_by_time,
      has_online_delivery: r.has_online_delivery,
      has_table_booking: r.has_table_booking,
      image_url: r.image_url,
      location: r.location,
      menu_type: r.menu_type,
      opens_at: r.opens_at,
      user_rating: r.user_rating,
    }));

    res.json({ restaurants: formatted, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

// ---------------------- CREATE RESTAURANT(S) ----------------------
export const createRestaurant = async (req, res) => {
  try {
    let data = req.body;

    if (!Array.isArray(data)) data = [data];

    const savedRestaurants = await Restaurant.insertMany(data);

    const formatted = savedRestaurants.map(r => ({
      id: r.id,
      name: r.name,
      cost_for_two: r.cost_for_two,
      cuisine: r.cuisine,
      group_by_time: r.group_by_time,
      has_online_delivery: r.has_online_delivery,
      has_table_booking: r.has_table_booking,
      image_url: r.image_url,
      location: r.location,
      menu_type: r.menu_type,
      opens_at: r.opens_at,
      user_rating: r.user_rating,
    }));

    res.status(201).json({ restaurants: formatted, total: formatted.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create restaurant(s)" });
  }
};

// ---------------------- GET RESTAURANT BY ID ----------------------
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

// ---------------------- CREATE FOOD ITEM(S) ----------------------
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
