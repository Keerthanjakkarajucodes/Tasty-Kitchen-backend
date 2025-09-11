import mongoose from "mongoose";

const userRatingSchema = new mongoose.Schema({
  rating: Number,
  total_reviews: Number,
  rating_text: String,
  rating_color: String,
});

const restaurantSchema = new mongoose.Schema({
  id: String, // CCBP-style string ID
  name: String,
  cost_for_two: Number,
  cuisine: String,
  image_url: String,
  location: String,
  opens_at: String,
  menu_type: String,
  user_rating: userRatingSchema,
});

export default mongoose.model("Restaurant", restaurantSchema);
