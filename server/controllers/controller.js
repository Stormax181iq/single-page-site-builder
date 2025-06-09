class Controller {
  constructor() {}

  handleError(error, res) {
    console.error(error);

    const status = error.status || 500;
    const message = error.message;

    return res
      .status(status)
      .json({ error: status === 500 ? "Internal Server Error" : message });
  }

  handleDatabaseError(error, field = null) {
    const errorMessages = {
      23502: field + " cannot be null or empty",
      23514: field + " doesn't match the requirements",
      23505: field + " already exists",
    };

    console.error(error);
    const message = errorMessages[error.code] || "Internal Server Error";
    const status = errorMessages[error.code] ? 400 : 500;

    throw { status, message };
  }
}

module.exports = Controller;
