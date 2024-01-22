const express= require("express");
const router=express.Router();

const {loginRouter,signupRouter,postLogin,postSignup, slashlogin}=require("../controllers/commonController")

router.get("/",slashlogin)
router.get("/login",loginRouter)
router.get("/signup",signupRouter)
router.post("/login",postLogin)
router.post("/signup",postSignup)


module.exports=router