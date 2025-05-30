require("dotenv").config();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Controller = require("./controller");

const { JWT_SECRET_KEY } = process.env;
const SALT_ROUNDS = 10;
const PASSWORD_MIN_LENGTH = 8;

class AuthController extends Controller {
  constructor() {
    super();
  }

  register = async (req, res) => {
    try {
      const {
        username = null,
        password = null,
        passwordConfirm = null,
      } = req.body || {};

      // Validate input
      const validationError = this.validateRegistration(
        username,
        password,
        passwordConfirm
      );
      if (validationError) {
        return this.handleError({ status: 400, message: validationError }, res);
      }

      // Hash password and insert user in database
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      await this.createUser(username, hash);

      return res.status(201).send();
    } catch (error) {
      return this.handleError(error, res);
    }
  };

  login = async (req, res) => {
    try {
      const { username = null, password = null } = req.body || {};

      // Validate input
      const validationError = this.validateLogin(username, password);
      if (validationError) {
        return this.handleError({ status: 400, message: validationError }, res);
      }

      const user = await this.getUser(username);
      const match = await bcrypt.compare(password, user.hash);

      if (match) {
        const token = await jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true });

        return res.status(200).send();
      } else {
        throw { status: 401, message: "Wrong username or password" };
      }
    } catch (error) {
      return this.handleError(error, res);
    }
  };

  validateRegistration(username, password, passwordConfirm) {
    if (!password || !passwordConfirm || !username) {
      return "A field is missing";
    }
    if (password !== passwordConfirm) {
      return "Passwords don’t match";
    }
    if (password.trim().length < PASSWORD_MIN_LENGTH) {
      return "Password must be at least 8 characters long";
    }

    return null;
  }

  async createUser(username, hash) {
    try {
      await db.query("INSERT INTO users (username, hash) VALUES ($1, $2)", [
        username,
        hash,
      ]);
    } catch (dbError) {
      this.handleDatabaseError(dbError);
    }
  }

  validateLogin(username, password) {
    if (!password || !username) {
      return "A field is missing";
    }
    if (Number.isInteger(Number(username))) {
      return "Username cannot be an integer";
    }
  }

  async getUser(key) {
    try {
      let query = "SELECT id, username, hash FROM users";

      // Add a different clause based on input
      if (Number.isInteger(Number(key))) {
        query += " WHERE id = $1";
      } else {
        query += " WHERE username = $1";
      }

      const dbResponse = await db.query(query, [key]);
      if (dbResponse.rowCount > 0) {
        return dbResponse.rows[0];
      } else {
        return this.handleError({ status: 404, message: "User not found" });
      }
    } catch (dbError) {
      return this.handleDatabaseError(dbError);
    }
  }

  handleDatabaseError(error) {
    const errorMessages = {
      23502: "Username cannot be null or empty",
      23514: "Username doesn't match the requirements",
      23505: "Username already exists",
    };

    console.error(error);
    const message = errorMessages[error.code] || "Internal Server Error";
    const status = errorMessages[error.code] ? 400 : 500;

    throw { status, message };
  }
}

module.exports = new AuthController();
