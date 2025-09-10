import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    image_url: { type: String, required: true },  // Match field name exactly
    id: { type: Number, required: true }         // Store custom numeric id
});

const offer = mongoose.model('offer', offerSchema);

export default offer;
