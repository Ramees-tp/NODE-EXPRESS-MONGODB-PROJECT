
const mongoose=require("mongoose")
const Schema = mongoose.Schema

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
         type:String,
         required:true,
         minlength:8
    },
    role:{
        type:String,
        default: "user",
        required:true
    },
    class:{
        type:Schema.Types.ObjectId,
        require:true
    }

})

module.exports = mongoose.model("users", userSchema);


