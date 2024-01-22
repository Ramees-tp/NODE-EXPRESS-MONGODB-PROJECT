
const multer=require("../middlewares/multer");
const path = require('path');
const express= require("express");
const router=express.Router();

const{aHomeRouter, addProducts, productList, userList, postAddPro, logAdmin, postLogAdmin, deletePro, updatePro, postUpdatePro, adminlogout, RemoveUser, }=require("../controllers/adminController")



router.get("/ahome",aHomeRouter)
router.get("/proForm",addProducts)
router.post("/proForm",multer.single("image"),postAddPro)

router.get("/proList", productList)
router.get("/userList", userList)

router.post("/editPro/:productId", updatePro);
router.post("/postEditPro/:productId", postUpdatePro);
router.post("/delpro/:productId",deletePro)
router.post("/removeUser/:userId",RemoveUser)
router.get('/logOut',adminlogout)

// router.get("/loginn",logAdmin)
// router.post("/loginn",postLogAdmin)




module.exports=router


