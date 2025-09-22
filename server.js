import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";

import {  recipeRoutes, userRoutes ,restaurantRoutes, offerRoutes} from "./routes/index.js";


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())



// Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/offers",offerRoutes)
app.use("/api/restaurants",restaurantRoutes)

// Root
app.get("/", (req, res) => {
  res.send("Tasty Kitchen API is running...");
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
