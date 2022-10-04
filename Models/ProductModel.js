const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  Description: {
    type: String,
  },
  Price: {
    type: String,
  },
  imageId: {
    type: String,
  },
  category:{
    type:String
  },
  

});

module.exports = mongoose.model("ProductModel", ProductSchema);
