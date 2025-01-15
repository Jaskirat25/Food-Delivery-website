import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db");
  } catch (error) { 
    console.log("failed to connect wth db", error);
  }
};
