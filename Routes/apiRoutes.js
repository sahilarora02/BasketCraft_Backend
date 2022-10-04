const router = require("express").Router();
const userRouter = require("../Controllers/userController");
const cartrouter = require("../Controllers/cartController");
const orderRouter = require("../Controllers/orderController");


router.post("/sendMail",userRouter.sendMAil);
router.post("/Register",userRouter.Registeration);
router.post("/Login",userRouter.Login);
router.get("/GetUser",userRouter.GetUser);


router.post("/AddtoCart",cartrouter.AddCart);
router.get("/GetPrice/:userId",cartrouter.GetPrice);
router.get("/GetYourCart/:userId",cartrouter.GetCart);
router.get("/TotalCartItems/:id",cartrouter.TotalCartItems);
router.delete("/DeleteCart/:userId",cartrouter.DeleteCart);
router.delete("/DeleteItemFromCart/:prodId",cartrouter.DeleteCartItem);

router.post("/CheckOut",orderRouter.CheckOut);
router.get("/GetOrderedList/:userId",orderRouter.GetOrderedList);


module.exports = router;