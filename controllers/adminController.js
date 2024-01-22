const UserData = require("../models/user");
const productData = require("../models/productSchema");
const mongoose = require("mongoose");

let message = "";


let obj = {
 
  aHomeRouter: async(req, res) => {
    if(req.session.userId && req.session.isAdmin){
     
      res.render("adminFolder/adminHome");
    }else{
      res.redirect("/login")
    }
  },
 
  addProducts: (req, res) => {
    if(req.session.userId && req.session.isAdmin){
      res.render("adminFolder/productForm",{message:message});
    }else{
      res.redirect("/login")
    }
    
    
  },
  postAddPro: async (req, res) => {
    const { prodName, prodPrice, prodDescri } = req.body;
    const images=req.file ? `/uploads/${req.file.filename }`:"/default-image.jpg"
    let newProduct = new productData({
      name: prodName,
      price: prodPrice,
      description: prodDescri,
      image:images
      });

    await newProduct.save();
    message="new product is added"
    return res.redirect("/admin/proForm");
  },


  updatePro: async (req, res) => {
    try {
      if(req.session.userId && req.session.isAdmin){
        const productId = req.params.productId;
      const product = await productData.findById(productId);
      console.log(product);
      
      res.render("adminFolder/editproducts", { product: product });
      }else{
        res.redirect("/login")
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  postUpdatePro: async (req, res) => {
    try {
      const productId = req.params.productId;
      const { productName, productPrice, productDescription } = req.body;

      const product = await productData.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.name = productName;
      product.price = productPrice;
      product.description = productDescription;

      await product.save();

      res.redirect("/admin/proList");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } ,
  productList: async (req, res) => {
    if(req.session.userId && req.session.isAdmin){
      let products;
      try {
        products = await productData.find();
      } catch (err) {
        console.log(err);
      }
      
      if (!products) {
        return res.status(404).json({ message: "No product Found" });
      }
      res.render("adminFolder/productList", { allproducts: products });
    
    }else{
      res.redirect("/login")
    }  
  },
  deletePro:async(req,res)=>{

    const proid=req.params.productId
    try{
      await productData.findOneAndDelete({_id:proid})
      res.redirect("/admin/proList")
    }catch(err){
      console.log("error deleting user");
    }
  },
 
  userList: async (req, res) => {
      if(req.session.userId && req.session.isAdmin){
        const users= await UserData.find()
        const profiles=[]
        for (const user of users) {
          const profile = await UserData.aggregate([
            {
              $match: { _id: new mongoose.Types.ObjectId(user._id) },
            },
            {
              $lookup: {
                from: "details",
                localField: "_id",
                foreignField: "userId",
                as: "extraDetails",
              },
            },
          ]);
          if(user.role==="user"){
            profiles.push(profile);
          }
        }
      res.render("adminFolder/userList",{profiles});
      }else{
        res.redirect('/login')
      }  
  },
  RemoveUser: async(req,res)=>{
      const userId=req.params.userId
      try{
        await UserData.findByIdAndDelete({_id:userId})
        res.redirect("/admin/userList")
      }
      catch(err){
        console.log("error deleting user");
      }
  },

  adminlogout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      else{
        res.redirect('/login');
      }
    });
  }
};

module.exports = obj;


