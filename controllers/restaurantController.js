import Restaurant from "../models/Restaurant.js";

// ✅ Add multiple restaurants at once
export const addRestaurants = async (req, res) => {
  try {
    const restaurants = req.body; // expects array of restaurants
    if (!Array.isArray(restaurants)) {
      return res.status(400).json({ message: "Request body must be an array" });
    }

    const savedRestaurants = await Restaurant.insertMany(restaurants);
    res.status(201).json({
      message: "Restaurants added successfully",
      data:savedRestaurants,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding restaurants", error });
  }
};

// ✅ Get all restaurants
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};
