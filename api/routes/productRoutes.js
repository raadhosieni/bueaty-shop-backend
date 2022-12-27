const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");
const checkAuth = require("../middlewares/check-auth");
const admin = require("../middlewares/admin");

//GET /api/products
//get all products
router.get("/", productControllers.products_get_all);

//GET /api/products/productId
//get product by id
router.get("/:productId", productControllers.products_get_one);

// POST /api/products
// add new product
router.post("/", checkAuth, productControllers.products_create_product);

// DELETE /api/products/productId
// delete product by id
router.delete("/:productId", admin, productControllers.products_delete_product);

// UPDATE /api/products/productId
// update product by id
router.put("/:productId", admin, productControllers.products_update_product);

// POST /api/products/productId/reviews
// add reviews to exist product
router.post("/:productId/reviews", productControllers.products_add_review);

module.exports = router;
