import mongoose from "mongoose"

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    orders:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Order",
    
    },
    cart:{
        type:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Food"
                },
                quantity:{
                    type:Number,
                    default:1
                }
                
            }
        ],
        default:[]
    }   


},{timestamps:true});

export default mongoose.model("User",UserSchema)