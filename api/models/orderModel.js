const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: mongoose.Schema.Types.ObjectId,
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: String,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: Boolean,
    isDelivered: Boolean,
    paidAt: Date,
    deliveredAt: Date,
    paymentResult: {
      id: String,
      status: String,
      updatedTime: Date,
      emailAddress: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
