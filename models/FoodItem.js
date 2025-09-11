import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: String,
  cost: Number,
  food_type: { type: String, enum: ["VEG", "NON-VEG"] },
  image_url: String,
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

export default mongoose.model("FoodItem", foodItemSchema);
    