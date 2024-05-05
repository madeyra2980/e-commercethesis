const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const userModel = require('./models/User')
const { User, validate } = require('./models/User');
const jwt = require('jsonwebtoken')

app.use(express.json());
app.use(cors());

  mongoose.connect(
    "mongodb://localhost:27017/orders"
)

app.get("/", (req, res) => {
  res.send("Express app is running");
});

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  category: {
    type: Number,
    default: true,
    index: true,
  },
  new: {
    type: Boolean,
    require: true,
  },
  gender:{
    type: String,
    require: true,
  }
});

const News = mongoose.model("News", {
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    new: req.body.new,
    gender: req.body.gender,
  });
  await product.save();
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});


app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products Fetched");
  res.send(products);
});


app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);

  console.log("New collection added");

  res.send(newcollection);
});


app.put("/editproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, price } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { id: id },
      { $set: { name, image, description, price } },
      { new: true }
    );

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update product" });
  }
});


app.get("/products/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch products by category" });
  }
});


app.post("/addnews", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = `http://localhost:${port}/images/${req.file.filename}`;

    const news = new News({
      image: imageUrl,
    });

    await news.save();

    res.json({
      success: true,
      news: news,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to add news" });
  }
});


app.get("/news", async (req, res) => {
  try {
    const newsImages = await News.find({}, "image");
    res.json(newsImages);
  } catch (error) {
    console.error("Error loading news images:", error);
    res
      .status(500)
      .send("An error occurred while loading news images");
  }
});

app.post("/removenews", async (req, res) => {
  try {
    const { id } = req.body;
    await News.findOneAndDelete({ _id: id });
    console.log("News Removed");
    res.json({
      success: true,
      id: id,
    });
  } catch (error) {
    console.error("Error removing news:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Failed to remove news",
      });
  }
});


app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username or email already exists" });
    }

    const newUser = new User({ firstName, username, email, password });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to register user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to login" });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log(`ERROR ${error}`);
  }
});

