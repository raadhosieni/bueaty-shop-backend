const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const encoded = jwt.verify(token, "secret");
    req.userData = encoded;
    next();
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
