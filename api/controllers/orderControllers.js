const mongoose = require("mongoose");
const Order = require("../models/orderModel");

exports.orders_create_order = (req, res) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    user: req.body.user,
    orderItems: req.body.items.map((item) => ({
      name: item.name,
      qty: item.quantity,
      image: item.image,
      price: item.price,
      product: item.id,
      _id: mongoose.Types.ObjectId(),
    })),
    shippingAddress: {
      address: req.body.shippingAddress.address,
      city: req.body.shippingAddress.city,
      postalCode: req.body.shippingAddress.postalcode,
      country: req.body.shippingAddress.country,
    },
    paymentMethod: req.body.paymentMethod,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
    isPaid: false,
    isDelivered: false,
    paidAt: null,
    deliveredAt: null,
    paymentResult: {
      id: "",
      status: "",
      updatedTime: null,
      emailAddress: "",
    },
  });

  order
    .save()
    .then((result) =>
      res.status(201).json({
        order,
        message: "Order has been placed",
      })
    )
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_get_one = (req, res) => {
  const id = req.params.orderId;
  Order.findById(id)
    .populate("user", "name email")
    .exec()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

//UPDATE api/orders/:orderId
//update payment result
exports.orders_update_payment = (req, res) => {
  const id = req.params.orderId;

  Order.updateOne(
    { _id: id },
    {
      paymentResult: req.body.paymentDetails,
      isPaid: true,
      paidAt: new Date(),
    },
    (err, docs) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      res.status(200).json({
        docs,
      });
    }
  );
};

exports.orders_update_deliver = (req, res) => {
  const id = req.params.orderId;

  Order.updateOne(
    { _id: id },
    {
      isDelivered: true,
      deliveredAt: new Date(),
    },
    (err, docs) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      res.status(200).json({
        docs,
      });
    }
  );
};

exports.orders_get_all = (req, res) => {
  Order.find()
    .populate("user", "name _id")
    .exec()
    .then((orders) => {
      res.status(200).json({
        count: orders.length,
        orders,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
