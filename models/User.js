// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {            
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function() { return !this.googleId }, // required only if not Google user
    },
    mobile: {
      type: String,
      required: function() { return !this.googleId }, // required only if not Google user
      unique: true,
      sparse: true, // allows null/undefined for Google users
    },
    googleId: {       // stores Google UID
      type: String,
      unique: true,
      sparse: true,    // allows regular users to not have googleId
    },
    avatar: {         // stores profile photo URL
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
