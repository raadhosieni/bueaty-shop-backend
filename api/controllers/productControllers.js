const mongoose = require("mongoose");
const Product = require("../models/productModel");

exports.products_create_product = (req, res) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    user: req.body.user,
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "product is created",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_get_all = (req, res) => {
  Product.find({})
    .exec()
    .then((products) => {
      const response = {
        count: products.length,
        products: products.map((product) => {
          return {
            id: product._id,
            name: product.name,
            category: product.category,
            size: product.size,
            description: product.description,
            price: product.price,
            image: product.image,
            request: {
              type: "GET",
              url: "http://localhost:5000/api/products/" + product._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_get_one = (req, res) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_add_review = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  product.reviews.push({
    name: req.body.name,
    rating: req.body.rating,
    comment: req.body.comment,
    user: req.body.user,
  });

  product
    .save()
    .then(() => {
      res.status(200).json({ message: "Review has been added" });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
