const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const checkAuth = require("../middlewares/check-auth");
const admin = require("../middlewares/admin");

// GET api/orders
// get all orders
router.get("/", admin, orderControllers.orders_get_all);

// POST api/orders
// add a new order
router.post("/", checkAuth, orderControllers.orders_create_order);

//GET api/orders/:orderId
// get order by id
router.get("/:orderId", checkAuth, orderControllers.orders_get_one);

//PATCH api/orders/:orderId
// update order payment result
router.patch(
  "/:orderId/pay",
  checkAuth,
  orderControllers.orders_update_payment
);

//PATCH api/orders/:orderId
// update order delivered
router.patch(
  "/:orderId/deliver",
  admin,
  orderControllers.orders_update_deliver
);

module.exports = router;
