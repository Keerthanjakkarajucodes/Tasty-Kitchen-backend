import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  cost_for_two: Number,
  cuisine: String,
  image_url: String,
  location: String,
  rating: Number,
  reviews_count: Number,
  opens_at: String,
  items_count: Number,
});

export default mongoose.model("Restaurant", restaurantSchema);
