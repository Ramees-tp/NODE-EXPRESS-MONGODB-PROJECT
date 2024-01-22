
const mongoose=require("mongoose")
const Schema = mongoose.Schema

const detailsSchema=new Schema({
   
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    dateObirth:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true,
        unique:true
    }
    
})

module.exports = mongoose.model("Details", detailsSchema);



