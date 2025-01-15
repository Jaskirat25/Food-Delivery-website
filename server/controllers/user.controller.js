import  jwt  from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt"
export const userSignUp = async (req, res) => {
  console.log("i reached");
  
  try {
    const { name, email, password, username } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("user already exist");
    return res.status(200).json({ error: "you already have a account" });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

const newUser= await User.create({
    name,
    email,
    password: hash,
    username,
  });
  await newUser.save();
  const token=jwt.sign({id:newUser._id},"12345")
  return res.status(200).json({newUser,token})
  } catch (error) {
    console.log("error in signup controller :",error);
    throw new Error("unable to create user");
  }

};
