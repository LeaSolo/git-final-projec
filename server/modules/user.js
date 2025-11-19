const mongoose = require('mongoose')

const useSchema=new mongoose.Schema({

        password:{
        type:String,
        required:true
        },
        name:{
        type:String,
        required:true,
        },
        email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim:true
        },
        phone: {
        type: String,
        },
        roles:{
        type:String,
        enum:['User', 'Admin'],
        default:"User",
        },
        active: {
        type: Boolean,
        default: true,
        }
},
{
    timestamps:true
})

module.exports=mongoose.model("User",useSchema)