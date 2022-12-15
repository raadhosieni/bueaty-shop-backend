const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const admin = require("../middlewares/admin");
const { generateToken } = require("../utils/utils");

exports.users_login = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }

        if (result) {
          const token = generateToken(user[0]._id, user[0].email);

          return res.status(200).json({
            message: "Auth success",
            id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            isAdmin: user[0].isAdmin,
            token: token,
            expiresIn: 60 * 60,
          });
        }

        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: err,
      });
    });
};

exports.users_signup = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          message: "EMail exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          }

          const user = new User({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            isAdmin: req.body.isAdmin,
          });

          user
            .save()
            .then((result) => {
              res.status(201).json("User created");
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        });
      }
    });
};

exports.users_get_all = (req, res) => {
  User.find({})
    .exec()
    .then((users) => {
      res.status(200).json({
        count: users.length,
        users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.users_get_one = (req, res) => {
  const id = req.params.userId;

  User.findById(id)
    .select("name email isAdmin")
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.users_update_user = async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(500);
    throw new Error("User not found");
  }
};

exports.users_update_profile = async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const hash = await bcrypt.hash(req.body.password, 10);

    user.password = hash;

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(500);
    throw new Error("User not found");
  }
};

exports.users_delete_user = async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    await user.remove();
    res.status(200).json({
      messsage: "User deleted successfully",
    });
  } else {
    res.status(500);
    throw new Error("Delete user failed");
  }
};
