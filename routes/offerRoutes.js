import express from "express";
import { getOffers,createOffers } from "../controllers/offerController.js";


const router = express.Router();

// Example offer route
router.get("/",getOffers)
router.post("/",createOffers)

export default router;