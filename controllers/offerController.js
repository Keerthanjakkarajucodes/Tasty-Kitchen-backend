import offer from "../models/Offer.js";

export const getOffers = async (req, res) => {
    try {
        const offers = await offer.find();

        const formattedOffers = offers.map((offer, index) => ({
            image_url: offer.imageUrl,  // Use camelCase field from DB
            id: index + 1               // Or use your own logic for id
        }));

        res.status(200).json({ offers: formattedOffers });
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

