import mongoose from "mongoose"

const FoodSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:[String],
        required:true
    },
    image:{
        type:String,
        required:true
    },
    ingredients:{
        type:[String],
        required:true
    }


},{timestamps:true});

export default mongoose.model("Food",FoodSchema)