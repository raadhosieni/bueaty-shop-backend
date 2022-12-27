const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    rating: Number,
    comment: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "small",
    },
    price: {
      type: Number,
      required: true,
    },
    image: String,
    brand: String,
    rating: Number,
    numReviews: Number,
    reviews: [reviewSchema],
    countInStock: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
