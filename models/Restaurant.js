import mongoose from "mongoose";

const userRatingSchema = new mongoose.Schema(
  {
    rating_text: { type: String },
    rating_color: { type: String },
    total_reviews: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { _id: false } // don't create _id for nested object
);

const restaurantSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // your given id
    name: { type: String, required: true },
    cost_for_two: { type: Number, required: true },
    cuisine: { type: String, required: true },
    group_by_time: { type: Boolean, default: false },
    has_online_delivery: { type: Boolean, default: false },
    has_table_booking: { type: Number, default: 0 },
    image_url: { type: String, required: true },
    location: { type: String, required: true },
    menu_type: { type: String, enum: ["VEG", "NON-VEG"], default: "VEG" },
    opens_at: { type: String },
    user_rating: userRatingSchema,
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
