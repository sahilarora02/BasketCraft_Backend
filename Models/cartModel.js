const mongoose = require("mongoose")


const CartSchema =  new mongoose.Schema({

    userId:{
        type:String
    },
    prodId:{
        type:String
    },
    prodName:{
        type:String
    },
    prodPrice:{
        type:Number
    },
    prodDescription:{
        type:String
    },
    imageUrl:{
        type:[String]
    },
    Discount:{
        type:Number
    }
    
    })
    
    module.exports = mongoose.model("CartModel", CartSchema);