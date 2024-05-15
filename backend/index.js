const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require('nodemailer')
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myapp",
{ useNewUrlParser: true, useUnifiedTopology: true });

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

const Order = mongoose.model("Order", {
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
  surname: String,
  cartNumber: String,
  cvv: String,
  dataCart: String,
  orderItems: [
    {
      productName: { type: String, required: true }, 
      quantity: { type: Number, required: true }, 
      price: { type: Number, required: true },  // Added price field
    }
  ],
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail.com', // Вы можете использовать другой почтовый сервис
  host:'smtp.gmail.com',
  port: 587, 
  auth: {
    user: 'madeyra2980@gmail.com', // Ваш email
    pass: 'mzyqdraoqpfrpbqc' // Ваш пороль
  }
});

// Route to handle incoming order data
app.post("/orders", async (req, res) => {
  try {
// Извлекаем данные заказа из тела запроса
    const {
      name,
      email,
      phoneNumber,
      address,
      surname,
      cartNumber,
      cvv,
      dataCart,
      orderItems,
      totalAmount
    } = req.body;

    // Создаем новый экземпляр заказа
    const order = new Order({
      name,
      email,
      phoneNumber,
      address,
      surname,
      cartNumber,
      cvv,
      dataCart,
      orderItems,
      totalAmount
    });

// Сохраняем заказ в базе данных
    await order.save();

    let orderDetails = `Ваш заказ был успешно оформлен.\n\nДетали заказа:\n`;
    orderItems.forEach((item, index) => {
      orderDetails += `${index + 1}. ${item.productName} - Количество: ${item.quantity} - Цена за единицу: ${item.price}тг\n`;
    });
    orderDetails += `Итоговая сумма: ${totalAmount}тг`;

    const mailOptions = {
      from: 'salimov.nurkanat02@gmail.com',
      to: email,
      subject: 'Ваш заказ был успешно оформлен',
      text: orderDetails
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Ошибка при отправке почты:", error);
      }
      console.log('Email sent: ' + info.response);
    });


// Отвечаем сообщением об успешном сохранении
    res.status(201).json({ success: true, message: "Заказ успешно сохранен" });
  } catch (error) {
    // Обрабатываем ошибки
    console.error("Ошибка при сохранении заказа:", error);
    res.status(500).json({ success: false, error: "Не удалось сохранить заказ" });
  }
});

// Извлекаем все заказы из базы данных
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    res.status(500).json({ success: false, error: "Не удалось получить заказы" });
  }
});

//Assuming you have a mongoose model named Order
app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, error: "Failed to delete order" });
  }
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
  gender: {
    type: String,
    require: true,
  },
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

app.post('/addproduct', async (req, res) => {
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
    res.status(500).json({ success: false, error: "Failed to update product" });
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
    res.status(500).json({ success: false, error: "Failed to add news" });
  }
});

app.get("/news", async (req, res) => {
  try {
    const newsImages = await News.find({}, "image");
    res.json(newsImages);
  } catch (error) {
    console.error("Error loading news images:", error);
    res.status(500).send("An error occurred while loading news images");
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
    res.status(500).json({
      success: false,
      error: "Failed to remove news",
    });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log(`ERROR ${error}`);
  }
});
