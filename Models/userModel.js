const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const userSchema = new mongoose.Schema({
Email:{
    type:String
},
Password:{
    type:String
},
Name:{
    type:String
},
ContactNo:{
    type:Number
}, 
prodId:{
    type:String
},
ProdList:{
    type:Object
},




});

module.exports = mongoose.model("userModel", userSchema);
