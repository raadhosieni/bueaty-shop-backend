const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const encoded = jwt.verify(token, "secret");

    User.findById(encoded.id)
      .exec()
      .then((user) => {
        if (user.isAdmin) {
          req.userData = encoded;
          next();
        } else {
          throw new Error("Auth failed");
        }
      });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
