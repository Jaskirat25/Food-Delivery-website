import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Food from "../models/Food.js";
export const userSignUp = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("user already exist");
      return res.status(200).json({ error: "you already have a account" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hash,
      username,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, "12345");

    return res.status(200).json({ newUser, token });
  } catch (error) {
    console.log("error in signup controller :", error);
    throw new Error("unable to create user");
  }
};

export const userLoginIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("account toh bnale pehle");

      return res.status(401).json({ message: "user dont exist" });
    }
    const pass = bcrypt.compareSync(password, user.password);

    if (!pass) {
      console.log("galat password hai bhai");

      return res.status(401).json({ message: "wrong password" });
    }
    const token = jwt.sign({ id: user._id }, "12345");
    return res.status(200).json({ token, user });
  } catch (error) {
    throw new Error("error in signup:", error);
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const item = await Food.findOne({ productId });

    const token = req.user;
    const user = await User.findById(token.id);

    const index = user.cart.findIndex((item) => {
     return item.product.equals(productId);
    });
    if (index!==-1) {
      user.cart[index].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }


    await user.save();
    return res
      .status(200)
      .json({ message: "Product added to cart successfully", user });
  } catch (error) {
    console.log(error);
  }
};

