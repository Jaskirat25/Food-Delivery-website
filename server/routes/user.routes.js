import express from "express"
import verifyToken from "../middleware/auth.js"
import { addToCart, userLoginIn, userSignUp } from "../controllers/user.controller.js";

const router=express.Router();

router.post("/signin",userSignUp)
router.post("/login",userLoginIn)
router.post("/addToCart",verifyToken,addToCart)
export default router;