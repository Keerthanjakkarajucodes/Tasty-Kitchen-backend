import mongoose from "mongoose";

const offerSchema= new mongoose.Schema({
    title:{type:String,requried:true},
    description:{type:String},
    imageUrl:{type:String},
    validTill:{type:Date}
});

const offer=mongoose.model('offer',offerSchema);

export default offer;