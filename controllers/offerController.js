import offer from "../models/Offer.js";

export const getOffers = async (req, res) => {
    try {
        const offers = await offer.find();

        res.status(200).json({ offers });  // No transformation needed
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};




export const createOffers = async (req, res) => {
    try {
        let offers = req.body;

        if (!offers) {
            return res.status(400).json({ message: "Request body is missing" });
        }

        // Wrap single object into an array
        if (!Array.isArray(offers)) {
            offers = [offers];
        }

        const createdOffers = await offer.insertMany(offers);
        res.status(201).json({ message: "Offers created", offers: createdOffers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

