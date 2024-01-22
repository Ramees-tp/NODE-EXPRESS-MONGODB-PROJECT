const express =require("express")
const app=express()
const port=999
const Router=require("./routes/adminRoutes")
const Router1=require('./routes/userRoutes')
const Router2=require("./routes/commonRouts")
const mongConnect=require("./config/config")




const session =require("express-session")
app.use(express.static('public'))
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:true,
  // cookie:{
  // maxAge:500000
  // }
}))


app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/admin",Router)
app.use("/users",Router1)
app.use("/",Router2)


mongConnect.then(() => {
app.listen(port,()=>{
    console.log(`server is rinning at http://localhost:${port}`);
});
});



