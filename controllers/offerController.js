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