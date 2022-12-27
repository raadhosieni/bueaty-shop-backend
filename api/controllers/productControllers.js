const mongoose = require("mongoose");
const Product = require("../models/productModel");

exports.products_create_product = (req, res) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    user: req.userData.id,
    name: "Sample name",
    description: "Sample description",
    category: "Sample category",
    price: 0,
    image: "/images/sample.jpg",
    size: "small",
    brand: "Sample brand",
    numReviews: 0,
    countInStock: 0,
  });

  product
    .save()
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_update_product = async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (product) {
    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.size = req.body.size || product.size;
    product.image = req.body.image || product.image;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } else {
    res.status(500).json({
      error: "Product not found",
    });
  }
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

exports.products_delete_product = async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (product) {
    await product.remove();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } else {
    res.status(500).json({
      error: "Product not found",
    });
  }
};
