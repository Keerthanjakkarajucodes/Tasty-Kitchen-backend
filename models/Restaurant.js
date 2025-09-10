import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  location: String,
  image_url: String,
  cost_for_two: Number,
  rating: Number,
  reviews_count: Number,
  food_items: [
    {
      id: String,
      name: String,
      image_url: String,
      cost: Number,
      rating: Number,
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);


export default Restaurant;
