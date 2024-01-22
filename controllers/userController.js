const UserData = require("../models/user");
const productData = require("../models/productSchema");
const userDetails=require('../models/detailsSchema');

const { default: mongoose } = require("mongoose");
let message = "";

let obj2 = {

  productRout: async (req, res) => {
    if(req.session.userId){
      let products;
      try {
        products = await productData.find();
      } catch (err) {
        console.log(err);
      }
      if (!products) {
        return res.status(404).json({ message: "No product Found" });
      }
      res.render("userFolder/products", { allproducts: products });
    }else{
      res.redirect("/login")
    }
   
  },
  homeRout: (req, res) => {
    if(req.session.userId){
      res.render("userFolder/userHome");
    }
    else{
      res.redirect("/login")
    }
    
   
  },
  userUpdate: async(req, res) => {
     if(req.session.userId){
      const userIdd=req.session.userId
     
     try{
      const user=await UserData.findOne({_id:userIdd})
      const details=await userDetails.findOne({userId:userIdd})

      if(user){
        res.render("userFolder/updateProfile",{user,details})
      }
    else{
        res.status(404).send("rsdtadrst")
      }
     }catch(error){
      res.status(404).send("user not found")
     }
    }else{
      res.redirect('/login')
    }
     
    
  },
  postUserUpdate:async(req,res)=>{
    if(req.session.userId){
      const {dateObirth,gender,age,num}= req.body
      const userIdd = req.session.userId;
      // const user = await UserData.findOne({ _id: userIdd });
      // const userId=user._id
      await userDetails.updateOne(
        {userId:userIdd},
        {$set:{dateObirth:dateObirth,gender:gender,age:age,number:num}},
        {upsert:true}
      )
      res.redirect('/users/showUpdate')
      }
      else{
        res.redirect('/login')
    
      }
  },

  updatedDetails:async(req,res)=>{
    if(req.session.userId){
     
  const userIdd=req.session.userId;
  const profile=await UserData.aggregate([
    { $match:{_id: new mongoose.Types.ObjectId(userIdd)}},
    {
      $lookup:{
        from:"details",
        localField:"_id",
        foreignField:"userId",
        as:"extraDetails"
      }
    }
  ])
  console.log(profile);
  res.render("userFolder/updatedForm",{profile})
    }else{
      res.redirect('/login')
    }  
  },

  logout: (req, res) => {
    
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      else{
        res.redirect('/login');
      }
    });
  }
}

module.exports = obj2;


