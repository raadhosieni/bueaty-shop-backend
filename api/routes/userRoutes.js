const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");
const admin = require("../middlewares/admin");
const checkAuth = require("../middlewares/check-auth");

//GET api/users
//get all users
router.get("/", admin, userControllers.users_get_all);

//GET api/users/:userId
//get user by id
router.get("/:userId", admin, userControllers.users_get_one);

//POST api/users/signup
//signup a new user
router.post("/signup", userControllers.users_signup);

//POST api/users/login
//login user
router.post("/login", userControllers.users_login);

//@desc update user by id
//@route PUT api/users/:userId
//@access private/admin
router.put("/:userId", admin, userControllers.users_update_user);

//@desc update user profile
//@route PUT api/users/:userId/profile
//@access private
router.put("/:userId/profile", checkAuth, userControllers.users_update_profile);

//@desc delete user by id
//@route DELETE api/users/:userId
//@access private/admin
router.delete("/:userId", admin, userControllers.users_delete_user);

module.exports = router;
