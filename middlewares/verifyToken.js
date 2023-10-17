const jwt = require("jsonwebtoken");
const User = require("../models/User");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedtoken) => {
      if (err) {
        return res.json("access denied");
      } else {
        const data = await User.findById(decodedtoken.userId).select(
          "-password"
        );
        if (data) {
          req.user = data;
          next();
        } else {
          return res.json("access denied");
        }
      }
    });
  } else {
    return res.json("access denied ");
  }
}

module.exports = verifyToken;
