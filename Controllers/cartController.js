const cartModel = require("../Models/cartModel");
const CartModel = require("../Models/cartModel");

module.exports = {
  AddCart,
  GetCart,
  DeleteCartItem,
  TotalCartItems,
  GetPrice,
  DeleteCart
};

async function AddCart(req, res) {
  const body = req.body;
  try {
    const prod = await cartModel.findOne({
      userId: body.userId,
      prodId: body.prodId,
    });
    if (prod) {
      return res.status(300).json("Already Added to your Cart");
    }
    const data = await cartModel.create({
      userId: body.userId,
      prodId: body.prodId,
      prodName: body.prodName,
      prodPrice: body.prodPrice,
      prodDescription: body.prodDescription,
      imageUrl: body.prodImage,
      Discount: body.Discount,
    });
    return res.status(200).json(data);
  } catch (err) {
    console.log("err=>", err);
    return res.status(400).json(err);
  }
}

async function GetCart(req, res) {
  const id = req.params.userId;
  try {
    const data = await cartModel.find({ userId: id }).sort({ _id: -1 });
    console.log("data=>", data);
    return res.status(200).json(data);
  } catch (err) {
    console.log("err=>", err);
    return res.status(400).json(err);
  }
}


async function DeleteCart(req,res){
    const userId = req.params.userId;
  try{
    
    await  cartModel.deleteMany({userId:userId});
    return res.status(200).json("Done");

  }catch(err){
    console.log(err);
    return res.status(400).json(err);
  }

}

async function DeleteCartItem(req, res) {
  const ItemId = req.params.prodId;
  try {
    await cartModel.findByIdAndDelete(ItemId);
    return res.status(200).json("Item Deleted");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
}

async function TotalCartItems(req, res) {
  const id = req.params.id;
  console.log("id=>", id);
  try {
    const total = await cartModel.find({ userId: id }).count();
    console.log("total=>", total);

    return res.status(200).json(total);
  } catch (err) {
    console.log("Error=>", err);
    return res.status(400).json(err);
  }
}

async function GetPrice(req, res) {
  const id = req.params.userid;

  try {
    const subTotal = await cartModel.aggregate([
      {
        $group: {
          _id: id,
          total: {
            $sum: "$prodPrice",
          },
        },
      },
    ]);
    
    console.log("subTotal=>",subTotal[0].total);
    return res.status(200).json(subTotal);
  } catch (err) {
    console.log("Error=>", err);
    return res.status(400).json(err);
  }
}
