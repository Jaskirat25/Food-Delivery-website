import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Food from "../models/Food.js";
import Order from "../models/Order.js";
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
    console.log(user.password);
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
    if (index !== -1) {
      user.cart[index].quantity += Number(quantity);
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
export const removeFromCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const token = req.user;
    const user = await User.findById(token.id);

    const item = user.cart.findIndex((item) => {
      return item.product.equals(productId);
    });

    if (item == -1) {
      console.log("id nhi mili cart ch");

      return res.json({ message: "nothing in cart" });
    }

    if (user.cart[item].quantity <= quantity) {
      user.cart.splice(item, 1);
    } else {
      user.cart[item].quantity -= Number(quantity);
    }
    await user.save();
    return res.json({ user });
  } catch (error) {
    console.log("remove cart:", error);
    throw new Error("error in removing from cart");
  }
};

export const getCartItems = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const user = await User.findById(userJWT.id).populate({
      path: "cart.product",
      model: "Food",
    });
    const cartItems = user.cart;
    return res.status(200).json(cartItems);
  } catch (err) {
    next(err);
  }
};
export const placeOrder=async(req,res,next)=>{
try {
  const {products,address,totalAmount}=req.body;
  const token=req.user;
  const user=await User.findOne({token});
  const order=new Order({
    products,
    user:user._id,
    totalAmount,
    address
  })
  await order.save();
  user.cart=[];
  await user.save();
  return res.json({message:"order plcaed successfully",order});
} catch (error) {
  console.log("error in placing order");
  
  throw new Error(error)
}
}
