const express= require("express");
const router=express.Router();


const { productRout, homeRout, userUpdate, logout, postUserUpdate, updatedDetails} = require("../controllers/userController");



router.get("/products",productRout)
router.get("/userHome",homeRout)

router.get("/updateUser",userUpdate)
router.post("/updateUser",postUserUpdate)
router.get("/showUpdate",updatedDetails)

router.get("/logout",logout)

module.exports=router


