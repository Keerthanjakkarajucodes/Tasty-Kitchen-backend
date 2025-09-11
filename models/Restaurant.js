const mongoose = require('mongoose');

const userRatingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  rating_text: { type: String, required: true },
  rating_color: { type: String, required: true },
  total_reviews: { type: Number, required: true }
});

const restaurantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  cost_for_two: { type: Number, required: true },
  cuisine: { type: String, required: true },
  group_by_time: { type: Boolean, default: false },
  has_online_delivery: { type: Boolean, default: false },
  has_table_booking: { type: Boolean, default: false },
  is_delivering_now: { type: Boolean, default: false },
  location: { type: String, required: false },
  menu_type: { type: String, required: false },
  opens_at: { type: String, required: false },
  image_url: { type: String, required: false },
  user_rating: { type: userRatingSchema, required: true }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
