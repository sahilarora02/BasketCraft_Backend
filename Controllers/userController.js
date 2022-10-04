const userModel = require("../Models/userModel");
const otpModel = require("../Models/otpModel");
const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");

module.exports = {
  sendMAil,
  Registeration,
  Login,
  GetUser
};

async function sendMAil(req, res) {
  try {
    const val = Math.floor(1000 + Math.random() * 9000);
    const user = await otpModel.find({ Email: req.body.Email });
    console.log(user);
    
      await otpModel.create({
        Email: req.body.Email,
        otp: val,
      }); 
     
      const accountSid = "ACff714228be4150bbad2c56ffc6d2101b";
      const authToken = "6e26a67d0a61d7617f7acbed50c275bb";
      const client = require('twilio')(accountSid, authToken);
      
      client.messages
            .create({
               from: 'whatsapp:+14155238886',
               body: `Your Otp is ${val}`,
               to: `whatsapp:+91${req.body.Phone}`
             })
            .then(message => console.log(message.sid));

    const tranporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "sahilarora2drive@gmail.com",
        pass: "bxjwiyorpzpufiig",
      },
    });

    const mailOptions = {
      from: "sahilarora2drive@gmail.com",
      to: req.body.Email,
      subject: "Ecommerce - otp for user verification",
      text: `please enter this otp ${val} with your given email id.`,
    };

    tranporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        console.log("send");
        res.send("success");
      }
    });

    // console.log("data entered : ", data);

    return res.status(200).json({ message: "mail sent succesfully" });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ message: error });
  }
}

async function Registeration(req, res) {
  const body = req.body;
console.log(body);
  try {
    const user = await userModel.findOne({ Email: body.Email });
    console.log(user);
    if (user) {
      return res.status(300).json("Already Registered");
    } else {
      const userDetails = await otpModel.findOne({ Email: body.Email });
    console.log(userDetails);

      if (userDetails.otp == body.otp) {
        const data = await userModel.create({
          Email: body.Email,
          Password: body.Password,
          Name: body.Name,
          ContactNo:body.Phone
        });
        const accountSid = "ACff714228be4150bbad2c56ffc6d2101b";
        const authToken = "6e26a67d0a61d7617f7acbed50c275bb";
        const client = require('twilio')(accountSid, authToken);
        
        client.messages
              .create({
                 from: 'whatsapp:+14155238886',
                 body: `!!!yeah Successfully Registered ,Enjoy😀🤩`,
                 to: `whatsapp:+91${req.body.Phone}`
               })
              .then(message => console.log(message.sid));
        return res.status(200).json({ data: data });
      } else {
        return res.status(401).json("Invalid Otp");
      }
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}

async function Login(req,res){
const body = req.body ;
try{
      const user = await userModel.findOne({Email:body.Email});
      if(!user){
        console.log("user does not exist");
        return res.status(404).json("user does not exist");
      }
      if(user.Password!=body.Password){
        console.log("Wrong Email and Password");

      return res.status(401).json("Wrong Email and Password");
      }
      console.log("Success");

      return res.status(200).json({user});


}catch(err){
  return res.status(400).json({message:err});
}

}


async function GetUser(req,res){
   const id = req.body.userId;
  try{
    const data = await userModel.findOne({_id:id});
    return res.status(200).json(data);

  }catch(err){
  return res.status(400).json({message:err});
}
}