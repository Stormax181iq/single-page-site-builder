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
}

module.exports = Controller;
