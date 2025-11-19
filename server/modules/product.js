const { default: mongoose } = require('mongoose')
const nomgoose=require('mongoose')

const productSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
},
category:{
    type:String,
    required:true
},
material:{
    type:String,
    required:true
  
},
price:{
    type:Number,
    required:true
},
description:{
    type:String
},
image:{
    type: String,
    required:false
}
},{timestamps:true})

module.exports=mongoose.model("Product",productSchema)


















