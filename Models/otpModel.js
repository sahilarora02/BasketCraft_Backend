const mongoose = require("mongoose")


const otpSchema =  new mongoose.Schema({

otp:{
    type:Number
},
Email:{
    type:String
}

})

module.exports = mongoose.model("otpModel", otpSchema);
