import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  id: String, // so frontend can use it directly
  name: String,
  cost: Number,
  rating: Number,
  food_type: { type: String, enum: ["VEG", "NON-VEG"] },
  image_url: String,
  restaurant_id: {
    type: String, // store restaurant.id, not ObjectId
    ref: "Restaurant",
  },
});

export default mongoose.model("FoodItem", foodItemSchema);
