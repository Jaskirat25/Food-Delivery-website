import express from "express"
import { userLoginIn, userSignUp } from "../controllers/user.controller.js";

const router=express.Router();

router.post("/signin",userSignUp)
router.post("/login",userLoginIn)
export default router;