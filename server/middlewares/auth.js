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
    const decoded = await jwt.verify(token, JWT_SECRET_KEY);
    const user = authController.getUser(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = auth;
