import express from "express";
import { getOffers,createOffers } from "../controllers/offerController.js";


const router = express.Router();

// Example offer route
router.get("/offers",getOffers)
router.post("/create-offers",createOffers)

export default router;