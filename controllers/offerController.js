import offer from "../models/Offer.js";

export const getOffers= async (req,res)=>{
    try{
        const offers=await offer.find();
        res.status(200).json({offers});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"})
    }
}


export const createOffers = async (req, res) => {
    try {
        const newOffer = new offer(req.body); // expects JSON body with offer details
        await newOffer.save();
        res.status(201).json({ message: "Offer created", offer: newOffer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}
