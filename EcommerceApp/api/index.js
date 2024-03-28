const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");

const app = express();
app.use(express.json());
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const { error } = require("console");

// mongoose
//   .connect(
//     "mongodb+srv://ssangtikonyak:sangtikonyak@cluster0.y4tdtuy.mongodb.net/",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("connected to mongo db");
//   })
//   .catch((error) => console.log("error connecting to mongodb", error));

const url = "mongodb://127.0.0.1:27017/Ecommerce";

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Handle connection error
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Connection successful
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// app.listen(port, () => {
//   console.log("server is running in port 8000");
// });
app.listen(port, "192.168.0.174", () => {
  console.log("Server is running on http://192.168.0.174");
});

const User = require("./models/User");
const Order = require("./models/order");

//function to send verification email to the user
const sendVerificationToken = async (email, verificationToken) => {
  //create a Notemailer transport
  const transporter = nodeMailer.createTransport({
    //configure the email services
    service: "gmail",
    auth: {
      user: "ssangtikonyak@gmail.com",
      pass: "qsjs xtyu gpbx qcqu",
    },
  });

  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Token Verification",
    text: `Please click the following link to verify your email : http://localhost:8000/verify/${verificationToken}`,
  };

  // send email
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("error sending email", err);
  }
};

//Endpoint to register in the App
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    console.log("register called");
    console.log(name, email, password);

    //check if the user already registered

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email Already Registered" });
    }
    //create a new User

    const newUser = new User({ name, email, password });

    //generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();
    sendVerificationToken(newUser.email, newUser.verificationToken);
    return res.status(201).json({ message: "Registeration Success" });
  } catch (err) {
    console.log("Error Registering", err);
    res.status(500).json({ message: "Registeration Failed" });
  }
});

//endpoint to verify Email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //find the user with the given token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid Verification Token" });
    }
    //mark the user as verified
    user.verified = true;

    user.verificationToken = undefined;

    await user.save();

    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Email Verification Failed", err });
  }
});
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userFromDb = await User.findOne({ email });
    console.log(userFromDb);
    if (!userFromDb) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    if (userFromDb.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: userFromDb._id }, secretKey);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Login failed" });
  }
});

app.post("/add-address/:userId", async (req, res) => {
  try {
    const address = req.body;
    const userId = req.params.userId;
    //  console.log(address);
    //find the user With corresponding user id
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    existingUser.addresses.push(address);

    //save the user with the added address

    await existingUser.save();

    return res.status(201).json({ message: "Address added successfully" });
  } catch (err) {
    console.log("error : ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get addresses of the user

app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    //console.log("address caled", userId);
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const addresses = existingUser.addresses;
    const updateAddresses = addresses.filter((item) => item !== null);

    return res.status(200).json({ updateAddresses });
  } catch (err) {
    console.log("err : ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const product = [];
    product.push(cartItems);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    console.log(product);
    //create an array of product object from card items
    const products = product.map((item) => ({
      name: item?.title,
      quantity: item?.quantity,
      price: item?.price,
      image: item?.image,
    }));

    // create a new order
    const order = new Order({
      user: userId,
      products: products,
      price: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });
    console.log("order ", order);
    await order.save();
    return res.status(200).json({ message: "Order Placed Successfullly" });
  } catch (err) {
    console.log("err : ", err);
    return res.status(500).json({ message: err });
  }
});

app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    //console.log("userId : ", userId);
    const orders = await Order.find({ user: userId }).populate("user");
    //console.log("orders :", orders);
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "no orders found" });
    }
    return res.status(200).json({ orders });
  } catch (err) {
    console.log("err : ", err);
    return res.status(500).json({ err });
  }
});
