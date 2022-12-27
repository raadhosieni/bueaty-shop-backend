const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect(
  "mongodb://raadhosieni:" +
    process.env.ATLAS_PW +
    "@ac-7kdssdx-shard-00-00.eh9dzzp.mongodb.net:27017,ac-7kdssdx-shard-00-01.eh9dzzp.mongodb.net:27017,ac-7kdssdx-shard-00-02.eh9dzzp.mongodb.net:27017/?ssl=true&replicaSet=atlas-g76uhw-shard-0&authSource=admin&retryWrites=true&w=majority"
);

const productRoutes = require("./api/routes/productRoutes");
const userRoutes = require("./api/routes/userRoutes");
const orderRoutes = require("./api/routes/orderRoutes");
const uploadRoutes = require("./api/routes/uploadRoutes");

const port = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

__dirname = path.resolve();

console.log(__dirname);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
