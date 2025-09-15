const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
      minlength: 6,
      default: null,  // ✅ Optional now
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
