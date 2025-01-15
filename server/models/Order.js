import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
  },
  status:{
    type:String,
    default:"payment done"
  },
  products: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"Food",
          required: true,
        },
        
            quantity:{
                type:Number,
                required:true
            },
        
      },
    ],
    required:true,
  },
});
export default mongoose.model("Order",OrderSchema)