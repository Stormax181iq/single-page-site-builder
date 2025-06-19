require("dotenv").config();
const jwt = require("jsonwebtoken");

const authController = require("../controllers/auth.controller");

const { JWT_SECRET_KEY } = process.env;

async function auth(req, res, next) {
  try {
    const { token = null } = req.cookies || {};

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    let decoded;
    try {
      decoded = await jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Expired token, please login again" });
      } else {
        return res
          .status(401)
          .json({ error: "Invalid token, please login again" });
      }
    }
    const user = authController.getUser(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = auth;
