import express from "express";
import { getOffers } from "../controllers/offerController.js";


const router = express.Router();

// Example offer route
router.get("/offers",getOffers)

export default router;