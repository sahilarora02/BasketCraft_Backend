const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3002;

const cors = require("cors");
dotenv.config();

//CONNECTING MONGODB

mongoose
  .connect(process.env.DB_CONNECT, {})
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("./ImgUploads"));

const Routes = require("./Routes/apiRoutes");
app.use("/", Routes);

app.listen(PORT, () => {
  console.log("server started and running on port 3002");
});
