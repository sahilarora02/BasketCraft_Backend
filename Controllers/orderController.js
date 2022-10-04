const userModel = require("../Models/userModel");

module.exports = {
CheckOut,
GetOrderedList
}

async function CheckOut(req,res){

    const userId = req.body.userId;
   const CartArray = req.body.cartArray;
   console.log("Cart Array=>",CartArray);

   
    try{

      for(let i =0;i<CartArray.length;i++){

        await userModel.updateOne(
          {
         _id:userId
        },
        
        {
          $push: {
                ProdList : CartArray[i] ,
              } 
        }
           
         
      
         
        
       );
      }
  return res.status(200).json("Congrats");

    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }

}


async function GetOrderedList(req,res){
 
  const id = req.params.userId;

try{
 
    const List = await userModel.findOne({_id:id});
    console.log("List=>",List.ProdList);
    return res.status(200).json(List.ProdList);


}catch(err){
  console.log(err);
  return res.status(400).json(err);
}

}