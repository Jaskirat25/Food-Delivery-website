// import express from "express";
// import verifyToken from "../middleware/auth.js";
// import {
//   addToCart,
//   getCartItems,
//   removeFromCart,
//   userLoginIn,
//   userSignUp,
// } from "../controllers/user.controller.js";
// import { addProducts, getFoodItems } from "../controllers/food.controller.js";

// const router = express.Router();

// router.post("/signup", userSignUp);
// router.post("/signin", userLoginIn);
// router.post("/addToCart", verifyToken, addToCart);
// router.post("/removeCart", verifyToken, removeFromCart);
// router.get("/getFromCart", verifyToken, getCartItems);

// router.get("/getFoodItems",getFoodItems)
// router.post("/addProducts",addProducts)
// export default router;
import express from "express";
import {
  userLoginIn,
  userSignUp,
  addToCart,

  getCartItems,
  placeOrder,
  removeFromCart,
} from "../controllers/user.controller.js";
import verifyToken  from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userLoginIn);

router.post("/cart", verifyToken, addToCart);
router.get("/cart", verifyToken, getCartItems);
router.patch("/cart", verifyToken, removeFromCart);

router.post("/order", verifyToken, placeOrder);

export default router;