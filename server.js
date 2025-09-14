import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import session from "express-session"; // <-- import this
import { authRoutes, cartRoutes, recipeRoutes, offerRoutes,restaurantRoutes } from './routes/index.js';

dotenv.config();
connectDB()

const app=express()
app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(morgan("dev"));
app.use(session({
  secret: process.env.SESSION_SECRET || "defaultSecret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // secure: true only if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/recipes", recipeRoutes);



app.get("/",(req,res)=>{
    res.send("Tasty Kitchen API is running...");
})

const PORT=process.env.PORT || 5000 

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})


