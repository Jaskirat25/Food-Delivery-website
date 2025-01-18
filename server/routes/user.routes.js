import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  addToCart,
  getCartItems,
  removeFromCart,
  userLoginIn,
  userSignUp,
} from "../controllers/user.controller.js";
import { addProducts, getFoodItems } from "../controllers/food.controller.js";

const router = express.Router();

router.post("/signin", userSignUp);
router.post("/login", userLoginIn);
router.post("/addToCart", verifyToken, addToCart);
router.post("/removeCart", verifyToken, removeFromCart);
router.get("/getFromCart", verifyToken, getCartItems);

router.get("/getFoodItems",getFoodItems)
router.post("/addProducts",addProducts)
export default router;
