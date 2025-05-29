const db = require("../config/db");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;
const PASSWORD_MIN_LENGTH = 8;

class AuthController {
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
        return res.status(400).json({ error: validationError });
      }

      // Hash password and insert user in database
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      await this.createUser(username, hash);

      return res.status(201).send();
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

  handleDatabaseError(error) {
    const errorMessages = {
      23502: "Username cannot be null or empty",
      23514: "Username doesn't match the requirements",
      23505: "Username already exists",
    };

    const message = errorMessages[error.code] || "Internal Server Error";
    const status = errorMessages[error.code] ? 400 : 500;

    throw { status, message };
  }

  handleError(error, res) {
    console.error(error);

    const status = error.status || 500;
    const message = error.message;

    return res
      .status(status)
      .json({ error: status === 500 ? "Internal Server Error" : message });
  }
}

module.exports = new AuthController();
