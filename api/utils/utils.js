const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
  return jwt.sign(
    {
      id,
      email,
    },
    "secret",
    {
      expiresIn: "1h",
    }
  );
};

module.exports = { generateToken };
